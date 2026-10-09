// Event details (docs/event-browsing.md Q20–Q25). A list row (the whole row, poster included), a poster on the hero wall
// or an #event-id address opens the event in one page-level <dialog>: a full-screen sheet on phones, a centred card up to
// 760px wide elsewhere, with the event's poster stage on top and its lineup, tickets, details, entry notes and venue
// below. App Store style, the sheet grows out of where it was opened — a row, or the wall poster turned with the wall —
// while its parts rise in, and shrinks back there when it closes. It closes on the round × button, a pull down from the
// top of the sheet (touch), Esc, the backdrop (wide screens) and the browser's back button: opening pushes #event-id, so
// the address can be shared. Reduced motion shows and hides at once. Without the script the rows keep their details.
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { EventView } from '../lib/guide'
import { EASE, OUT, reducedMotion, useIsomorphicLayoutEffect } from '../lib/motion'
import { EventDetails, EventStage } from './EventRow'

const BACK = 'cubic-bezier(.65,0,.35,1)'
const OPEN = 500, CLOSE = 420

export type DetailApi = { open: (row: HTMLElement, origin: HTMLElement) => void }
type Box = { left: number; top: number; width: number; height: number; radius: number; turn: number; open: boolean; pan?: string }
type Current = { row: HTMLElement; origin: HTMLElement; pushed: boolean; closing: boolean; pan?: string; from: Box | null; finish?: () => void }

const onScreen = (box: DOMRect) => box.width > 0 && box.bottom > 0 && box.top < innerHeight && box.right > 0 && box.left < innerWidth
// A poster shows its light version until its original (data-full) has downloaded (docs/event-browsing.md Q34).
const showsOriginal = (image: HTMLImageElement | null) => Boolean(image?.complete && image.naturalWidth > 0
  && image.currentSrc === new URL(image.dataset.full!, document.baseURI).href)
const rowById = (id: string) => {
  const row = id ? document.getElementById(id) : null
  return row?.classList.contains('event-row') ? row : null
}

// Where the sheet comes from and returns to, in viewport pixels: a row's own box, or the wall poster's square, which the
// wall turns by --wall-turn (its bounding box is that square's turned outline). Null when it is not on the screen.
function sourceOf(origin: HTMLElement): Box | null {
  if (!origin.isConnected || origin.closest('[hidden]')) return null
  if (origin.classList.contains('event-row')) {
    const box = origin.getBoundingClientRect()
    return onScreen(box) ? { left: box.left, top: box.top, width: box.width, height: box.height, radius: 24, turn: 0,
      open: origin.classList.contains('is-active') } : null
  }
  const inner = origin.querySelector<HTMLElement>('.drift-wall__inner')!
  const box = inner.getBoundingClientRect()
  const turn = parseFloat(getComputedStyle(origin).getPropertyValue('--wall-turn')) || 0
  const radians = Math.abs(turn) * Math.PI / 180
  const side = box.width / (Math.cos(radians) + Math.sin(radians))
  const x = box.left + box.width / 2, y = box.top + box.height / 2
  return onScreen(box) ? { left: x - side / 2, top: y - side / 2, width: side, height: side, radius: 14 * side / inner.offsetWidth, turn, open: false } : null
}

// How a wall poster shows its image right now (src/styles/hero.css, scripts/hero.mjs): uncropped across the square tile
// and panned along its length. As an object-position it is the same view of the poster in the sheet's stage.
function panOf(origin: HTMLElement) {
  const image = origin.querySelector('img')!
  const ratio = Number(image.getAttribute('height')) / Number(image.getAttribute('width'))
  if (Math.abs(ratio - 1) < .01) return '50% 50%'
  const [x, y] = (image.style.translate || '0 0').split(' ').map(value => Math.abs(parseFloat(value)) || 0)
  const place = (value: number) => `${Math.min(100, Math.max(0, value)).toFixed(2)}%`
  return ratio < 1 ? `${place(x / (1 - ratio))} 50%` : `50% ${place(y * ratio / (ratio - 1))}`
}

// A wall poster's look in the sheet's stage: the whole poster as the wall pans it, without the stage's downward fade.
const wallLook = (pan: string) => ({ objectPosition: pan, scale: '1', translate: '0px 0px' })
const unfaded = { maskSize: '100% 1000%, 100% 100%', webkitMaskSize: '100% 1000%, 100% 100%' }

