// Run with: node scripts/check_hero.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { initHero, posterPosition } from './hero.mjs';

class Element {
  constructor(selector) {
    this.selector = selector;
    this.listeners = {};
    this.dataset = {};
    this.hidden = false;
    this.properties = {};
    this.style = {
      setProperty: (name, value) => { this.properties[name] = value; },
      removeProperty: name => { delete this.properties[name]; }
    };
    const classes = new Set();
    this.classList = { add: name => classes.add(name), remove: name => classes.delete(name), contains: name => classes.has(name) };
    this.clientWidth = 1000;
  }
  addEventListener(type, callback) { (this.listeners[type] ??= []).push(callback); }
  setAttribute(name, value) { this.properties[name] = value; }
  contains(node) { return this.children?.includes(node) ?? false; }
  emit(type, event = {}) {
    event.target ??= this;
    for (const callback of this.listeners[type] ?? []) callback(event);
  }
  matches() { return this.keyboardFocus; }
  closest(selector) { return this.selector === selector ? this : this.parent?.closest(selector) ?? null; }
  setPointerCapture(id) { this.capturedPointer = id; }
  hasPointerCapture(id) { return this.capturedPointer === id; }
  releasePointerCapture() { this.capturedPointer = undefined; }
  focus() { this.keyboardFocus = true; this.emit('focus'); }
  getBoundingClientRect() { return { left: 0, top: 0, width: 1000, height: 440 }; }
}

