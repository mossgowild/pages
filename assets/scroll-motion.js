'use strict';

(() => {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const frames = [...document.querySelectorAll('.event-posters')].filter(frame => frame.querySelector(':scope > a > img'));
  const headings = [...document.querySelectorAll('.day-heading')];
  const PARALLAX = 20;
  // Layered depth: day headings move at 0.9× the scroll (the topography behind runs at 0.15×, see scripts/topography.mjs).
  // A heading's drift stays within the gaps around it (26px up, 10px down) so it never meets the rows.
  const HEADING = 0.1, HEADING_UP = 26, HEADING_DOWN = 10;

  // Parallax: the cover, enlarged 1.25×, drifts from -20% of its frame (entering at the bottom) to 0 (leaving at the top);
  // CSS clamps it, with the accordion drift, to the 25% overhang so the cover always fills the frame.
  let frame = 0;
  function parallax() {
    frame = 0;
    for (const posters of frames) {
      const box = posters.getBoundingClientRect();
      if (box.bottom < 0 || box.top > innerHeight) continue;
      const progress = Math.min(1, Math.max(0, (innerHeight - box.top) / (innerHeight + box.height)));
      posters.style.setProperty('--parallax', `${(-PARALLAX * (1 - progress)).toFixed(2)}%`);
    }
    for (const heading of headings) {
      const box = heading.parentElement.getBoundingClientRect();
      if (box.bottom < 0 || box.top > innerHeight) continue;
      const drift = HEADING * (innerHeight / 2 - box.top);
      heading.style.setProperty('--heading-y', `${Math.min(HEADING_DOWN, Math.max(-HEADING_UP, drift)).toFixed(1)}px`);
    }
  }
  const requestParallax = () => { frame ||= requestAnimationFrame(parallax); };

  function applyMotion() {
    const enabled = !reducedMotion.matches;
    root.classList.toggle('scroll-motion', enabled);
    if (enabled) requestParallax();
  }

  applyMotion();
  reducedMotion.addEventListener('change', applyMotion);
  addEventListener('scroll', () => { if (!reducedMotion.matches) requestParallax(); }, { passive: true });
  addEventListener('resize', () => { if (!reducedMotion.matches) requestParallax(); });
})();
