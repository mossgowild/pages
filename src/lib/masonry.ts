// React Bits Masonry's layout (docs/event-browsing.md Q47): each card in turn goes into the column that is shortest so far.
// The list has as many columns as fit with no card narrower than 260px (Q53, Q55, in place of the original's breakpoints on
// the window's width), edge to edge with the gap between them, so the cards line up with the toolbar and the day headings.
export const GAP = 12
export const MIN_WIDTH = 260

export const columnCount = (width: number) => Math.max(1, Math.floor((width + GAP) / (MIN_WIDTH + GAP)))

// Where each card goes, from the cards' heights in order: their left and top within the list, and the list's height.
export function place(heights: number[], columns: number, width: number) {
  const cardWidth = (width - GAP * (columns - 1)) / columns
  const tops = new Array<number>(columns).fill(0)
  const spots = heights.map(height => {
    const column = tops.indexOf(Math.min(...tops))
    const spot = { x: column * (cardWidth + GAP), y: tops[column] }
    tops[column] += height + GAP
    return spot
  })
  return { cardWidth, spots, height: Math.max(0, ...tops.map(top => top - GAP)) }
}