const reduced = new Element();
reduced.matches = false;
globalThis.matchMedia = query => query.includes('reduced-motion') ? reduced : { matches: true };
const root = new Element();
const stage = new Element('.hero-stage');
const page = new Element();
root.ownerDocument = page;
const status = new Element();
const total = JSON.parse(readFileSync(new URL('../data/events.json', import.meta.url))).featured.length;
const posters = Array.from({ length: total }, () => new Element('.hero-poster'));
posters.forEach(poster => { poster.parent = stage; });
const details = posters.map((_, index) => ({ hidden: false, querySelector: () => ({ textContent: `Event ${index}` }) }));
const elements = { '.hero-stage': stage, '.hero-status': status };
root.querySelector = selector => elements[selector];
root.querySelectorAll = selector => selector === '.hero-poster' ? posters : details;
root.children = [...posters, stage];
let now = 0, timerId = 0;
const timers = new Map();
globalThis.setTimeout = (callback, delay) => {
  timers.set(++timerId, { callback, at: now + delay });
  return timerId;
};
globalThis.clearTimeout = id => timers.delete(id);
function advance(milliseconds) {
  const end = now + milliseconds;
  for (;;) {
    const next = [...timers].filter(([, timer]) => timer.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
    if (!next) break;
    timers.delete(next[0]);
    now = next[1].at;
    next[1].callback();
  }
  now = end;
}
const moves = [];
initHero(root, () => ({ move: (...position) => moves.push(position) }));
const active = () => posters.findIndex(poster => poster.dataset.position === 'center');
const key = (value, target = stage) => root.emit('keydown', { key: value, target, preventDefault() {} });
const step = value => key(value > 0 ? 'ArrowRight' : 'ArrowLeft');
const click = (poster, detail = 1) => {
  const event = { target: poster, detail, prevented: false, preventDefault() { this.prevented = true; }, stopPropagation() { this.stopped = true; } };
  stage.emit('click', event);
  if (!event.stopped) poster.emit('click', event);
  return event.prevented;
};
const pointerEvent = (type, x, y = 150, extra = {}) => stage.emit(type, {
  pointerId: 1, pointerType: 'touch', isPrimary: true, button: 0, clientX: x, clientY: y, ...extra
});
const drag = (dx, dy = 0, end = 'pointerup') => {
  pointerEvent('pointerdown', 200);
  pointerEvent('pointermove', 200 + dx, 150 + dy);
  pointerEvent(end, 200 + dx, 150 + dy);
};
const wheel = (deltaX, deltaY = 0, extra = {}) => {
  const event = { deltaX, deltaY, deltaMode: 0, preventDefault() { this.prevented = true; }, ...extra };
  stage.emit('wheel', event);
  return !!event.prevented;
};

assert.equal(active(), 1);
assert.deepEqual(details.map(detail => detail.hidden), posters.map((_, index) => index !== 1));
advance(2999); assert.equal(active(), 1);
advance(1); assert.equal(active(), 2, 'Advance at 3 seconds');
assert.equal(status.properties['aria-live'], 'off');
const arrow = new Element('.hero-arrow');
arrow.parent = stage;
arrow.dataset.step = '-1';
stage.emit('pointerdown', { target: arrow, isPrimary: true, button: 0 });
root.emit('click', { target: arrow });
assert.equal(active(), 1, 'Desktop arrow selects the previous poster');
let spacePrevented = false;
root.emit('keydown', { target: arrow, key: ' ', preventDefault() { spacePrevented = true; } });
assert.equal(spacePrevented, false, 'Space keeps native button activation');
arrow.dataset.step = '1';
root.emit('click', { target: arrow });
assert.equal(active(), 2);
step(-1);
step(-1); assert.equal(active(), 0);
step(-1); assert.equal(active(), total - 1);
step(1); assert.equal(active(), 0);
step(-1);
posters[0].emit('focus'); // Pointer focus must not turn the first click into navigation.
assert.equal(active(), total - 1);
assert.equal(click(posters[0]), true);
assert.equal(active(), 0);
assert.equal(click(posters[0]), false);
posters[2].focus(); assert.equal(active(), 2);
root.emit('keydown', { key: 'ArrowLeft', target: posters[2], preventDefault() {} });
assert.equal(active(), 1);
assert.equal(status.textContent, `2 / ${total} · Event 1`);
const visited = new Set();
for (let i = 0; i < total; i++) {
  visited.add(active());
  assert.equal(posters.filter(poster => !poster.hidden).length, 3);
  assert.equal(posters.filter(poster => poster.tabIndex === 0).length, 1);
  assert.equal(details.filter(detail => !detail.hidden).length, 1);
  step(1);
}
assert.equal(visited.size, total, 'Every poster must be reachable');
const beforeDrag = active();
pointerEvent('pointerdown', 200, 150, { target: posters[beforeDrag] });
pointerEvent('pointermove', 80, 150, { target: posters[beforeDrag] });
pointerEvent('lostpointercapture', 80, 150, { target: posters[beforeDrag] });
pointerEvent('pointerup', 80);
assert.equal(active(), (beforeDrag + 1) % total, 'Losing implicit poster capture must not cancel a touch swipe');
assert.equal(click(posters[beforeDrag]), true, 'Touch swipe must not open its original poster link');
step(-1);
pointerEvent('pointerdown', 200);
advance(6000); assert.equal(active(), beforeDrag, 'Holding a gesture pauses autoplay');
pointerEvent('pointermove', 80);
assert.equal(stage.hasPointerCapture(1), true);
assert.equal(stage.classList.contains('is-dragging'), true);
assert.equal(stage.properties['--drag-x'], '-60px');
pointerEvent('pointerup', 80);
assert.equal(active(), (beforeDrag + 1) % total, 'Swipe left selects the next poster');
assert.equal(stage.hasPointerCapture(1), false);
assert.equal(stage.classList.contains('is-dragging'), false);
assert.equal(stage.properties['--drag-x'], undefined);
assert.equal(click(posters[beforeDrag]), true, 'A drag must not navigate or select its original link');
assert.equal(active(), (beforeDrag + 1) % total);
drag(120); assert.equal(active(), beforeDrag, 'Swipe right selects the previous poster');
click(posters[active()]);
drag(20); assert.equal(active(), beforeDrag, 'A short drag snaps back');
assert.equal(click(posters[active()]), true, 'A short drag must not activate a link');
drag(5); assert.equal(click(posters[active()]), false, 'Small tap movement preserves navigation');
drag(30, 130); assert.equal(active(), beforeDrag, 'Vertical scrolling does not select a poster');
drag(-120, 0, 'pointercancel'); assert.equal(active(), beforeDrag, 'Cancelled touch does not select');
drag(-120, 0, 'lostpointercapture'); assert.equal(active(), beforeDrag, 'Lost capture resets the drag');
drag(-120); click(posters[active()]);
const afterDrag = active();
assert.equal(wheel(5, 100), false, 'Vertical wheel scrolling stays native');
assert.equal(wheel(100, 0, { ctrlKey: true }), false, 'Trackpad pinch stays native');
assert.equal(active(), afterDrag);
assert.equal(wheel(30), true);
wheel(30); assert.equal(active(), (afterDrag + 1) % total);
wheel(100); assert.equal(active(), (afterDrag + 1) % total, 'Trackpad momentum selects only once per gesture');
advance(180);
wheel(-100); assert.equal(active(), afterDrag);
advance(180);
advance(2500);
step(1);
const manual = active();
advance(500); assert.equal(active(), manual, 'Manual selection resets the timer');
advance(2500); assert.equal(active(), (manual + 1) % total);
key(' ');
const paused = active();
advance(9000); assert.equal(active(), paused);
assert.equal(status.textContent, '自动轮播已暂停');
key(' ');
advance(3000); assert.equal(active(), (paused + 1) % total);
root.emit('pointerenter', { pointerType: 'mouse' });
const hovered = active();
advance(6000); assert.equal(active(), hovered);
root.emit('pointerleave');
advance(2999); assert.equal(active(), hovered);
advance(1); assert.equal(active(), (hovered + 1) % total);
root.emit('focusin', { target: posters[active()] });
const focused = active();
advance(6000); assert.equal(active(), focused);
root.emit('focusout', { relatedTarget: null });
page.hidden = true;
page.emit('visibilitychange');
advance(6000); assert.equal(active(), focused);
page.hidden = false;
page.emit('visibilitychange');
advance(3000); assert.equal(active(), (focused + 1) % total);
stage.emit('pointermove', { pointerType: 'mouse', clientX: 1000, clientY: 440 });
assert.deepEqual(moves.at(-1), [1, 1]);
reduced.matches = true;
reduced.emit('change');
assert.deepEqual(moves.at(-1), [0, 0]);
assert.equal(timers.size, 0, 'Reduced motion stops autoplay');
const stopped = moves.length;
stage.emit('pointermove', { pointerType: 'mouse', clientX: 1000, clientY: 440 });
assert.equal(moves.length, stopped);
for (const count of [3, total]) {
  for (let selected = 0; selected < count; selected++) {
    const visible = Array.from({ length: count }, (_, index) => posterPosition(index, selected, count))
      .filter(position => position !== 'offstage');
    assert.deepEqual(visible.sort(), ['center', 'left', 'right']);
  }
}
timers.clear();
for (const element of [root, stage, page, reduced, ...posters]) element.listeners = {};
initHero(root, () => undefined); // Poster navigation remains usable without decorative WebGL.
assert.equal(timers.size, 0, 'Reduced motion starts paused');
assert.equal(click(posters[0]), true);
assert.equal(active(), 0);
stage.emit('pointerleave');
console.log(`OK: ${total} posters, swipe/drag, trackpad, click suppression, vertical scroll, keyboard, autoplay and reduced motion`);
