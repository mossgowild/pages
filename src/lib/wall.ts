// The hero wall's layout, adapted from React Bits Drift Wall (MIT + Commons Clause, see public/assets/react-bits.LICENSE.txt);
// src/client/hero.ts builds and drives the wall from it.

// Drift Wall defaults, except tiles without dimming or the dark tile overlay (hero-mobile questions 5 and 7; the mask
// lives in src/styles/hero.css), square tiles of mixed sizes (questions 11–12 and Q14): column widths cycle through WIDTHS
// times the base width, the whole wall turns ROTATE degrees in the screen plane (Q14), and each poster pans inside its
// tile as the tile drifts down the stage (Q14 and the L1 changes): uncropped at the tile's width (a landscape poster at its
// height), it shows its top (left) edge at the top of the stage and its bottom (right) edge at the bottom, so one pass
// across the stage shows the whole poster.
export const GAP = 18
const WIDTHS = [1.3, 0.85, 1.15, 0.75, 1.4, 0.95, 1.1, 0.8]
export const ROTATE = 15
const MIN_COLUMNS = 5
const SPEED = 42
const VARIANCE = 0.45
export const PARALLAX = 0.6
export const TILT = 16
export const TURN = -14
export const DEPTH = 120
export const SCALE = 1.18
// The plane spans 1.6 times the stage's reach along the turned columns, the span the original sizes its copies for
// (1.6 stage heights before the turn); the stage shows its middle.
const PLANE_SPAN = 1.6
// Above this width the wall keeps its composition and scales up instead of adding columns.
const REFERENCE_WIDTH = 1440

// The scaled, turned and pushed-back wall projects to about 1.04 times its own width (1.18 · cos 14° · 1200 / 1320).
export const PROJECTION = SCALE * Math.cos((TURN * Math.PI) / 180) * (1200 / (1200 + DEPTH))
export const baseWidth = (width: number) => (width > 700 ? 270 : 200)
export const wallZoom = (width: number) => Math.max(1, width / REFERENCE_WIDTH)
const columnWidth = (column: number, base: number) => base * WIDTHS[column % WIDTHS.length]
// The fewest columns (at least five) whose projected wall reaches a base width past the stage ("占满宽度", question 3).
export function columnCount(width: number) {
  const base = baseWidth(width)
  let columns = 0, span = 0
  while (columns < MIN_COLUMNS || span * PROJECTION < width + base) span += columnWidth(columns++, base) + GAP
  return columns
}
// How far a stage of this size reaches across the wall once the wall turns ROTATE degrees, in projected pixels.
export function turnedReach(width: number, height: number) {
  const turn = (ROTATE * Math.PI) / 180
  return { across: width * Math.cos(turn) + height * Math.sin(turn), along: width * Math.sin(turn) + height * Math.cos(turn) }
}

const columnFactor = (index: number) => 1 + VARIANCE * ((((index * 0.6180339887 + 0.35) % 1) * 2) - 1)

// Every column loops the whole poster list like an endless carousel, starting where the list splits evenly into the
// columns (Q19: the first column from poster 1, the second from poster 8 when 41 posters fill six). Each track repeats
// its list and keeps its middle at the plane's middle; drift offsets stay within half a list of 0, so the track covers
// the plane above and below at every offset. One copy of every poster is focusable: in the column whose starting
// stretch holds it, the copy that a drift offset can bring to the plane's middle.
export const planeHeight = (width: number, height: number) => PLANE_SPAN * turnedReach(width, height).along

// Download order for the tiles' light posters (docs/event-browsing.md Q34): the tiles on the stage, then the rest by how
// soon they drift onto it (Infinity for those drifting away). Many tiles share one file; its first place sets its turn.
export function loadOrder(places: { shown: boolean; time: number }[]) {
  const indices = places.map((_, index) => index)
  return [indices.filter(index => places[index].shown),
    indices.filter(index => !places[index].shown).sort((a, b) => (places[a].time - places[b].time) || 0)]
}

export type Column = ReturnType<typeof wallLayout>[number]

export function wallLayout(count: number, width: number, height: number) {
  const plane = planeHeight(width, height)
  const columns = columnCount(width), base = baseWidth(width)
  const first = (column: number) => Math.round((column * count) / columns)
  return Array.from({ length: columns }, (_, column) => {
    const posters = Array.from({ length: count }, (_, j) => (first(column) + j) % count)
    const own = first(column + 1) - first(column)
    const tileWidth = columnWidth(column, base)
    const heights = posters.map(() => tileWidth + GAP)
    const tops = heights.map((_, k) => heights.slice(0, k).reduce((sum, h) => sum + h, 0))
    const copyHeight = tops.at(-1)! + heights.at(-1)!
    const copies = Math.ceil(plane / copyHeight) + 1
    const trackHeight = copies * copyHeight
    const middle = (k: number) => tops[k] + heights[k] / 2
    const focusCopy = posters.map((_, k) => Math.round((trackHeight / 2 - middle(k)) / copyHeight))
    const wrap = (offset: number) => offset - copyHeight * Math.round(offset / copyHeight)
    const top = (plane - trackHeight) / 2
    return {
      posters, tileWidth, heights, copyHeight, copies, wrap,
      base: top,
      // The column opens on its starting poster at the top of the stage.
      start: wrap(top - (plane - height) / 2),
      velocity: SPEED * columnFactor(column) * (column % 2 === 0 ? 1 : -1),
      // Drift offset that puts poster k's focusable copy at the plane's middle; within half a list of 0.
      centre: (k: number) => focusCopy[k] * copyHeight + middle(k) - trackHeight / 2,
      // Middle of tile k in copy `copy`, measured from the top of the track.
      middle: (k: number, copy: number) => copy * copyHeight + middle(k),
      focusable: (k: number, copy: number) => k < own && copy === focusCopy[k],
    }
  })
}
