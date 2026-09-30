// Run with: node scripts/check_hero.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { initHero, nearest, reelMetrics, snapPoint, stepGoal, wrap } from './hero.mjs';

// Reel geometry: three cards of widths 100, 200 and 100, each followed by a 10px gap, loop every 430px.
const m = reelMetrics([0.5, 1, 0.5], 200, 10);
assert.deepEqual(m.centers, [50, 210, 370]);
assert.equal(m.loop, 430);
assert.equal(wrap(430, 420), 10);
assert.equal(wrap(-215, 420), 205);
assert.equal(nearest(m, 210), 1);
assert.equal(nearest(m, -60), 2, 'Positions wrap around the loop');
assert.equal(snapPoint(m, 120), 50, 'Snap to the closest card');
assert.equal(stepGoal(m, 50, 1), 210, 'Step forward to the next card');
assert.equal(stepGoal(m, 50, -1), -60, 'Step back across the loop seam');
assert.equal(nearest(m, stepGoal(m, 210, 2)), 0, 'Multiple steps wrap');

class Element {
  constructor(props = {}) {
    Object.assign(this, props);
    this.classes = new Set();
    this.classList = { add: name => this.classes.add(name) };
  }
}
const total = JSON.parse(readFileSync(new URL('../data/events.json', import.meta.url))).featured.length;
const clicks = [];
const links = Array.from({ length: total }, (_, index) => new Element({
  querySelector: () => ({ getAttribute: name => ({ src: `assets/posters/${index}.jpg`, width: '600', height: String(800 + index) })[name] })
}));
const details = links.map((_, index) => new Element({
  hidden: true,
  querySelector: selector => selector === 'h3' ? { textContent: `Event ${index}` } : { click: () => clicks.push(index) }
}));
const stage = new Element({ tabIndex: -1 });
const status = new Element({ textContent: '' });
const root = {
  querySelector: selector => ({ '.hero-stage': stage, '.hero-status': status })[selector],
  querySelectorAll: selector => selector === '.hero-poster' ? links : details
};

let engine;
initHero(root, (target, items, options) => {
  engine = { target, items, ...options };
  return {};
});
assert.equal(engine.target, stage);
assert.equal(engine.items.length, total, 'Every featured poster enters the reel');
assert.deepEqual(engine.items[2], { src: 'assets/posters/2.jpg', width: 600, height: 802 }, 'Poster size comes from the markup');
assert.equal(engine.start, 1, 'The second featured event opens the reel');
assert.equal(details.findIndex(detail => !detail.hidden), 1);
assert(stage.classes.has('is-webgl') && stage.tabIndex === 0, 'A running reel hides the list and takes keyboard focus');

engine.onChange(4, 'auto');
assert.deepEqual(details.map(detail => detail.hidden), details.map((_, index) => index !== 4), 'Details follow the reel');
assert.equal(status.textContent, '', 'Autoplay is not announced');
engine.onChange(5, 'user');
assert.equal(status.textContent, `6 / ${total} · Event 5`, 'User moves are announced');
engine.onSelect(5);
assert.deepEqual(clicks, [5], 'Selecting the current poster opens its event through the booking link');

const fallbackStage = new Element({ tabIndex: -1 });
initHero({ ...root, querySelector: selector => selector === '.hero-stage' ? fallbackStage : status }, () => null);
assert(!fallbackStage.classes.has('is-webgl') && fallbackStage.tabIndex === -1, 'Without WebGL2 the poster list stays in charge');
console.log(`OK: ${total} posters, reel wrap/snap/step, details sync, announcements, selection and no-WebGL fallback`);
