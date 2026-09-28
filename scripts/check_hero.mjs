// Run with: node scripts/check_hero.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { initHero, posterPosition } from './hero.mjs';

class Element {
  constructor() {
    this.listeners = {};
    this.dataset = {};
    this.hidden = false;
    this.properties = {};
    this.style = { setProperty: (name, value) => { this.properties[name] = value; } };
  }
  addEventListener(type, callback) { (this.listeners[type] ??= []).push(callback); }
  setAttribute(name, value) { this.properties[name] = value; }
  contains(node) { return this.children?.includes(node) ?? false; }
  emit(type, event = {}) {
    event.target ??= this;
    for (const callback of this.listeners[type] ?? []) callback(event);
  }
  matches() { return this.keyboardFocus; }
  closest() { return this; }
  focus() { this.keyboardFocus = true; this.emit('focus'); }
  getBoundingClientRect() { return { left: 0, top: 0, width: 1000, height: 440 }; }
}

const reduced = new Element();
reduced.matches = false;
globalThis.matchMedia = query => query.includes('reduced-motion') ? reduced : { matches: true };
const root = new Element();
const stage = new Element();
const controls = new Element();
const autoplayButton = new Element();
const page = new Element();
root.ownerDocument = page;
const counter = new Element();
const status = new Element();
const total = JSON.parse(readFileSync(new URL('../data/events.json', import.meta.url))).featured.length;
const posters = Array.from({ length: total }, () => new Element());
const details = posters.map((_, index) => ({ hidden: false, querySelector: () => ({ textContent: `Event ${index}` }) }));
const elements = { '.hero-stage': stage, '.hero-controls': controls, '.hero-counter': counter,
  '.hero-status': status, '.hero-autoplay': autoplayButton };
root.querySelector = selector => elements[selector];
root.querySelectorAll = selector => selector === '.hero-poster' ? posters : details;
root.children = [...posters, controls, autoplayButton];
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
const step = value => controls.emit('click', { target: { closest: () => ({ dataset: { step: value } }) } });
const click = poster => {
  const event = { prevented: false, preventDefault() { this.prevented = true; } };
  poster.emit('click', event);
  return event.prevented;
};

assert.equal(active(), 1);
assert.deepEqual(details.map(detail => detail.hidden), posters.map((_, index) => index !== 1));
assert.equal(controls.hidden, false);
advance(2999); assert.equal(active(), 1);
advance(1); assert.equal(active(), 2, 'Advance at 3 seconds');
assert.equal(status.properties['aria-live'], 'off');
step(-1);
step(-1); assert.equal(active(), 0);
step(-1); assert.equal(active(), total - 1);
step(1); assert.equal(active(), 0);
step(-1);
assert.equal(counter.textContent, `${total} / ${total}`);
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
advance(2500);
step(1);
const manual = active();
advance(500); assert.equal(active(), manual, 'Manual selection resets the timer');
advance(2500); assert.equal(active(), (manual + 1) % total);
autoplayButton.emit('click');
const paused = active();
advance(9000); assert.equal(active(), paused);
assert.equal(autoplayButton.properties['aria-label'], '继续自动轮播');
autoplayButton.emit('click');
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
assert.equal(autoplayButton.properties['aria-label'], '继续自动轮播');
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
for (const element of [root, stage, controls, autoplayButton, page, reduced, ...posters]) element.listeners = {};
initHero(root, () => undefined); // Controls remain usable when decorative WebGL is unavailable.
assert.equal(timers.size, 0, 'Reduced motion starts paused');
assert.equal(click(posters[0]), true);
assert.equal(active(), 0);
stage.emit('pointerleave');
console.log(`OK: ${total} posters, 3-second autoplay, pause/resume, manual timer reset, hover/focus/background pause, reduced motion`);
