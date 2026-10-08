// Run with: node scripts/check_hero.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { baseWidth, columnCount, loadOrder, planeHeight, turnedReach, wallLayout, wallZoom } from './hero.mjs';

// Base widths: 270px on desktop and tablet, 200px on phones; above 1440px the wall scales instead of adding columns.
assert.equal(baseWidth(375), 200);
assert.equal(baseWidth(768), 270);
assert.equal(wallZoom(1440), 1);
assert.ok(Math.abs(wallZoom(1920) - 4 / 3) < 1e-9 && Math.abs(wallZoom(2560) - 16 / 9) < 1e-9);
assert.equal(columnCount(375), 5);
assert.equal(columnCount(768), 5);
assert.equal(columnCount(1440), 6, 'Six columns at the 1440px reference (question 12)');
assert.equal(columnCount(1920 / wallZoom(1920)), 6, 'Wider screens keep the 1440px composition');

// The real posters (test/page.test.tsx checks that the page lists every featured one with its light versions).
const total = JSON.parse(readFileSync(new URL('../data/events.json', import.meta.url))).featured.length;
const widths = [1.3, 0.85, 1.15, 0.75, 1.4, 0.95, 1.1, 0.8];

for (const [screen, stage] of [[375, 534], [768, 788], [1440, 788], [1920, 788], [2560, 788]]) {
  const zoom = wallZoom(screen), width = screen / zoom, height = stage / zoom;
  const layout = wallLayout(total, width, height), base = baseWidth(width);
  assert.equal(layout.length, columnCount(width));
  const starts = layout.map((_, c) => Math.round((c * total) / layout.length));
  const span = layout.reduce((sum, column) => sum + column.tileWidth + 18, 0);
  assert.ok(span * 1.04 >= width + base, `${screen}px: the wall reaches past both stage edges`);
  // Turned 15° (Q14), the wall still covers the stage's corners: across its columns and along them (projected about 1.09).
  const reach = turnedReach(width, height), plane = planeHeight(width, height);
  assert.ok(span * 1.04 >= reach.across && plane >= reach.along * 1.5, `${screen}px: the turned wall covers the corners`);
  layout.forEach((column, c) => {
    assert.deepEqual(column.posters, [...Array(total).keys()].map(j => (starts[c] + j) % total),
      'Each column loops the whole list from its own start (Q19)');
    assert.ok(Math.abs(column.tileWidth - base * widths[c % widths.length]) < 1e-9, 'Column widths cycle through the pattern');
    assert.ok(column.heights.every(h => Math.abs(h - (column.tileWidth + 18)) < 1e-9), 'Tiles are square (Q14)');
    // The track keeps its middle at the plane's middle and drifts within half a list, so it must reach half a plane past it.
    assert.ok(column.copies * column.copyHeight / 2 - column.copyHeight / 2 >= plane / 2,
      `${screen}px column ${c}: the track covers the plane at every drift offset`);
    column.posters.forEach((_, k) => {
      const copies = [...Array(column.copies).keys()].filter(copy => column.focusable(k, copy));
      const own = k < (starts[c + 1] ?? total) - starts[c];
      assert.equal(copies.length, own ? 1 : 0, 'Only the starting stretch is focusable, one copy each');
      if (!own) return;
      const offset = column.centre(k);
      assert.ok(Math.abs(offset) <= column.copyHeight / 2 + 1e-9, 'Keyboard focus can centre the poster within the drift range');
      const top = column.heights.slice(0, k).reduce((sum, h) => sum + h, 0);
      const middle = column.base + copies[0] * column.copyHeight + top + column.heights[k] / 2 - offset;
      assert.ok(Math.abs(column.middle(k, copies[0]) - (copies[0] * column.copyHeight + top + column.heights[k] / 2)) < 1e-9);
      assert.ok(Math.abs(middle - plane / 2) < 1e-6, 'At that offset the focusable copy sits at the plane middle');
      assert.ok(Math.abs(column.wrap(offset) - offset) < 1e-9, 'The drift keeps offsets in the same range');
    });
  });
}

// Every poster has exactly one focusable copy on the whole wall, also with fewer posters than columns.
for (const count of [total, 3]) {
  const focusable = wallLayout(count, 1440, 788).flatMap(column =>
    column.posters.flatMap((poster, k) => [...Array(column.copies).keys()].filter(copy => column.focusable(k, copy)).map(() => poster)));
  assert.deepEqual(focusable.sort((a, b) => a - b), [...Array(count).keys()], `${count} posters: one focusable copy each`);
}
// The tiles on screen download first and at high priority, the rest after them (Q34).
assert.deepEqual(loadOrder([{ shown: false, time: Infinity }, { shown: true, time: 0 }, { shown: false, time: 4 }, { shown: true, time: 0 }, { shown: false, time: 1 }]),
  [[1, 3], [4, 2, 0]], 'The posters on the stage first, then by how soon they drift in, the ones drifting away last');
console.log(`OK: ${total} posters; 6 columns from 1440px up (scaled), mixed square tiles, whole-list columns, turned coverage, focus and on-screen posters first`);
