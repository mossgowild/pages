// The whole page: header, hero wall, the filter toolbar and the day groups, the footer, the detail sheet, the full-image
// preview and the filter pickers. Neighbouring text is written as one string: React's server output splits it with
// comments, which nudges the glyphs.
import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import logo from '../../public/assets/brand/youyang-ravers-horizontal.svg?raw'
import { hasConditions, matchesEvent, NO_FILTERS, validRange, type Filters } from '../lib/filters'
import { startGlass } from '../lib/glass'
import type { EventView, Guide } from '../lib/guide'
import { useIsomorphicLayoutEffect } from '../lib/motion'
import { EventDetail, type DetailApi } from './EventDetail'
import { EventRow } from './EventRow'
import { FilterDock, tagsOf, type PickerState } from './FilterDock'
import { Divider } from './Divider'
import { DateRange, MultiList, PickerPop, rangeText, type Row } from './Pickers'
import { PosterPreview } from './PosterPreview'
import { ShinyText } from './ShinyText'

// The horizontal logo inline in the header byline, 12px tall in the lockup's colour (currentColor).
const LOGO = logo.trim().replace('<svg ', '<svg class="title-logo block flex-none w-auto h-3" aria-hidden="true" focusable="false" ')

const escape = (text: string) => text.replace(/[&<>"']/g, character => `&#${character.charCodeAt(0)};`)
// The hero wall's posters, as HTML: the wall's script (assets/hero.js) builds the Drift Wall inside this stage, so React
// leaves the stage's content alone. Each poster opens its event's details (EventDetail.tsx, docs/event-browsing.md Q24);
// without the script it links to the event's row.
const heroReel = (guide: Guide) => `<ul class="hero-reel">${guide.featured.map(card => `<li><a class="hero-poster spotlight-card" href="#${escape(card.id)}"`
  + ` draggable="false" aria-label="${escape(`${card.name} · 阵容与购票`)}"><img src="${escape(card.src)}" width="${card.width}" height="${card.height}"`
  + ` data-small="${escape(card.small)}" data-small-width="${card.smallWidth}" loading="lazy" decoding="async" draggable="false"`
  + ` alt="${escape(card.alt)}"></a></li>`).join('')}</ul>`

// The content column: 1480px at most, with 48px each side (24px from 1100px down, 18px on phones); full width in print.
const WRAP = 'wrap w-[min(1480px,100%_-_96px)] mx-auto max-[1101px]:w-[calc(100%_-_48px)] max-[701px]:w-[calc(100%_-_36px)] print:w-full'
// A low header (question 272): the title lockup on the left, the update stamp on the right, their tops and bottoms level.
const TOPBAR = 'relative min-h-[72px] [padding-block:10px] [border-bottom:1px_solid_transparent] grid grid-cols-[auto_auto] content-center items-center justify-between gap-6 max-[701px]:min-h-[68px] max-[701px]:gap-4 max-[361px]:gap-3 print:min-h-0 print:[border:0] print:[padding:0_0_24px]'
const BRAND = 'flex no-underline text-[14px] font-semibold whitespace-nowrap max-[701px]:text-[15px] max-[381px]:text-[13px]'
// Title first, then the byline “大湾区  by [logo]” (question 260, Y2); Noto Sans SC Black slanted 12° to match the logo
// (question 263), “by” in Syne 400 slanted alike (question 278). Both rows span the same width and both skew from their
// bottom-left corner, so their left and right edges line up.
const LOCKUP = `brand title-lockup ${BRAND} flex-none flex-col items-stretch gap-1.5 tracking-[0] text-(--brand-ink) print:text-[#111]`
const SLANT = '[transform:skewX(-12deg)] origin-[0_100%]'
const WORDMARK = `title-wordmark m-0 [font:900_22px/1.1_'Guide_Title','PingFang_SC','Microsoft_YaHei',sans-serif] whitespace-nowrap [text-align:justify] [text-align-last:justify] ${SLANT} max-[701px]:text-[20px]`
const REGION = `title-region inline-block [font:900_13px/1_'Guide_Title','PingFang_SC',sans-serif] tracking-[.3em] whitespace-nowrap text-[rgb(255_255_255/.6)] ${SLANT}`
// “by” is a corner mark at the logo's top left (question 283): its glyph tops sit 2px above the logo's top edge.
const BY = `title-by inline-block [font:400_7px/1_var(--font-display)] tracking-[.04em] ${SLANT} [translate:0_-2.6px]`
// 资讯更新 over “月.日 | 时:分”, right-aligned (question 272).
const UPDATED = 'site-updated flex flex-col items-end gap-1.5 text-right [font-variant-numeric:tabular-nums] text-(--muted) max-[701px]:gap-[5px]'
const UPDATED_TIME = 'flex items-center gap-2 [font:600_22px/1_var(--font-display)] tracking-[.06em] whitespace-nowrap text-(--ink) max-[701px]:gap-1.5 max-[701px]:text-[20px] max-[701px]:tracking-[.02em]'
const UPDATED_DATE = "after:content-[''] after:inline-block after:w-px after:h-3 after:ml-2 after:[background:rgb(255_255_255/.3)] after:align-[-1px] max-[701px]:after:ml-1.5"

// Text straight on the terrain background keeps a soft dark outline.
const TEXT_SHADOW = '[text-shadow:0_1px_10px_rgb(6_4_12/.9),0_0_2px_rgb(6_4_12/.8)]'
// The day's date, weekday and count before its divider line (a Star Border, Divider.tsx), drifting at about
// 0.9× the scroll on its day's view timeline (heading-drift in app.css).
const DAY = 'day-group mt-[38px] max-[701px]:mt-[29px] scroll-motion:[view-timeline-name:--day] scroll-motion:[view-timeline-inset:0_calc(50%_-_260px)]'
const DAY_HEADING = `day-heading flex gap-[14px] items-center scroll-mt-[28px] [margin:0_0_20px] text-[23px] font-[550] tracking-[-.025em] ${TEXT_SHADOW} scroll-motion:[animation-name:heading-drift] scroll-motion:[animation-timing-function:linear] scroll-motion:[animation-fill-mode:both] scroll-motion:[animation-timeline:--day] scroll-motion:[animation-range:cover_0px_cover_360px] max-[701px]:text-[20px] screen-to-700:flex-wrap screen-to-700:[gap:8px_12px]`
// No results: a glass card with Shiny Text and a pill back to the whole list.
const EMPTY = 'empty-state [border:1px_solid_var(--glass-edge)] rounded-(--radius) [background:var(--glass-tint)] [box-shadow:var(--glass-shadow)] [-webkit-backdrop-filter:var(--glass-blur)] [backdrop-filter:var(--glass-blur)] text-center [padding:64px_20px] mt-[26px] print:[border-color:#aaa] print:[background:#fff] print:[box-shadow:none] print:[-webkit-backdrop-filter:none] print:[backdrop-filter:none]'
const RESET = 'reset-empty relative specular-rim press [border:0] rounded-[999px] [background:var(--glass-pill)] [box-shadow:var(--glass-pill-shadow)] text-(--gold) min-h-(--control) [padding:0_var(--control-pad)] [font:600_13px/1_var(--font-display)]'

// React Bits Accordion Gallery, vertical, as a day's list (docs/event-browsing.md Q20–Q25): the first visible row stays
// open with its full poster stage, the rest collapsed but still listing artists and genres; any row opens its event's
// details. The rows after the open one drift as in the original (docs/site-rewrite.md Q14): by the open poster stage's
// height × 0.06 × the parallax 0.5 for each row, at most 1.5 rows' worth.
function DayGroup({ day, hidden, visible, onOpen }: {
  day: Guide['days'][number]; hidden: boolean; visible: EventView[]; onOpen: (row: HTMLElement) => void
}) {
  // The open row is known on the server too (its class only takes effect with the script's accordion-ready).
  const list = useRef<HTMLDivElement>(null)
  const active = visible[0]?.id
  useIsomorphicLayoutEffect(() => {
    if (!list.current) return
    const arrange = () => {
      const rows = visible.map(event => document.getElementById(event.id)!)
      const media = rows[0]?.querySelector('.event-stage')?.getBoundingClientRect().height ?? 0
      rows.forEach((row, index) => row.style.setProperty('--drift', index ? `${(Math.max(-1.5, -index) * 0.5 * media * 0.06).toFixed(1)}px` : '0px'))
    }
    arrange()
    addEventListener('resize', arrange)
    return () => removeEventListener('resize', arrange)
  }, [visible])
  // Up and down move between the day's visible rows.
  function keys(event: KeyboardEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement
    if (!target.classList.contains('event-toggle')) return
    const toggles = visible.map(item => document.getElementById(item.id)!.querySelector<HTMLElement>('.event-toggle')!)
    const index = toggles.indexOf(target)
    const next = ({ ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: toggles.length - 1 } as Record<string, number>)[event.key]
    if (next === undefined) return
    event.preventDefault()
    toggles[Math.max(0, Math.min(toggles.length - 1, next))].focus()
  }
  const shown = new Set(visible.map(event => event.id))
  return (
    <section className={DAY} data-date={day.iso} hidden={hidden}>
      <h3 className={DAY_HEADING}>
        <span className="day-number [font-family:var(--font-display)] text-[31px] text-(--gold) font-normal max-[701px]:text-[29px]" aria-hidden="true">{day.label}</span>
        <span className="sr-only">{`${day.title} `}</span>
        <small className="text-[11px] tracking-[.15em] text-(--muted) font-normal max-[701px]:text-[10px]">{`${day.weekday} / `}<span className="day-count">{visible.length}</span> 场</small>
        <Divider className="relative flex-1" />
      </h3>
      {day.events.length
        ? <div ref={list} className="event-accordion flex flex-col gap-2.5" onKeyDown={keys}>
            {/* Each row hydrates as its own unit after the rest of the page, so the toolbar works sooner and no long task
                hydrates the whole list at once; a row tapped before then hydrates first and gets the tap. */}
            {day.events.map(event => (
              <Suspense key={event.id}><EventRow event={event} hidden={!shown.has(event.id)} active={event.id === active} onOpen={onOpen} /></Suspense>
            ))}
          </div>
        : <p className={`empty-day text-[13px] text-(--muted) ${TEXT_SHADOW}`}>当日暂无活动信息。</p>}
    </section>
  )
}

export function Page({ guide }: { guide: Guide }) {
  const { title } = guide
  const brandLabel = `${guide.fullTitle} · ${guide.byline}`
  const [filters, setFilters] = useState<Filters>(NO_FILTERS)
  const [picker, setPicker] = useState<string | null>(null)
  const [shownPicker, setShownPicker] = useState<string | null>(null)
  const triggers = useRef(new Map<string, HTMLElement>())
  const detail = useRef<DetailApi>(null)
  const schedule = useRef<HTMLElement>(null)
  const events = useMemo(() => guide.days.flatMap(day => day.events), [guide])
  const openDetail = useCallback((row: HTMLElement) => detail.current?.open(row, row), [])
  // The pills' and cards' lights and the panels' refraction start once the page has hydrated.
  useEffect(() => startGlass(), [])

  // Venues by city, in the order the cities first appear in the list, each city's venues in Chinese order; only the
  // chosen cities' venues when cities are chosen.
  const allVenues = useMemo(() => [...new Set(events.map(event => event.city))].map(city => ({
    city, venues: [...new Set(events.filter(event => event.city === city).flatMap(event => event.venues))].sort((a, b) => a.localeCompare(b, 'zh-CN')),
  })), [events])
  const venuesFor = (cities: string[]) => allVenues.filter(group => !cities.length || cities.includes(group.city))
  const venueGroups = venuesFor(filters.city)
  // A change of cities drops chosen venues of the cities no longer in the list.
  function change(next: Filters) {
    const allowed = new Set(venuesFor(next.city).flatMap(group => group.venues.map(venue => `${group.city}|${venue}`)))
    setFilters({ ...next, venue: next.venue.filter(value => allowed.has(value)) })
  }

  const valid = validRange(filters)
  const active = hasConditions(filters)
  const matching = useMemo(() => events.filter(event => matchesEvent(event, filters)), [events, filters])
  const visibleIds = new Set(valid ? matching.map(event => event.id) : events.map(event => event.id))
  const total = matching.length
  const tags = useMemo(() => tagsOf(filters, guide, allVenues), [filters, guide, allVenues])
  const summary = !valid ? '日期条件无效，暂显示全部活动' : active ? `找到 ${total} / ${events.length} 场活动` : `全部 ${events.length} 场活动`
  const chosenVenues = venueGroups.flatMap(group => group.venues.filter(venue => filters.venue.includes(`${group.city}|${venue}`)))

  const pickers: PickerState = { open: picker, shown: shownPicker, toggle: id => setPicker(current => current === id ? null : id), triggers }
  const pickerProps = (id: string) => ({
    id, open: picker === id, trigger: () => triggers.current.get(id), onClose: () => setPicker(current => current === id ? null : current),
    onShown: (shown: boolean) => setShownPicker(current => shown ? id : current === id ? null : current),
  })
  const toggleIn = (list: string[], value: string) => list.includes(value) ? list.filter(item => item !== value) : [...list, value]

  return (
    <>
      <title>{guide.fullTitle}</title>
      <canvas className="topography fixed top-0 left-0 -z-1 w-full h-lvh pointer-events-none print:hidden!" aria-hidden="true" />
      <a className="skip-link fixed top-2 left-4 [transform:translateY(-200%)] z-100 [background:var(--gold)] text-(--bg) p-3 focus:[transform:none]" href="#schedule">跳至活动筛选与清单</a>
      <header className={`topbar ${WRAP} ${TOPBAR}`}>
        <a className={LOCKUP} href="#top" aria-label={brandLabel}>
          <h1 id="site-title" className={WORDMARK} aria-label={guide.fullTitle}>{title.topic + title.guide}</h1>
          <span className="title-byline flex items-center justify-between gap-3">
            <span className={REGION}>{title.region}</span>
            <span className="title-credit inline-flex items-start gap-px" dangerouslySetInnerHTML={{ __html: `<span class="${BY}">by</span>${LOGO}` }} />
          </span>
        </a>
        <div className={UPDATED}>
          <span className="mr-[-.42em] text-[11px] leading-[1.4] tracking-[.42em] whitespace-nowrap">资讯更新</span>
          <time className={UPDATED_TIME} dateTime={guide.updatedIso}><span className={UPDATED_DATE}>{guide.updatedDate}</span><span className="text-(--muted)">{guide.updatedTime}</span></time>
        </div>
        <Divider className="absolute left-0 right-0 bottom-[-1px] print:hidden" />
      </header>
      <main>
        <section id="spotlight" className="hero" aria-labelledby="spotlight-title">
          <h2 id="spotlight-title" className="sr-only">海报精选</h2>
          <div className="hero-stage" role="region" aria-label="精选活动海报" dangerouslySetInnerHTML={{ __html: heroReel(guide) }} />
        </section>
        <section ref={schedule} id="schedule" className={`schedule ${WRAP} relative [padding:44px_0_64px] max-[701px]:[padding:32px_0_38px]`} aria-labelledby="schedule-title">
          <div className={`section-heading flex justify-between items-end gap-6 mb-6 ${TEXT_SHADOW} max-[701px]:items-start`}>
            <div><h2 id="schedule-title" className="text-[30px] leading-[1.3] font-semibold [margin:9px_0_0] tracking-[-.04em] max-[701px]:text-[26px]">活动清单</h2></div>
            <p className="[font-family:var(--font-display)] text-[12px] text-(--muted) m-0 max-[701px]:max-w-[120px] max-[701px]:text-right max-[701px]:text-[11px]">Club Nights · Raves<br />Beach Parties</p>
          </div>
          <FilterDock guide={guide} filters={filters} change={change} tags={tags} count={valid ? total : events.length} summary={summary} valid={valid}
            pickers={pickers} venueText={chosenVenues.join('、')} venueCount={chosenVenues.length} schedule={schedule} />
          <noscript><p className="noscript text-(--muted) text-[13px] [border:1px_solid_var(--glass-edge)] rounded-(--radius) [background:var(--glass-tint)] [box-shadow:var(--glass-shadow)] p-4">启用 JavaScript 可使用组合筛选；下方仍可浏览全部活动、海报与购票链接。</p></noscript>
          <div className={EMPTY} id="empty-state" hidden={!valid || total > 0}>
            <h3 className="text-[24px] font-medium [margin:8px_0]"><ShinyText>这组条件下暂无活动</ShinyText></h3>
            <p className="text-[13px] text-(--muted)">试试其他日期、城市或音乐风格，发现更多现场。</p>
            <button type="button" className={RESET} id="reset-empty" onClick={() => {
              change(NO_FILTERS)
              document.querySelector<HTMLElement>('.filter-toggle')?.focus()
            }}>清空筛选，查看全部活动</button>
          </div>
          {guide.days.map(day => {
            const visible = day.events.filter(event => visibleIds.has(event.id))
            return <DayGroup key={day.iso} day={day} visible={visible} hidden={valid && active && !visible.length}
              onOpen={openDetail} />
          })}
        </section>
      </main>
      <footer className={`site-footer ${WRAP} relative [border-top:1px_solid_transparent] [padding:32px_0_40px] ${TEXT_SHADOW} max-[701px]:pb-[max(30px,env(safe-area-inset-bottom))]`}>
        <Divider className="absolute left-0 right-0 top-[-1px]" />
        <div className="footer-top flex justify-between items-center gap-5 max-[701px]:items-start max-[701px]:flex-col">
          <a className={`brand ${BRAND} gap-3 tracking-[.06em] items-center max-[701px]:gap-2`} href="#top" aria-label={brandLabel}>{guide.fullTitle}</a>
          <span className="text-[11px] tracking-[.12em] text-(--muted)">{`${guide.editionYear} / ${guide.dateRange} · 粤港澳大湾区`}</span>
        </div>
        <p className="text-[11px] text-(--muted) max-w-[900px] [margin:24px_0_0] print:text-[#444]">人民币、港币与澳门币按各场标示。“翌”指次日。票价、阵容、营业时间及入场安排以主办最新通知为准；户外活动请留意天气与主办公告。</p>
      </footer>
      <EventDetail ref={detail} events={events} />
      <PosterPreview />
      {/* The pickers' popovers sit at the end of the page, outside the filter cards, as their own top-layer sheets. */}
      <PickerPop {...pickerProps('venue')} title="场地" doneText={chosenVenues.length ? `${chosenVenues.length} 项` : ''}
        onClear={() => change({ ...filters, venue: [] })}>
        <MultiList id="venue" labelId="venue-label" placeholder="搜索场地" opened={shownPicker === 'venue'}
          groups={venueGroups.map(group => ({ label: group.city, rows: group.venues.map(venue => ({ value: `${group.city}|${venue}`, text: venue })) }))}
          selected={row => filters.venue.includes(row.value)} onToggle={row => change({ ...filters, venue: toggleIn(filters.venue, row.value) })} />
      </PickerPop>
      {guide.families.map(({ name, members }, index) => {
        const id = `family-${index}-picker`
        const all = filters.families.includes(name)
        const chosen = members.filter(genre => filters.genres.includes(genre)).length
        // The whole family shows every sub-genre ticked; unticking one leaves the others as a partial choice, and ticking
        // the last one turns them back into the whole family (questions 176, 179).
        const toggleMember = (row: Row) => {
          const others = filters.genres.filter(genre => !members.includes(genre))
          if (all) return change({ ...filters, families: filters.families.filter(family => family !== name), genres: [...others, ...members.filter(genre => genre !== row.value)] })
          const picked = toggleIn(filters.genres, row.value)
          if (members.every(genre => picked.includes(genre))) return change({ ...filters, families: [...filters.families, name], genres: others })
          change({ ...filters, genres: picked })
        }
        return (
          <PickerPop key={id} {...pickerProps(id)} title={name} doneText={all ? '全部' : chosen ? `${chosen} 项` : ''}
            onClear={() => change({ ...filters, families: filters.families.filter(family => family !== name), genres: filters.genres.filter(genre => !members.includes(genre)) })}>
            <MultiList id={id} labelId={`${id}-title`} placeholder={`搜索 ${name} 小类`} opened={shownPicker === id}
              groups={[{ label: null, rows: members.map(genre => ({ value: genre, text: genre })) }]}
              selected={row => all || filters.genres.includes(row.value)} onToggle={toggleMember} />
          </PickerPop>
        )
      })}
      <PickerPop {...pickerProps('dates')} title="日期范围" doneText={rangeText(filters.from, filters.to)} onClear={() => change({ ...filters, from: '', to: '' })}>
        <DateRange first={guide.startDate} last={guide.endDate} from={filters.from} to={filters.to} opened={shownPicker === 'dates'}
          onChange={(from, to) => change({ ...filters, from, to })} />
      </PickerPop>
    </>
  )
}