// One page-level dialog over a half-dark veil; shrinking back, the dialog is an ordinary layer above the page that lets
// clicks through (is-leaving), with a veil of its own fading out in place of the backdrop.
const DIALOG = 'event-detail fixed inset-0 w-full h-dvh max-w-none max-h-none m-0 p-0 [border:0] [background:transparent] text-(--ink) overflow-hidden backdrop:sheet-veil backdrop:[animation:preview-backdrop_.4s_ease-out] motion-reduce:backdrop:[animation:none] [&.is-leaving]:z-1000 [&.is-leaving]:pointer-events-none [&.is-leaving]:before:sheet-veil [&.is-leaving]:before:fixed [&.is-leaving]:before:inset-0 [&.is-leaving]:before:[animation:preview-backdrop_.42s_ease-in_reverse_forwards] print:hidden!'
// The sheet: frosted glass (docs/glass-effects.md Q1), a centred card up to 760px wide with the event rows' light (the ::after
// in legacy.css), full screen on phones. While it flies it scales about its centre.
const SHEET = 'event-detail-sheet absolute top-[24px] bottom-[24px] left-[max(24px,calc(50%_-_380px))] right-[max(24px,calc(50%_-_380px))] flex flex-col [border:1px_solid_var(--glass-edge)] rounded-(--radius) [background:rgb(19_19_27/.5)] [-webkit-backdrop-filter:blur(28px)_saturate(1.5)] [backdrop-filter:blur(28px)_saturate(1.5)] [box-shadow:0_30px_80px_rgb(0_0_0/.55)] overflow-hidden wrap-anywhere [transform-origin:50%_0] [.is-flying_&]:[transform-origin:50%_50%] screen-to-700:inset-0 screen-to-700:[border:0] screen-to-700:rounded-none screen-to-700:[box-shadow:none]'
// The round × of the sheet and the preview: a control-size glass button with the pills' specular rim (legacy.css).
export const CLOSE_BUTTON = 'absolute top-[16px] right-[16px] z-5 w-(--control) h-(--control) p-0 [border:0] rounded-[999px] [background:rgb(10_10_16/.55)] [-webkit-backdrop-filter:blur(12px)] [backdrop-filter:blur(12px)] text-white cursor-pointer [--spec-base:rgb(255_255_255/.3)] hover:[--spec-base:#fff] focus-visible:[outline:2px_solid_var(--focus)] focus-visible:[outline-offset:3px] close-cross'

