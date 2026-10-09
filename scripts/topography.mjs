// Full-page contour background adapted from React Bits Topography (MIT + Commons Clause, see assets/react-bits.LICENSE.txt).
import { Mesh, Program, RenderTarget, Renderer, Triangle } from 'ogl';

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uColors[4];
uniform vec2 uMouse;
uniform float uMouseActive;
uniform float uScroll;
uniform float uSpan;
uniform vec4 uCtrlA;
uniform vec4 uCtrlB;
uniform vec4 uCtrlC;
uniform vec4 uCtrlD;
out vec4 fragColor;

const float MORPH_AMOUNT = 3.0;
const float BANDS = 1.5;
const float THICKNESS = 0.02;
const float SCALE = 2.0;
const float GLOW = 0.5;
const float CONTRAST = 3.0;
const float MOUSE_RADIUS = 0.3;
const float MOUSE_STRENGTH = 0.4;
const float GRAIN = 0.05;
// ponytail: palette cycles this many times across the normalized elevation so all four logo colours appear; tune by eye.
const float PALETTE_CYCLES = 1.6;

float bez(float t, vec4 c) {
  float w = 6.2831853 * t;
  return 0.5 * (c.x * sin(w) + c.y * cos(w) + c.z * sin(2.0 * w) + c.w * cos(2.0 * w));
}

float field(vec2 uv) {
  vec2 a = vec2(bez(uv.x, uCtrlA), bez(uv.x, uCtrlB));
  vec2 b = vec2(bez(uv.y, uCtrlC), bez(uv.y, uCtrlD));
  return distance(a, b);
}

