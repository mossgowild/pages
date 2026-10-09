// The filter pickers: a pill trigger in the panel and a top-layer popover at the end of the page (a dropdown under the
// trigger on wide screens, a bottom sheet over its own veil up to 768px). Three contents use it: a searchable
// multi-select list of venues grouped by city, the same list for each genre family's sub-genres behind the arrow of its
// split chip, and a date-range calendar. Motion (questions 196–198): the rhythm of the filter panel's React Bits Card
// Nav — the sheet comes in over 0.4s with the veil, phones from the bottom edge and wide screens wiping down from the
// trigger, and the title row, the list and 完成 rise 50px and fade in 0.08s apart from 0.3s; closing plays it backwards.
// A sheet let go past the drag threshold leaves from where it was dropped. Reduced motion shows and hides at once.
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode, type Ref } from 'react'
import { shortDate } from '../lib/filters'
import { eased, OUT, reducedMotion } from '../lib/motion'

const narrow = () => matchMedia('(max-width: 768px)').matches
const icon = (path: ReactNode) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{path}</svg>
)
export const CHEVRON = icon(<path d="m3 6 5 5 5-5" />)
export const CALENDAR = icon(<><rect x="2" y="3" width="12" height="11" rx="2" /><path d="M2 7h12M5 1.5v3M11 1.5v3" /></>)
const MAGNIFIER = icon(<><circle cx="7" cy="7" r="5" /><path d="m11 11 3.5 3.5" /></>)