export const EventDetail = forwardRef<DetailApi, { events: EventView[] }>(function EventDetail({ events }, api) {
  const dialog = useRef<HTMLDialogElement>(null)
  const sheet = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const closer = useRef<HTMLButtonElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const current = useRef<Current | null>(null)
  // What the sheet shows: the event and whether its poster starts as the original (the row already showed it).
  const [shown, setShown] = useState<{ id: string; full: boolean; key: number } | null>(null)
  const motion = () => !reducedMotion()
  const parts = () => [...scroller.current!.querySelectorAll<HTMLElement>('.event-details .event-field'), closer.current!]

  // The sheet's box as keyframe values: left/top/right/bottom inside the full-screen dialog, so its contents lay out at
  // every size instead of stretching.
  const frame = (box: Box) => ({
    left: `${box.left}px`, top: `${box.top}px`,
    right: `${dialog.current!.clientWidth - box.left - box.width}px`, bottom: `${dialog.current!.clientHeight - box.top - box.height}px`,
    borderRadius: `${box.radius}px`, rotate: `${box.turn}deg`,
  })

  // The original replaces the light version once the sheet has settled, so it does not compete with the flight; the
  // light version stays on screen until the original has downloaded.
  function sharpen(image: HTMLImageElement | null) {
    if (!image?.dataset.full || image.getAttribute('srcset') === image.dataset.full) return
    if (image.complete) image.srcset = image.dataset.full
    else for (const type of ['load', 'error']) image.addEventListener(type, () => sharpen(image), { once: true })
  }

  function open(row: HTMLElement, origin: HTMLElement, { push = true, animate = true } = {}) {
    // A close still shrinking back finishes at once, so a tap on another event meanwhile is not lost.
    if (current.current?.closing) current.current.finish?.()
    if (current.current) return
    const from = animate && motion() ? sourceOf(origin) : null
    if (from?.turn) from.pan = panOf(origin)
    // An entry this script pushed (also when returned to with the forward button) is left with the back button.
    current.current = { row, origin, pushed: push || history.state?.event === row.id, closing: false, pan: from?.pan, from }
    if (push) history.pushState({ event: row.id }, '', `#${row.id}`)
    setShown({ id: row.id, full: showsOriginal(row.querySelector('.event-posters img')), key: Date.now() })
  }

  // Once the sheet holds the event: it opens, and flies in from its source.
  useIsomorphicLayoutEffect(() => {
    const state = current.current
    if (!shown || !state || state.closing) return
    const image = stage.current!.querySelector<HTMLImageElement>('.event-posters img')
    // A poster that has not downloaded yet starts hidden and fades in whole when it arrives (EventRow.tsx).
    if (image && !image.complete) {
      const posters = image.closest('.event-posters')!
      posters.classList.add('is-pending')
      image.addEventListener('load', () => posters.classList.remove('is-pending'), { once: true })
    }
    scroller.current!.scrollTop = 0
    // The details stay out of the layout until the sheet has landed: the opening frame and every frame of the flight
    // then lay out the poster stage alone (docs/event-browsing.md F42).
    if (state.from) dialog.current!.classList.add('is-flying', 'is-arriving')
    document.documentElement.classList.add('is-detail')
    document.dispatchEvent(new Event('detail-toggle'))
    dialog.current!.showModal()
    scroller.current!.focus({ preventScroll: true })
    state.origin.classList.add('event-detail-origin')
    if (state.from) flyIn(state.from, image)
    else sharpen(image)
  }, [shown?.key])

  // The sheet's box eases from the source's to its own while the poster stage grows from the source's height into the
  // sheet's: a collapsed row's poster takes the open look, a wall poster turns from its view on the wall into the
  // stage's crop, and their text fades in. The flight holds its first frame until a downloaded poster has decoded (at
  // most 0.15s), so the poster never appears halfway; one still downloading does not hold it. Once the sheet lands, the
  // details and the × rise in on the Card Nav rhythm (50px, 0.08s apart) and the poster takes its original.
  function flyIn(from: Box, image: HTMLImageElement | null) {
    const to = sheet.current!.getBoundingClientRect()
    const box = stage.current!
    const radius = parseFloat(getComputedStyle(sheet.current!).borderTopLeftRadius)
    const timing = { duration: OPEN, easing: OUT }
    const height = box.getBoundingClientRect().height
    const flight = [
      sheet.current!.animate([frame(from), frame({ left: to.left, top: to.top, width: to.width, height: to.height, radius, turn: 0, open: true })], timing),
      box.animate([{ minHeight: `${from.height}px` }, { minHeight: `${height}px` }], timing),
    ]
    if (!from.open) {
      flight.push(box.querySelector('.event-summary')!.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 150, easing: EASE, fill: 'backwards' }))
      if (from.pan) {
        flight.push(box.querySelector('.event-posters')!.animate([{ offset: 0, ...unfaded }], timing))
        if (image) flight.push(image.animate([{ offset: 0, ...wallLook(from.pan) }], timing))
      } else {
        flight.push(box.animate([{ '--open': 0 }, { '--open': 1 }], timing))
        if (image) flight.push(image.animate([{ filter: 'grayscale(.3)' }, { filter: 'grayscale(0)' }], timing))
      }
    }
    flight.forEach(animation => animation.pause())
    const play = () => flight.forEach(animation => animation.play())
    if (image?.complete) Promise.race([image.decode().catch(() => {}), new Promise(resolve => setTimeout(resolve, 150))]).then(play)
    else play()
    flight[0].finished.then(() => {
      dialog.current!.classList.remove('is-flying', 'is-arriving')
      sharpen(image)
      parts().forEach((part, index) => part.animate(
        part === closer.current ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, translate: '0 50px' }, { opacity: 1, translate: '0 0' }],
        { duration: 400, delay: index * 80, easing: EASE, fill: 'backwards' }))
    }, () => {})
  }

  // Back to the source: the parts fade, the content glides back to the top as the sheet shrinks into the source's box,
  // and the stage takes the source's look again. A source that has left the screen gets a short shrink and fade in place.
  function flyOut(to: Box | null) {
    const element = sheet.current!
    const box = element.getBoundingClientRect()
    const radius = parseFloat(getComputedStyle(element).borderTopLeftRadius)
    element.style.removeProperty('transform')
    element.style.removeProperty('border-radius')
    dialog.current!.classList.add('is-flying')
    parts().forEach(part => part.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, easing: 'ease-out', fill: 'forwards' }))
    if (!to) return element.animate([{ opacity: 1, scale: 1 }, { opacity: 0, scale: .92 }], { duration: 250, easing: BACK, fill: 'forwards' }).finished
    const stageBox = stage.current!
    const offset = scroller.current!.scrollTop
    scroller.current!.scrollTop = 0
    const timing = { duration: CLOSE, easing: BACK, fill: 'forwards' as const }
    if (offset) scroller.current!.animate([{ translate: `0 ${-offset}px` }, { translate: '0 0' }], timing)
    const shrinking = element.animate([frame({ left: box.left, top: box.top, width: box.width, height: box.height, radius, turn: 0, open: true }), frame(to)], timing)
    stageBox.animate([{ minHeight: `${stageBox.getBoundingClientRect().height}px` }, { minHeight: `${to.height}px` }], timing)
    if (!to.open) {
      stageBox.querySelector('.event-summary')!.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: 'ease-out', fill: 'forwards' })
      const image = stageBox.querySelector<HTMLImageElement>('.event-posters img')
      if (to.turn) {
        stageBox.querySelector('.event-posters')!.animate([{ offset: 1, ...unfaded }], timing)
        if (image && current.current?.pan) image.animate([{ offset: 1, ...wallLook(current.current.pan) }], timing)
      } else {
        stageBox.animate([{ '--open': 1 }, { '--open': 0 }], timing)
        image?.animate([{ filter: 'grayscale(0)' }, { filter: 'grayscale(.3)' }], timing)
      }
    }
    return shrinking.finished
  }

  function close({ fromHistory = false } = {}) {
    const state = current.current
    if (!state || state.closing) return
    state.closing = true
    const { row, origin, pushed } = state
    // Leave the pushed entry; an opened address (a shared link) drops its #event-id so a reload shows the list.
    if (pushed && !fromHistory) history.back()
    else if (!pushed && location.hash === `#${row.id}`) history.replaceState(history.state, '', location.pathname + location.search)
    let done = false
    const finish = state.finish = () => {
      if (done) return
      done = true
      sheet.current!.getAnimations({ subtree: true }).forEach(animation => animation.cancel())
      dialog.current!.close()
      dialog.current!.classList.remove('is-flying', 'is-arriving', 'is-leaving')
      sheet.current!.style.removeProperty('transform')
      sheet.current!.style.removeProperty('border-radius')
      dialog.current!.style.removeProperty('--veil')
      origin.classList.remove('event-detail-origin')
      document.documentElement.classList.remove('is-detail')
      document.dispatchEvent(new Event('detail-toggle'))
      ;(origin.classList.contains('event-row') ? origin.querySelector<HTMLElement>('.event-toggle')! : origin).focus({ preventScroll: true })
      current.current = null
      setShown(null)
    }
    if (!motion()) return finish()
    // While it shrinks back the page is live again: the sheet leaves the top layer for an ordinary, click-through layer
    // above the page (DIALOG's is-leaving), so a tap on another event during the flight opens it.
    dialog.current!.close()
    dialog.current!.show()
    dialog.current!.classList.add('is-leaving')
    flyOut(sourceOf(origin)).then(finish, finish)
  }

  useImperativeHandle(api, () => ({ open: (row, origin) => open(row, origin) }))

  useEffect(() => {
    const element = dialog.current!
    // A poster on the hero wall (its copies included, drawn by the wall's script) opens its event.
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const poster = (event.target as Element).closest<HTMLAnchorElement>('.spotlight-card')
      const row = poster && rowById(poster.hash.slice(1))
      if (!row) return
      event.preventDefault()
      open(row, poster!)
    }
    const cancel = (event: Event) => {
      event.preventDefault()
      close()
    }
    // Wide screens: the dialog fills the screen around the card, so a press beside the card lands on the dialog itself.
    const backdrop = (event: MouseEvent) => { if (event.target === element) close() }
    // The address: back and forward close and reopen; an address naming an event (a shared link) opens it from its row.
    const reveal = (row: HTMLElement, animate: boolean) => {
      if (!row.closest('[hidden]')) row.scrollIntoView({ block: 'center', behavior: 'instant' })
      open(row, row, { push: false, animate })
    }
    const popstate = () => {
      const row = rowById(location.hash.slice(1))
      const state = current.current
      if (state) {
        if (!state.closing && row !== state.row) close({ fromHistory: true })
      } else if (row) reveal(row, true)
    }
    document.addEventListener('click', click)
    element.addEventListener('cancel', cancel)
    element.addEventListener('click', backdrop)
    addEventListener('popstate', popstate)
    const linked = rowById(location.hash.slice(1))
    if (linked) reveal(linked, false)
    return () => {
      document.removeEventListener('click', click)
      element.removeEventListener('cancel', cancel)
      element.removeEventListener('click', backdrop)
      removeEventListener('popstate', popstate)
    }
  }, [])

  // Touch: a pull down while the sheet is scrolled to its top follows the finger — the sheet shrinks and the veil thins —
  // and closes past a third of the sheet or on a quick flick (0.5px/ms), as the filter sheets; otherwise it springs back.
  useEffect(() => {
    const element = sheet.current!
    let pull: { start: number; y: number; time: number; speed: number; active: boolean; top: boolean } | null = null
    const start = (event: TouchEvent) => {
      if (!current.current || current.current.closing || event.touches.length !== 1) return
      pull = { start: event.touches[0].clientY, y: 0, time: event.timeStamp, speed: 0, active: false, top: scroller.current!.scrollTop <= 0 }
    }
    const move = (event: TouchEvent) => {
      if (!pull?.top || event.touches.length !== 1) return
      const y = event.touches[0].clientY - pull.start
      if (!pull.active) {
        // Moving up scrolls the sheet as usual; only a pull down from the top takes over.
        if (y < 0 || scroller.current!.scrollTop > 0) pull = null
        if (!pull || y < 6) return
        pull.active = true
      }
      event.preventDefault()
      pull.speed = (y - pull.y) / Math.max(1, event.timeStamp - pull.time)
      pull.y = y
      pull.time = event.timeStamp
      const progress = Math.min(1, Math.max(0, y) / element.offsetHeight)
      element.style.transform = `translateY(${(Math.max(0, y) * .5).toFixed(1)}px) scale(${(1 - progress * .25).toFixed(3)})`
      element.style.borderRadius = `${Math.min(24, Math.max(0, y) / 4).toFixed(1)}px`
      dialog.current!.style.setProperty('--veil', (1 - progress).toFixed(3))
    }
    const release = () => {
      if (!pull?.active) {
        pull = null
        return
      }
      const { y, speed } = pull
      pull = null
      if (y > element.offsetHeight / 3 || speed > .5) return close()
      const from = element.style.transform, radius = element.style.borderRadius
      element.style.removeProperty('transform')
      element.style.removeProperty('border-radius')
      dialog.current!.style.removeProperty('--veil')
      if (motion()) element.animate([{ transform: from, borderRadius: radius }, { transform: 'none' }], { duration: 300, easing: OUT })
    }
    element.addEventListener('touchstart', start, { passive: true })
    element.addEventListener('touchmove', move, { passive: false })
    element.addEventListener('touchend', release)
    element.addEventListener('touchcancel', release)
    return () => {
      element.removeEventListener('touchstart', start)
      element.removeEventListener('touchmove', move)
      element.removeEventListener('touchend', release)
      element.removeEventListener('touchcancel', release)
    }
  }, [])

  const event = shown && events.find(item => item.id === shown.id)
  return (
    <dialog ref={dialog} className={DIALOG} id="event-detail" aria-labelledby="event-detail-title">
      <div ref={sheet} className={SHEET}>
        <div ref={scroller} className="event-detail-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain [outline:none] [.is-flying_&]:overflow-hidden" tabIndex={-1}>
          {event && <EventStage key={shown.key} ref={stage} event={event} sheet={{ full: shown.full }} />}
          {event && <EventDetails key={`${shown.key}-details`} event={event} />}
        </div>
        <button ref={closer} type="button" className={`event-detail-close ${CLOSE_BUTTON} [.is-arriving_&]:opacity-0 screen-to-700:top-[max(12px,env(safe-area-inset-top))] screen-to-700:right-[12px]`}
          aria-label="关闭详情" onClick={() => close()}><span aria-hidden="true" /></button>
      </div>
    </dialog>
  )
})
