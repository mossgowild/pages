'use strict';

// React Bits Accordion Gallery, vertical orientation, as the day lists: the first visible row of each day stays open with
// its full poster stage, the rest collapsed with a greyed, dimmed poster. Rows no longer switch: any row opens its event's
// details (assets/event-detail.js, docs/event-browsing.md Q20–Q25). Collapsed rows keep the original's parallax 0.5
// drift but lie flat (docs/glass-effects.md). A row's poster shows its light version first and takes the original once
// the row nears the screen (Q34). Without the script every row stays open with its details shown.
(() => {
  const root = document.documentElement;
  const PARALLAX = 0.5;
  const days = [...document.querySelectorAll('.event-accordion')].map(list => ({ list, rows: [...list.querySelectorAll('.event-row')] }));
  const visibleRows = day => day.rows.filter(row => !row.hidden);

  // The open row is the day's first visible one (filtering can hide it); the rows after it drift as in the original.
  function arrange(day) {
    const rows = visibleRows(day);
    for (const row of day.rows) row.classList.toggle('is-active', row === rows[0]);
    rows.forEach((row, index) => {
      row.style.setProperty('--drift', index ? `${(Math.max(-1.5, -index) * PARALLAX * row.offsetHeight * 0.06).toFixed(1)}px` : '0px');
    });
  }

  for (const day of days) {
    // The row is the target: its poster is not a link of its own here (the detail sheet's poster opens the full image).
    for (const row of day.rows) row.querySelector('.event-posters').inert = true;
    day.list.addEventListener('keydown', event => {
      if (!event.target.classList.contains('event-toggle')) return;
      const toggles = visibleRows(day).map(row => row.querySelector('.event-toggle'));
      const index = toggles.indexOf(event.target);
      const target = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: toggles.length - 1 }[event.key];
      if (target === undefined) return;
      event.preventDefault();
      toggles[Math.max(0, Math.min(toggles.length - 1, target))].focus();
    });
    new MutationObserver(() => arrange(day)).observe(day.list, { subtree: true, attributes: true, attributeFilter: ['hidden'] });
  }
  // The light version stays on screen until the original has downloaded.
  const sharpen = new IntersectionObserver(entries => {
    for (const { isIntersecting, target } of entries) {
      if (!isIntersecting) continue;
      sharpen.unobserve(target);
      target.srcset = target.dataset.full;
    }
  }, { rootMargin: '50% 0px' });
  // Only after the page has loaded, so the originals do not take bandwidth from the hero wall's first posters.
  const watch = () => {
    for (const day of days) for (const row of day.rows) {
      const poster = row.querySelector('.event-posters img[data-full]');
      if (poster) sharpen.observe(poster);
    }
  };
  if (document.readyState === 'complete') watch();
  else addEventListener('load', watch, { once: true });
  root.classList.add('accordion-ready');
  days.forEach(arrange);
  addEventListener('resize', () => days.forEach(arrange));
})();
