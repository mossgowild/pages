// Poster reel adapted from React Bits Flex Carousel (MIT + Commons Clause, see assets/react-bits.LICENSE.txt).
import { Mesh, Plane, Program, RenderTarget, Renderer, Texture, Triangle } from 'ogl';

// Flex Carousel with the "liquid" lens preset, the "deal" intro, "portrait" fit and cards at 0.7 of the stage height.
const CARD_HEIGHT = 0.7;
const CARD_ASPECT = 0.75;
const GAP = 12;
const SQUEEZE = 0.2;
const AUTOPLAY_MS = 4000;
const IDLE_MS = 3000;
const LENS = { width: 0.74, height: 1.18, tilt: 62, bend: 0.34, reach: 0.38, dispersion: 0.45 };
const INTRO_SECONDS = { deal: 1.5, fade: 0.35 };
const TAPS = 12;
const PIXEL_BUDGET = 4.5e6;

export const wrap = (value, size) => ((((value + size / 2) % size) + size) % size) - size / 2;
const clamp01 = value => Math.min(Math.max(value, 0), 1);
const easeOut = value => 1 - Math.pow(1 - clamp01(value), 3);

export function reelMetrics(aspects, cardH, gap = GAP) {
  const widths = aspects.map(aspect => aspect * cardH);
  const centers = [];
  let cursor = 0;
  for (const width of widths) {
    centers.push(cursor + width / 2);
    cursor += width + gap;
  }
  return { cardH, widths, centers, gap, loop: Math.max(cursor, 1) };
}

export function nearest(m, at) {
  let best = 0, bestDistance = Infinity;
  m.centers.forEach((center, i) => {
    const distance = Math.abs(wrap(center - at, m.loop));
    if (distance < bestDistance) {
      bestDistance = distance;
      best = i;
    }
  });
  return best;
}

export const snapPoint = (m, at) => at + wrap(m.centers[nearest(m, at)] - at, m.loop);

export function stepGoal(m, goal, delta) {
  let at = snapPoint(m, goal), index = nearest(m, at);
  const n = m.centers.length;
  for (let k = 0; k < Math.abs(delta); k++) {
    const next = (index + (delta > 0 ? 1 : n - 1)) % n;
    at += delta > 0 ? m.widths[index] / 2 + m.gap + m.widths[next] / 2 : -(m.widths[next] / 2 + m.gap + m.widths[index] / 2);
    index = next;
  }
  return at;
}

// Keep the same card under the lens when the layout (and so the loop length) changes.
function remap(from, to, at) {
  const i = nearest(from, at);
  const offset = wrap(at - from.centers[i], from.loop);
  const cycles = Math.round((at - offset - from.centers[i]) / from.loop);
  return cycles * to.loop + to.centers[i] + offset * (to.widths[i] / from.widths[i]);
}

const cardVertex = `#version 300 es
in vec3 position;
uniform vec4 uRect;
uniform vec2 uResolution;
out vec2 vLocal;
void main() {
  vLocal = vec2(position.x, -position.y) * uRect.zw;
  vec2 px = uRect.xy + vLocal;
  gl_Position = vec4(px.x / uResolution.x * 2.0 - 1.0, 1.0 - px.y / uResolution.y * 2.0, 0.0, 1.0);
}`;

// Portrait fit: the poster covers the card, zoomed 1.08x and shifted inside it as the card travels.
const cardFragment = `#version 300 es
precision highp float;
uniform sampler2D tMap;
uniform vec2 uSize;
uniform float uImageAspect;
uniform float uShift;
uniform float uAlpha;
uniform float uReady;
uniform float uDpr;
uniform vec3 uPlaceholder;
in vec2 vLocal;
out vec4 fragColor;

void main() {
  vec2 q = abs(vLocal) - uSize * 0.5;
  float sd = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
  float mask = clamp(0.5 - sd * uDpr, 0.0, 1.0);
  vec2 local = vLocal / uSize + 0.5;
  float cardAspect = uSize.x / uSize.y;
  vec2 scale = uImageAspect > cardAspect ? vec2(cardAspect / uImageAspect, 1.0) : vec2(1.0, uImageAspect / cardAspect);
  scale /= 1.08;
  vec2 uv = (vec2(local.x, 1.0 - local.y) - 0.5) * scale + 0.5;
  uv.x += uShift * (1.0 - scale.x) * 0.5;
  vec3 image = texture(tMap, uv).rgb;
  float alpha = mask * uAlpha;
  fragColor = vec4(mix(uPlaceholder, image, uReady) * alpha, alpha);
}`;

const lensVertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const lensFragment = `#version 300 es
precision highp float;
uniform sampler2D tScene;
uniform vec2 uResolution;
uniform float uDpr;
uniform vec2 uCenter;
uniform vec2 uHalf;
uniform float uAngle;
uniform float uInner;
uniform float uOuter;
uniform float uFlow;
uniform float uDispersion;
uniform float uStrength;
uniform float uSceneAlpha;
out vec4 fragColor;

void main() {
  vec2 frag = gl_FragCoord.xy / uDpr;
  vec2 uv = frag / uResolution;
  vec2 rel = frag - vec2(uCenter.x, uResolution.y - uCenter.y);
  float ca = cos(uAngle);
  float sa = sin(uAngle);
  vec2 local = vec2(ca * rel.x + sa * rel.y, -sa * rel.x + ca * rel.y);
  vec2 k = max(abs(local) / uHalf, vec2(1e-5));
  float nd = length(k);
  vec2 grad = k * sign(local) / uHalf / nd;
  float glen = max(length(grad), 1e-6);
  float edge = (nd - 1.0) / glen;
  vec2 outward = grad / glen;
  vec2 normal = vec2(ca * outward.x - sa * outward.y, sa * outward.x + ca * outward.y);
  vec2 along = vec2(-normal.y, normal.x);

  float t = clamp((edge + uInner) / (uInner + uOuter), 0.0, 1.0);
  float ramp = t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
  float slope = 16.0 * t * t * (1.0 - t) * (1.0 - t);
  float reachX = rel.x / (uResolution.x * 0.5);
  float side = smoothstep(0.02, 0.3, abs(reachX)) * sign(reachX);
  float lift = ramp * side * uFlow * uStrength;
  vec2 swirl = along * along.y * side * slope * uFlow * uStrength * 0.35;
  vec2 shifted = uv + (vec2(0.0, -lift) - swirl) / uResolution;

  vec2 texels = uResolution * uDpr;
  vec2 gx = dFdx(shifted);
  vec2 gy = dFdy(shifted);
  gx *= min(1.0, 3.0 / max(length(gx * texels), 1e-4));
  gy *= min(1.0, 3.0 / max(length(gy * texels), 1e-4));

  vec4 color = textureGrad(tScene, shifted, gx, gy);
  vec2 spread = vec2(0.0, side * slope * uFlow * uStrength) / uResolution * uDispersion;
  float spreadPx = length(spread * texels);
  if (color.a > 0.002 && spreadPx > 0.25) {
    vec3 base = color.rgb / color.a;
    vec3 sumColor = vec3(0.0);
    vec3 sumWeight = vec3(0.0);
    for (int i = 0; i < ${TAPS}; i++) {
      float s = (float(i) + 0.5) / float(${TAPS});
      vec4 c = textureGrad(tScene, shifted + spread * (s - 0.5), gx, gy);
      vec3 w = max(1.0 - abs(vec3(s) - vec3(0.15, 0.5, 0.85)) * 2.6, 0.0) * c.a;
      sumColor += c.rgb * (w / max(c.a, 0.002));
      sumWeight += w;
    }
    vec3 split = mix(base, sumColor / max(sumWeight, vec3(1e-4)), clamp(sumWeight * 2.0, 0.0, 1.0));
    color.rgb = mix(color.rgb, clamp(split, 0.0, 1.0) * color.a, smoothstep(0.25, 1.5, spreadPx));
  }
  fragColor = color * uSceneAlpha;
}`;

