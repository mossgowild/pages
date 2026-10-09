// The filter toolbar as React Bits Card Nav (questions 138–219): a sticky glass bar with the 筛选 button, the chosen
// conditions as removable tags, 清空 and the result count, and the panel of four tinted glass cards that opens as an
// overlay below it with the page scrim. Without the script the dock stays hidden and the list shows everything.
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import type { Filters } from '../lib/filters'
import type { Guide } from '../lib/guide'
import { EASE, IN_OUT, reducedMotion, useHydrated, useIsomorphicLayoutEffect } from '../lib/motion'
import { CALENDAR, CHEVRON, PickerTrigger, rangeText } from './Pickers'

// Every pill and round button is one control tall (--control, 40px) with 13px Syne labels (control-scale questions 1–6).
const PILL_TEXT = '[font:600_13px/1.2_var(--font-display)]'
// Tags are drawn by the effect below, so their classes live here too.
const TAG = 'filter-tag relative specular-rim press inline-flex items-center gap-2 min-h-(--control) [padding:0_8px_0_var(--control-pad)] [border:0] rounded-[999px] [background:color-mix(in_srgb,var(--brand-pink)_16%,transparent)] [--spec-base:color-mix(in_srgb,var(--brand-pink)_70%,transparent)] text-white [font:600_13px/1_var(--font-display)] whitespace-nowrap cursor-pointer'
const TAG_CLOSE = 'grid place-items-center size-(--control-inner) rounded-[50%] [background:var(--brand-pink)] text-[12px]/none'
const CHIP = 'filter-chip relative specular-rim press-chip inline-flex rounded-[999px] touch-manipulation'
const CHIP_INPUT = 'peer absolute inset-0 w-full h-full m-0 opacity-0 cursor-pointer'
const CHIP_LABEL = `inline-flex items-center min-h-(--control) [padding:0_var(--control-pad)] [border:1px_solid_rgb(255_255_255/.22)] rounded-[999px] [background:var(--glass-pill)] text-[#eee] ${PILL_TEXT} whitespace-nowrap peer-checked:border-white peer-checked:[background:#fff] peer-checked:text-[#120f17] peer-focus-visible:[outline:2px_solid_var(--focus)] peer-focus-visible:outline-offset-2`
const BAR = 'filter-bar filter-bar-look group/bar flex items-center gap-2 h-[calc(var(--control)_+_16px)]'
const CARD = 'filter-card filter-card-look min-w-0 m-0 p-4'
const SELECT = 'filter-select block clear-both mt-3'
const LEGEND = 'float-left w-full [margin:0_0_10px] p-0 [font:700_20px/1.2_var(--font-display)] text-(--ink)'
const CHIPS = 'filter-chips flex flex-wrap gap-1.5 clear-both'
// Split family chip (question 176): the name is 全部 X (white when chosen); the round button inside its right end opens the
// sub-genres, its touch area still 44px; with only some of them chosen the rim turns brand pink and the button shows their
// number.
const FAMILY = 'family-chip relative specular-rim press-chip group/family inline-flex items-stretch min-h-(--control) rounded-[999px] [background:var(--glass-pill)] [box-shadow:inset_0_0_0_1px_rgb(255_255_255/.22)] text-[#eee] touch-manipulation has-[input:checked]:[background:#fff] has-[input:checked]:[box-shadow:inset_0_0_0_1px_#fff] has-[input:checked]:text-[#120f17] [&.is-partial]:[--spec-base:var(--brand-pink)] [&.is-partial]:[box-shadow:inset_0_0_0_1px_var(--brand-pink)]'
const FAMILY_ALL = 'family-all relative flex'
const FAMILY_LABEL = `flex items-center [padding:0_4px_0_var(--control-pad)] ${PILL_TEXT} whitespace-nowrap peer-focus-visible:[outline:2px_solid_var(--focus)] peer-focus-visible:-outline-offset-2 peer-focus-visible:[border-radius:999px_0_0_999px]`
const FAMILY_MORE = 'family-more active:[filter:none] grid place-items-center w-(--control) p-0 [border:0] [border-radius:0_999px_999px_0] [background:none] text-inherit cursor-pointer focus-visible:[outline:none] before:content-[""] before:[grid-area:1/1] before:size-(--control-inner) before:rounded-[50%] before:[background:rgb(255_255_255/.12)] before:[transition:background-color_.18s] hover:before:[background:rgb(255_255_255/.2)] focus-visible:before:[box-shadow:0_0_0_2px_var(--focus)] group-has-[input:checked]/family:before:[background:rgb(18_15_23/.08)] group-[.is-partial]/family:before:[background:var(--brand-pink)] [&>*]:[grid-area:1/1] [&>*]:relative [&_svg]:size-[13px] [&_svg]:[transition:transform_.2s] aria-expanded:[&_svg]:[transform:rotate(180deg)] group-[.is-partial]/family:[&_svg]:hidden'