// Phones (up to 768px) get a bottom sheet instead of a dropdown.
const TRIGGER = 'picker-trigger relative specular-rim press flex items-center gap-2 w-full min-w-0 h-(--control) [padding:0_12px_0_var(--control-pad)] [border:1px_solid_rgb(255_255_255/.22)] rounded-[999px] [background:var(--glass-pill)] text-(--ink) [font:500_13px/1_var(--font-display)] text-left cursor-pointer [&_svg]:flex-none [&_svg]:[transition:transform_.2s] [&[aria-haspopup=listbox][aria-expanded=true]_svg]:[transform:rotate(180deg)]'
// Its own line box holds the whole glyph: overflow stays hidden for the ellipsis, and a 1.0 line box would crop the tops.
const VALUE = 'picker-value flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap leading-[1.4] text-(--muted) in-[.has-value]:text-(--ink)'
const COUNT = 'picker-count flex-none min-w-5 [padding:3px_7px] rounded-[999px] [background:var(--brand-pink)] text-white text-[11px] text-center'
// On phones the popover fills the screen: the sheet sits at the bottom over the popover's own veil, and only the two
// take taps. The popover's ::backdrop cannot be the veil, as browsers fix it at pointer-events: none and a tap on it
// would reach the filter underneath (docs/event-filters.md F9). Once closing has begun the veil lets taps through, so
// the page answers at once while the sheet leaves.
const POP = 'picker-pop fixed [inset:auto] m-0 p-0 [border:0] [background:none] text-(--ink) overflow-visible touch-manipulation open:grid screen-to-768:[inset:0] screen-to-768:w-auto screen-to-768:h-auto screen-to-768:max-w-none screen-to-768:pointer-events-none'
const VEIL = 'picker-veil hidden screen-to-768:block [grid-area:1/1] [background:rgb(5_5_11/.55)] [-webkit-backdrop-filter:blur(4px)] [backdrop-filter:blur(4px)] pointer-events-auto in-[.is-closing]:pointer-events-none'
const SHEET = 'picker-sheet pointer-events-auto [grid-area:1/1] screen-to-768:self-end min-w-0 flex flex-col p-2.5 [border:1px_solid_var(--glass-edge)] rounded-(--radius) [background:rgb(16_15_24/.95)] [box-shadow:var(--glass-shadow)] [-webkit-backdrop-filter:var(--glass-blur)] [backdrop-filter:var(--glass-blur)] screen-to-768:[padding:10px_16px_calc(16px_+_env(safe-area-inset-bottom))] screen-to-768:[border-bottom:0] screen-to-768:[border-radius:var(--radius)_var(--radius)_0_0] screen-to-768:[background:rgb(16_15_24/.96)]'
const HANDLE = 'picker-handle hidden screen-to-768:block screen-to-768:w-9 screen-to-768:h-1 screen-to-768:[margin:0_auto_12px] screen-to-768:rounded-[2px] screen-to-768:[background:rgb(255_255_255/.3)] screen-to-768:touch-none'
const HEAD = 'picker-head hidden screen-to-768:flex screen-to-768:items-center screen-to-768:justify-between screen-to-768:[margin:0_4px_10px] screen-to-768:[font:700_18px/1.2_var(--font-display)] screen-to-768:touch-none'
const CLEAR = 'picker-clear screen-to-768:min-h-(--control) screen-to-768:[padding:0_4px] screen-to-768:[border:0] screen-to-768:[background:none] screen-to-768:text-(--brand-pink) screen-to-768:[font:600_13px_var(--font-display)] screen-to-768:cursor-pointer'
const DONE = 'picker-done hidden screen-to-768:block screen-to-768:w-full screen-to-768:h-(--control) screen-to-768:mt-2 screen-to-768:[border:0] screen-to-768:rounded-[999px] screen-to-768:[background:#fff] screen-to-768:text-[#120f17] screen-to-768:[font:700_13px_var(--font-display)] screen-to-768:cursor-pointer'
// The search box is the select box's twin (question 201): same height, padding, type, glass pill, edge and light.
const SEARCH = 'ms-search relative specular-rim flex items-center gap-2 h-(--control) [padding:0_var(--control-pad)_0_12px] [border:1px_solid_rgb(255_255_255/.22)] rounded-[999px] [background:var(--glass-pill)] text-(--muted) focus-within:[border-color:rgb(255_255_255/.5)]'
const SEARCH_INPUT = 'flex-1 min-w-0 h-full p-0 [border:0] [background:none] text-(--ink) [font:500_13px/1_var(--font-display)] [outline:none] placeholder:text-(--muted) placeholder:opacity-100 max-[701px]:text-[16px]'
const LIST = 'ms-list [max-height:min(320px,var(--picker-room,320px))] overflow-y-auto overscroll-contain [margin:8px_0_0] [padding:0_2px_12px] list-none [mask-image:linear-gradient(#000_calc(100%_-_20px),transparent)] [-webkit-mask-image:linear-gradient(#000_calc(100%_-_20px),transparent)] flex flex-col gap-1.5 screen-to-768:max-h-[52vh] [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:m-0 [&_ul]:p-0 [&_ul]:list-none'
const OPTION = "ms-option overflow-hidden [transition:background-color_.18s] flex flex-none items-center min-h-(--control) [padding:0_var(--control-pad)] [border:1px_solid_transparent] rounded-[999px] [font:500_13px/1.2_var(--font-display)] cursor-pointer focus-visible:[background:rgb(255_255_255/.06)] focus-visible:[outline:none] hover:[background:rgb(255_255_255/.06)] aria-selected:[border-color:color-mix(in_srgb,var(--brand-pink)_60%,transparent)] aria-selected:[background:color-mix(in_srgb,var(--brand-pink)_22%,transparent)] aria-selected:after:content-['✓'] aria-selected:after:ml-auto aria-selected:after:text-(--brand-pink) aria-selected:after:font-bold focus-visible:[box-shadow:0_0_0_2px_var(--focus)]"
const DAY = 'dr-day relative z-0 grid place-items-center h-(--control) p-0 [border:0] [background:none] [font:500_15px/1_var(--font-display)]'
const PICK_DAY = `${DAY} text-(--ink) cursor-pointer before:content-[''] before:absolute before:-z-1 before:[inset:2px_4px] before:rounded-[999px] hover:before:[background:rgb(255_255_255/.08)] [&.is-between,&.is-start,&.is-end]:[background:color-mix(in_srgb,var(--brand-pink)_22%,transparent)] [&.is-start]:[border-radius:999px_0_0_999px] [&.is-end]:[border-radius:0_999px_999px_0] aria-pressed:text-[#120f17] aria-pressed:font-bold aria-pressed:before:[background:#fff] focus-visible:[outline:none] focus-visible:before:[box-shadow:0_0_0_2px_var(--focus)]`

