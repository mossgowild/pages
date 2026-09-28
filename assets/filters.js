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
    if (!event.genres.some(value => type === 'family'
      ? value.toLowerCase().includes(genre.toLowerCase()) : value === genre)) return false;
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
  const error = document.getElementById('filter-error');
  const empty = document.getElementById('empty-state');
  const count = document.getElementById('result-count');

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
      for (const venue of venues) group.append(new Option(venue, `${city}|${venue}`));
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
  });
  for (const link of dateLinks) link.addEventListener('click', event => {
    fields.from.value = fields.to.value = link.dataset.date;
    apply();
    if (document.querySelector(link.hash).closest('.day-group').hidden) {
      event.preventDefault();
      empty.scrollIntoView({ block: 'center' });
    }
  });
  function revealTarget() {
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
  apply();
  form.hidden = false;
  allDates.hidden = false;
  revealTarget();
}
