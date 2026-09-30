'use strict';

(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  // React Bits Specular Button, CSS edition: each pill gets --spec-angle (conic "from" angle of the light) and --spec
  // (brightness). Defaults: light steers toward the mouse, settles near the diagonal while over the pill,
  // fades in within 250px (smoothstep), angle eased at rate 7 and brightness at rate 8 per second.
  const PROXIMITY = 250;
  const pills = [...document.querySelectorAll('.filter-field, .filter-footer button, .reset-empty, .info-actions a, .mini-program summary')];
  const visible = new Set();
  const state = new Map(pills.map(pill => [pill, { angle: 2.4, bright: 0, target: 2.4, near: 0 }]));
  let pointer = null;
  let frame = 0;
  let last = 0;

  const smoothstep = t => t * t * (3 - 2 * t);
  // The pill whose edge carries the light: form fields light their control, not the label above it.
  const edgeOf = pill => pill.classList.contains('filter-field') ? pill.querySelector('select, input') : pill;

  function aim() {
    for (const pill of visible) {
      const box = edgeOf(pill).getBoundingClientRect();
      const s = state.get(pill);
      const cx = box.left + box.width / 2, cy = box.top + box.height / 2;
      const dx = Math.max(box.left - pointer.x, 0, pointer.x - box.right);
      const dy = Math.max(box.top - pointer.y, 0, pointer.y - box.bottom);
      const dist = Math.hypot(dx, dy);
      s.target = dist === 0
        ? Math.atan2(2 / box.height, -2 / box.width) + (pointer.x - cx) / (box.width / 2) * 0.3 + (cy - pointer.y) / (box.height / 2) * 0.15
        : Math.atan2(cy - pointer.y, pointer.x - cx);
      s.near = smoothstep(Math.max(0, 1 - dist / PROXIMITY));
    }
  }

  function tick(now) {
    // A frame's timestamp can precede the performance.now() taken when the loop was requested.
    const dt = Math.min(Math.max(0, (now - last) / 1000), 0.05);
    last = now;
    let moving = false;
    for (const pill of visible) {
      const s = state.get(pill);
      const diff = ((s.target - s.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      s.angle += diff * (1 - Math.exp(-dt * 7));
      s.bright += (s.near - s.bright) * (1 - Math.exp(-dt * 8));
      if (Math.abs(diff) > 0.002 || Math.abs(s.near - s.bright) > 0.002) moving = true;
      // Math angle (counter-clockwise from +x) to a CSS conic angle (clockwise from the top).
      pill.style.setProperty('--spec-angle', `${(90 - s.angle * 180 / Math.PI).toFixed(1)}deg`);
      pill.style.setProperty('--spec', s.bright.toFixed(3));
    }
    frame = moving ? requestAnimationFrame(tick) : 0;
  }

  function request() {
    if (frame || reducedMotion.matches) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  }

  const seen = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    }
  });
  pills.forEach(pill => seen.observe(pill));
  addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reducedMotion.matches) return;
    pointer = { x: event.clientX, y: event.clientY };
    aim();
    request();
  }, { passive: true });
  addEventListener('scroll', () => {
    if (!pointer || reducedMotion.matches) return;
    aim();
    request();
  }, { passive: true });
  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return;
    for (const pill of pills) pill.style.setProperty('--spec', '0');
  });

  // React Bits Glass Surface refraction (Chromium only, like the original): a per-element SVG displacement map,
  // sized to the element, splits R/G/B at scales -180/-170/-160 and is chained onto the frosted backdrop.
  const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  if (isWebkit || /Firefox/.test(navigator.userAgent) || !CSS.supports('backdrop-filter', 'url(#glass)')) return;
  const svgNS = 'http://www.w3.org/2000/svg';
  const defs = document.createElementNS(svgNS, 'svg');
  defs.setAttribute('aria-hidden', 'true');
  defs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  document.body.append(defs);

  function displacementMap(width, height, radius) {
    const edge = Math.min(width, height) * 0.035;
    return `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 ${width} ${height}" xmlns="${svgNS}">`
      + '<defs><linearGradient id="r" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient>'
      + '<linearGradient id="b" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs>'
      + `<rect width="${width}" height="${height}" fill="black"/>`
      + `<rect width="${width}" height="${height}" rx="${radius}" fill="url(#r)"/>`
      + `<rect width="${width}" height="${height}" rx="${radius}" fill="url(#b)" style="mix-blend-mode:difference"/>`
      + `<rect x="${edge}" y="${edge}" width="${width - edge * 2}" height="${height - edge * 2}" rx="${radius}" fill="hsl(0 0% 50% / .93)" style="filter:blur(11px)"/></svg>`)}`;
  }

  const channel = (scale, matrix, name) => `<feDisplacementMap in="SourceGraphic" in2="map" scale="${scale}" xChannelSelector="R" yChannelSelector="G" result="d${name}"/>`
    + `<feColorMatrix in="d${name}" type="matrix" values="${matrix}" result="${name}"/>`;
  const refracted = [
    ...document.querySelectorAll('.filters, .empty-state'),
    ...document.querySelectorAll('.filter-field select, .filter-field input, .filter-footer button, .reset-empty'),
  ];
  const images = new Map();
  refracted.forEach((element, index) => {
    const id = `glass-refraction-${index}`;
    const filter = document.createElementNS(svgNS, 'filter');
    filter.id = id;
    filter.setAttribute('color-interpolation-filters', 'sRGB');
    filter.setAttribute('x', '0%');
    filter.setAttribute('y', '0%');
    filter.setAttribute('width', '100%');
    filter.setAttribute('height', '100%');
    filter.innerHTML = '<feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map"/>'
      + channel(-180, '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0', 'red')
      + channel(-170, '0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0', 'green')
      + channel(-160, '0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0', 'blue')
      + '<feBlend in="red" in2="green" mode="screen" result="rg"/><feBlend in="rg" in2="blue" mode="screen"/>';
    defs.append(filter);
    images.set(element, filter.querySelector('feImage'));
    // Panels keep their frost underneath; pills follow the original's clear refraction.
    const frost = element.matches('.filters, .empty-state') ? 'blur(18px) ' : '';
    element.style.backdropFilter = `${frost}url(#${id}) saturate(1.5)`;
  });
  const resized = new ResizeObserver(entries => {
    for (const { target } of entries) {
      const box = target.getBoundingClientRect();
      if (!box.width || !box.height) continue;
      const radius = Math.min(parseFloat(getComputedStyle(target).borderTopLeftRadius), box.height / 2);
      images.get(target).setAttribute('href', displacementMap(box.width, box.height, radius));
    }
  });
  refracted.forEach(element => resized.observe(element));
})();