// A trigger pill (venues, dates): the chosen value or the placeholder, a count badge and a glyph.
export function PickerTrigger({ id, labelledBy, text, placeholder, badge, glyph, expanded, popup, triggerRef, onToggle }: {
  id: string; labelledBy: string; text: string; placeholder: string; badge?: number; glyph: ReactNode; expanded: boolean
  popup: 'listbox' | 'dialog'; triggerRef: Ref<HTMLButtonElement>; onToggle: () => void
}) {
  return (
    <button ref={triggerRef} type="button" className={TRIGGER + (text ? ' has-value' : '')} aria-labelledby={`${labelledBy} ${id}-value`}
      aria-expanded={expanded} aria-controls={`${id}-popover`} aria-haspopup={popup} onClick={onToggle}>
      <span className={VALUE} id={`${id}-value`}>{text || placeholder}</span>
      <span className={COUNT} hidden={!badge}>{badge || ''}</span>
      {glyph}
    </button>
  )
}

// The popover shell: header with 清除, 完成 button, positioning, open/close motion, closing on an outside press, Esc, 完成,
// its trigger or another picker opening, and on a downward drag of the sheet's grip (phones). `open` is whether it should
// be open; `onShown` reports when it actually is (until its closing motion has finished).
export function PickerPop({ id, title, open, trigger, doneText, onClose, onClear, onShown, onOpened, children }: {
  id: string; title: string; open: boolean; trigger: () => HTMLElement | null | undefined; doneText: string
  onClose: () => void; onClear: () => void; onShown: (shown: boolean) => void; onOpened?: (pop: HTMLElement) => void; children: ReactNode
}) {
  const pop = useRef<HTMLDivElement>(null)
  const veil = useRef<HTMLDivElement>(null)
  const sheet = useRef<HTMLDivElement>(null)
  const motion = useRef<Animation[]>([])
  const closing = useRef(false)
  const dropped = useRef(0)
  const stop = () => {
    motion.current.forEach(animation => animation.cancel())
    motion.current = []
  }

  function place() {
    const element = pop.current!
    if (narrow()) {
      for (const property of ['left', 'top', 'width', '--picker-room']) element.style.removeProperty(property)
      return
    }
    const box = trigger()!.getBoundingClientRect()
    const width = Math.max(box.width, 300)
    // Wider than its trigger near the right edge: align the right edges instead.
    const left = box.left + width > innerWidth - 12 ? box.right - width : box.left
    element.style.left = `${Math.max(12, left)}px`
    element.style.top = `${box.bottom + 8}px`
    element.style.width = `${width}px`
    element.style.setProperty('--picker-room', `${Math.max(160, innerHeight - box.bottom - 24)}px`)
  }

  // The Card Nav timeline over the parts in view (the title row and 完成 only show on phones), written so that Safari
  // runs it off the main thread (eased; the wide screens' wipe is a clip, which stays on the main thread). Closing plays
  // it backwards: the parts leave last one first, then the sheet and the veil.
  function play(closingNow: boolean) {
    const element = pop.current!
    const parts = [element.querySelector('.picker-head'), element.querySelector('.picker-body'), element.querySelector('.picker-done')]
      .filter((part): part is HTMLElement => Boolean(part?.getClientRects().length))
    const timing = (delay: number) => ({ delay, leaving: closingNow })
    const lead = closingNow ? 300 + (parts.length - 1) * 80 : 0
    const away = narrow() ? (progress: number) => ({ transform: `translateY(${100 * (1 - progress)}%)` })
      : (progress: number) => ({ clipPath: `inset(0 0 ${100 * (1 - progress)}% 0 round 24px)` })
    return [
      eased(sheet.current!, away, timing(lead)),
      eased(veil.current!, progress => ({ opacity: progress }), timing(lead)),
      ...parts.map((part, index) => eased(part, progress => ({ transform: `translateY(${50 * (1 - progress)}px)`, opacity: progress }),
        timing(closingNow ? (parts.length - 1 - index) * 80 : 300 + index * 80))),
    ]
  }

  useEffect(() => {
    const element = pop.current!
    const shown = element.matches(':popover-open')
    if (open && (!shown || closing.current)) {
      closing.current = false
      element.classList.remove('is-closing')
      stop()
      place()
      if (!shown) element.showPopover()
      if (!reducedMotion()) motion.current = play(false)
    } else if (!open && shown && !closing.current) {
      stop()
      const from = dropped.current
      dropped.current = 0
      const finish = () => {
        closing.current = false
        element.classList.remove('is-closing')
        sheet.current!.style.removeProperty('transform')
        veil.current!.style.removeProperty('opacity')
        element.hidePopover()
      }
      if (reducedMotion()) return finish()
      closing.current = true
      element.classList.add('is-closing')
      // A dropped sheet runs the sheet's part of the timeline backwards from where it was let go.
      if (from) {
        const height = sheet.current!.offsetHeight
        motion.current = [
          eased(sheet.current!, progress => ({ transform: `translateY(${from * progress + height * (1 - progress)}px)` }), { leaving: true }),
          eased(veil.current!, progress => ({ opacity: progress * (1 - from / height) }), { leaving: true }),
        ]
      } else motion.current = play(true)
      Promise.all(motion.current.map(animation => animation.finished)).then(finish, () => {})
    }
  }, [open])

  useEffect(() => {
    const element = pop.current!
    const replace = () => { if (element.matches(':popover-open')) place() }
    const toggled = (event: Event) => {
      const isOpen = (event as ToggleEvent).newState === 'open'
      onShown(isOpen)
      if (isOpen) {
        addEventListener('scroll', replace, { passive: true })
        addEventListener('resize', replace)
        onOpened?.(element)
      } else {
        removeEventListener('scroll', replace)
        removeEventListener('resize', replace)
        if (element.contains(document.activeElement) || document.activeElement === document.body) trigger()?.focus({ preventScroll: true })
      }
    }
    // An outside press closes it (on phones the veil covers the outside and closes it on a tap); Esc closes the open
    // picker wherever focus is (phones do not move focus into the sheet), before the filter panel sees it.
    const press = (event: globalThis.PointerEvent) => {
      if (element.matches(':popover-open') && !element.contains(event.target as Node) && !trigger()?.contains(event.target as Node)) onClose()
    }
    const key = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape' || !element.matches(':popover-open') || closing.current) return
      event.stopPropagation()
      onClose()
    }
    const query = matchMedia('(max-width: 768px)')
    element.addEventListener('toggle', toggled)
    document.addEventListener('pointerdown', press, true)
    document.addEventListener('keydown', key, true)
    query.addEventListener('change', replace)
    return () => {
      element.removeEventListener('toggle', toggled)
      document.removeEventListener('pointerdown', press, true)
      document.removeEventListener('keydown', key, true)
      query.removeEventListener('change', replace)
      removeEventListener('scroll', replace)
      removeEventListener('resize', replace)
    }
  })

  // Phones: drag the grip (handle and title row) down; the sheet follows and the veil thins. Past a third of the sheet
  // or a quick flick (0.5px/ms) it closes from there, otherwise it springs back.
  const drag = useRef<{ id: number; start: number; y: number; time: number; speed: number } | null>(null)
  const grip = {
    onPointerDown(event: PointerEvent<HTMLElement>) {
      if (!narrow() || (event.target as Element).closest('button') || event.button > 0) return
      drag.current = { id: event.pointerId, start: event.clientY, y: 0, time: event.timeStamp, speed: 0 }
      event.currentTarget.setPointerCapture(event.pointerId)
    },
    onPointerMove(event: PointerEvent<HTMLElement>) {
      const state = drag.current
      if (!state || event.pointerId !== state.id) return
      const y = Math.max(0, event.clientY - state.start)
      state.speed = (y - state.y) / Math.max(1, event.timeStamp - state.time)
      state.y = y
      state.time = event.timeStamp
      stop()
      sheet.current!.style.transform = `translateY(${y}px)`
      veil.current!.style.opacity = String(1 - y / sheet.current!.offsetHeight)
    },
    onPointerUp: (event: PointerEvent<HTMLElement>) => release(event),
    onPointerCancel: (event: PointerEvent<HTMLElement>) => release(event),
  }
  function release(event: PointerEvent<HTMLElement>) {
    const state = drag.current
    if (!state || event.pointerId !== state.id) return
    drag.current = null
    const { y, speed } = state
    if (!y) return
    const height = sheet.current!.offsetHeight
    if (y > height / 3 || speed > 0.5) {
      dropped.current = y
      return onClose()
    }
    sheet.current!.style.removeProperty('transform')
    veil.current!.style.removeProperty('opacity')
    if (reducedMotion()) return
    motion.current = [sheet.current!.animate([{ transform: `translateY(${y}px)` }, { transform: 'none' }], { duration: 300, easing: OUT }),
      veil.current!.animate([{ opacity: 1 - y / height }, { opacity: 1 }], { duration: 300, easing: OUT })]
  }

  return (
    <div ref={pop} id={`${id}-popover`} className={POP} popover="manual" role="dialog" aria-labelledby={`${id}-title`}>
      {/* A tap on the veil closes the picker and goes no further. */}
      <div ref={veil} className={VEIL} aria-hidden="true" onClick={onClose} />
      <div ref={sheet} className={SHEET}>
        <div className={HANDLE} aria-hidden="true" {...grip} />
        <div className={HEAD} {...grip}>
          <strong id={`${id}-title`} className="block overflow-hidden">{title}</strong>
          <button type="button" className={CLEAR} onClick={onClear}>清除</button>
        </div>
        <div className="picker-body min-w-0 overflow-hidden">{children}</div>
        <button type="button" className={DONE} onClick={onClose}>{doneText ? `完成 · ${doneText}` : '完成'}</button>
      </div>
    </div>
  )
}

