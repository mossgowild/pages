// React Bits Masonry's layout (docs/event-browsing.md Q46–Q47): the column count follows the original's media queries on
// the window's width, and each card in turn goes into the column that is shortest so far. The columns run edge to edge
// with the gap between them, so the cards line up with the toolbar and the day headings.
export const GAP = 12
const COLUMNS = [['(min-width: 1500px)', 5], ['(min-width: 1000px)', 4], ['(min-width: 600px)', 3], ['(min-width: 400px)', 2]] as const

export const columnCount = () => COLUMNS.find(([query]) => matchMedia(query).matches)?.[1] ?? 1

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
