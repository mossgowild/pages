// Dialogs that act as modal without showModal(). A modal dialog makes the whole page outside it inert, and switching
// that on and off restyles every node of the page — about 12,000 here, some 70ms on a phone-class CPU — in the frame
// that should start the detail's flight (docs/motion-performance.md F47–F48). These dialogs open with show() over the
// page (their own z-index and veil, in their classes) and take on what showModal() gave them: aria-modal for screen
// readers, Tab kept inside the topmost one, and Esc as its cancel event. Their full-screen box takes the page's taps.
const open: HTMLDialogElement[] = []
let shift = false

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
const focusables = (dialog: HTMLDialogElement) => [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(element => element.checkVisibility())

function keydown(event: KeyboardEvent) {
  const dialog = open.at(-1)
  if (!dialog || event.defaultPrevented) return
  if (event.key === 'Escape') {
    // A popover inside the dialog (the venue's menu of maps) takes the Esc itself, as it would over a modal dialog.
    if (dialog.querySelector(':popover-open')) return
    event.preventDefault()
    if (dialog.dispatchEvent(new Event('cancel', { cancelable: true }))) close(dialog)
    return
  }
  if (event.key !== 'Tab') return
  shift = event.shiftKey
  const items = focusables(dialog)
  const at = items.indexOf(document.activeElement as HTMLElement)
  if (!items.length) return event.preventDefault()
  const wrap = event.shiftKey ? (at <= 0 ? items.at(-1) : null) : (at === items.length - 1 ? items[0] : null)
  if (!wrap) return
  event.preventDefault()
  wrap.focus()
}

// Focus that leaves the topmost dialog anyway (a click on the page behind, Tab from an element outside the list) comes back.
function focusin(event: FocusEvent) {
  const dialog = open.at(-1)
  const target = event.target as Node
  if (!dialog || dialog.contains(target)) return
  const items = focusables(dialog)
  ;(shift ? items.at(-1) : items[0])?.focus()
}

// Opens the dialog over the page as the topmost modal one.
export function showModal(dialog: HTMLDialogElement) {
  dialog.setAttribute('aria-modal', 'true')
  dialog.show()
  if (!open.includes(dialog)) open.push(dialog)
  dialog.addEventListener('close', () => release(dialog), { once: true })
  if (open.length === 1) {
    document.addEventListener('keydown', keydown)
    document.addEventListener('focusin', focusin)
  }
}

// The dialog stays on screen but no longer holds the keyboard or hides the page from screen readers (the detail while it
// shrinks back, when the page is live again).
export function release(dialog: HTMLDialogElement) {
  const index = open.indexOf(dialog)
  if (index < 0) return
  open.splice(index, 1)
  dialog.removeAttribute('aria-modal')
  if (!open.length) {
    document.removeEventListener('keydown', keydown)
    document.removeEventListener('focusin', focusin)
  }
}

export function close(dialog: HTMLDialogElement) {
  release(dialog)
  dialog.close()
}