export type Tag = { key: string; label: string; remove: (filters: Filters) => Filters }
export type PickerState = { open: string | null; shown: string | null; toggle: (id: string) => void; triggers: RefObject<Map<string, HTMLElement>> }

const without = <T,>(list: T[], value: T) => list.filter(item => item !== value)
const toggled = <T,>(list: T[], value: T, on: boolean) => on ? [...list, value] : without(list, value)
const PERIODS = [['day', '日间 · 18:00 前'], ['night', '夜间 · 18:00 起']] as const

// Selected conditions in panel order, each removable on its own.
export function tagsOf(filters: Filters, guide: Guide, venues: { city: string; venues: string[] }[]): Tag[] {
  const tags: Tag[] = []
  for (const city of guide.cities) if (filters.city.includes(city)) tags.push({ key: `city|${city}`, label: city, remove: f => ({ ...f, city: without(f.city, city) }) })
  for (const { name } of guide.families) if (filters.families.includes(name)) tags.push({ key: `family|${name}`, label: name, remove: f => ({ ...f, families: without(f.families, name) }) })
  for (const genre of guide.genres) if (filters.genres.includes(genre)) tags.push({ key: `genre|${genre}`, label: genre, remove: f => ({ ...f, genres: without(f.genres, genre) }) })
  for (const [value, label] of PERIODS) if (filters.period.includes(value)) tags.push({ key: `period|${label}`, label, remove: f => ({ ...f, period: without(f.period, value) }) })
  for (const group of venues) for (const venue of group.venues) {
    const value = `${group.city}|${venue}`
    if (filters.venue.includes(value)) tags.push({ key: `venue|${venue}`, label: venue, remove: f => ({ ...f, venue: without(f.venue, value) }) })
  }
  if (filters.from || filters.to) {
    const label = rangeText(filters.from, filters.to, '–')
    tags.push({ key: `to|${label}`, label, remove: f => ({ ...f, from: '', to: '' }) })
  }
  return tags
}

type Props = {
  guide: Guide; filters: Filters; change: (next: Filters) => void; tags: Tag[]; count: number; summary: string; valid: boolean
  pickers: PickerState; venueText: string; venueCount: number; schedule: RefObject<HTMLElement | null>
}