vec3 palette(float e) {
  float t = fract(e * PALETTE_CYCLES) * 4.0;
  int i = int(t);
  return mix(uColors[i], uColors[(i + 1) % 4], smoothstep(0.0, 1.0, fract(t)));
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution;
  // The contours drift up with the page at a fraction of the scroll (layered depth); the field repeats, so any offset works.
  // One fixed span in both axes, centred on the canvas: resizing the window shows more or less of the terrain instead of
  // stretching it (React Bits normalises x and y by the canvas width and height separately; question 213).
  vec2 terrain = (gl_FragCoord.xy - 0.5 * iResolution - vec2(0.0, uScroll)) / uSpan + 0.5;
  float fv = field((terrain - 0.5) / SCALE + 0.5);

  vec2 d = uv - uMouse;
  d.x *= iResolution.x / max(iResolution.y, 1.0);
  fv += exp(-dot(d, d) / (MOUSE_RADIUS * MOUSE_RADIUS)) * MOUSE_STRENGTH * uMouseActive;

  float f = fv * BANDS;
  float frac = fract(f);
  float lineDist = min(frac, 1.0 - frac);
  float aa = fwidth(f) + 0.0001;
  float mask = 1.0 - smoothstep(THICKNESS - aa, THICKNESS + aa, lineDist);
  float glow = 1.0 - smoothstep(THICKNESS, THICKNESS + GLOW * 0.5 + aa, lineDist);
  float coverage = pow(clamp(mask + glow * 0.55, 0.0, 1.0), CONTRAST);

  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453);
  float a = clamp(coverage + (grain - 0.5) * GRAIN, 0.0, 1.0);
  vec3 color = palette(clamp(fv / (MORPH_AMOUNT * 2.5 + 0.001), 0.0, 1.0));
  fragColor = vec4(color * a, a);
}`;

const MAX_BANDS = 8; // Only bands that reach the screen are passed; a screen shows a few headings at most.

// Frosted glass behind the text: the drawn contours are blurred with a separable Gaussian (a horizontal then a vertical
// pass, sampling every texel out to 3 sigma) whose sigma varies smoothly per pixel row. The glass is full above the
// reel and from below it to the filter bar's resting place, easing out across the reel's margins and below the bar.
// Further bands sit behind the text that stands on the background (the day headings, the footer), each easing in and
// out across the gaps around it. Colours are kept.
const blurFragment = `#version 300 es
precision highp float;
#define MAX_BANDS ${MAX_BANDS}
uniform sampler2D tMap;
uniform vec2 uResolution;
uniform vec2 uDirection;
uniform vec4 uGlassReel;
uniform vec2 uGlassEnd;
uniform vec4 uBands[MAX_BANDS]; // Per band: ease-in start, full from, full until, ease-out end (canvas px from the top).
uniform int uBandCount;
uniform float uSigma;
out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float y = uResolution.y - gl_FragCoord.y;
  float glass = max(1.0 - smoothstep(uGlassReel.x, uGlassReel.y, y),
    smoothstep(uGlassReel.z, uGlassReel.w, y) * (1.0 - smoothstep(uGlassEnd.x, uGlassEnd.y, y)));
  for (int i = 0; i < MAX_BANDS; i++) {
    if (i >= uBandCount) break;
    vec4 band = uBands[i];
    glass = max(glass, smoothstep(band.x, band.y, y) * (1.0 - smoothstep(band.z, band.w, y)));
  }
  float sigma = uSigma * glass;
  vec4 color = texture(tMap, uv);
  if (sigma < 0.3) {
    fragColor = color;
    return;
  }
  vec2 step = uDirection / uResolution;
  int reach = int(ceil(sigma * 3.0));
  float total = 1.0;
  for (int i = 1; i <= 48; i++) {
    if (i > reach) break;
    float weight = exp(-0.5 * float(i * i) / (sigma * sigma));
    color += (texture(tMap, uv + step * float(i)) + texture(tMap, uv - step * float(i))) * weight;
    total += 2.0 * weight;
  }
  fragColor = color / total;
}`;

const CTRL_INDICES = [[1, -2, 3, -4], [9, -8, 7, -6], [5, 2, 5, -5], [-1, -3, 8, 9]];
const SPEED = 0.35, MORPH_AMOUNT = 3, MORPH_SPEED = 0.05;
const REEL_GAP = (1 - 0.7) / 2; // Blank share above and below the posters (CARD_HEIGHT 0.7 in scripts/hero.mjs).
const GLASS_TAIL = 224; // 14rem fade below the filter bar's resting place.
const GLASS_SIGMA = 6; // CSS px, like blur(6px).
const TEXT_FADE = 4; // Text bands ease across 4× the gap beside them, mostly under the neighbouring cards (question 211).
const TERRAIN_SPAN = 1140; // CSS px per terrain unit: on a 1440 × 900 window each shape keeps the area React Bits gives it (question 220).
const SCROLL_DEPTH = 0.15; // The contours move at 0.15× the page scroll.

function hexToRgb(hex) {
  const [r, g, b] = hex.trim().match(/[\da-f]{2}/gi).map(value => parseInt(value, 16) / 255);
  return [r, g, b];
}

export function initTopography(canvas, reel, sentinel, dock, footer) {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const unavailable = reason => {
    canvas.hidden = true;
    console.warn(`Decorative topography unavailable (${reason}); event content remains accessible.`);
  };
  // Probe first: ogl logs an error and throws without a context. It then reuses this WebGL2 context.
  const attributes = { alpha: true, premultipliedAlpha: true, antialias: false };
  if (!canvas.getContext('webgl2', attributes)) return unavailable('WebGL2');
  const renderer = new Renderer({ canvas, webgl: 2, ...attributes, dpr: Math.min(devicePixelRatio, 1.5) });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);

  const tokens = getComputedStyle(document.documentElement);
  const mouse = [0.5, 0.5], mouseTarget = [0.5, 0.5];
  const program = new Program(gl, {
    vertex, fragment,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      uColors: { value: ['--brand-pink', '--brand-yellow', '--brand-cyan', '--brand-violet'].map(name => hexToRgb(tokens.getPropertyValue(name))) },
      uMouse: { value: mouse },
      uMouseActive: { value: 0 },
      uScroll: { value: 0 },
      uSpan: { value: 1 },
      uCtrlA: { value: [0, 0, 0, 0] },
      uCtrlB: { value: [0, 0, 0, 0] },
      uCtrlC: { value: [0, 0, 0, 0] },
      uCtrlD: { value: [0, 0, 0, 0] }
    }
  });
  // Contours render into `drawn`; the horizontal blur pass writes `across`; the vertical pass draws to the canvas.
  const drawn = new RenderTarget(gl, { width: 2, height: 2, depth: false });
  const across = new RenderTarget(gl, { width: 2, height: 2, depth: false });
  const blurProgram = new Program(gl, {
    vertex, fragment: blurFragment, depthTest: false, depthWrite: false,
    uniforms: {
      tMap: { value: drawn.texture },
      uResolution: { value: [1, 1] },
      uDirection: { value: [1, 0] },
      uGlassReel: { value: [0, 0, 0, 0] },
      uGlassEnd: { value: [0, 0] },
      uBands: { value: Array.from({ length: MAX_BANDS }, () => [0, 0, 0, 0]) },
      uBandCount: { value: 0 },
      uSigma: { value: 1 }
    }
  });
  if (![program, blurProgram].every(p => gl.getProgramParameter(p.program, gl.LINK_STATUS))) return unavailable('shader');
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
  const blurMesh = new Mesh(gl, { geometry: new Triangle(gl), program: blurProgram });
  const u = program.uniforms, g = blurProgram.uniforms;
  const controls = [u.uCtrlA.value, u.uCtrlB.value, u.uCtrlC.value, u.uCtrlD.value];
  let mouseActiveTarget = 0, time = 0, last, frame = 0, places;

  const root = document.documentElement;
  const animating = () => !reducedMotion.matches && !document.hidden && !canvas.hidden;
  // An event's detail sheet (src/components/EventDetail.tsx) covers the page: the terrain holds its last frame meanwhile, which
  // spares the main thread while the sheet flies in and out (docs/event-browsing.md F42).
  const covered = () => root.classList.contains('is-detail');
  function render(now) {
    frame = 0;
    if (!places) return; // The first measurement (below) requests the first frame.
    if (animating()) time += last === undefined ? 0 : (now - last) / 1000;
    last = animating() ? now : undefined;
    u.iTime.value = time;
    controls.forEach((values, group) => CTRL_INDICES[group].forEach((i, j) => {
      values[j] = MORPH_AMOUNT * Math.sin(time * SPEED * Math.sin(i * MORPH_SPEED) + i);
    }));
    mouse[0] += 0.05 * (mouseTarget[0] - mouse[0]);
    mouse[1] += 0.05 * (mouseTarget[1] - mouse[1]);
    u.uMouseActive.value = reducedMotion.matches ? 0 : u.uMouseActive.value + 0.05 * (mouseActiveTarget - u.uMouseActive.value);
    u.uSpan.value = TERRAIN_SPAN * renderer.dpr;
    u.uScroll.value = reducedMotion.matches ? 0 : scrollY * SCROLL_DEPTH * renderer.dpr; // GL y points up: features rise.
    // Glass edges in page px, shifted by the scroll and scaled to the canvas: each reel fade spans the blank margin
    // plus the same length into the text beside it. The blur ends where the filter bar rests before it sticks.
    const y = scrollY;
    const reelTop = places.reelTop - y, gap = places.reelHeight * REEL_GAP;
    const reelBottom = reelTop + places.reelHeight, barBottom = places.barBottom - y;
    g.uGlassReel.value = [reelTop - gap, reelTop + gap, reelBottom - gap, reelBottom + gap].map(value => value * renderer.dpr);
    g.uGlassEnd.value = [barBottom, barBottom + GLASS_TAIL].map(value => value * renderer.dpr);
    g.uBandCount.value = textBands(y).reduce((count, band) => {
      if (count === MAX_BANDS || band[3] < 0 || band[0] > renderer.height) return count;
      g.uBands.value[count] = band.map(value => value * renderer.dpr);
      return count + 1;
    }, 0);
    g.uSigma.value = GLASS_SIGMA * renderer.dpr;
    renderer.render({ scene: mesh, target: drawn });
    g.tMap.value = drawn.texture;
    g.uDirection.value = [1, 0];
    renderer.render({ scene: blurMesh, target: across });
    g.tMap.value = across.texture;
    g.uDirection.value = [0, 1];
    renderer.render({ scene: blurMesh });
    if (animating() && !covered()) frame = requestAnimationFrame(render);
  }
  // What the glass needs, in page px, measured when the layout changes rather than on every frame (docs/motion-performance.md
  // F4), from a ResizeObserver, whose callbacks run once the layout is done, so measuring forces none: the reel, the filter bar's resting bottom (the sentinel plus the dock's height in the flow), each visible day with
  // the content around it, and the footer. A day heading drifts with the scroll (assets/scroll-motion.js), so its place is
  // kept without the drift and the drift is added back each frame.
  function measure() {
    const y = scrollY, drifting = root.classList.contains('scroll-motion');
    const top = element => element.getBoundingClientRect().top + y, bottom = element => element.getBoundingClientRect().bottom + y;
    const barBottom = bottom(sentinel) + dock.offsetHeight;
    const groups = [...document.querySelectorAll('.day-group:not([hidden])')];
    const days = groups.map((day, i) => {
      const heading = day.querySelector('.day-heading'), empty = day.querySelector('.empty-day'), cards = day.querySelector('.event-accordion');
      const drift = drifting ? parseFloat(heading.style.getPropertyValue('--heading-y')) || 0 : 0;
      return {
        heading, drifts: !empty, top: top(heading) - drift, bottom: empty ? bottom(empty) : bottom(heading) - drift,
        above: i ? bottom(groups[i - 1]) : barBottom, below: top(cards ?? groups[i + 1] ?? footer),
      };
    });
    return { reelTop: top(reel), reelHeight: reel.offsetHeight, barBottom, days, footerTop: top(footer),
      footerPad: parseFloat(getComputedStyle(footer).paddingTop) };
  }
  // Bands behind the text on the background, in viewport px: each visible day's heading (with the note of a day without
  // events) eases in from the content above and out towards its first card, or to what follows, over TEXT_FADE times
  // the gap between; the footer eases in from its divider over TEXT_FADE times its top padding and stays full to the
  // page's end.
  function textBands(y) {
    const drifting = root.classList.contains('scroll-motion');
    const bands = places.days.map(day => {
      const drift = drifting ? parseFloat(day.heading.style.getPropertyValue('--heading-y')) || 0 : 0;
      const top = day.top + drift - y, bottom = day.bottom + (day.drifts ? drift : 0) - y;
      const fadeIn = Math.max(TEXT_FADE * (top - (day.above - y)), 1), fadeOut = Math.max(TEXT_FADE * (day.below - y - bottom), 1);
      return [top - fadeIn, top, bottom, bottom + fadeOut];
    });
    const top = places.footerTop - y;
    const end = renderer.height + 2; // Past the canvas: full to the bottom of the screen.
    return [...bands, [top, top + TEXT_FADE * places.footerPad, end, end + 1]];
  }
  function requestRender() {
    if (!frame && !canvas.hidden && !covered()) frame = requestAnimationFrame(render);
  }

  // The canvas takes its size from the stylesheet; a ResizeObserver reports it once laid out, so sizing forces no layout.
  canvas.style.width = canvas.style.height = ''; // The renderer wrote its default 300 × 150 inline.
  new ResizeObserver(([{ contentRect: { width, height } }]) => {
    if (width !== renderer.width || height !== renderer.height) {
      renderer.setSize(width, height);
      canvas.style.width = canvas.style.height = ''; // ogl writes pixel sizes inline; the stylesheet keeps deciding.
      drawn.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
      across.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
      u.iResolution.value = g.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    }
    requestRender();
  }).observe(canvas);
  addEventListener('scroll', requestRender, { passive: true });
  // The first layout and every change of the page's size (the window, filters, the accordion, fonts): measure again.
  new ResizeObserver(() => {
    places = measure();
    requestRender();
  }).observe(document.body);
  document.addEventListener('visibilitychange', requestRender);
  // Uncovered, the terrain picks up where it stopped rather than jumping ahead by the time the sheet was open.
  let wasCovered = covered();
  new MutationObserver(() => {
    if (covered() === wasCovered) return;
    wasCovered = covered();
    last = undefined;
    requestRender();
  }).observe(root, { attributes: true, attributeFilter: ['class'] });
  reducedMotion.addEventListener('change', requestRender);
  addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    const box = canvas.getBoundingClientRect();
    mouseTarget[0] = (event.clientX - box.left) / box.width;
    mouseTarget[1] = 1 - (event.clientY - box.top) / box.height;
    mouseActiveTarget = 1;
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => { mouseActiveTarget = 0; });
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    cancelAnimationFrame(frame);
    unavailable('context lost');
  });
}

if (typeof document !== 'undefined') {
  const start = () => initTopography(document.querySelector('.topography'), document.querySelector('.hero-stage'),
    document.querySelector('.filter-sentinel'), document.querySelector('.filter-dock'), document.querySelector('.site-footer'));
  // The brand colour tokens and the canvas size come from site.css. On a first visit iOS Safari can run this deferred
  // script while those tokens still resolve empty, even with the stylesheet object present, so wait for `load`.
  if (getComputedStyle(document.documentElement).getPropertyValue('--brand-pink').trim()) start();
  else addEventListener('load', start, { once: true });
}
