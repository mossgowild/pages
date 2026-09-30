'use strict';

(() => {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const frames = [...document.querySelectorAll('.event-posters')].filter(frame => frame.querySelector(':scope > a > img'));
  const PARALLAX = 48;

  // Parallax: the enlarged cover drifts from -48px (entering at the bottom) to 0 (leaving at the top).
  let frame = 0;
  function parallax() {
    frame = 0;
    for (const posters of frames) {
      const box = posters.getBoundingClientRect();
      if (box.bottom < 0 || box.top > innerHeight) continue;
      const progress = Math.min(1, Math.max(0, (innerHeight - box.top) / (innerHeight + box.height)));
      posters.style.setProperty('--parallax', `${(-PARALLAX * (1 - progress)).toFixed(1)}px`);
    }
  }
  const requestParallax = () => { frame ||= requestAnimationFrame(parallax); };

  function applyMotion() {
    const enabled = !reducedMotion.matches;
    root.classList.toggle('card-motion', enabled);
    if (enabled) requestParallax();
  }

  applyMotion();
  reducedMotion.addEventListener('change', applyMotion);
  addEventListener('scroll', () => { if (!reducedMotion.matches) requestParallax(); }, { passive: true });
  addEventListener('resize', () => { if (!reducedMotion.matches) requestParallax(); });

  // Hover glow follows the mouse; CSS limits it to fine pointers.
  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    const card = event.target.closest?.('.event-card');
    if (!card) return;
    const box = card.getBoundingClientRect();
    card.style.setProperty('--glow-x', `${event.clientX - box.left}px`);
    card.style.setProperty('--glow-y', `${event.clientY - box.top}px`);
  }, { passive: true });
})();