export function FilterDock({ guide, filters, change, tags, count, summary, valid, pickers, venueText, venueCount, schedule }: Props) {
  // The dock and the pickers' arrows only work with the script.
  const hydrated = useHydrated()
  const sentinel = useRef<HTMLSpanElement>(null)
  const dock = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLFormElement>(null)
  const scrim = useRef<HTMLDivElement>(null)
  const tagList = useRef<HTMLUListElement>(null)
  const clear = useRef<HTMLButtonElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [shown, setShown] = useState(false)
  const open = useRef(false)
  const navAnimations = useRef<Animation[]>([])
  const tagsShown = useRef(false)
  const dockRoom = useRef(0)
  const filtersRef = useRef(filters)
  filtersRef.current = filters

  // Where the bar docks: 2px past the sentinel (scroll positions round to whole pixels, and the observer counts a
  // sentinel within a pixel of the edge as still visible).
  const dockPoint = () => Math.ceil(sentinel.current!.getBoundingClientRect().bottom + scrollY) + 2
  const isStuck = () => dock.current!.classList.contains('is-stuck')
  // However few the results, the page keeps a screen below the dock point, so the bar can stay docked instead of
  // sliding down when a filter shortens the list. The room is space after the list (a margin), measured off the page.
  function keepDockRoom() {
    const natural = document.documentElement.scrollHeight - dockRoom.current
    dockRoom.current = Math.max(0, Math.ceil(innerHeight - (natural - dockPoint())))
    schedule.current!.style.marginBottom = dockRoom.current ? `${dockRoom.current}px` : ''
  }
  // A smooth scroll that resolves when it arrives, stalls (a page too short, or the motion cut off by content changing
  // underneath) or runs past 1.5s.
  function glideTo(target: number) {
    scrollTo({ top: target, behavior: reducedMotion() ? 'instant' : 'smooth' })
    const start = performance.now()
    return new Promise<void>(resolve => {
      let last = scrollY, still = 0
      const watch = () => {
        still = Math.abs(scrollY - last) < 0.5 ? still + 1 : 0
        last = scrollY
        if (Math.abs(scrollY - target) < 1 || still > 8 || performance.now() - start > 1500) resolve()
        else requestAnimationFrame(watch)
      }
      requestAnimationFrame(watch)
    })
  }
  // Any change of conditions brings the page to the start of the results, right under the docked bar (questions 205,
  // 207): at once behind the open panel, smoothly otherwise. The glide can be cut off as the list grows under it, so it
  // ends with an exact placement.
  function showResults() {
    const settle = () => { if (Math.abs(scrollY - dockPoint()) >= 1) scrollTo({ top: dockPoint(), behavior: 'instant' }) }
    if (open.current) settle()
    else if (Math.abs(scrollY - dockPoint()) >= 1) glideTo(dockPoint()).then(settle)
  }
  // The overlay drops from the docked bar, so a bar still in the page first scrolls up to dock (question 180).
  function dockBar() {
    const target = Math.min(dockPoint(), document.documentElement.scrollHeight - innerHeight)
    if (isStuck() || scrollY >= target - 0.5) return Promise.resolve()
    return glideTo(target)
  }
  // The cards may use the screen below the bar and scroll inside when taller (question 164); a fade marks more below.
  function fitPanel() {
    const barBottom = isStuck() ? bar.current!.offsetHeight : bar.current!.getBoundingClientRect().bottom
    panel.current!.style.maxHeight = `${Math.max(0, innerHeight - barBottom)}px`
  }
  const markMore = () => {
    const element = panel.current!
    element.classList.toggle('has-more', element.scrollHeight - element.clientHeight - element.scrollTop > 1)
  }

  // React Bits Card Nav: the panel grows over 0.4s (power3.out) while the page scrim fades in, and the cards rise 50px
  // and fade in 0.08s apart, starting 0.1s before the growth ends; closing plays the same timeline backwards.
  function playNav(opening: boolean) {
    navAnimations.current.forEach(animation => animation.cancel())
    navAnimations.current = []
    if (reducedMotion()) return Promise.resolve()
    const cards = [...panel.current!.querySelectorAll<HTMLElement>('.filter-card')]
    const height = panel.current!.getBoundingClientRect().height
    const timing = (delay: number) => ({ duration: 400, easing: EASE, fill: opening ? 'backwards' as const : 'forwards' as const,
      direction: opening ? 'normal' as const : 'reverse' as const, delay })
    const lead = opening ? 0 : 300 + (cards.length - 1) * 80
    navAnimations.current = [
      panel.current!.animate([{ height: '0px' }, { height: `${height}px` }], timing(lead)),
      scrim.current!.animate([{ opacity: 0 }, { opacity: 1 }], timing(lead)),
      ...cards.map((card, index) => card.animate([{ transform: 'translateY(50px)', opacity: 0 }, { transform: 'none', opacity: 1 }],
        timing(opening ? 300 + index * 80 : (cards.length - 1 - index) * 80))),
    ]
    return Promise.all(navAnimations.current.map(animation => animation.finished)).then(() => {}, () => {})
  }
  // While open the scrim covers the page below the bar and the page itself does not scroll.
  function setOpen(next: boolean) {
    if (next === open.current) return
    open.current = next
    setExpanded(next)
    if (next) {
      dockBar().then(() => {
        if (!open.current) return
        fitPanel()
        document.documentElement.classList.add('is-filtering')
        setShown(true)
      })
    } else {
      document.documentElement.classList.remove('is-filtering')
      playNav(false).then(() => { if (!open.current) setShown(false) })
    }
  }
  useIsomorphicLayoutEffect(() => {
    if (shown && open.current) playNav(true).then(markMore)
  }, [shown])

  // The condition tags (questions 189, 199–200). They never clip: a new tag appears at full size, growing from 0.8 and
  // fading in where it lands, while its neighbours glide to their new places; a leaving tag lifts out of the row where it
  // stood and shrinks back to 0.8 as it fades (0.3s power2.inOut), and the others glide into the gap. Entering and
  // gliding take 0.4s power3.out. The strip is drawn here rather than by React so that a leaving tag can stay in place
  // until it has folded away; src/lib/glass.ts lights the tags as they come.
  useIsomorphicLayoutEffect(() => {
    const strip = tagList.current!
    const edge = strip.parentElement!
    const markEdges = () => {
      edge.classList.toggle('has-before', strip.scrollLeft > 1)
      edge.classList.toggle('has-after', strip.scrollWidth - strip.clientWidth - strip.scrollLeft > 1)
    }
    const motion = { duration: 400, easing: EASE }
    const lis = () => [...strip.children] as (HTMLLIElement & { tag?: Tag })[]
    const make = (tag: Tag) => {
      const li = document.createElement('li') as HTMLLIElement & { tag?: Tag }
      li.dataset.key = tag.key
      const button = document.createElement('button')
      button.type = 'button'
      button.className = TAG
      button.setAttribute('aria-label', `移除条件：${tag.label}`)
      button.append(tag.label, Object.assign(document.createElement('span'), { className: TAG_CLOSE, ariaHidden: 'true', textContent: '×' }))
      button.addEventListener('click', () => li.tag && change(li.tag.remove(filtersRef.current)))
      li.append(button)
      return li
    }
    const kept = new Map(lis().filter(li => !li.classList.contains('is-leaving')).map(li => [li.dataset.key!, li]))
    const wanted = tags.map(tag => {
      const li = kept.get(tag.key) ?? make(tag)
      li.tag = tag
      return li
    })
    const leaving = [...kept.values()].filter(li => !wanted.includes(li))
    const entering = wanted.filter(li => !li.isConnected)
    for (const li of leaving) {
      li.classList.add('is-leaving')
      li.inert = true
    }
    const animate = tagsShown.current && !reducedMotion()
    // Where every tag shows now (mid-glide included), before the row changes.
    const was = new Map(lis().map(li => [li, li.getBoundingClientRect().left]))
    let gone: Promise<unknown> = Promise.resolve()
    const scroll = strip.scrollLeft
    if (animate) {
      // Every reading before any tag is lifted out of the row: a layout between two lifts would shrink the strip's
      // scroll range for a moment, and the browser would pull a scrolled strip back.
      const states = leaving.map(li => ({ left: li.offsetLeft, top: li.offsetTop, opacity: getComputedStyle(li).opacity,
        transform: getComputedStyle(li).transform.replace('none', 'scale(1)') }))
      gone = Promise.all(leaving.map((li, index) => {
        const { left, top, ...from } = states[index]
        li.getAnimations().forEach(animation => animation.cancel())
        Object.assign(li.style, { position: 'absolute', left: `${left}px`, top: `${top}px` })
        return li.animate([from, { opacity: 0, transform: 'scale(.8)' }], { duration: 300, easing: IN_OUT, fill: 'forwards' })
          .finished.then(() => li.remove(), () => {})
      }))
    } else leaving.forEach(li => li.remove())
    const nextAfter = (li: Element | null) => {
      let next = li ? li.nextElementSibling : strip.firstElementChild
      while (next?.classList.contains('is-leaving')) next = next.nextElementSibling
      return next
    }
    let previous: Element | null = null
    for (const li of wanted) {
      const next = nextAfter(previous)
      if (li !== next) strip.insertBefore(li, next)
      previous = li
    }
    if (animate) {
      for (const li of wanted) {
        if (entering.includes(li)) {
          li.animate([{ opacity: 0, transform: 'scale(.8)' }, { opacity: 1, transform: 'scale(1)' }], motion).finished.then(markEdges, () => {})
          continue
        }
        li.getAnimations().filter(animation => (animation.effect as KeyframeEffect).getKeyframes().some(frame => String(frame.transform ?? '').startsWith('translateX')))
          .forEach(animation => animation.cancel())
        const dx = was.get(li)! - li.getBoundingClientRect().left
        if (Math.abs(dx) > 0.5) li.animate([{ transform: `translateX(${dx}px)` }, { transform: 'none' }], motion).finished.then(markEdges, () => {})
      }
      strip.scrollLeft = scroll
    }
    // A new tag outside the strip's view brings the strip there: smoothly with motion, at once without. A tag wider
    // than the strip (phones keep only about 120px for tags) shows its start.
    if (entering.length && tagsShown.current) {
      const li = entering[0]
      const left = li.offsetLeft - 24, right = li.offsetLeft + li.offsetWidth + 24
      const target = left < strip.scrollLeft || right - left > strip.clientWidth ? left
        : right > strip.scrollLeft + strip.clientWidth ? right - strip.clientWidth : strip.scrollLeft
      if (target !== strip.scrollLeft) strip.scrollTo({ left: target, behavior: animate ? 'smooth' : 'instant' })
    }
    tagsShown.current = true
    // 清空 stays until the last tags have gone: hiding it at once widens the strip, and the browser then pulls a
    // scrolled strip back before the tags could fade where they were.
    if (tags.length) clear.current!.hidden = false
    else gone.then(() => { if (!strip.querySelector('li:not(.is-leaving)')) clear.current!.hidden = true })
    markEdges()
  }, [tags])

  // How far the docked bar reaches past the content column, measured once the dock shows and on every resize.
  const setEdge = () => dock.current!.style.setProperty('--edge', `${dock.current!.getBoundingClientRect().left}px`)
  useEffect(() => { if (hydrated) setEdge() }, [hydrated])

  // After the list has changed: keep the room below the dock, and bring the page to the start of the results.
  const changed = useRef(false)
  useEffect(() => {
    keepDockRoom()
    if (changed.current) showResults()
    changed.current = true
  }, [filters])

  useEffect(() => {
    const strip = tagList.current!
    const edge = strip.parentElement!
    const markEdges = () => {
      edge.classList.toggle('has-before', strip.scrollLeft > 1)
      edge.classList.toggle('has-after', strip.scrollWidth - strip.clientWidth - strip.scrollLeft > 1)
    }
    strip.addEventListener('scroll', markEdges, { passive: true })
    // The strip's own width moves too (the result count changes after the tags, the bar docks), not only the window's.
    const strips = new ResizeObserver(markEdges)
    strips.observe(strip)
    // is-stuck marks the dock while it is pinned to the top: a state switch (question 170), after which the CSS eases
    // the bar into a flush full-width bar. --edge is how far the bar then reaches past the content column. The root
    // reaches far below the screen, so the sentinel only stops intersecting once it has passed the top; the latest entry
    // of a batch decides.
    const stuck = new IntersectionObserver(entries => {
      const entry = entries.at(-1)!
      dock.current!.classList.toggle('is-stuck', !entry.isIntersecting && entry.boundingClientRect.top < 0)
    }, { rootMargin: '0px 0px 100000px 0px' })
    stuck.observe(sentinel.current!)
    // The list also changes size after a filter (a row opening in the accordion, posters loading), so the room and,
    // with the panel open, the page's place at the start of the results follow its size. Deferred a frame: adjusting
    // the page inside the observer's own callback would re-trigger layout observers in WebKit.
    const sized = new ResizeObserver(() => requestAnimationFrame(() => {
      keepDockRoom()
      if (open.current && Math.abs(scrollY - dockPoint()) >= 1) scrollTo({ top: dockPoint(), behavior: 'instant' })
    }))
    sized.observe(schedule.current!)
    const resized = () => {
      setEdge()
      keepDockRoom()
      if (open.current && !panel.current!.hidden) {
        fitPanel()
        markMore()
      }
    }
    addEventListener('resize', resized)
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !open.current) return
      if (!panel.current!.contains(event.target as Node) && !bar.current!.contains(event.target as Node)) return
      setOpen(false)
      toggle.current!.focus()
    }
    document.addEventListener('keydown', escape)
    // A tap outside (on the scrim) closes the panel, unless it is the tap that dismisses an open picker popover.
    const press = (event: PointerEvent) => {
      const target = event.target as Element
      if (!open.current || panel.current!.contains(target) || bar.current!.contains(target)
        || target.closest('.picker-pop') || document.querySelector('.picker-pop:popover-open')) return
      setOpen(false)
    }
    document.addEventListener('pointerdown', press, true)
    return () => {
      strips.disconnect()
      stuck.disconnect()
      sized.disconnect()
      removeEventListener('resize', resized)
      document.removeEventListener('keydown', escape)
      document.removeEventListener('pointerdown', press, true)
    }
  }, [])

  const cardColor = (color: string) => ({ '--card-color': `var(--brand-${color})` }) as CSSProperties
  const triggers = pickers.triggers.current
  return (
    <>
      <span ref={sentinel} className="filter-sentinel block h-px mt-[11px]" aria-hidden="true" />
      <div ref={dock} className="filter-dock print:hidden! sticky top-0 z-20 pt-3 [--bleed:calc(var(--edge,0px)*var(--dock))] [translate:0_calc(-12px*var(--dock))] [transition:--dock_.4s_var(--ease-card)] [&.is-stuck]:[--dock:1]" hidden={!hydrated}>
        <div ref={bar} className={BAR + (expanded ? ' is-open' : '')}>
          <button ref={toggle} type="button" className="filter-toggle relative specular-rim press inline-flex flex-none items-center gap-2.5 min-h-(--control) [padding:0_var(--control-pad)_0_13px] [border:0] rounded-[999px] [background:none] text-(--ink) [font:700_13px/1_var(--font-display)] cursor-pointer" aria-expanded={expanded} aria-controls="filters" onClick={() => setOpen(!open.current)}>
            <span className="filter-burger flex flex-col gap-[3.5px] w-[14px]" aria-hidden="true">
              <i className="h-[1.5px] rounded-[1px] bg-current [transition:transform_.3s_linear] motion-reduce:[transition:none] group-[.is-open]/bar:[transform:translateY(2.5px)_rotate(45deg)]" />
              <i className="h-[1.5px] rounded-[1px] bg-current [transition:transform_.3s_linear] motion-reduce:[transition:none] group-[.is-open]/bar:[transform:translateY(-2.5px)_rotate(-45deg)]" />
            </span><span>筛选</span>
          </button>
          {/* The strip scrolls sideways only. Its 1px all round keeps each tag's rim (0.7px outside the pill) inside the
              strip and its fade, and the wrapper's -1px sides keep the tags where they were (docs/event-filters.md F7). */}
          <div className="filter-tags-edge fade-edges flex flex-1 min-w-0 -mx-px">
            {/* One tag tall even when every tag is leaving (lifted out of flow), so they are not clipped while they go. */}
            <ul ref={tagList} className="filter-tags scrollbar-none relative flex flex-1 items-center gap-1.5 min-w-0 min-h-[calc(var(--control)_+_2px)] m-0 p-px list-none overflow-x-auto overflow-y-hidden [&>li]:flex-none" aria-label="已选条件" />
          </div>
          <button ref={clear} type="reset" form="filters" className="filter-clear flex-none min-h-(--control) [padding:0_8px] [border:0] [background:none] text-(--muted) text-[13px] cursor-pointer" hidden>清空</button>
          <p className="filter-count flex flex-none items-center gap-1 h-7 m-0 [padding:0_0_0_10px] [border-left:1px_solid_rgb(255_255_255/.14)]" role="status" aria-live="polite" aria-atomic="true">
            <strong id="result-count" className="[font:700_17px/1_var(--font-display)] text-(--brand-pink)">{count}</strong><span className="text-[11px] text-(--muted)" aria-hidden="true">场</span>
            <span className="sr-only" id="result-summary">{summary}</span>
          </p>
        </div>
        <form ref={panel} id="filters" className="filter-panel print:hidden! more-below scrollbar-none absolute top-full -left-4 -right-4 grid grid-cols-[1fr_2fr_1.2fr_1fr] screen-to-768:grid-cols-[minmax(0,1fr)] [align-items:start] gap-2 m-0 [padding:8px_16px_calc(24px_+_env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain" hidden={!shown} aria-label="筛选活动"
          onSubmit={event => event.preventDefault()}
          onReset={event => {
            event.preventDefault()
            change({ city: [], families: [], genres: [], period: [], venue: [], from: '', to: '' })
          }}
          // The scrim shows through the panel's gaps and margins, so a tap there closes it too; a click (not a press) so
          // that a drag starting in a gap still scrolls the cards.
          onClick={event => { if (event.target === panel.current) setOpen(false) }}
          onScroll={markMore}>
          <fieldset className={CARD} style={cardColor('pink')}>
            <legend className={LEGEND}>城市</legend>
            <div className={CHIPS}>
              {guide.cities.map(city => (
                <label key={city} className={CHIP}>
                  <input className={CHIP_INPUT} type="checkbox" name="city" value={city} checked={filters.city.includes(city)}
                    onChange={event => change({ ...filters, city: toggled(filters.city, city, event.target.checked) })} />
                  <span className={CHIP_LABEL}>{city}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className={CARD} style={cardColor('yellow')}>
            <legend className={LEGEND}>风格</legend>
            <div className={`${CHIPS} genre-chips`}>
              {guide.families.map(({ name, members }, index) => {
                const id = `family-${index}-picker`
                const chosen = members.filter(genre => filters.genres.includes(genre)).length
                return (
                  // Split chip (question 176): the name is the 全部 X checkbox; the arrow opens the family's sub-genre
                  // picker. Ticking the name selects the whole family, so it clears the sub-genres first.
                  <div key={name} className={`${FAMILY}${chosen ? ' is-partial' : ''}`} data-members={JSON.stringify(members)}>
                    <label className={FAMILY_ALL}>
                      <input className={CHIP_INPUT} type="checkbox" name="family" value={name} id={`family-${index}`} checked={filters.families.includes(name)}
                        onChange={event => change({ ...filters, families: toggled(filters.families, name, event.target.checked),
                          genres: event.target.checked ? filters.genres.filter(genre => !members.includes(genre)) : filters.genres })} />
                      <span className={FAMILY_LABEL}>{name}</span>
                    </label>
                    <button ref={element => { if (element) triggers.set(id, element) }} type="button" className={FAMILY_MORE} hidden={!hydrated}
                      aria-label={`选择 ${name} 小类`} aria-expanded={pickers.shown === id} aria-controls={`${id}-popover`} aria-haspopup="listbox"
                      onClick={() => pickers.toggle(id)}>
                      <span className="family-count [font:700_12px/1_var(--font-display)] text-white" hidden={!chosen}>{chosen || ''}</span>{CHEVRON}
                    </button>
                  </div>
                )
              })}
            </div>
          </fieldset>
          <fieldset className={CARD} style={cardColor('cyan')}>
            <legend className={LEGEND}>时段 · 场地</legend>
            <div className={CHIPS}>
              {PERIODS.map(([value, label]) => (
                <label key={value} className={CHIP}>
                  <input className={CHIP_INPUT} type="checkbox" name="period" value={value} checked={filters.period.includes(value)}
                    onChange={event => change({ ...filters, period: toggled(filters.period, value, event.target.checked) })} />
                  <span className={CHIP_LABEL}>{label}</span>
                </label>
              ))}
            </div>
            <div className={SELECT}>
              <span id="venue-label" className="block [margin:0_0_6px_14px] text-[11px] text-(--muted)">场地</span>
              <PickerTrigger id="venue" labelledBy="venue-label" text={venueText} placeholder="全部场地" badge={venueCount} glyph={CHEVRON}
                expanded={pickers.shown === 'venue'} popup="listbox" triggerRef={element => { if (element) triggers.set('venue', element) }}
                onToggle={() => pickers.toggle('venue')} />
            </div>
            <p className="filter-note [margin:12px_0_0] text-[11px]/[1.6] text-(--muted)">跨夜场次按开场日归类；时段匹配各场已知开场时间。</p>
          </fieldset>
          <fieldset className={CARD} style={cardColor('violet')}>
            <legend id="dates-label" className={LEGEND}>日期范围</legend>
            <div className={`${SELECT} filter-dates`}>
              <PickerTrigger id="dates" labelledBy="dates-label" text={rangeText(filters.from, filters.to)} placeholder="全部日期" glyph={CALENDAR}
                expanded={pickers.shown === 'dates'} popup="dialog" triggerRef={element => { if (element) triggers.set('dates', element) }}
                onToggle={() => pickers.toggle('dates')} />
            </div>
            <p id="filter-error" className="filter-error text-(--pink) [margin:12px_0_0] text-[13px]" role="alert" hidden={valid}>结束日期需晚于或等于开始日期。</p>
          </fieldset>
        </form>
      </div>
      <div ref={scrim} className="filter-scrim print:hidden! fixed inset-0 z-[19] [background:rgb(5_5_11/.55)] [-webkit-backdrop-filter:blur(4px)] [backdrop-filter:blur(4px)]" hidden={!shown} />
    </>
  )
}