export type Row = { value: string; text: string }

// A search box and a multi-select listbox. Groups have a heading (or none); a row toggles on click, Enter or Space.
export function MultiList({ id, labelId, placeholder, groups, selected, onToggle, opened }: {
  id: string; labelId: string; placeholder: string; groups: { label: string | null; rows: Row[] }[]
  selected: (row: Row) => boolean; onToggle: (row: Row) => void; opened: boolean
}) {
  const [query, setQuery] = useState('')
  const search = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const needle = query.trim().toLowerCase()
  const matches = (row: Row) => !needle || row.text.toLowerCase().includes(needle)
  const shown = groups.reduce((sum, group) => sum + group.rows.filter(matches).length, 0)
  // Opening focuses the search on wide screens and brings the first chosen row into view; closing clears the search.
  useEffect(() => {
    if (!opened) return setQuery('')
    if (!narrow()) search.current?.focus({ preventScroll: true })
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'center' })
  }, [opened])
  const options = () => [...list.current!.querySelectorAll<HTMLElement>('.ms-option:not([hidden])')]
  function keys(event: KeyboardEvent<HTMLElement>, row: Row) {
    const all = options()
    const index = all.indexOf(event.target as HTMLElement)
    const moves: Record<string, number> = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: all.length - 1 }
    if (event.key in moves) {
      event.preventDefault()
      if (event.key === 'ArrowUp' && index === 0) search.current!.focus()
      else all[Math.min(Math.max(moves[event.key], 0), all.length - 1)]?.focus()
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onToggle(row)
    }
  }
  const option = (row: Row) => (
    <li key={row.value} className={OPTION} role="option" tabIndex={-1} aria-selected={selected(row)} hidden={!matches(row)}
      onClick={() => onToggle(row)} onKeyDown={event => keys(event, row)}>{row.text}</li>
  )
  return (
    <>
      <label className={SEARCH}>
        {MAGNIFIER}
        <input ref={search} className={SEARCH_INPUT} type="search" placeholder={placeholder} autoComplete="off" aria-controls={`${id}-listbox`} value={query}
          onChange={event => setQuery(event.target.value)}
          onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); options()[0]?.focus() } }} />
      </label>
      <ul ref={list} className={LIST} id={`${id}-listbox`} role="listbox" aria-multiselectable="true" aria-labelledby={labelId}>
        {groups.flatMap(({ label, rows }) => label === null ? rows.map(option) : [
          <li key={label} role="group" aria-label={label} hidden={!rows.some(matches)}>
            <span className="ms-group block [margin:10px_12px_4px] text-[11px] tracking-[.06em] text-(--brand-cyan)" aria-hidden="true">{label}</span>
            <ul role="presentation">{rows.map(option)}</ul>
          </li>,
        ])}
      </ul>
      <p className="ms-empty [margin:12px_14px] text-[12px] text-(--muted)" hidden={shown > 0}>没有匹配的选项</p>
    </>
  )
}

