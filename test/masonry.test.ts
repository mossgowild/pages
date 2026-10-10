// The list's masonry layout (src/lib/masonry.ts, docs/event-browsing.md Q46–Q47).
import { expect, test } from 'bun:test'
import { GAP, place } from '../src/lib/masonry'

test('each card goes into the shortest column, the columns edge to edge with the gap between', () => {
  const { cardWidth, spots, height } = place([300, 100, 200, 50, 80], 3, 3 * 100 + 2 * GAP)
  expect(cardWidth).toBe(100)
  // 300, 100 and 200 open the three columns; 50 goes under the 100, then 80 under the 100 + 50.
  expect(spots).toEqual([
    { x: 0, y: 0 }, { x: 100 + GAP, y: 0 }, { x: 2 * (100 + GAP), y: 0 },
    { x: 100 + GAP, y: 100 + GAP }, { x: 100 + GAP, y: 150 + 2 * GAP },
  ])
  expect(height).toBe(300)
})

test('one column stacks the cards in order; no cards leave no height', () => {
  expect(place([10, 20], 1, 50).spots).toEqual([{ x: 0, y: 0 }, { x: 0, y: 10 + GAP }])
  expect(place([], 4, 400).height).toBe(0)
})
