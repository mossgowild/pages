// Paste into the browser console, then call checkLayout() after layout changes.
function checkLayout() {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const viewport = document.documentElement.clientWidth;
  assert(document.documentElement.scrollWidth <= viewport, 'Page overflows horizontally');
  const wordmark = document.querySelector('.title-wordmark').getBoundingClientRect();
  const byline = document.querySelector('.title-brandline').getBoundingClientRect();
  const updated = document.querySelector('.site-updated').getBoundingClientRect();
  const brand = document.querySelector('.title-lockup').getBoundingClientRect();
  assert(Math.abs((updated.top + updated.bottom) - (brand.top + brand.bottom)) < 2,
    'Header title and update block must be vertically centered');
  assert(document.querySelector('.topbar').getBoundingClientRect().height <= 76, 'Keep the header compact');
  assert(brand.height - updated.height <= 10, 'Keep the title block close to the update block height');
  const updateLabel = document.querySelector('.site-updated > span');
  const updateTime = document.querySelector('.site-updated time');
  assert(updateLabel.textContent === '资讯更新时间' && updateTime.getBoundingClientRect().top >= updateLabel.getBoundingClientRect().bottom,
    'Show the update label above the timestamp');
  assert(Math.abs(updateLabel.getBoundingClientRect().right - updateTime.getBoundingClientRect().right) < 1,
    'Right-align both update lines');
  assert(byline.bottom <= wordmark.top, 'Region and byline must sit above the main title');
  assert(updated.left >= Math.max(wordmark.right, byline.right) && updated.right <= viewport,
    'Header update time overlaps the title or leaves the viewport');
  assert(!document.querySelector('.hero-bottom, .top-links, .top-meta, .date-panel, .date-trigger'),
    'Remove the repeated hero footer, header navigation and date drawer');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  for (const [selector, pseudo, edge] of [['.topbar', '::after', 'borderBottomColor'], ['.schedule', '::before', 'borderTopColor'],
    ['.site-footer', '::before', 'borderTopColor'], ['.day-heading', '::after'], ['.site-updated > span', '::before']]) {
    const host = document.querySelector(selector);
    const line = getComputedStyle(host, pseudo);
    assert(line.height === '1px', `${selector}: divider must be a 1px line`);
    assert(!edge || getComputedStyle(host)[edge] === 'rgba(0, 0, 0, 0)', `${selector}: divider replaces the border`);
    assert(reducedMotion ? !line.backgroundImage.includes('radial-gradient') : line.animationName === 'divider-star',
      `${selector}: divider stars must flow unless motion is reduced`);
  }
  for (const panel of [document.getElementById('filters'), document.getElementById('empty-state')]) {
    if (!panel.getClientRects().length) continue;
    const style = getComputedStyle(panel);
    assert(style.borderTopLeftRadius === '24px' && style.backdropFilter.includes('blur'), `${panel.id}: panel must be frosted glass`);
  }
  for (const pill of document.querySelectorAll('.filter-field select, .filter-field input, .filter-footer button, .reset-empty')) {
    if (pill.getClientRects().length) assert(parseFloat(getComputedStyle(pill).borderTopLeftRadius) >= pill.offsetHeight / 2, `${pill.id || pill.className}: control must be a pill`);
  }
  for (const pill of document.querySelectorAll('.filter-field, .filter-footer button, .reset-empty, .info-actions a, .mini-program summary')) {
    assert(getComputedStyle(pill, '::after').backgroundImage.includes('conic-gradient'), 'Pills must carry the specular rim');
  }
  if (!/Firefox/.test(navigator.userAgent) && !(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))) {
    for (const glass of document.querySelectorAll('.filters, .empty-state, .filter-field select, .filter-field input, .filter-footer button, .reset-empty')) {
      assert(getComputedStyle(glass).backdropFilter.includes('url('), 'Chromium glass must add the refraction filter');
    }
  }
  const emptyTitle = document.querySelector('.empty-state h3');
  assert(getComputedStyle(emptyTitle).animationName === (reducedMotion ? 'none' : 'shiny-text'), 'Empty state title must shine unless motion is reduced');
  const dateNav = document.getElementById('date-nav');
  const from = document.getElementById('from'), to = document.getElementById('to');
  const currentDate = dateNav.querySelector('[aria-current="date"]');
  const exactDate = from.getAttribute('aria-invalid') === 'false' && from.value && from.value === to.value;
  assert((currentDate?.dataset.date || '') === (exactDate ? from.value : ''), 'Date axis selection must match the form');
  assert(document.getElementById('all-dates').getAttribute('aria-pressed') === String(!from.value && !to.value),
    'All dates must only be active without date conditions');
  const items = [...dateNav.querySelectorAll('a, button')];
  const boxes = items.map(item => item.getBoundingClientRect());
  assert(items.length === 9 && boxes.every(box => box.height >= 44 && box.width >= 44),
    'Keep all eight dates, all-dates action and accessible touch targets');
  assert(!dateNav.querySelector('.date-ruler, .date-indicator, .date-tick'), 'The date axis has no ruler or moving indicator');
  for (const [index, item] of items.entries()) {
    const label = item.querySelector('span').getBoundingClientRect();
    const box = boxes[index];
    assert(Math.abs((label.left + label.right - box.left - box.right) / 2) < 1,
      `Date axis label ${index} must align with its node`);
  }
  const gaps = boxes.slice(1).map((box, index) => box.left - boxes[index].right);
  assert(gaps.every(gap => gap > 19.5 && gap < 40.5 && Math.abs(gap - gaps[0]) < 1), 'Date axis gaps must be equal and within 20–40px');
  const axisStyle = getComputedStyle(dateNav);
  const inner = [dateNav.getBoundingClientRect().left + parseFloat(axisStyle.paddingLeft),
    dateNav.getBoundingClientRect().right - parseFloat(axisStyle.paddingRight)];
  if (dateNav.scrollWidth > dateNav.clientWidth) assert(gaps[0] < 20.5, 'An overflowing date axis must keep the 20px gap and scroll');
  else assert(Math.abs((boxes[0].left - inner[0]) - (inner[1] - boxes.at(-1).right)) < 1.5 && (gaps[0] > 39.5 || boxes[0].left - inner[0] < 1.5),
    'A fitting date axis must fill its width or centre at the 40px gap');
  for (const [index, item] of items.slice(0, -1).entries()) {
    const tick = getComputedStyle(item, '::after');
    assert(Math.abs(parseFloat(tick.left) - boxes[index].width - gaps[index] / 2) < 1, `Date axis tick ${index} must sit mid-gap`);
  }
  assert(items.every(item => item.offsetTop === items[0].offsetTop), 'Date axis must stay on one horizontal row');
  assert(getComputedStyle(dateNav).overflowX === 'auto', 'Date axis must scroll horizontally within its own region');
  assert(dateNav.scrollHeight <= dateNav.clientHeight, 'Date axis must not scroll vertically');
  const axis = dateNav.getBoundingClientRect();
  assert(axis.left >= 0 && axis.right <= viewport, 'Date axis leaves the viewport');
  const selectedDates = items.filter(item => item.matches('[aria-current="date"], [aria-pressed="true"]'));
  assert(selectedDates.length <= 1, 'Date axis has conflicting selections');
  assert(selectedDates.every(item => Number(item.style.getPropertyValue('--effect')) > .99), 'The selected date must stay fully active');
  const controls = [...document.querySelectorAll('.filter-field input, .filter-field select')]
    .filter(control => control.getClientRects().length);
  for (const control of controls) {
    const box = control.getBoundingClientRect();
    const field = control.closest('.filter-field').getBoundingClientRect();
    assert(box.left >= field.left - 1 && box.right <= field.right + 1,
      `${control.id}: filter control overflows its field`);
    assert(Math.abs(box.height - controls[0].getBoundingClientRect().height) < 1,
      `${control.id}: inconsistent filter control height`);
  }
  const hero = document.querySelector('.hero-stage');
  if (hero) {
    const box = hero.getBoundingClientRect();
    assert(Math.abs(box.left) < 1 && Math.abs(box.right - viewport) < 1, 'Poster stage must extend to both viewport edges');
    assert(hero.classList.contains('is-webgl') ? !!hero.querySelector('.hero-canvas') && hero.tabIndex === 0
      : hero.querySelectorAll('.hero-poster').length > 0, 'Show the WebGL reel or the poster list');
    assert(!document.querySelector('.hero-controls, .hero-arrow'), 'The reel has no arrow or page-number controls');
    assert(getComputedStyle(hero).overscrollBehaviorY === 'auto', 'Vertical scrolling over the reel must reach the page');
    const detail = document.querySelector('.hero-detail:not([hidden])');
    const date = detail.querySelector('.hero-event-meta').getBoundingClientRect();
    const booking = detail.querySelector('.hero-event-link').getBoundingClientRect();
    assert(Math.abs((date.top + date.bottom) / 2 - (booking.top + booking.bottom) / 2) < 1,
      'Featured date and booking link must share a row');
    assert(date.right <= booking.left && booking.right <= viewport, 'Featured metadata overlaps or overflows');
  }
  const grids = [...document.querySelectorAll('.event-grid')].filter(grid => grid.getClientRects().length);
  let visible = 0;
  const posterHeight = [...document.querySelectorAll('.event-posters')]
    .find(area => area.getClientRects().length)?.getBoundingClientRect().height;
  for (const grid of grids) {
    const cards = [...grid.querySelectorAll('.event-card')].filter(card => !card.hidden);
    const boxes = cards.map(card => card.getBoundingClientRect());
    const gap = Number(getComputedStyle(grid).columnGap.replace('px', ''));
    const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    assert(columns === (viewport <= 700 ? 1 : viewport <= 1100 ? 2 : 3), 'Wrong responsive column count');
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i], box = boxes[i];
      assert(box.width > 0 && box.height > 0, `${card.id}: empty card`);
      assert(box.left >= 0 && box.right <= viewport, `${card.id}: card outside viewport`);
      assert(card.scrollWidth <= card.clientWidth, `${card.id}: overflowing content`);
      assert(card.querySelectorAll('[data-field]').length === 6, `${card.id}: missing information`);
      assert(Math.abs(card.querySelector('.event-posters').getBoundingClientRect().height - posterHeight) < 1,
        `${card.id}: inconsistent poster area height`);
      const poster = card.querySelector('.event-posters').getBoundingClientRect();
      const heading = card.querySelector('.event-heading').getBoundingClientRect();
      assert(heading.top > poster.top && heading.top < poster.bottom,
        `${card.id}: heading must overlap the poster transition`);
      const cardStyle = getComputedStyle(card);
      assert(cardStyle.borderTopLeftRadius === '24px' && cardStyle.backdropFilter.includes('blur'), `${card.id}: card must be frosted glass`);
      assert(getComputedStyle(card.querySelector('.event-posters')).maskImage.includes('linear-gradient'),
        `${card.id}: the poster must fade out by transparency`);
      for (const link of card.querySelectorAll('.info-actions a, .mini-program summary, .ticket-prices li')) {
        assert(parseFloat(getComputedStyle(link).borderTopLeftRadius) >= link.offsetHeight / 2, `${card.id}: info links, ticket prices and mini-program toggle must be pills`);
      }
      for (const thumbnail of card.querySelectorAll('.poster-thumbnails a')) {
        assert(thumbnail.getBoundingClientRect().bottom <= heading.top,
          `${card.id}: supplementary poster overlaps heading`);
      }
      if (i) assert(box.top >= boxes[i - 1].top, `${card.id}: visual date/time order changed`);
      for (let j = 0; j < i; j++) {
        const previous = boxes[j];
        assert(box.right <= previous.left || box.left >= previous.right || box.top >= previous.bottom,
          `${card.id}: overlapping ${cards[j].id}`);
      }
      const previous = boxes.slice(0, i).findLast(other => Math.abs(other.left - box.left) < 1);
      if (previous) assert(Math.abs(box.top - previous.bottom - gap) < 2, `${card.id}: masonry gap`);
      for (const image of card.querySelectorAll('.event-posters img')) {
        assert(getComputedStyle(image).maskImage === 'none', `${card.id}: fade the fixed poster frame, not the parallax image`);
        const size = image.getBoundingClientRect();
        const frame = image.parentElement.getBoundingClientRect();
        // Parallax may enlarge the cover up to 10%; it must still cover the whole frame.
        assert(getComputedStyle(image).objectFit === 'cover' && size.left <= frame.left + 2 && size.right >= frame.right - 2
          && size.top <= frame.top + 2 && size.bottom >= frame.bottom - 2 && size.width <= frame.width * 1.1 + 2,
          `${card.id}: poster must cover its frame without stretching`);
        if (image.complete) assert(image.naturalWidth > 0, `${card.id}: broken poster`);
      }
    }
    visible += cards.length;
  }
  return { viewport, visibleCards: visible, dateGroups: grids.length, result: 'No overflow, overlap, gaps or missing fields' };
}
