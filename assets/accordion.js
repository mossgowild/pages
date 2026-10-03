'use strict';

// React Bits Accordion Gallery, vertical orientation, as the day lists: one open row per day (the first by default),
// the rest collapsed with a greyed, dimmed poster. Rows switch on click, tap or keyboard (no hover switching), over the
// original 0.6s power3.out: the open row grows, posters drift by parallax 0.5, collapsed rows tilt 8° on wide screens,
// and the open row's labels fade in 0.06s apart. Without the script every row stays open with its details shown.
(() => {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const tiltable = matchMedia('(min-width: 521px)');
  const EASE = 'cubic-bezier(.215,.61,.355,1)';
  const DURATION = 600;
  const TILT = 8;
  const PARALLAX = 0.5;
  const days = [...document.querySelectorAll('.event-accordion')].map(list => ({ list, rows: [...list.querySelectorAll('.event-row')] }));
  const dayOf = row => days.find(day => day.rows.includes(row));
  const visibleRows = day => day.rows.filter(row => !row.hidden);

  // Details: one disclosure line opens the lineup table, tickets and venue together. Height and vertical padding ease
  // together over 0.4s (padding alone would hold a border-box at 0 height) and the sections fade in. Collapsed by default.
  const BOX = ['height', 'paddingTop', 'paddingBottom'];
  const box = element => { const style = getComputedStyle(element); return Object.fromEntries(BOX.map(key => [key, style[key]])); };
  const closedBox = Object.fromEntries(BOX.map(key => [key, '0px']));
  function setDetails(row, open, { animate = false } = {}) {
    const button = row.querySelector('.event-more');
    const details = row.querySelector('.event-details');
    if (button.getAttribute('aria-expanded') === String(open) && details.hidden === !open) return;
    const from = details.hidden ? closedBox : box(details);
    details.getAnimations().forEach(animation => animation.cancel());
    button.setAttribute('aria-expanded', String(open));
    details.hidden = false;
    const to = open ? box(details) : closedBox;
    details.hidden = !open;
    if (!animate || reducedMotion.matches) return;
    details.hidden = false;
    details.animate([from, to], { duration: 400, easing: EASE })
      .finished.then(() => { details.hidden = button.getAttribute('aria-expanded') !== 'true'; }).catch(() => {});
    if (open) {
      [...details.children].forEach((section, index) => section.animate([{ opacity: 0, translate: '0 8px' }, { opacity: 1, translate: '0 0' }],
        { duration: 400, easing: EASE, delay: 80 + index * 60, fill: 'backwards' }));
    }
  }

  // Tilt, drift and grey follow the original layout: rows before the open one lean one way, rows after it the other.
  function arrange(day) {
    const rows = visibleRows(day);
    const active = rows.findIndex(row => row.classList.contains('is-active'));
    rows.forEach((row, index) => {
      const open = index === active;
      const drift = Math.max(-1.5, Math.min(1.5, active - index));
      row.style.setProperty('--tilt', open || !tiltable.matches ? '0deg' : `${index < active ? -TILT : TILT}deg`);
      row.style.setProperty('--drift', open ? '0px' : `${(drift * PARALLAX * row.offsetHeight * 0.06).toFixed(1)}px`);
    });
  }

  function select(row, { animate = true, details = false } = {}) {
    const day = dayOf(row);
    const previous = day.rows.find(other => other.classList.contains('is-active'));
    if (previous === row) {
      if (details) setDetails(row, true);
      return;
    }
    const stages = [previous, row].filter(Boolean).map(item => [item, item.querySelector('.event-stage')]);
    const before = stages.map(([, stage]) => stage.getBoundingClientRect().height);
    for (const item of day.rows) {
      const open = item === row;
      item.classList.toggle('is-active', open);
      item.querySelector('.event-toggle').setAttribute('aria-expanded', String(open));
      item.querySelector('.event-posters').inert = !open;
      if (!open) setDetails(item, false);
    }
    setDetails(row, details);
    arrange(day);
    if (!animate || reducedMotion.matches) return;
    stages.forEach(([, stage], index) => {
      const after = stage.getBoundingClientRect().height;
      stage.animate([{ height: `${before[index]}px` }, { height: `${after}px` }], { duration: DURATION, easing: EASE });
    });
    const labels = [...row.querySelectorAll('.event-summary > *')];
    labels.forEach((label, index) => label.animate([{ opacity: 0, translate: '-14px 0' }, { opacity: 1, translate: '0 0' }],
      { duration: DURATION, easing: EASE, delay: index * 60, fill: 'backwards' }));
  }

  // Filtering can hide the open row: the first visible row of that day takes over without animation.
  function ensureActive() {
    for (const day of days) {
      const rows = visibleRows(day);
      if (rows.length && !rows.some(row => row.classList.contains('is-active'))) select(rows[0], { animate: false });
      else arrange(day);
    }
  }

  for (const day of days) {
    for (const row of day.rows) {
      row.classList.remove('is-active');
      row.querySelector('.event-toggle').setAttribute('aria-expanded', 'false');
      row.querySelector('.event-posters').inert = true;
      setDetails(row, false);
      row.querySelector('.event-toggle').addEventListener('click', () => select(row));
      // The whole collapsed row is a target: clicks anywhere on it open it.
      row.querySelector('.event-stage').addEventListener('click', event => {
        if (!row.classList.contains('is-active') && !event.target.closest('button, a')) select(row);
      });
      const more = row.querySelector('.event-more');
      more.addEventListener('click', () => setDetails(row, more.getAttribute('aria-expanded') !== 'true', { animate: true }));
    }
    day.list.addEventListener('keydown', event => {
      if (!event.target.classList.contains('event-toggle')) return;
      const toggles = visibleRows(day).map(row => row.querySelector('.event-toggle'));
      const index = toggles.indexOf(event.target);
      const target = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: toggles.length - 1 }[event.key];
      if (target === undefined) return;
      event.preventDefault();
      toggles[Math.max(0, Math.min(toggles.length - 1, target))].focus();
    });
    new MutationObserver(ensureActive).observe(day.list, { subtree: true, attributes: true, attributeFilter: ['hidden'] });
  }
  root.classList.add('accordion-ready');
  ensureActive();
  tiltable.addEventListener('change', () => days.forEach(arrange));
  addEventListener('resize', () => days.forEach(arrange));

  // The hero reel and event anchors open the target row with its details.
  function revealHash() {
    const row = document.getElementById(location.hash.slice(1));
    if (!row?.classList.contains('event-row') || row.hidden) return;
    select(row, { animate: false, details: true });
    row.scrollIntoView({ block: 'start' });
  }
  addEventListener('hashchange', revealHash);
  revealHash();
})();