export function createReelEngine(stage, items, { start, onChange, onSelect }) {
  // Probe first: ogl logs an error and throws without a context. It then reuses this WebGL2 context.
  const attributes = { alpha: true, premultipliedAlpha: true, antialias: false, depth: false };
  const canvas = document.createElement('canvas');
  if (!canvas.getContext('webgl2', attributes)) return null;
  const renderer = new Renderer({ canvas, webgl: 2, ...attributes });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);
  canvas.className = 'hero-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  stage.prepend(canvas);

  const cardProgram = new Program(gl, {
    vertex: cardVertex, fragment: cardFragment, transparent: true, depthTest: false, depthWrite: false,
    uniforms: {
      tMap: { value: new Texture(gl) }, uRect: { value: [0, 0, 1, 1] }, uResolution: { value: [1, 1] },
      uSize: { value: [1, 1] }, uImageAspect: { value: 1 }, uShift: { value: 0 }, uAlpha: { value: 1 }, uReady: { value: 0 }, uDpr: { value: 1 },
      uPlaceholder: { value: [0.5, 0.5, 0.5] }
    }
  });
  cardProgram.setBlendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  const cardMesh = new Mesh(gl, { geometry: new Plane(gl), program: cardProgram });
  const target = new RenderTarget(gl, { width: 2, height: 2, depth: false, minFilter: gl.LINEAR_MIPMAP_LINEAR, magFilter: gl.LINEAR });
  const lens = {
    tScene: { value: target.texture }, uResolution: { value: [1, 1] }, uDpr: { value: 1 }, uCenter: { value: [0, 0] },
    uHalf: { value: [1, 1] }, uAngle: { value: LENS.tilt * Math.PI / 180 }, uInner: { value: 60 }, uOuter: { value: 80 },
    uFlow: { value: 0 }, uDispersion: { value: LENS.dispersion * 0.12 }, uStrength: { value: 0 }, uSceneAlpha: { value: 0 }
  };
  const lensMesh = new Mesh(gl, {
    geometry: new Triangle(gl),
    program: new Program(gl, { vertex: lensVertex, fragment: lensFragment, uniforms: lens, depthTest: false, depthWrite: false })
  });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const anisotropy = renderer.getExtension('EXT_texture_filter_anisotropic') ? 8 : 0;
  const slots = items.map(item => {
    const texture = new Texture(gl, { generateMipmaps: true, minFilter: gl.LINEAR_MIPMAP_LINEAR, magFilter: gl.LINEAR, anisotropy });
    const slot = { texture, aspect: item.width / item.height, loaded: false, ready: 0, color: [0.1, 0.1, 0.12] };
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      texture.image = image;
      slot.loaded = true;
      try {
        const probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
        probe.canvas.width = probe.canvas.height = 8;
        probe.drawImage(image, 0, 0, 8, 8);
        const data = probe.getImageData(0, 0, 8, 8).data, sum = [0, 0, 0];
        for (let i = 0; i < data.length; i += 4) for (let c = 0; c < 3; c++) sum[c] += data[i + c];
        slot.color = sum.map(value => value / 64 / 255);
      } catch { /* The placeholder colour is decorative; keep the default. */ }
      requestFrame();
    };
    image.onerror = () => {
      slot.failed = true;
      requestFrame();
    };
    image.src = item.src;
    return slot;
  });

  let width = 1, height = 1, pos = 0, vel = 0, goal = 0, mode = 'spring', wheelAt = 0, raf = 0, last = 0;
  let visible = true, dirty = true, resnap = true, layout = null, activeIndex = -1, instances = [];
  let interactedAt = -Infinity, autoplayAt = performance.now(), hasFocus = false, energy = 0, lastPos = 0;
  let reason = 'auto';
  const intro = { kind: 'deal', t: 0, running: false, done: false, readyAt: performance.now() };
  const pointer = { x: 0, y: 0, over: false, down: false, id: -1, startX: 0, startY: 0, startPos: 0, dragging: false, touch: false, samples: [] };

  const metrics = () => reelMetrics(slots.map(() => CARD_ASPECT), Math.max(24, CARD_HEIGHT * height));
  const interact = () => {
    interactedAt = performance.now();
    reason = 'user';
    intro.t = intro.running ? 1 : intro.t;
  };
  const moveTo = at => {
    goal = at;
    mode = 'spring';
    dirty = true;
    requestFrame();
  };

  function introEffects() {
    if (!intro.running && !intro.done) return { sceneAlpha: 0, strength: 0, card: null };
    const t = intro.running ? intro.t : 1;
    if (t >= 1) return { sceneAlpha: 1, strength: 1, card: null };
    if (intro.kind === 'fade') return { sceneAlpha: easeOut(t), strength: easeOut(t), card: null };
    // Deal: cards start stacked under the lens and fan out, nearest first.
    return {
      sceneAlpha: 1,
      strength: easeOut((t - 0.45) / 0.5),
      card: rel => {
        const spread = Math.min(Math.abs(rel) / (width * 0.6), 1) * 0.3;
        return { alpha: easeOut((t - spread) / 0.12), x: -rel * (1 - easeOut((t - 0.12 - spread) / 0.5)) };
      }
    };
  }

  function resize() {
    width = Math.max(1, stage.clientWidth);
    height = Math.max(1, stage.clientHeight);
    renderer.dpr = Math.min(devicePixelRatio || 1, 2, Math.sqrt(PIXEL_BUDGET / (width * height)));
    renderer.setSize(width, height);
    target.setSize(Math.max(2, Math.round(width * renderer.dpr)), Math.max(2, Math.round(height * renderer.dpr)));
    lens.tScene.value = target.texture;
    dirty = true;
    requestFrame();
  }

  function frame(now) {
    raf = 0;
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
    last = now;
    const m = metrics();
    let animating = false;

    if (resnap) {
      goal = pos = m.centers[start] ?? 0;
      vel = 0;
      resnap = false;
    } else if (layout && layout.loop !== m.loop) {
      pos = remap(layout, m, pos);
      goal = remap(layout, m, goal);
      pointer.startPos = pos + (pointer.x - pointer.startX);
      animating = true;
    }
    layout = m;

    if (!intro.running && !intro.done && (slots.every(slot => slot.loaded || slot.failed) || now - intro.readyAt > 3500)) {
      intro.kind = reduced.matches ? 'fade' : 'deal';
      intro.running = true;
    }
    if (intro.running) {
      intro.t = Math.min(1, intro.t + dt / INTRO_SECONDS[intro.kind]);
      if (intro.t >= 1) {
        intro.running = false;
        intro.done = true;
      }
      animating = true;
    }

    if (mode === 'wheel' && now - wheelAt > 150) {
      goal = snapPoint(m, goal);
      mode = 'spring';
    }
    if (pointer.dragging) {
      animating = true;
    } else {
      const stiffness = mode === 'wheel' ? 80 : 55, damping = 2 * Math.sqrt(stiffness);
      const steps = Math.ceil(dt * 240), h = dt / steps;
      for (let i = 0; i < steps; i++) {
        vel += (stiffness * (goal - pos) - damping * vel) * h;
        pos += vel * h;
      }
      if (Math.abs(goal - pos) < 0.05 && Math.abs(vel) < 0.5) {
        pos = goal;
        vel = 0;
      } else {
        animating = true;
      }
    }
    if (Math.abs(pos) > m.loop * 8) {
      const shift = Math.round(pos / m.loop) * m.loop;
      pos -= shift;
      goal -= shift;
      pointer.startPos -= shift;
    }

    const current = nearest(m, pos);
    if (current !== activeIndex) {
      activeIndex = current;
      onChange(current, reason);
    }

    const autoplay = !reduced.matches;
    if (autoplay && intro.done && !pointer.over && !pointer.down && !hasFocus && mode === 'spring' && Math.abs(goal - pos) < 1
      && now - interactedAt > IDLE_MS && now - autoplayAt > AUTOPLAY_MS) {
      autoplayAt = now;
      reason = 'auto';
      goal = stepGoal(m, goal, 1);
    }
    if (autoplay) animating = true;

    const travel = Math.abs(pos - lastPos) / dt;
    lastPos = pos;
    const energyTarget = reduced.matches ? 0 : Math.min(travel / 2600, 1);
    energy += (energyTarget - energy) * (1 - Math.exp(-dt / (energyTarget > energy ? 0.07 : 0.35)));
    if (energy > 0.001) animating = true;

    for (const slot of slots) {
      if (slot.loaded && slot.ready < 1) {
        slot.ready = Math.min(1, slot.ready + dt / 0.45);
        animating = true;
      }
    }

    if (dirty || animating) {
      dirty = false;
      draw(m);
    }
    if (visible && !document.hidden && (animating || !intro.done || pointer.down)) raf = requestAnimationFrame(frame);
  }

  function draw(m) {
    const effects = introEffects();
    const homeX = width / 2, homeY = height / 2, dpr = renderer.dpr;
    const shrink = 1 - SQUEEZE * energy;
    const draws = [];
    cardProgram.uniforms.uResolution.value = [width, height];
    cardProgram.uniforms.uDpr.value = dpr;
    m.widths.forEach((w, i) => {
      const baseRel = wrap(m.centers[i] - pos, m.loop);
      for (let k = -3; k <= 3; k++) {
        const rel = baseRel + k * m.loop;
        if (Math.abs(rel) - w / 2 > width + 40) continue;
        const fx = effects.card?.(rel);
        const cw = w * shrink, x = homeX + rel + (fx ? fx.x : 0);
        const alpha = fx ? fx.alpha : 1;
        if (alpha <= 0.001 || x + cw / 2 < -40 || x - cw / 2 > width + 40) continue;
        draws.push({ i, rel, x, y: homeY, cw, ch: m.cardH * shrink, alpha });
      }
    });
    draws.sort((a, b) => Math.abs(b.rel) - Math.abs(a.rel));
    instances = [];
    let first = true;
    for (const card of draws) {
      const slot = slots[card.i];
      const u = cardProgram.uniforms;
      u.tMap.value = slot.texture;
      u.uRect.value = [card.x, card.y, card.cw + 2, card.ch + 2];
      u.uSize.value = [card.cw, card.ch];
      u.uImageAspect.value = slot.aspect;
      u.uShift.value = reduced.matches ? 0 : Math.max(-1, Math.min(1, card.rel / (width * 0.75)));
      u.uAlpha.value = card.alpha;
      u.uReady.value = slot.ready;
      u.uPlaceholder.value = slot.color;
      renderer.render({ scene: cardMesh, target, clear: first });
      first = false;
      instances.push({ index: card.i, x0: card.x - card.cw / 2, x1: card.x + card.cw / 2, y0: card.y - card.ch / 2, y1: card.y + card.ch / 2 });
    }
    if (first) {
      renderer.bindFramebuffer(target);
      gl.viewport(0, 0, target.width, target.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    renderer.bindFramebuffer();
    target.texture.bind();
    gl.generateMipmap(gl.TEXTURE_2D);

    const halfW = Math.max(LENS.width * width / 2, 1), halfH = Math.max(LENS.height * width / 2, 1);
    const inner = Math.max(4, LENS.reach * (halfW + halfH) * 0.5);
    lens.uResolution.value = [width, height];
    lens.uDpr.value = dpr;
    lens.uCenter.value = [homeX, homeY];
    lens.uHalf.value = [halfW, halfH];
    lens.uInner.value = inner;
    lens.uOuter.value = inner * 1.6;
    lens.uFlow.value = LENS.bend * (halfW + halfH) * 0.45;
    lens.uStrength.value = effects.strength;
    lens.uSceneAlpha.value = effects.sceneAlpha;
    renderer.render({ scene: lensMesh });
  }

  function requestFrame() {
    if (raf || !visible) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  const localPoint = event => {
    const box = stage.getBoundingClientRect();
    return [event.clientX - box.left, event.clientY - box.top];
  };
  stage.addEventListener('pointerdown', event => {
    if (event.button > 0) return;
    const [x, y] = localPoint(event);
    Object.assign(pointer, { down: true, id: event.pointerId, touch: event.pointerType === 'touch', startX: x, startY: y, x, y,
      startPos: pos, dragging: false, samples: [{ x, t: performance.now() }] });
    interact();
    if (Math.abs(vel) > 40) {
      goal = pos;
      vel = 0;
    }
    dirty = true;
    requestFrame();
  });
  stage.addEventListener('pointermove', event => {
    const [x, y] = localPoint(event);
    Object.assign(pointer, { x, y, over: true });
    if (pointer.down && event.pointerId === pointer.id) {
      const dx = x - pointer.startX, dy = y - pointer.startY, slop = pointer.touch ? 10 : 5;
      if (!pointer.dragging) {
        if (pointer.touch && Math.abs(dy) > slop && Math.abs(dy) > Math.abs(dx)) {
          pointer.down = false; // Vertical touch movement scrolls the page.
          return;
        }
        if (Math.abs(dx) > slop) {
          Object.assign(pointer, { dragging: true, startX: x, startPos: pos });
          stage.setPointerCapture(event.pointerId);
          stage.dataset.dragging = '';
        }
      }
      if (pointer.dragging) {
        pos = goal = pointer.startPos - (x - pointer.startX);
        vel = 0;
        const now = performance.now();
        pointer.samples.push({ x, t: now });
        while (pointer.samples.length > 2 && now - pointer.samples[0].t > 100) pointer.samples.shift();
      }
    }
    dirty = true;
    requestFrame();
  });
  stage.addEventListener('pointerup', event => {
    if (!pointer.down || event.pointerId !== pointer.id) return;
    pointer.down = false;
    delete stage.dataset.dragging;
    const m = metrics();
    interact();
    if (pointer.dragging) {
      pointer.dragging = false;
      const now = performance.now(), first = pointer.samples[0], lastSample = pointer.samples.at(-1);
      const velocity = first && lastSample.t > first.t && now - lastSample.t < 70
        ? -((lastSample.x - first.x) / (lastSample.t - first.t)) * 1000 : 0;
      vel = velocity;
      const landing = snapPoint(m, pos + velocity * 0.32);
      moveTo(Math.abs(velocity) > 400 && Math.abs(landing - pos) < 1 ? stepGoal(m, goal, velocity > 0 ? 1 : -1) : landing);
      return;
    }
    const [x, y] = localPoint(event);
    const hit = instances.find(card => x >= card.x0 && x <= card.x1 && y >= card.y0 && y <= card.y1);
    if (!hit) return;
    if (hit.index === activeIndex && Math.abs(goal - pos) < 2) onSelect(hit.index);
    else moveTo(snapPoint(m, pos + (hit.x0 + hit.x1) / 2 - width / 2));
  });
  stage.addEventListener('pointerleave', () => {
    pointer.over = false;
    requestFrame();
  });
  stage.addEventListener('pointercancel', () => {
    Object.assign(pointer, { down: false, dragging: false });
    delete stage.dataset.dragging;
    moveTo(snapPoint(metrics(), pos));
  });
  stage.addEventListener('wheel', event => {
    // Only horizontal wheel movement (trackpad swipes, Shift+wheel) drives the reel; vertical wheel scrolls the page.
    const dx = event.shiftKey && Math.abs(event.deltaX) < Math.abs(event.deltaY) ? event.deltaY : event.deltaX;
    const dy = event.shiftKey ? 0 : event.deltaY;
    if (event.ctrlKey || Math.abs(dx) <= Math.abs(dy)) return;
    event.preventDefault();
    interact();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1;
    goal += Math.max(-120, Math.min(120, dx * unit)) * 1.25;
    mode = 'wheel';
    wheelAt = performance.now();
    dirty = true;
    requestFrame();
  }, { passive: false });
  stage.addEventListener('keydown', event => {
    const m = metrics();
    const moves = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (event.key in moves) {
      event.preventDefault();
      interact();
      moveTo(stepGoal(m, goal, moves[event.key]));
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      interact();
      const index = event.key === 'Home' ? 0 : slots.length - 1;
      moveTo(goal + wrap(m.centers[index] - goal, m.loop));
    } else if ((event.key === 'Enter' || event.key === ' ') && activeIndex >= 0) {
      event.preventDefault();
      onSelect(activeIndex);
    }
  });
  stage.addEventListener('focus', () => { hasFocus = true; });
  stage.addEventListener('blur', () => { hasFocus = false; });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) requestFrame(); });
  reduced.addEventListener('change', requestFrame);
  new ResizeObserver(resize).observe(stage);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    requestFrame();
  }).observe(stage);
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    cancelAnimationFrame(raf);
    visible = false;
    stage.classList.remove('is-webgl');
    canvas.remove();
    console.warn('Poster reel WebGL context lost; showing the poster list instead.');
  });
  resize();
  return {};
}

export function initHero(root, createEngine = createReelEngine) {
  const stage = root.querySelector('.hero-stage');
  const links = [...root.querySelectorAll('.hero-poster')];
  const details = [...root.querySelectorAll('.hero-detail')];
  const status = root.querySelector('.hero-status');
  const start = 1; // README: the second featured event opens the showcase.
  const items = links.map(link => {
    const image = link.querySelector('img');
    return { src: image.getAttribute('src'), width: Number(image.getAttribute('width')), height: Number(image.getAttribute('height')) };
  });
  const show = index => details.forEach((detail, i) => { detail.hidden = i !== index; });
  show(start);
  const engine = createEngine(stage, items, {
    start,
    onChange(index, reason) {
      show(index);
      if (reason === 'user') status.textContent = `${index + 1} / ${links.length} · ${details[index].querySelector('h3').textContent}`;
    },
    onSelect(index) {
      details[index].querySelector('.hero-event-link').click();
    }
  });
  if (!engine) return;
  stage.classList.add('is-webgl');
  stage.tabIndex = 0;
}

if (typeof document !== 'undefined') initHero(document.getElementById('spotlight'));
