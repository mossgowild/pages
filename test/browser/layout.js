// Layout rules checked in the page itself: test/browser.ts injects this file and calls checkLayout() at several widths
// and states; it can also be pasted into a browser console.
function checkLayout() {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const viewport = document.documentElement.clientWidth;
  assert(document.documentElement.scrollWidth <= viewport, 'Page overflows horizontally');
  const wordmark = document.querySelector('.title-wordmark').getBoundingClientRect();
  const region = document.querySelector('.title-region').getBoundingClientRect();
  const logo = document.querySelector('.title-logo').getBoundingClientRect();
  const updated = document.querySelector('.site-updated').getBoundingClientRect();
  const brand = document.querySelector('.title-lockup').getBoundingClientRect();
  assert(Math.abs((updated.top + updated.bottom) - (brand.top + brand.bottom)) < 2,
    'Header title and update block must be vertically centered');
  assert(document.querySelector('.topbar').getBoundingClientRect().height <= 76, 'Keep the header compact');
  assert(Math.abs(brand.height - updated.height) <= 2, 'The title block and the update block must be the same height (question 272)');
  const updateLabel = document.querySelector('.site-updated > span');
  const updateTime = document.querySelector('.site-updated time');
  assert(updateLabel.textContent === '资讯更新' && updateTime.getBoundingClientRect().top >= updateLabel.getBoundingClientRect().bottom,
    'Show the update label above the timestamp');
  // The label's trailing letter-spacing hangs past the edge, so its last glyph lines up with the time.
  assert(Math.abs(updateLabel.getBoundingClientRect().right - parseFloat(getComputedStyle(updateLabel).letterSpacing) - updateTime.getBoundingClientRect().right) < 1,
    'Right-align both update lines');
  assert(wordmark.bottom <= region.top && region.right < logo.left, 'The title leads; the byline “region  by logo” sits below it (question 260)');
  // Both rows skew 12° from their bottom-left corner, so the title's box overhangs on the right by its height × tan 12°.
  const overhang = wordmark.height * Math.tan(12 * Math.PI / 180);
  assert(Math.abs(wordmark.left - region.left) < 1 && Math.abs(wordmark.right - overhang - logo.right) < 1,
    'Title and byline rows must share their left and right edges');
  assert(updated.left >= Math.max(wordmark.right, region.right) && updated.right <= viewport,
    'Header update time overlaps the title or leaves the viewport');
  assert(!document.querySelector('.hero-bottom, .top-links, .top-meta, .date-panel, .date-trigger'),
    'Remove the repeated hero footer, header navigation and date drawer');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  assert(getComputedStyle(document.querySelector('.schedule'), '::before').content === 'none',
    'No divider between the poster wall and the schedule (hero-mobile question 8)');
  for (const [selector, pseudo, edge] of [['.topbar', '::after', 'borderBottomColor'],
    ['.site-footer', '::before', 'borderTopColor'], ['.day-heading', '::after']]) {
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
  const control = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--control'));
  assert(control === 40 && Math.abs(bar.getBoundingClientRect().height - (control + 16)) < 1, 'The filter bar is one control plus 8px on each side (56px)');
  assert(getComputedStyle(bar).boxShadow.split(/,(?![^(]*\))/).every(shadow => shadow.includes('inset')), 'The filter bar casts no shadow');
  assert(getComputedStyle(dock, '::before').content === 'none', 'No backdrop band behind the stuck bar');
  if (Number(getComputedStyle(dock).getPropertyValue('--dock')) === 1) {
    const flush = bar.getBoundingClientRect();
    assert(Math.abs(flush.top) < 1 && Math.abs(flush.left) < 1 && Math.abs(flush.right - viewport) < 1 && getComputedStyle(bar).borderTopLeftRadius === '0px',
      'The docked bar must be flush with the top and both edges, with square corners');
    assert(Math.abs(dock.querySelector('.filter-toggle').getBoundingClientRect().left - dock.getBoundingClientRect().left - 1) < 1.5,
      'The docked bar lines its button up with the cards\' left edge (question 218)');
  }
  // However few the results, a screen remains below the dock point so the bar can stay docked (question 205).
  const dockAt = Math.ceil(document.querySelector('.filter-sentinel').getBoundingClientRect().bottom + scrollY) + 2;
  assert(document.documentElement.scrollHeight - dockAt >= innerHeight - 1, 'The page keeps a screen below the dock point');
  const strip = bar.querySelector('.filter-tags');
  const edge = strip.parentElement;
  assert(edge.matches('.filter-tags-edge') && getComputedStyle(edge).maskImage.startsWith('linear-gradient') && getComputedStyle(strip).maskImage === 'none',
    'The tag fades sit on the strip\'s non-scrolling wrapper');
  assert(edge.classList.contains('has-before') === strip.scrollLeft > 1
    && edge.classList.contains('has-after') === strip.scrollWidth - strip.clientWidth - strip.scrollLeft > 1, 'The tag strip fades exactly where tags lie beyond it');
  // Layout height, so a tag mid-unfold (scaled from 0.8) still counts; leaving tags are on their way out.
  for (const tag of strip.querySelectorAll('li:not(.is-leaving) .filter-tag')) assert(Math.abs(tag.offsetHeight - control) < 1, 'Selected tags are control-height pills, as tall as the filter button');
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
    // The bar is a full pill (28px on its 56px height, concentric with its 40px buttons) and squares its corners as it docks (× (1 − --dock); question 216).
    const radius = panel === bar ? (control / 2 + 8) * (1 - Number(getComputedStyle(dock).getPropertyValue('--dock'))) : 24;
    assert(Math.abs(parseFloat(style.borderTopLeftRadius) - radius) < 0.5 && style.backdropFilter.includes('blur'), `${panel.className}: panel must be frosted glass`);
  }
  for (const value of document.querySelectorAll('.picker-value')) {
    if (value.getClientRects().length) assert(value.scrollHeight <= value.clientHeight, `${value.textContent}: the picker text must not be cropped`);
  }
  // One control height for every clickable pill and round button (question 4).
  for (const el of document.querySelectorAll('.filter-toggle, .filter-tag, .filter-clear, .filter-chip span, .family-chip, .family-more, .picker-trigger, .ms-search, .ms-option, .picker-clear, .picker-done, button.dr-day, .reset-empty')) {
    if (el.getClientRects().length) assert(Math.abs(el.getBoundingClientRect().height - control) < 1, `${el.className}: controls are ${control}px tall`);
  }
  for (const circle of document.querySelectorAll('.filter-tag span, .family-more')) {
    const box = circle.matches('.family-more') ? parseFloat(getComputedStyle(circle, '::before').height) : circle.getBoundingClientRect().height;
    if (circle.getClientRects().length) assert(Math.abs(box - (control - 16)) < 1, `${circle.className || 'tag ×'}: inset circles sit 8px inside the pill`);
  }
  for (const pill of document.querySelectorAll('.filter-toggle, .filter-chip span, .family-chip, .filter-select input, .picker-trigger, .ms-search, .filter-tag, .reset-empty')) {
    if (pill.getClientRects().length) assert(parseFloat(getComputedStyle(pill).borderTopLeftRadius) >= pill.offsetHeight / 2, `${pill.className || pill.id}: control must be a pill`);
  }
  for (const pill of document.querySelectorAll('.filter-toggle, .filter-chip, .family-chip, .picker-trigger, .ms-search, .reset-empty, .filter-tag, .event-detail-close, .poster-preview-button, .poster-preview-close')) {
    assert(getComputedStyle(pill, '::after').backgroundImage.includes('conic-gradient'), 'Pills must carry the specular rim');
  }
  for (const row of document.querySelectorAll('.event-row')) {
    assert(getComputedStyle(row, '::after').maskImage.startsWith('conic-gradient'), `${row.id}: rows must take the pills' light`);
  }
  // Rows stay frosted glass, under a veil too (docs/motion-performance.md Q28); a divider's stars flow only while it is on
  // the screen (assets/scroll-motion.js).
  const blurOf = element => { const style = getComputedStyle(element); return style.backdropFilter || style.webkitBackdropFilter || 'none'; };
  for (const row of document.querySelectorAll('.event-row')) assert(blurOf(row).includes('blur'), `${row.id}: rows are frosted glass`);
  if (!reducedMotion) {
    for (const [divider, pseudo] of [['.topbar', '::after'], ['.site-footer', '::before'], ...[...document.querySelectorAll('.day-heading')].map(h => [h, '::after'])]) {
      const element = typeof divider === 'string' ? document.querySelector(divider) : divider;
      const box = element.getBoundingClientRect(), off = box.bottom < 0 || box.top > innerHeight || !element.getClientRects().length;
      if (Math.abs(box.top) < 2 || Math.abs(box.bottom - innerHeight) < 2) continue;
      assert(element.classList.contains('is-offscreen') === off && getComputedStyle(element, pseudo).animationPlayState === (off ? 'paused' : 'running'),
        'Divider stars flow on the screen and pause off it');
    }
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
  const emptyTitle = document.querySelector('.empty-state .shiny-text');
  assert(getComputedStyle(emptyTitle).animationName === (reducedMotion ? 'none' : 'shiny-text'), 'Empty state title must shine unless motion is reduced');
  assert(!document.querySelector('.date-nav, .date-nav-note'), 'The date axis is removed; dates are picked in the calendar');
  // Split family chips: 全部 X and the sub-genre arrow are both touch targets; a partial choice shows its number.
  assert(!nav.querySelector('select'), 'Sub-genres, venues and dates live in the pickers, not native selects');
  for (const chip of nav.querySelectorAll('.family-chip')) {
    const all = chip.querySelector('.family-all input'), more = chip.querySelector('.family-more');
    const members = JSON.parse(chip.dataset.members);
    const pop = document.getElementById(more.getAttribute('aria-controls'));
    assert(!more.hidden && pop?.parentElement === document.body && pop.popover === 'manual', `${all.value}: the arrow opens a top-layer picker`);
    const rows = [...pop.querySelectorAll('.ms-option')];
    const chosen = all.checked ? 0 : rows.filter(row => row.getAttribute('aria-selected') === 'true').length;
    assert(rows.length === members.length && (!all.checked || rows.every(row => row.getAttribute('aria-selected') === 'true')),
      `${all.value}: the whole family shows every sub-genre ticked`);
    assert(chip.classList.contains('is-partial') === chosen > 0 && Number(more.querySelector('.family-count').textContent || 0) === chosen,
      `${all.value}: partial state and count out of sync`);
    if (panelOpen) {
      for (const part of [chip.querySelector('.family-all'), more]) {
        const box = part.getBoundingClientRect();
        assert(Math.abs(box.height - control) < 1 && box.width >= control, `${all.value}: split chip parts are control-height targets`);
      }
    }
  }
  assert(!nav.querySelector('input[name="genre-unknown"]'), 'No 风格未知 chip');
  for (const id of ['venue', 'dates']) {
    const trigger = nav.querySelector(`[aria-controls="${id}-popover"]`);
    const pop = document.getElementById(`${id}-popover`);
    assert(trigger?.classList.contains('picker-trigger') && pop?.parentElement === document.body && pop.popover === 'manual',
      `${id}: the picker is a custom trigger with a top-layer popover`);
  }
  const venueCount = Number(nav.querySelector('[aria-controls="venue-popover"] .picker-count').textContent || 0);
  assert(venueCount === document.querySelectorAll('#venue-popover .ms-option[aria-selected="true"]').length, 'venue: trigger count out of sync');
  for (const control of [...document.querySelectorAll('.picker-trigger, .filter-chip')].filter(control => control.getClientRects().length)) {
    const box = control.getBoundingClientRect();
    const card = control.closest('.filter-card').getBoundingClientRect();
    assert(box.left >= card.left - 1 && box.right <= card.right + 1, `${control.id || control.textContent}: filter control overflows its card`);
  }
  const hero = document.querySelector('.hero-stage');
  if (hero) {
    const box = hero.getBoundingClientRect();
    assert(Math.abs(box.left) < 1 && Math.abs(box.right - viewport) < 1, 'Poster stage must extend to both viewport edges');
    const posters = hero.querySelectorAll('.hero-poster').length;
    if (hero.classList.contains('is-wall')) {
      const tiles = [...hero.querySelectorAll('.drift-wall__tile')];
      const focusable = tiles.filter(tile => tile.tabIndex >= 0);
      assert(focusable.length === posters && focusable.every(tile => !tile.hasAttribute('aria-hidden')),
        'Each featured poster is focusable exactly once in the poster wall');
      assert(tiles.every(tile => tile.tabIndex >= 0 || tile.getAttribute('aria-hidden') === 'true'),
        'Repeated wall tiles are hidden from assistive technology');
    } else assert(posters > 0, 'Show the poster wall or the poster list');
    assert(!document.querySelector('.hero-detail, .hero-controls, .hero-arrow'), 'The wall has no featured details, arrows or page numbers');
    assert(getComputedStyle(hero).overscrollBehaviorY === 'auto', 'Vertical scrolling over the wall must reach the page');
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
      const field = name => row.querySelector(`[data-field="${name}"]`);
      assert(row.querySelectorAll('[data-field]').length === known && ['name', 'location', 'info', 'posters'].every(field), `${row.id}: missing information`);
      assert(getComputedStyle(row).borderTopLeftRadius === '24px', `${row.id}: rows use the shared radius`);
      assert(getComputedStyle(row).transform === 'none', `${row.id}: rows lie flat (docs/glass-effects.md)`);
      const stage = row.querySelector('.event-stage').getBoundingClientRect();
      assert(open ? stage.height >= openHeight - 1 : stage.height >= 84, `${row.id}: wrong ${open ? 'open' : 'collapsed'} height`);
      // Rows do not switch or expand any more: the title opens the event's detail sheet (docs/event-browsing.md Q20–Q25).
      const toggle = row.querySelector('.event-toggle');
      assert(toggle.getAttribute('aria-haspopup') === 'dialog' && !toggle.hasAttribute('aria-expanded'), `${row.id}: the title opens the details`);
      assert(!row.querySelector('.event-more'), `${row.id}: no details line`);
      const summary = row.querySelector('.row-artists')?.textContent ?? '';
      assert([...row.querySelectorAll('.artist-table tr:not(.crew-row) .artist-name')].every(name => summary.includes(name.textContent)),
        `${row.id}: the collapsed row must list every artist`);
      assert(!row.querySelector('.row-genres') || row.querySelector('.row-genres').children.length > 0, `${row.id}: a genre line needs genres`);
      const details = row.querySelector('.event-details');
      if (document.documentElement.classList.contains('accordion-ready')) assert(!details || !details.getClientRects().length, `${row.id}: details stay out of the row while the script runs`);
      for (const link of row.querySelectorAll('.row-genres span')) {
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
  // An open detail sheet: its sections never overlap, its links keep a 44px target, the × is a control-size circle and
  // nothing runs past the sheet.
  const detail = document.querySelector('.event-detail[open]');
  if (detail) {
    const scroll = detail.querySelector('.event-detail-scroll');
    assert(scroll.scrollWidth <= scroll.clientWidth + 1, 'The detail sheet must not scroll sideways');
    const sheet = detail.querySelector('.event-detail-sheet').getBoundingClientRect();
    assert(sheet.left >= -1 && sheet.right <= viewport + 1, 'The detail sheet stays on the screen');
    // Above 700px the sheet is a card up to 760px wide: two columns with the lineup across, lit like the event rows; a
    // phone-filling sheet takes one column and has no edge to light. Frosted either way (docs/glass-effects.md F9–F11).
    const card = viewport > 700, glass = detail.querySelector('.event-detail-sheet');
    assert(getComputedStyle(detail.querySelector('.event-details')).gridTemplateColumns.split(' ').length === (card ? 2 : 1),
      'The detail sheet lays its sections out by its own width');
    assert(getComputedStyle(glass).backdropFilter.includes('blur'), 'The detail sheet is frosted glass');
    const ring = getComputedStyle(glass, '::after');
    assert(card ? ring.maskImage.startsWith('conic-gradient') : ring.display === 'none', 'Only the detail card carries the event rows\' light');
    const close = detail.querySelector('.event-detail-close').getBoundingClientRect();
    assert(Math.abs(close.width - control) < 1 && Math.abs(close.height - control) < 1, 'The × is a control-size circle');
    const sections = [...detail.querySelectorAll('.event-field')].map(section => section.getBoundingClientRect());
    sections.forEach((box, i) => sections.forEach((next, j) => assert(i === j || box.right <= next.left + 1 || next.right <= box.left + 1
      || box.bottom <= next.top + 1 || next.bottom <= box.top + 1, 'Detail sections overlap')));
    for (const target of detail.querySelectorAll('.info-actions a, .copy-target')) assert(target.getBoundingClientRect().height >= 44, 'Detail links need a 44px target');
    // The text over the sheet's poster lets taps through to it (docs/event-browsing.md F35).
    const stage = detail.querySelector('.event-stage');
    if (stage) assert(getComputedStyle(stage.querySelector('.event-summary')).pointerEvents === 'none', 'The text over the poster must not block opening the image');
  }
  // The image preview: with a mouse its toolbar holds control-size round buttons 8px inside a 56px capsule, with a
  // control-size × (docs/event-browsing.md Q31–Q33); touch screens show neither.
  const preview = document.querySelector('.poster-preview[open]');
  if (preview) {
    const toolbar = preview.querySelector('.poster-preview-tools'), shown = matchMedia('(hover: hover) and (pointer: fine)').matches;
    assert(Boolean(toolbar.getClientRects().length) === shown, 'The preview toolbar shows with a mouse only');
    if (shown) {
      assert(Math.abs(toolbar.getBoundingClientRect().height - (control + 16)) < 1, 'The preview toolbar is one control plus 8px on each side');
      for (const button of preview.querySelectorAll('.poster-preview-button, .poster-preview-close')) {
        const box = button.getBoundingClientRect();
        assert(Math.abs(box.width - control) < 1 && Math.abs(box.height - control) < 1, `${button.getAttribute('aria-label')}: preview buttons are control-size circles`);
      }
    }
  }
  return { viewport, visibleRows: visible, dateGroups: lists.length, result: 'No overflow, overlap or missing fields; one open row per day' };
}

// Touch screens follow the phone's movement (docs/glass-effects.md Q2): in a touch emulation (hover: none) on a secure
// origin such as 127.0.0.1, `await checkMotionLight()` tilts the phone with synthetic orientation readings. Tilting
// lights the lit elements on the screen and turns their streaks toward the tilt; about a second after the phone is still
// they fade; with reduced motion they stay dark.
async function checkMotionLight() {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  assert(matchMedia('(hover: none)').matches && 'DeviceOrientationEvent' in window, 'Run in a touch emulation on a secure origin');
  const lit = [...document.querySelectorAll('.event-row, .filter-toggle')].filter(element => {
    const box = element.getBoundingClientRect();
    return box.width && box.bottom > 0 && box.top < innerHeight;
  });
  assert(lit.length, 'Scroll some event rows into view first');
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const hold = async (ms, beta, gamma) => {
    for (const end = performance.now() + ms; performance.now() < end;) {
      dispatchEvent(new DeviceOrientationEvent('deviceorientation', { alpha: 0, beta, gamma }));
      await wait(16);
    }
  };
  const brightness = () => lit.map(element => parseFloat(element.style.getPropertyValue('--spec')) || 0);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  await hold(1600, 40, 0);
  assert(brightness().every(value => value < .05), 'A phone held still leaves the light off');
  // A quarter-second tilt to the right (gamma 0° → 20°) and a moment later.
  for (let step = 1; step <= 15; step++) await hold(16, 40, step * 20 / 15);
  await hold(200, 40, 20);
  const shaken = brightness();
  assert(reduced ? shaken.every(value => value === 0) : shaken.every(value => value > .5), 'Tilting lights every lit element on the screen');
  if (!reduced) {
    // Facing right: math angle 0, the conic's 90deg.
    const angle = parseFloat(lit[0].style.getPropertyValue('--spec-angle'));
    assert(Math.abs(angle - 90) < 25, `The streaks turn toward the tilt (got ${angle}deg)`);
  }
  await hold(2000, 40, 20);
  assert(brightness().every(value => value < .1), 'The light fades about a second after the phone is still');
  return { lit: lit.length, peak: Math.max(...shaken), result: 'Tilting lights and turns the streaks; stillness fades them' };
}