// Date range: a Monday-first calendar of the weeks covering the guide's dates; only those dates can be picked. A tap
// picks a single day; with a single day picked, a later day ends the range, an earlier day starts over, and the same day
// clears the dates.
export function DateRange({ first, last, from, to, onChange, opened }: {
  first: string; last: string; from: string; to: string; onChange: (from: string, to: string) => void; opened: boolean
}) {
  const grid = useRef<HTMLDivElement>(null)
  const iso = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  const day = (value: string) => new Date(`${value}T00:00:00`)
  const cells = useMemo(() => {
    const start = day(first)
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7))
    const end = day(last)
    end.setDate(end.getDate() + (6 - ((end.getDay() + 6) % 7)))
    const list: { value: string; date: number; month: number; selectable: boolean }[] = []
    for (const date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const value = iso(date)
      list.push({ value, date: date.getDate(), month: date.getMonth() + 1, selectable: value >= first && value <= last })
    }
    return list
  }, [first, last])
  const months = [...new Set([first, last].map(value => Number(value.slice(5, 7))))].join('—')
  const buttons = () => [...grid.current!.querySelectorAll<HTMLButtonElement>('button.dr-day')]
  useEffect(() => {
    if (!opened || narrow()) return
    const all = buttons();
    (all.find(button => button.getAttribute('aria-pressed') === 'true') ?? all[0])?.focus({ preventScroll: true })
  }, [opened])
  function pick(value: string) {
    const single = from && from === to
    if (single && value === from) onChange('', '')
    else if (single && value > from) onChange(from, value)
    else onChange(value, value)
  }
  function keys(event: KeyboardEvent<HTMLDivElement>) {
    const step = ({ ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 } as Record<string, number>)[event.key]
    const value = (event.target as HTMLElement).dataset.date
    if (!value || !step) return
    event.preventDefault()
    // Move by calendar position: one day sideways, one week up or down, staying within the selectable dates.
    const target = iso(new Date(day(value).getTime() + step * 864e5))
    buttons().find(button => button.dataset.date === target)?.focus()
  }
  return (
    <>
      <p className="dr-caption [margin:2px_6px_10px] [font:600_12px/1.4_var(--font-display)] text-(--muted)">{`${first.slice(0, 4)} 年 ${months} 月 · 可选 ${shortDate(first)}—${shortDate(last)}`}</p>
      <div ref={grid} className="dr-grid grid grid-cols-[repeat(7,minmax(0,1fr))] gap-y-1.5 text-center" role="group" aria-label="选择日期" onKeyDown={keys}>
        {['一', '二', '三', '四', '五', '六', '日'].map(name => <span key={name} className="dr-weekday pb-1 text-[11px] text-(--muted)" aria-hidden="true">{name}</span>)}
        {cells.map(cell => {
          if (!cell.selectable) return <span key={cell.value} className={`${DAY} text-[rgb(255_255_255/.22)]`} aria-hidden="true">{cell.date}</span>
          const ranged = from && to && from !== to
          const className = [PICK_DAY, ranged && cell.value === from && 'is-start', ranged && cell.value === to && 'is-end',
            from && to && cell.value > from && cell.value < to && 'is-between'].filter(Boolean).join(' ')
          return (
            <button key={cell.value} type="button" className={className} data-date={cell.value} aria-label={`${cell.month} 月 ${cell.date} 日`}
              aria-pressed={cell.value === from || cell.value === to} onClick={() => pick(cell.value)}>{cell.date}</button>
          )
        })}
      </div>
    </>
  )
}

// What the date trigger and tag show for a range.
export const rangeText = (from: string, to: string, separator = ' – ') =>
  from && to ? (from === to ? shortDate(from) : `${shortDate(from)}${separator}${shortDate(to)}`) : from ? `${shortDate(from)} 起` : to ? `至 ${shortDate(to)}` : ''
