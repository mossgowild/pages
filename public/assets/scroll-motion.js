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

  // Only what is near the screen is measured: an observer keeps the poster frames and day groups within a screen of the
  // viewport, and each frame measures all of them before writing any, so the writes cost one style recalculation rather
  // than one per element (docs/motion-performance.md F3). Until the observer first reports, everything counts as near, so
  // the first frame places every cover as before.
  const near = new Set([...frames, ...headings.map(heading => heading.parentElement)]);
  const nearby = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) near.add(target);
      else near.delete(target);
    }
    if (!reducedMotion.matches) requestParallax();
  }, { rootMargin: '100% 0px' });
  frames.forEach(cover => nearby.observe(cover));
  headings.forEach(heading => nearby.observe(heading.parentElement));

  // Parallax: the cover, enlarged 1.25×, drifts from -20% of its frame (entering at the bottom) to 0 (leaving at the top);
  // CSS clamps it, with the accordion drift, to the 25% overhang so the cover always fills the frame.
  let frame = 0;
  function parallax() {
    frame = 0;
    // Every read first, the window's height included: reading it after a write would recalculate the styles again.
    const view = innerHeight;
    const covers = frames.filter(cover => near.has(cover)).map(cover => [cover, cover.getBoundingClientRect()]);
    const days = headings.filter(heading => near.has(heading.parentElement))
      .map(heading => [heading, heading.parentElement.getBoundingClientRect()]);
    for (const [cover, box] of covers) {
      if (box.bottom < 0 || box.top > view) continue;
      const progress = Math.min(1, Math.max(0, (view - box.top) / (view + box.height)));
      cover.style.setProperty('--parallax', `${(-PARALLAX * (1 - progress)).toFixed(2)}%`);
    }
    for (const [heading, box] of days) {
      if (box.bottom < 0 || box.top > view) continue;
      const drift = HEADING * (view / 2 - box.top);
      heading.style.setProperty('--heading-y', `${Math.min(HEADING_DOWN, Math.max(-HEADING_UP, drift)).toFixed(1)}px`);
    }
  }
  const requestParallax = () => { frame ||= requestAnimationFrame(parallax); };

  // The divider stars (assets/site.css) animate a custom property, which only the main thread can run: they flow while
  // their divider is on the screen and pause elsewhere.
  const dividers = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) target.classList.toggle('is-offscreen', !isIntersecting);
  });
  document.querySelectorAll('.topbar, .day-heading, .site-footer').forEach(divider => dividers.observe(divider));

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
