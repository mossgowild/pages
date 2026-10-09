// The hero wall's layout (src/lib/wall.ts): sizes, columns, coverage of the turned stage, keyboard focus and download order.
import { expect, test } from 'bun:test'
import data from '../data/events.json'
import { baseWidth, columnCount, loadOrder, planeHeight, turnedReach, wallLayout, wallZoom } from '../src/lib/wall'

// The real posters (test/page.test.tsx checks that the page lists every featured one with its light versions).
const total = data.featured.length
const widths = [1.3, 0.85, 1.15, 0.75, 1.4, 0.95, 1.1, 0.8]

test('base widths, zoom and column counts', () => {
  // 270px on desktop and tablet, 200px on phones; above 1440px the wall scales instead of adding columns.
  expect(baseWidth(375)).toBe(200)
  expect(baseWidth(768)).toBe(270)
  expect(wallZoom(1440)).toBe(1)
  expect(wallZoom(1920)).toBeCloseTo(4 / 3, 9)
  expect(wallZoom(2560)).toBeCloseTo(16 / 9, 9)
  expect(columnCount(375)).toBe(5)
  expect(columnCount(768)).toBe(5)
  expect(columnCount(1440)).toBe(6) // six columns at the 1440px reference (question 12)
  expect(columnCount(1920 / wallZoom(1920))).toBe(6) // wider screens keep the 1440px composition
})

test('columns loop the whole list, tiles are square and the turned wall covers the stage', () => {
  for (const [screen, stage] of [[375, 534], [768, 788], [1440, 788], [1920, 788], [2560, 788]]) {
    const zoom = wallZoom(screen), width = screen / zoom, height = stage / zoom
    const layout = wallLayout(total, width, height), base = baseWidth(width)
    expect(layout.length).toBe(columnCount(width))
    const starts = layout.map((_, c) => Math.round((c * total) / layout.length))
    const span = layout.reduce((sum, column) => sum + column.tileWidth + 18, 0)
    expect(span * 1.04).toBeGreaterThanOrEqual(width + base) // the wall reaches past both stage edges
    // Turned 15° (Q14), the wall still covers the stage's corners: across its columns and along them (projected about 1.09).
    const reach = turnedReach(width, height), plane = planeHeight(width, height)
    expect(span * 1.04).toBeGreaterThanOrEqual(reach.across)
    expect(plane).toBeGreaterThanOrEqual(reach.along * 1.5)
    layout.forEach((column, c) => {
      // Each column loops the whole list from its own start (Q19); widths cycle through the pattern; tiles are square (Q14).
      expect(column.posters).toEqual([...Array(total).keys()].map(j => (starts[c] + j) % total))
      expect(column.tileWidth).toBeCloseTo(base * widths[c % widths.length], 9)
      for (const h of column.heights) expect(h).toBeCloseTo(column.tileWidth + 18, 9)
      // The track keeps its middle at the plane's middle and drifts within half a list, so it must reach half a plane past it.
      expect(column.copies * column.copyHeight / 2 - column.copyHeight / 2).toBeGreaterThanOrEqual(plane / 2)
      column.posters.forEach((_, k) => {
        // Only the starting stretch is focusable, one copy each.
        const copies = [...Array(column.copies).keys()].filter(copy => column.focusable(k, copy))
        const own = k < (starts[c + 1] ?? total) - starts[c]
        expect(copies.length).toBe(own ? 1 : 0)
        if (!own) return
        // Keyboard focus can centre the poster within the drift range, and at that offset the copy sits at the plane middle.
        const offset = column.centre(k)
        expect(Math.abs(offset)).toBeLessThanOrEqual(column.copyHeight / 2 + 1e-9)
        const top = column.heights.slice(0, k).reduce((sum, h) => sum + h, 0)
        const middle = column.base + copies[0] * column.copyHeight + top + column.heights[k] / 2 - offset
        expect(column.middle(k, copies[0])).toBeCloseTo(copies[0] * column.copyHeight + top + column.heights[k] / 2, 9)
        expect(middle).toBeCloseTo(plane / 2, 6)
        expect(column.wrap(offset)).toBeCloseTo(offset, 9) // the drift keeps offsets in the same range
      })
    })
  }
})

test('every poster has exactly one focusable copy, also with fewer posters than columns', () => {
  for (const count of [total, 3]) {
    const focusable = wallLayout(count, 1440, 788).flatMap(column =>
      column.posters.flatMap((poster, k) => [...Array(column.copies).keys()].filter(copy => column.focusable(k, copy)).map(() => poster)))
    expect(focusable.sort((a, b) => a - b)).toEqual([...Array(count).keys()])
  }
})

test('the tiles on the stage download first, then by how soon they drift in (Q34)', () => {
  expect(loadOrder([{ shown: false, time: Infinity }, { shown: true, time: 0 }, { shown: false, time: 4 }, { shown: true, time: 0 }, { shown: false, time: 1 }]))
    .toEqual([[1, 3], [4, 2, 0]])
})
