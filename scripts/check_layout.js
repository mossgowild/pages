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
  assert(Math.max(...boxes.map(box => box.width)) - Math.min(...boxes.map(box => box.width)) < 1,
    'Date axis nodes must have even spacing');
  const ruler = dateNav.querySelector('.date-ruler');
  const rulerBox = ruler.getBoundingClientRect();
  assert(Math.abs(rulerBox.width - dateNav.scrollWidth) < 1, 'Date ruler must span the entire scrollable axis');
  for (const [index, item] of items.entries()) {
    const label = item.querySelector('span').getBoundingClientRect();
    const box = boxes[index];
    assert(Math.abs((label.left + label.right - box.left - box.right) / 2) < 1,
      `Date axis label ${index} must align with its node`);
    assert(Math.abs((box.left + box.right) / 2 - (rulerBox.left + rulerBox.width * (index + .5) / items.length)) < 1,
      `Date axis tick ${index} must align with the common ruler`);
  }
  assert(items.every(item => item.offsetTop === items[0].offsetTop), 'Date axis must stay on one horizontal row');
  assert(getComputedStyle(dateNav).overflowX === 'auto', 'Date axis must scroll horizontally within its own region');
  assert(dateNav.scrollHeight <= dateNav.clientHeight, 'Date axis must not scroll vertically');
  const axis = dateNav.getBoundingClientRect();
  assert(axis.left >= 0 && axis.right <= viewport, 'Date axis leaves the viewport');
  assert(items.filter(item => item.matches('[aria-current="date"], [aria-pressed="true"]')).length <= 1,
    'Date axis has conflicting selections');
  const selectedTick = dateNav.querySelector('[aria-current="date"], [aria-pressed="true"]');
  const indicator = dateNav.querySelector('.date-indicator');
  assert(!!indicator && dateNav.classList.contains('has-indicator') === !!selectedTick,
    'Date indicator visibility must match the selected date');
  if (selectedTick) {
    const dot = getComputedStyle(selectedTick, '::before');
    const line = getComputedStyle(indicator);
    const dotCenter = parseFloat(dot.left) + parseFloat(dot.width) / 2 + new DOMMatrix(dot.transform).m41;
    const targetCenter = new DOMMatrix(indicator.style.transform).m41 + indicator.offsetWidth / 2;
    assert(Math.abs(dotCenter - selectedTick.offsetWidth / 2) < .1
      && getComputedStyle(indicator, '::before').content === 'none'
      && line.backgroundColor === 'rgb(207, 41, 59)',
      'Date dot must stay on its node while the line moves');
    assert(Math.abs(targetCenter - selectedTick.offsetLeft - selectedTick.offsetWidth / 2) < .1,
      'Moving date indicator must target the selected node');
    const selectedLabel = selectedTick.querySelector('span');
    assert(getComputedStyle(selectedLabel).backgroundColor === 'rgba(0, 0, 0, 0)'
      && getComputedStyle(selectedLabel).boxShadow === 'none'
      && indicator.getBoundingClientRect().top > selectedLabel.getBoundingClientRect().bottom,
      'Date label must not mask or overlap the pointer');
    const ticks = [...ruler.querySelectorAll('.date-tick')];
    const center = indicator.getBoundingClientRect().left - rulerBox.left + indicator.offsetWidth / 2;
    const near = ticks[Math.round(center / rulerBox.width * (ticks.length - 1))];
    const far = center < rulerBox.width / 2 ? ticks.at(-1) : ticks[0];
    assert(ticks.length === 109 && ruler.classList.contains('has-ticks')
      && getComputedStyle(ruler, '::after').content === 'none'
      && near.getBoundingClientRect().height > far.getBoundingClientRect().height + 8
      && Number(near.style.opacity) > Number(far.style.opacity) + .5,
    'Individual date ticks must rise and brighten around the moving indicator');
    assert(Number(getComputedStyle(selectedTick.querySelector('span')).zIndex) > Number(line.zIndex),
      'Selected date label must remain readable over the marker');
  }
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
    if (viewport <= 700) assert(Math.abs(box.left) < 1 && Math.abs(box.right - viewport) < 1,
      'Mobile poster stage must extend to both viewport edges');
    const posters = [...hero.querySelectorAll('.hero-poster')].filter(poster => !poster.hidden);
    assert(posters.length === 3, 'Show only the active poster and its two neighbors');
    assert(posters.filter(poster => poster.tabIndex === 0).length === 1, 'Keep one poster in the Tab order');
    assert(!document.querySelector('.hero-controls'), 'Do not show the removed carousel control group');
    const arrows = [...hero.querySelectorAll('.hero-arrow')];
    const showArrows = matchMedia('(min-width:701px) and (hover:hover) and (pointer:fine)').matches;
    assert(arrows.length === 2 && arrows.every(button => !!button.getClientRects().length === showArrows),
      'Show side arrows only in the desktop pointer layout');
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
      const overlay = getComputedStyle(card, '::before');
      assert(heading.top > poster.top && heading.top < poster.bottom,
        `${card.id}: heading must overlap the poster transition`);
      assert(overlay.pointerEvents === 'none' && Number(overlay.zIndex) < Number(getComputedStyle(card.querySelector('.event-body')).zIndex),
        `${card.id}: overlay must stay behind content and allow poster clicks`);
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
        assert(getComputedStyle(image).maskImage === 'none', `${card.id}: apply the fade to a separate overlay`);
        const size = image.getBoundingClientRect();
        const frame = image.parentElement.getBoundingClientRect();
        assert(getComputedStyle(image).objectFit === 'cover' && Math.abs(size.width - frame.width) <= 2 && Math.abs(size.height - frame.height) <= 2,
          `${card.id}: poster must fill its frame without stretching`);
        if (image.complete) assert(image.naturalWidth > 0, `${card.id}: broken poster`);
      }
    }
    visible += cards.length;
  }
  return { viewport, visibleCards: visible, dateGroups: grids.length, result: 'No overflow, overlap, gaps or missing fields' };
}
