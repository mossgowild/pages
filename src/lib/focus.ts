// Focus the page moves by script — back to where a sheet, a preview or a picker was opened, or into a calendar as it
// opens — shows its ring only when the last input was a key. After a tap or a click Safari would ring it as if moved by
// keyboard, and the hero wall would take a ringed poster for keyboard focus (docs/event-browsing.md); Chrome already
// decides so on its own. Browsers without the focusVisible option ring it as before.
let keyed = false
if (typeof document !== 'undefined') {
  document.addEventListener('keydown', event => { if (!event.metaKey && !event.ctrlKey && !event.altKey) keyed = true }, true)
  document.addEventListener('pointerdown', () => { keyed = false }, true)
}

export function moveFocus(element: HTMLElement | null | undefined) {
  element?.focus({ preventScroll: true, focusVisible: keyed })
}
