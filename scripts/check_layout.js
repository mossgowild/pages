// Paste into the browser console, then call checkLayout() after layout changes.
function checkLayout() {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const viewport = document.documentElement.clientWidth;
  assert(document.documentElement.scrollWidth <= viewport, 'Page overflows horizontally');
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
  }
  const grids = [...document.querySelectorAll('.event-grid')].filter(grid => grid.getClientRects().length);
  let visible = 0;
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
      if (i) assert(box.top >= boxes[i - 1].top, `${card.id}: visual date/time order changed`);
      for (let j = 0; j < i; j++) {
        const previous = boxes[j];
        assert(box.right <= previous.left || box.left >= previous.right || box.top >= previous.bottom,
          `${card.id}: overlapping ${cards[j].id}`);
      }
      const previous = boxes.slice(0, i).findLast(other => Math.abs(other.left - box.left) < 1);
      if (previous) assert(Math.abs(box.top - previous.bottom - gap) < 2, `${card.id}: masonry gap`);
      for (const image of card.querySelectorAll('.event-posters img')) {
        const size = image.getBoundingClientRect();
        assert(Math.abs(size.height - size.width * Number(image.getAttribute('height')) / Number(image.getAttribute('width'))) < 1, `${card.id}: distorted poster`);
        if (image.complete) assert(image.naturalWidth > 0, `${card.id}: broken poster`);
      }
    }
    visible += cards.length;
  }
  return { viewport, visibleCards: visible, dateGroups: grids.length, result: 'No overflow, overlap, gaps or missing fields' };
}
