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
  const nav = document.getElementById('filters');
  const dock = document.querySelector('.filter-dock');
  const bar = dock.querySelector('.filter-bar');
  assert(getComputedStyle(dock).position === 'sticky' && nav.parentElement === dock && getComputedStyle(nav).position === 'absolute',
    'Only the filter bar sticks; the filter cards are an overlay below it');
  assert(getComputedStyle(nav).overflowY === 'auto' && getComputedStyle(nav).overscrollBehaviorY === 'contain', 'Filter cards scroll inside when taller than the screen');
  // Within a pixel of the top the observer may still count the sentinel as visible; outside that band the state is exact.
  const sentinelBottom = document.querySelector('.filter-sentinel').getBoundingClientRect().bottom;
  assert(sentinelBottom > -1 && sentinelBottom <= 0 || dock.classList.contains('is-stuck') === sentinelBottom < 0, 'is-stuck tracks when the bar is stuck');
  assert(getComputedStyle(dock).transitionProperty.includes('--dock') || reducedMotion, 'The docked look eases on the state switch');
  const scrim = document.querySelector('.filter-scrim');
  const filtering = document.documentElement.classList.contains('is-filtering');
  assert(nav.hidden === scrim.hidden && filtering === !nav.hidden, 'The scrim and the scroll lock follow the open cards');
  if (!nav.hidden) {
    assert(getComputedStyle(document.documentElement).overflowY === 'hidden', 'The page does not scroll under the open cards');
    const cover = scrim.getBoundingClientRect();
    assert(getComputedStyle(scrim).position === 'fixed' && cover.top <= 0 && cover.bottom >= innerHeight && Number(getComputedStyle(scrim).zIndex) < Number(getComputedStyle(dock).zIndex),
      'The scrim covers the page below the bar');
    assert(nav.getBoundingClientRect().bottom <= innerHeight + 0.5, 'The open cards stay on screen');
    assert(parseFloat(getComputedStyle(nav).paddingBottom) >= 24, 'The last card clears the bottom edge');
    assert(nav.classList.contains('has-more') === (nav.scrollHeight - nav.clientHeight - nav.scrollTop > 1), 'The bottom fade shows exactly while more cards lie below');
  }
  assert(Math.abs(bar.getBoundingClientRect().height - 60) < 1, 'The filter bar is 60px tall');
  assert(getComputedStyle(bar).boxShadow.split(/,(?![^(]*\))/).every(shadow => shadow.includes('inset')), 'The filter bar casts no shadow');
  assert(getComputedStyle(dock, '::before').content === 'none', 'No backdrop band behind the stuck bar');
  if (Number(getComputedStyle(dock).getPropertyValue('--dock')) === 1) {
    const flush = bar.getBoundingClientRect();
    assert(Math.abs(flush.top) < 1 && Math.abs(flush.left) < 1 && Math.abs(flush.right - viewport) < 1 && getComputedStyle(bar).borderTopLeftRadius === '0px',
      'The docked bar must be flush with the top and both edges, with square corners');
    assert(Math.abs(dock.querySelector('.filter-toggle').getBoundingClientRect().left - dock.getBoundingClientRect().left - 7) < 1.5,
      'The docked bar keeps its content on the content column');
  }
  const strip = bar.querySelector('.filter-tags');
  const edge = strip.parentElement;
  assert(edge.matches('.filter-tags-edge') && getComputedStyle(edge).maskImage.startsWith('linear-gradient') && getComputedStyle(strip).maskImage === 'none',
    'The tag fades sit on the strip\'s non-scrolling wrapper');
  assert(edge.classList.contains('has-before') === strip.scrollLeft > 1
    && edge.classList.contains('has-after') === strip.scrollWidth - strip.clientWidth - strip.scrollLeft > 1, 'The tag strip fades exactly where tags lie beyond it');
  // Layout height, so a tag mid-unfold (scaled from 0.8) still counts; leaving tags are on their way out.
  for (const tag of strip.querySelectorAll('li:not(.is-leaving) .filter-tag')) assert(Math.abs(tag.offsetHeight - 32) < 1, 'Selected tags are 32px pills');
  const barBox = bar.getBoundingClientRect();
  for (const part of bar.children) {
    if (!part.getClientRects().length) continue;
    const box = part.getBoundingClientRect();
    assert(box.left >= barBox.left - 1 && box.right <= barBox.right + 1, `${part.className}: bar content overflows`);
  }
  const panelOpen = !nav.hidden;
  for (const panel of [bar, ...(panelOpen ? nav.querySelectorAll('.filter-card') : []), document.getElementById('empty-state')]) {
    if (!panel.getClientRects().length) continue;
    const style = getComputedStyle(panel);
    // The bar squares its corners as it docks (24px × (1 − --dock)).
    const radius = panel === bar ? 24 * (1 - Number(getComputedStyle(dock).getPropertyValue('--dock'))) : 24;
    assert(Math.abs(parseFloat(style.borderTopLeftRadius) - radius) < 0.5 && style.backdropFilter.includes('blur'), `${panel.className}: panel must be frosted glass`);
  }
  for (const pill of document.querySelectorAll('.filter-toggle, .filter-chip span, .family-chip, .filter-select input, .picker-trigger, .ms-search, .filter-tag, .reset-empty')) {
    if (pill.getClientRects().length) assert(parseFloat(getComputedStyle(pill).borderTopLeftRadius) >= pill.offsetHeight / 2, `${pill.className || pill.id}: control must be a pill`);
  }
  for (const pill of document.querySelectorAll('.filter-toggle, .filter-chip, .family-chip, .picker-trigger, .ms-search, .reset-empty, .filter-tag, .event-more i')) {
    assert(getComputedStyle(pill, '::after').backgroundImage.includes('conic-gradient'), 'Pills must carry the specular rim');
  }
  for (const row of document.querySelectorAll('.event-row')) {
    assert(getComputedStyle(row, '::after').maskImage.startsWith('conic-gradient'), `${row.id}: rows must take the pills' light`);
  }
  if (!/Firefox/.test(navigator.userAgent) && !(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))) {
    // Search boxes live in the pickers' popovers, outside the panel; only an open one has boxes to check.
    for (const glass of [bar, ...(panelOpen ? nav.querySelectorAll('.filter-card, .picker-trigger, .filter-select input') : []), ...document.querySelectorAll('.ms-search'), document.getElementById('empty-state')]) {
      if (glass.getClientRects().length) assert(getComputedStyle(glass).backdropFilter.includes('url('), 'Chromium glass must add the refraction filter');
    }
  }
  const count = document.getElementById('result-count');
  assert(Number(count.textContent) === document.querySelectorAll('.event-row:not([hidden])').length, 'The bar count must match the visible events');
  assert(!document.querySelector('.results-head'), 'The separate result line is replaced by the bar count');
  const emptyTitle = document.querySelector('.empty-state h3');
  assert(getComputedStyle(emptyTitle).animationName === (reducedMotion ? 'none' : 'shiny-text'), 'Empty state title must shine unless motion is reduced');
  assert(!document.querySelector('.date-nav, .date-nav-note'), 'The date axis is removed; dates are picked in the calendar');
  // Split family chips: 全部 X and the sub-genre arrow are both touch targets; a partial choice shows its number.
  const genreSelect = document.getElementById('genre');
  assert(genreSelect.hidden && !nav.querySelector('#genre + .picker-trigger'), 'Sub-genres live behind the family arrows, not a 更多风格 picker');
  for (const chip of nav.querySelectorAll('.family-chip')) {
    const all = chip.querySelector('.family-all input'), more = chip.querySelector('.family-more');
    const members = JSON.parse(chip.dataset.members);
    const chosen = [...genreSelect.selectedOptions].filter(option => members.includes(option.value)).length;
    const pop = document.getElementById(more.getAttribute('aria-controls'));
    assert(!more.hidden && pop?.parentElement === document.body && pop.popover === 'manual', `${all.value}: the arrow opens a top-layer picker`);
    assert(!(all.checked && chosen), `${all.value}: 全部 and sub-genres exclude each other`);
    const rows = [...pop.querySelectorAll('.ms-option')];
    assert(rows.length === members.length && rows.every((row, index) => row.getAttribute('aria-selected')
      === String(all.checked || genreSelect.querySelector(`option[value="${CSS.escape(members[index])}"]`).selected)),
      `${all.value}: the whole family shows every sub-genre ticked`);
    assert(chip.classList.contains('is-partial') === chosen > 0 && Number(more.querySelector('.family-count').textContent || 0) === chosen,
      `${all.value}: partial state and count out of sync`);
    if (panelOpen) {
      for (const part of [chip.querySelector('.family-all'), more]) {
        const box = part.getBoundingClientRect();
        assert(box.height >= 44 && box.width >= 44, `${all.value}: split chip parts need 44px touch targets`);
      }
    }
  }
  assert(!nav.querySelector('input[name="genre-unknown"]'), 'No 风格未知 chip');
  for (const select of nav.querySelectorAll('select[data-multi-select]')) {
    const trigger = select.nextElementSibling;
    const pop = document.getElementById(`${select.id}-popover`);
    assert(select.hidden && trigger.classList.contains('picker-trigger') && trigger.getAttribute('aria-controls') === pop.id && pop.parentElement === document.body,
      `${select.id}: multi-select must be a custom trigger with a top-layer popover`);
    assert(Number(trigger.querySelector('.picker-count').textContent || 0) === select.selectedOptions.length, `${select.id}: trigger count out of sync`);
  }
  const datesTrigger = document.getElementById('to').nextElementSibling;
  assert(document.getElementById('from').hidden && document.getElementById('to').hidden && datesTrigger.classList.contains('picker-trigger')
    && datesTrigger.getAttribute('aria-controls') === 'dates-popover', 'Dates must use the custom calendar trigger');
  const datePicks = [...document.querySelectorAll('#dates-popover button.dr-day[aria-pressed="true"]')].map(button => button.dataset.date);
  assert(datePicks.join() === [...new Set([from.value, to.value].filter(Boolean))].join(), 'Calendar selection must match the date range');
  for (const control of [...document.querySelectorAll('.picker-trigger, .filter-select input, .filter-chip')].filter(control => control.getClientRects().length)) {
    const box = control.getBoundingClientRect();
    const card = control.closest('.filter-card').getBoundingClientRect();
    assert(box.left >= card.left - 1 && box.right <= card.right + 1, `${control.id || control.textContent}: filter control overflows its card`);
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
  const lists = [...document.querySelectorAll('.event-accordion')].filter(list => list.getClientRects().length);
  let visible = 0;
  for (const list of lists) {
    const rows = [...list.querySelectorAll('.event-row')].filter(row => !row.hidden);
    const active = rows.filter(row => row.classList.contains('is-active'));
    assert(active.length === 1, `${list.closest('.day-group').dataset.date}: each day needs exactly one open row`);
    const openHeight = viewport <= 700 ? 520 : 560;
    const boxes = rows.map(row => row.getBoundingClientRect());
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i], box = boxes[i], open = row === active[0];
      assert(box.width > 0 && box.height > 0, `${row.id}: empty row`);
      assert(box.left >= -1 && box.right <= viewport + 1, `${row.id}: row outside viewport`);
      assert(row.scrollWidth <= row.clientWidth, `${row.id}: overflowing content`);
      // Unknown lineup and genres are left out (question 183); the other four categories are always there.
      const known = 4 + (JSON.parse(row.dataset.genres).length > 0) + (row.querySelector('.row-artists') !== null);
      assert(row.querySelectorAll('[data-field]').length === known && ['name', 'location', 'info', 'posters']
        .every(field => row.querySelector(`[data-field="${field}"]`)), `${row.id}: missing information`);
      assert(getComputedStyle(row).borderTopLeftRadius === '24px', `${row.id}: rows use the shared radius`);
      const stage = row.querySelector('.event-stage').getBoundingClientRect();
      assert(open ? stage.height >= openHeight - 1 : stage.height >= 84, `${row.id}: wrong ${open ? 'open' : 'collapsed'} height`);
      assert(row.querySelector('.event-toggle').getAttribute('aria-expanded') === String(open), `${row.id}: toggle state out of sync`);
      const summary = row.querySelector('.row-artists')?.textContent ?? '';
      assert([...row.querySelectorAll('.artist-table tr:not(.crew-row) .artist-name')].every(name => summary.includes(name.textContent)),
        `${row.id}: the collapsed row must list every artist`);
      assert(!row.querySelector('.row-genres') || row.querySelector('.row-genres').children.length > 0, `${row.id}: a genre line needs genres`);
      const more = row.querySelector('.event-more');
      const expanded = more.getAttribute('aria-expanded') === 'true';
      assert(row.querySelector('.event-details').hidden === !expanded, `${row.id}: details visibility out of sync with the details line`);
      if (!open) assert(!expanded, `${row.id}: collapsed row must hide its details`);
      if (open) assert(more.getBoundingClientRect().height >= 44, `${row.id}: the details line needs a 44px target`);
      if (expanded) for (const target of row.querySelectorAll('.info-actions a, .copy-target')) assert(target.getBoundingClientRect().height >= 44, `${row.id}: detail links need a 44px target`);
      if (expanded) for (const section of row.querySelectorAll('.event-field')) {
        const box = section.getBoundingClientRect();
        for (const other of row.querySelectorAll('.event-field')) {
          const next = other.getBoundingClientRect();
          assert(other === section || box.right <= next.left + 1 || next.right <= box.left + 1 || box.bottom <= next.top + 1 || next.bottom <= box.top + 1,
            `${row.id}: detail sections overlap`);
        }
      }
      for (const link of row.querySelectorAll('.row-genres span, .event-more i')) {
        if (link.getClientRects().length) assert(parseFloat(getComputedStyle(link).borderTopLeftRadius) >= link.offsetHeight / 2, `${row.id}: pills must be fully rounded`);
      }
      if (i) assert(box.top >= boxes[i - 1].bottom - 1, `${row.id}: rows overlap or lose date/time order`);
      for (const image of row.querySelectorAll('.event-posters > a > img')) {
        const size = image.getBoundingClientRect();
        const frame = image.parentElement.getBoundingClientRect();
        assert(getComputedStyle(image).objectFit === 'cover' && size.left <= frame.left + 2 && size.right >= frame.right - 2,
          `${row.id}: poster must cover its frame`);
        if (image.complete) assert(image.naturalWidth > 0, `${row.id}: broken poster`);
      }
    }
    visible += rows.length;
  }
  return { viewport, visibleRows: visible, dateGroups: lists.length, result: 'No overflow, overlap or missing fields; one open row per day' };
}
