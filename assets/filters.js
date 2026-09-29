'use strict';

function validRange(filters) {
  return !filters.from || !filters.to || filters.from <= filters.to;
}

function matchesEvent(event, filters) {
  if (!validRange(filters)) return false;
  if (filters.city && event.city !== filters.city) return false;
  if (filters.venue && !event.venues.some(venue => `${event.city}|${venue}` === filters.venue)) return false;
  if (filters.from && event.date < filters.from) return false;
  if (filters.to && event.date > filters.to) return false;
  if (filters.genre) {
    const [type, genre] = filters.genre.split(':');
    if (!(type === 'family' ? event.families : event.genres).includes(genre)) return false;
  }
  if (filters.period === 'unknown' && !event.unknown) return false;
  if (filters.period === 'day' && !event.starts.some(time => time < 1080)) return false;
  if (filters.period === 'night' && !event.starts.some(time => time >= 1080)) return false;
  return true;
}

if (typeof document !== 'undefined') {
  const form = document.getElementById('filters');
  const fields = Object.fromEntries(['city', 'venue', 'from', 'to', 'genre', 'period']
    .map(name => [name, form.elements.namedItem(name)]));
  const events = [...document.querySelectorAll('.event-card[data-date]')].map(card => ({
    card, date: card.dataset.date, city: card.dataset.city,
    venues: JSON.parse(card.dataset.venues), genres: JSON.parse(card.dataset.genres),
    families: JSON.parse(card.dataset.families),
    starts: JSON.parse(card.dataset.starts), unknown: card.dataset.unknown === 'true'
  }));
  const groups = [...document.querySelectorAll('.day-group')];
  const grids = [...document.querySelectorAll('.event-grid')];

  function sizeCards(cards) {
    const sizes = cards.filter(card => card.getClientRects().length).map(card => [card,
      Math.ceil(card.getBoundingClientRect().height + parseFloat(getComputedStyle(card.parentElement).columnGap))
    ]);
    for (const [card, span] of sizes) card.style.gridRowEnd = `span ${span}`;
  }

  const resizeObserver = new ResizeObserver(entries => sizeCards(entries.map(entry => entry.target)));
  for (const { card } of events) resizeObserver.observe(card);
  for (const grid of grids) grid.classList.add('masonry');
  const dateLinks = [...document.querySelectorAll('#date-nav a')];
  const allDates = document.getElementById('all-dates');
  const dateNav = document.getElementById('date-nav');
  const dateIndicator = dateNav.querySelector('.date-indicator');
  const dateRuler = dateNav.querySelector('.date-ruler');
  const dateItems = [allDates, ...dateLinks];
  const tickCount = 108;
  const rulerTicks = Array.from({ length: tickCount + 1 }, (_, index) => {
    const tick = document.createElement('span');
    tick.className = 'date-tick';
    tick.style.left = `${index / tickCount * 100}%`;
    return tick;
  });
  dateRuler.replaceChildren(...rulerTicks);
  dateRuler.classList.add('has-ticks');
  const error = document.getElementById('filter-error');
  const empty = document.getElementById('empty-state');
  const count = document.getElementById('result-count');

  let waveFrame;
  let targetCenter;
  function trackRulerWave() {
    const rulerBox = dateRuler.getBoundingClientRect();
    const center = dateIndicator.getBoundingClientRect().left - rulerBox.left + dateIndicator.offsetWidth / 2;
    const visible = dateNav.classList.contains('has-indicator');
    for (const [index, tick] of rulerTicks.entries()) {
      const distance = (index * rulerBox.width / tickCount - center) / 16;
      const strength = visible ? Math.exp(-.5 * distance ** 2) : 0;
      tick.style.transform = `translateX(-50%) scaleY(${(3 + 12 * strength) / 15})`;
      tick.style.opacity = .18 + .76 * strength;
    }
    if (visible && Math.abs(center - targetCenter) > .1) waveFrame = requestAnimationFrame(trackRulerWave);
  }

  function centerSelectedDate() {
    const selected = dateNav.querySelector('[aria-current="date"], [aria-pressed="true"]');
    dateNav.classList.toggle('has-indicator', !!selected);
    if (selected) {
      targetCenter = selected.offsetLeft + selected.offsetWidth / 2;
      dateIndicator.style.transform = `translateX(${targetCenter - dateIndicator.offsetWidth / 2}px)`;
      dateNav.scrollLeft = targetCenter - dateNav.clientWidth / 2;
    }
    cancelAnimationFrame(waveFrame);
    waveFrame = requestAnimationFrame(trackRulerWave);
  }

  window.addEventListener('resize', centerSelectedDate);

  let dragStart;
  let suppressClick = false;
  dateNav.addEventListener('dragstart', event => event.preventDefault());
  dateNav.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button === 0) {
      dragStart = { id: event.pointerId, x: event.clientX, left: dateNav.scrollLeft };
    }
  });
  dateNav.addEventListener('pointermove', event => {
    if (!dragStart || event.pointerId !== dragStart.id) return;
    const delta = event.clientX - dragStart.x;
    if (Math.abs(delta) < 6 && !dateNav.classList.contains('is-dragging')) return;
    if (!dateNav.classList.contains('is-dragging')) {
      dateNav.classList.add('is-dragging');
      dateNav.setPointerCapture(event.pointerId);
    }
    dateNav.scrollLeft = dragStart.left - delta;
  });
  dateNav.addEventListener('pointerup', () => {
    if (dateNav.classList.contains('is-dragging')) {
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 0);
    }
    dateNav.classList.remove('is-dragging');
    dragStart = undefined;
  });
  dateNav.addEventListener('pointercancel', () => {
    dateNav.classList.remove('is-dragging');
    dragStart = undefined;
  });
  dateNav.addEventListener('pointerleave', () => {
    if (!dateNav.classList.contains('is-dragging')) dragStart = undefined;
  });
  dateNav.addEventListener('click', event => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    suppressClick = false;
  }, true);

  dateNav.addEventListener('keydown', event => {
    const index = dateItems.indexOf(event.target);
    if (index < 0 || !['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? dateItems.length - 1
      : (index + (event.key === 'ArrowRight' ? 1 : -1) + dateItems.length) % dateItems.length;
    dateItems[next].focus({ preventScroll: true });
    dateItems[next].scrollIntoView({ block: 'nearest', inline: 'nearest' });
  });

  function updateVenues() {
    const selected = fields.venue.value;
    fields.venue.replaceChildren(new Option('全部场地', ''));
    const cities = [...new Set(events.map(event => event.city))];
    for (const city of cities) {
      if (fields.city.value && fields.city.value !== city) continue;
      const group = document.createElement('optgroup');
      group.label = city;
      const venues = [...new Set(events.filter(event => event.city === city).flatMap(event => event.venues))];
      venues.sort((a, b) => a.localeCompare(b, 'zh-CN'));
      for (const venue of venues) {
        const label = venue === '场地尚不明确' ? '其它场地' : venue;
        group.append(new Option(label, `${city}|${venue}`));
      }
      fields.venue.append(group);
    }
    if ([...fields.venue.options].some(option => option.value === selected)) fields.venue.value = selected;
  }

  function apply() {
    const filters = Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.value]));
    const valid = validRange(filters) && fields.from.validity.valid && fields.to.validity.valid;
    error.hidden = valid;
    error.textContent = validRange(filters)
      ? '日期需在 2026 年 9 月 30 日至 10 月 7 日之间。' : '结束日期需晚于或等于开始日期。';
    for (const field of [fields.from, fields.to]) field.setAttribute('aria-invalid', String(!valid));
    const active = Object.values(filters).some(Boolean);
    let total = 0;
    for (const event of events) {
      event.card.hidden = valid && !matchesEvent(event, filters);
      if (!event.card.hidden) total++;
    }
    for (const group of groups) {
      const visible = events.filter(event => event.date === group.dataset.date && !event.card.hidden).length;
      group.querySelector('.day-count').textContent = visible;
      group.hidden = valid && active && visible === 0;
    }
    for (const link of dateLinks) {
      const selected = valid && filters.from === link.dataset.date && filters.to === link.dataset.date;
      if (selected) link.setAttribute('aria-current', 'date');
      else link.removeAttribute('aria-current');
    }
    allDates.setAttribute('aria-pressed', String(!filters.from && !filters.to));
    centerSelectedDate();
    empty.hidden = !valid || total > 0;
    count.textContent = !valid ? '日期条件无效，暂显示全部活动'
      : active ? `找到 ${total} / ${events.length} 场活动` : `全部 ${events.length} 场活动`;
    sizeCards(events.map(event => event.card));
  }

  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('change', event => {
    if (event.target === fields.city) updateVenues();
    apply();
  });
  form.addEventListener('reset', event => {
    event.preventDefault();
    Object.values(fields).forEach(field => { field.value = ''; });
    updateVenues();
    apply();
  });
  document.getElementById('reset-empty').addEventListener('click', () => {
    form.reset();
    fields.city.focus();
  });
  allDates.addEventListener('click', () => {
    fields.from.value = fields.to.value = '';
    apply();
    if (location.hash !== '#schedule') history.replaceState(null, '', '#schedule');
  });
  for (const link of dateLinks) link.addEventListener('click', event => {
    event.preventDefault();
    fields.from.value = fields.to.value = link.dataset.date;
    apply();
    if (location.hash !== link.hash) history.replaceState(null, '', link.hash);
  });
  function revealTarget() {
    const linkedDate = dateLinks.find(link => link.hash === location.hash)?.dataset.date;
    if (linkedDate && (fields.from.value !== linkedDate || fields.to.value !== linkedDate)) {
      fields.from.value = fields.to.value = linkedDate;
      apply();
    }
    const target = document.getElementById(location.hash.slice(1));
    if (target && (target.hidden || target.closest('.day-group')?.hidden)) {
      form.reset();
      target.scrollIntoView();
    }
  }
  for (const link of document.querySelectorAll('.spotlight-card')) link.addEventListener('click', () => {
    const target = document.querySelector(link.hash);
    if (target.hidden || target.closest('.day-group').hidden) form.reset();
  });
  window.addEventListener('hashchange', revealTarget);
  updateVenues();
  allDates.hidden = false;
  apply();
  form.hidden = false;
  requestAnimationFrame(() => dateNav.classList.add('is-ready'));
  revealTarget();
}
