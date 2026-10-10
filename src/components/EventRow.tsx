// One event: the row (poster stage and summary) and its details, which the detail sheet shows (EventDetail.tsx) and which
// stay in the row without the script (docs/event-browsing.md Q20–Q25). Unknown details leave their place empty rather
// than saying so (questions 183, 185).
import { forwardRef, Fragment, memo, useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import { startLabel, type Artist, type EventView, type Part, type Price, type Stage } from '../lib/guide'
import { mapLinks, platformOf } from '../lib/maps'
import { useMedia } from '../lib/motion'
import { PickerPop } from './Pickers'
import { SectionTitle } from './SectionTitle'

// The share and copy icons beside a place or code that shares or copies on tap: whichever the browser offers shows. The
// map pin beside a venue that opens the menu of maps.
const ICON = 'action-icon hidden flex-none text-(--brand-pink) print:hidden!'
const SHARE_ICON = (
  <svg className={`${ICON} [.is-share>&]:block`} aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
    <path d="M8 1.5v8M5 4.5l3-3 3 3M3.5 7.5v6h9v-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const COPY_ICON = (
  <svg className={`${ICON} [.is-copy>&]:block`} aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
    <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 3.5v-.5a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)
const MAP_ICON = (
  <svg className={`${ICON} [.is-map>&]:block`} aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
    <path d="M8 14.5S3.5 10.3 3.5 6.5a4.5 4.5 0 0 1 9 0c0 3.8-4.5 8-4.5 8Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="8" cy="6.5" r="1.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

// A link in the details: a whole line with the brand pink ↗, over a hairline. Links underline under the pointer even on
// touch screens, as before the rewrite.
export const LINK = "relative flex items-center justify-between gap-3 min-h-[44px] [padding:8px_0] text-[#f1ecf7] [font:600_13px/1.4_var(--font-display)] tracking-[.06em] no-underline before:ledger-line after:content-['↗'/''] after:flex-none after:text-(--brand-pink) after:[transition:translate_.3s_var(--ease-card)] [&:hover]:underline hover:text-white hover:after:[translate:3px_-3px] print:text-[#333] print:min-h-0"

function RichPart({ part }: { part: Part }) {
  switch (part.type) {
    case 'text': return <>{part.text}</>
    case 'break': return <br />
    case 'link': return <a className={LINK} href={part.url} target="_blank" rel="noopener noreferrer">{part.label}</a>
    // The code itself copies on tap; without the script it stays selectable text.
    case 'mini-program': return (
      <div className="mini-program [margin:6px_0]">
        <span className="mini-program-label block mb-2 [font:600_13px/1.4_var(--font-display)] tracking-[.06em] text-[#f1ecf7]">{part.label}</span>
        <CopyTarget className="[padding:12px_16px] [border:1px_solid_rgb(255_255_255/.16)] rounded-(--radius)" copy={part.code}>
          <code className="text-[12px] wrap-anywhere">{part.code}</code>{COPY_ICON}
        </CopyTarget>
        <small className="block [padding:8px_2px_0] text-[12px] text-(--muted)">{part.note}</small>
      </div>
    )
  }
}

// Small print in the system font among the display-font lines.
const SYSTEM_12 = "[font:400_12px/1.5_-apple-system,BlinkMacSystemFont,'PingFang_SC',sans-serif] tracking-[0] normal-case text-(--muted)"

// A stage's name with the genres and note that belong to the whole stage (the `stages` field), never to each artist.
function StageHeading({ name, info }: { name: string; info?: Partial<Stage> }) {
  return (
    <>
      {name}
      {info?.genres?.length ? <span className="stage-genres ml-3 tracking-[.02em] normal-case text-(--violet) font-medium [thead_&]:block [thead_&]:[margin:4px_0_0]">{info.genres.join(' · ')}</span> : null}
      {info?.note ? <small className={`stage-note block mt-1 ${SYSTEM_12}`}>{info.note}</small> : null}
    </>
  )
}

const NAME = 'artist-name [font:600_14px/1.35_var(--font-display)] tracking-[.04em] uppercase text-(--ink) wrap-anywhere [.artist-stage-table_&]:[overflow-wrap:normal] print:text-[#111]'
const DETAIL = 'artist-detail block text-[11px] font-normal leading-[1.5] text-(--muted) mt-[3px] tracking-[0] normal-case'

// An artist's name(s) with the performance form and note in small print. A B2B pairing reads as one line, “KK B2B ROCKEY”
// (question 187); other forms follow the names in small print.
function ArtistLabel({ artist, children }: { artist: Artist; children?: ReactNode }) {
  const pair = artist.format === 'B2B' && artist.names.length > 1
  const names = artist.names.map((name, index) => <span key={index} className={`${NAME} ${pair ? 'inline' : 'block'}`}>{name}</span>)
  return (
    <>
      {pair
        ? <span className="artist-pair flex flex-wrap items-baseline gap-x-2">{names.map((name, index) => <Fragment key={index}>{index > 0 && <small className="artist-b2b [font:600_10px/1_var(--font-display)] tracking-[.12em] text-(--muted)">B2B</small>}{name}</Fragment>)}</span>
        : names}
      {artist.format && !pair && <small className={DETAIL}>{artist.format}</small>}
      {artist.note && <small className={DETAIL}>{artist.note}</small>}
      {children}
    </>
  )
}

// The lineup ledger: real table semantics (the timetable's column headers visually hidden), a hairline under each row
// (the first cell's ::after, as wide as the lineup section, its container), times in gold and genres in violet. Printed,
// names turn black while times, genres and stage names keep their colours.
const TABLE = 'artist-table w-full border-collapse text-[12px] leading-[1.55]'
const HIDDEN_HEAD = 'absolute w-px h-px overflow-hidden [clip-path:inset(50%)] whitespace-nowrap print:static print:w-auto print:h-auto print:[clip-path:none]'
const CELL = 'relative align-baseline wrap-anywhere last:pr-0'
const PAD = '[padding:13px_16px_13px_0]'
const PLAIN = `${CELL} text-left font-normal print:text-[#111]`
const LINE = 'after:ledger-line after:w-[100cqw]'
const TIME = `artist-time ${CELL} text-left w-[9.5em] [font-family:var(--font-display)] [font-weight:500] [font-size:14px] [line-height:1.35] [font-variant-numeric:tabular-nums] whitespace-nowrap screen-to-700:w-[5.6em] screen-to-700:whitespace-normal`
const STAGE_ROW = `${CELL} [padding:22px_16px_13px_0] [.stage-row:first-child>&]:pt-1 text-left [font:600_12px/1.4_var(--font-display)] tracking-[.14em] uppercase text-(--gold) ${LINE}`
// A grouped lineup: stage columns side by side, divided by a faint rule.
const STAGE_HEAD = `${CELL} [padding:0_16px_10px_0] text-left [font:600_11px/1.4_var(--font-display)] tracking-[.14em] uppercase text-(--gold) not-first:pl-4 not-first:[border-left:1px_solid_rgb(255_255_255/.1)]`
const STAGE_CELL = `${PAD} ${PLAIN} not-first:pl-4 not-first:[border-left:1px_solid_rgb(255_255_255/.1)] first:after:ledger-line first:after:w-[100cqw]`
const LIST = 'artist-list list-none m-0 p-0 grid gap-[9px]'

// The lineup table shown in the details: per-artist times and/or genres, or stage columns for a grouped lineup. Artists
// of one stage sit under a stage heading row; crew (Deco, VJ) follow as rows of their own. Lineups without times, genres
// or stages are already complete in the row summary, so they get no table.
function artistTable(event: EventView): ReactNode {
  const { artists } = event
  const hasTime = artists.some(artist => artist.time)
  const hasGenres = artists.some(artist => artist.genres?.length)
  const stages = [...new Set(artists.map(artist => artist.stage ?? ''))]
  const grouped = !(hasTime || hasGenres) && stages.length > 1 && stages.every(Boolean)
  if (!(hasTime || hasGenres || grouped)) return null
  const stageInfo = new Map((event.stages ?? []).map(stage => [stage.name, stage]))
  const labels = [...(hasTime ? ['时段'] : []), '艺人', ...(hasGenres ? ['风格'] : [])]
  const caption = <caption className="sr-only">{event.name} · 艺人信息</caption>
  if (grouped) return (
    <table className={`${TABLE} artist-stage-table`}>
      {caption}
      <thead><tr>{stages.map(stage => <th key={stage} scope="col" className={STAGE_HEAD}><StageHeading name={stage} info={stageInfo.get(stage)} /></th>)}</tr></thead>
      <tbody><tr>{stages.map(stage => (
        <td key={stage} className={STAGE_CELL}><ul className={LIST}>
          {artists.filter(artist => artist.stage === stage).map((artist, index) => <li key={index}><ArtistLabel artist={artist} /></li>)}
        </ul></td>
      ))}</tr></tbody>
    </table>
  )
  // On phones a timetable shows the genres under the name instead of in their own column; without times the genres
  // column takes half the width.
  const nameCell = `${PAD} ${PLAIN} ${hasTime ? '' : LINE}`
  const genresCell = `artist-genres ${CELL} ${PAD} font-normal w-[34%] text-right text-(--violet) ${hasTime ? 'screen-to-700:hidden' : 'screen-to-700:w-[50%] screen-to-700:text-left'}`
  const inlineGenres = `artist-genres-inline hidden ${hasTime ? "screen-to-700:block screen-to-700:mt-1 screen-to-700:[font:400_12px/1.5_-apple-system,BlinkMacSystemFont,'PingFang_SC',sans-serif] screen-to-700:tracking-[0] screen-to-700:normal-case screen-to-700:text-(--violet)" : ''}`
  const rows: ReactNode[] = []
  let current: string | undefined
  artists.forEach((artist, index) => {
    const stage = artist.stage ?? ''
    if (stage && stage !== current) rows.push(
      <tr key={`stage-${index}`} className="stage-row"><th scope="colgroup" colSpan={labels.length} className={STAGE_ROW}><StageHeading name={stage} info={stageInfo.get(stage)} /></th></tr>)
    current = stage
    // Narrow screens hide the genre column and show the same genres under the name instead; unknown stays blank.
    const genres = (artist.genres ?? []).join(' · ')
    rows.push(
      <tr key={index}>
        {hasTime && <td className={`${TIME} ${PAD} text-(--gold) ${LINE}`}>{(artist.time ?? '').split('–').map((part, i, parts) => <Fragment key={i}>{i > 0 && <wbr />}{i < parts.length - 1 ? `${part}–` : part}</Fragment>)}</td>}
        <th scope="row" className={nameCell}><ArtistLabel artist={artist}>{hasGenres && genres && <span className={inlineGenres}>{genres}</span>}</ArtistLabel></th>
        {hasGenres && <td className={genresCell}>{genres}</td>}
      </tr>)
  })
  // The role takes the time column, so crew read like lineup rows.
  for (const [index, member] of (event.crew ?? []).entries()) rows.push(
    <tr key={`crew-${index}`} className="crew-row">
      {hasTime && <td className={`${TIME} crew-role ${PAD} text-(--muted) ${LINE}`}>{member.role}</td>}
      <th scope="row" className={nameCell}>{member.names.map((name, i) => <span key={i} className={`${NAME} block`}>{name}</span>)}</th>
      {hasGenres && <td className={genresCell} />}
    </tr>)
  const headerClass: Record<string, string> = { 时段: `${TIME} ${PAD} text-(--gold)`, 艺人: `${PAD} ${PLAIN}`, 风格: genresCell }
  return (
    <table className={TABLE}>
      {caption}
      <thead className={HIDDEN_HEAD}><tr>{labels.map(label => <th key={label} scope="col" className={headerClass[label]}>{label}</th>)}</tr></thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

// The lineup area: the table when the lineup has one. Otherwise, when the area still shows (a caption, or rooms whose
// artists the sources do not place), it lists the rooms as stage heading lines and every artist on a line of their own,
// forms kept, so it is never small print alone (question 203).
function lineupContent(event: EventView): ReactNode {
  const table = artistTable(event)
  if (table) return table
  const placed = new Set(event.artists.map(artist => artist.stage))
  const rooms = (event.stages ?? []).filter(stage => !placed.has(stage.name))
  if (!(rooms.length || event.lineup_caption?.length) || !event.artists.length) return null
  return (
    <>
      {rooms.length > 0 && (
        <ul className="stage-rooms grid gap-1.5 [margin:0_0_18px] p-0 list-none [font:600_11px/1.4_var(--font-display)] tracking-[.14em] uppercase text-(--gold)">
          {rooms.map(stage => <li key={stage.name}><StageHeading name={stage.name} info={stage} /></li>)}
        </ul>
      )}
      <ul className={LIST}>{event.artists.map((artist, index) => <li key={index}><ArtistLabel artist={artist} /></li>)}</ul>
    </>
  )
}

// Tier and note on the left, the amount on the right; each part only when the source has it.
function TicketPrice({ price }: { price: Price }) {
  const tier = price.label || price.note
  return (
    <li className="relative flex justify-between items-baseline gap-4 [padding:11px_0] text-[13px] leading-[1.5] text-[#e9e3f2] after:ledger-line print:text-[#111]">
      {tier && <span className="price-tier">{price.label}{price.note && <small className="block mt-0.5 text-[11px] text-(--muted)">{price.note}</small>}</span>}
      {price.amount && <b className="price-amount flex-none [font:600_18px/1.2_var(--font-display)] tracking-[-.01em] text-(--gold) text-right print:text-[#111]">{price.amount}</b>}
    </li>
  )
}

// Content that acts on tap: a venue's place and address open the system share sheet with “城市 地址 场地” where the browser
// offers one, otherwise copy it (on a touch screen the sheet's venue opens the menu of maps instead, SheetVenue); a
// mini-program code copies. A copy is confirmed in place for 2s. Without the script the
// button stays disabled and the text stays selectable.
// The content dims while 已复制 shows over it in the brand pink.
const COPY = 'copy-target relative flex items-center gap-3 w-full min-h-[44px] [background:none] text-inherit [font:inherit] text-left cursor-pointer disabled:cursor-text disabled:select-text enabled:active:[filter:brightness(.85)] [&>:first-child]:flex-1 [&>:first-child]:min-w-0 [&>:first-child]:[transition:opacity_.2s] [&.is-copied>:first-child]:opacity-30'
const STATUS = 'copy-status absolute right-[28px] top-[50%] [translate:0_-50%] [font:600_12px/1_var(--font-display)] tracking-[.06em] text-(--brand-pink) opacity-0 [transition:opacity_.2s] [.is-copied>&]:opacity-100'

function CopyTarget({ copy, share, className = '', children }: { copy: string; share?: string; className?: string; children: ReactNode }) {
  const [mode, setMode] = useState<'share' | 'copy'>()
  const [copied, setCopied] = useState(false)
  useEffect(() => setMode(share !== undefined && typeof navigator.share === 'function' ? 'share' : 'copy'), [share])
  async function act() {
    if (mode === 'share') {
      // Dismissing the sheet rejects with AbortError; that is the reader's choice, not a failure.
      await navigator.share({ text: share }).catch(error => { if (error.name !== 'AbortError') throw error })
      return
    }
    await navigator.clipboard.writeText(copy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button type="button" className={[COPY, className, mode && `is-${mode}`, copied && 'is-copied'].filter(Boolean).join(' ')}
      data-share-text={share} data-copy-text={copy} disabled={!mode} aria-label={mode && `${mode === 'share' ? '分享' : '复制'}：${copy}`} onClick={act}>
      {children}<span className={STATUS} aria-live="polite">{copied ? '已复制' : ''}</span>
    </button>
  )
}

// 城市 · 场地 then address lines; an unknown place leaves the city alone. With a known place, the place and address
// themselves are the action: in a row they share or copy (CopyTarget), in the sheet they may open the menu of maps
// (SheetVenue). The city label leads the place on one line.
function Venue({ location, inRow }: { location: string[]; inRow?: boolean }) {
  const [first, ...address] = location
  const split = first.indexOf(' · ')
  const [city, place] = split < 0 ? [first, ''] : [first.slice(0, split), first.slice(split + 3)]
  const lines = (
    <>
      <span className="venue-name block text-[15px] font-medium leading-[1.6] text-[#ece6f4] copy-hover:text-white print:text-[#111]">
        <span className="venue-city mr-2.5 [font:600_15px/1.6_var(--font-display)] tracking-[.16em] text-(--gold)">{city}</span>{place}
      </span>
      {address.map((line, index) => <span key={index} className="venue-address block text-[13px] leading-[1.7] text-(--muted)">{line}</span>)}
    </>
  )
  if (!place) return lines
  const text = [city, ...address, place].join(' ')
  const content = <span className="venue-lines">{lines}</span>
  if (!inRow) return <SheetVenue city={city} place={place} address={address} text={text}>{content}</SheetVenue>
  return <CopyTarget className={VENUE_TARGET} share={text} copy={text}>{content}{SHARE_ICON}{COPY_ICON}</CopyTarget>
}

const VENUE_TARGET = 'venue-target p-0 [border:0]'

// The sheet's venue (docs/event-browsing.md Q37–Q42): on a touch screen (anything but a hovering, fine pointer, F68) a
// tap opens a menu of maps searching for the place (src/lib/maps.ts) — an app's own link in this tab, a web map in a new
// one — in the filter pickers' popover: a bottom sheet titled with the place on phones, a dropdown under the venue on
// wider screens.
// The popover stays inside the sheet's dialog, as a modal dialog leaves everything outside it inert. With a mouse, and
// in the first render, the venue shares or copies as in a row.
function SheetVenue({ city, place, address, text, children }: { city: string; place: string; address: string[]; text: string; children: ReactNode }) {
  const touch = useMedia('not all and (hover: hover) and (pointer: fine)')
  const [open, setOpen] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  if (!touch) return <CopyTarget className={VENUE_TARGET} share={text} copy={text}>{children}{SHARE_ICON}{COPY_ICON}</CopyTarget>
  return (
    <>
      <button ref={button} type="button" className={`${COPY} ${VENUE_TARGET} is-map`} aria-haspopup="dialog" aria-expanded={open}
        aria-controls="venue-maps-popover" aria-label={`打开地图：${text}`} onClick={() => setOpen(!open)}>{children}{MAP_ICON}</button>
      <PickerPop id="venue-maps" title={place} open={open} trigger={() => button.current} doneLabel="取消" onClose={() => setOpen(false)}>
        <ul className="venue-maps m-0 [padding:0_4px] list-none">
          {mapLinks(city, place, address, platformOf(navigator.userAgent, navigator.maxTouchPoints)).map(map => (
            <li key={map.name}><a className={LINK} href={map.url} target={map.app ? undefined : '_blank'} rel={map.app ? undefined : 'noopener noreferrer'}
              onClick={() => setOpen(false)}>{map.name}</a></li>
          ))}
        </ul>
      </PickerPop>
    </>
  )
}

type InfoKey = keyof EventView['more_info']

function InfoPart({ name, event }: { name: InfoKey; event: EventView }) {
  const info = event.more_info
  let content: ReactNode
  if (name === 'prices') content = <ul className="ticket-prices list-none m-0 p-0">{info.prices.map((price, index) => <TicketPrice key={index} price={price} />)}</ul>
  else if (name === 'notes') content = info.notes.map((note, index) => <p key={index} className="m-0 text-[12px] leading-[1.7] text-(--muted) [p+&]:mt-[5px]">{note}</p>)
  else content = (
    <div className="info-actions">
      {info[name].map((part, index) => part.type === 'text'
        ? <p key={index} className="[margin:6px_0] text-[13px] leading-[1.7] text-[#d8cce3] [p+&]:mt-[5px]"><RichPart part={part} /></p>
        : <RichPart key={index} part={part} />)}
    </div>
  )
  return <div className={`info-section info-${name} [.info-section+&]:mt-[18px]`}>{content}</div>
}

// The 更多信息 fields split into strictly separate detail sections, in field order; empty sections are left out.
const INFO_SECTIONS: [string, string, string, InfoKey[]][] = [
  ['tickets', 'TICKETS', '票务', ['prices', 'booking']],
  ['links', 'DETAILS', '活动详情', ['details']],
  ['entry', 'ENTRY', '入场须知', ['notes']],
]

// Sections are told apart by their large titles (SectionTitle.tsx) and whitespace, not by rules.
function DetailSection({ name, english, label, caption, className, children }: {
  name: string; english: string; label: string; caption?: ReactNode; className: string; children: ReactNode
}) {
  return (
    <section className={`event-field event-${name || 'lineup'} text-[13px] leading-[1.8] ${className}`} data-field={name === 'location' ? name : undefined}>
      <SectionTitle as="h5" english={english} label={label} className="[margin:0_0_10px] text-[11px]">{caption}</SectionTitle>
      {children}
    </section>
  )
}

// Collapsed rows on wider screens set the artists and genres beside the name as columns of their own.
const ROW_ARTISTS = 'row-artists [grid-column:2] flex flex-wrap [gap:2px_16px] [margin:4px_0_0] p-0 list-none [font:600_13px/1.7_var(--font-display)] tracking-[.03em] uppercase text-[#eee]'

// One line per lineup entry for the row summary: B2B and other pairings stay together, Live and the like follow the name.
function ArtistSummary({ artists }: { artists: Artist[] }) {
  if (!artists.length) return null
  return (
    <ul className={ROW_ARTISTS} data-field="artists" aria-label="艺人">
      {artists.map((artist, index) => {
        const { names, format = '' } = artist
        return <li key={index}>{names.length > 1 ? names.join(` ${format || '&'} `) : names[0] + (format ? ` ${format}` : '')}</li>
      })}
    </ul>
  )
}

// React Bits Accordion Gallery's label bar before the open row's name (docs/site-rewrite.md Q15): 3×26px with a 12px glow in
// the accent colour, here the brand pink, centred where the name's capitals are.
const BAR = 'w-[3px] h-[26px] mr-3 rounded-[3px] bg-brand-pink align-[calc(.37em-13px)] shadow-[0_0_12px_color-mix(in_srgb,var(--brand-pink)_60%,transparent)]'

// The stage is a container the text lays out by. In a card the poster keeps its own shape across the card's width at
// the top (square without a poster) and the stage is as tall as it (docs/event-browsing.md Q47); longer text starts no
// higher than halfway down the poster and makes the card taller below it, so the poster neither zooms nor hides under
// the text. In the detail sheet, and in the list without the script, the stage is 560px (520px on phones) with the
// poster filling it. Printed, it shrinks to the text.
const STAGE = 'event-stage @container relative flex items-end overflow-clip min-h-[560px] screen-to-700:min-h-[520px] print:min-h-0!'
// A zero-wide spacer as tall as the poster sets the card's least height, and the text's top margin keeps it below the
// poster's upper half (percentages of the card's width; Safari does not grow an aspect-ratio box with clipped content).
const CARD_STAGE = "scripted:min-h-0 scripted:before:content-[''] scripted:before:[padding-top:calc(var(--depth)*100%)] scripted:[&>.event-summary]:mt-[calc(var(--depth)*50%)] print:before:content-none print:[&>.event-summary]:mt-0"
const CARD_POSTERS = 'scripted:bottom-auto scripted:[aspect-ratio:var(--ratio)]'
// The poster fills the stage at its upper middle; with the scroll depth it is 1.25× from its top edge and moves within
// the spare quarter (app.css). A sheet poster not downloaded yet stays hidden and fades in whole when it arrives
// (EventDetail.tsx).
const POSTER = 'block w-full h-full object-cover [object-position:center_25%] [transition:opacity_.3s_ease-out] scroll-motion:origin-top scroll-motion:[scale:1.25] motion-reduce:[transition:none] print:scroll-motion:[scale:none] print:scroll-motion:[translate:none] print:scroll-motion:[animation-name:none] [.is-pending_&]:opacity-0'
// In a card the cover runs its frame's scroll timeline (poster-parallax in app.css); in the detail sheet it rests where a
// cover entering the screen starts.
const ROW_PARALLAX = 'scroll-motion:[animation-name:poster-parallax] scroll-motion:[animation-timing-function:linear] scroll-motion:[animation-fill-mode:both] scroll-motion:[animation-timeline:--poster]'
const SHEET_PARALLAX = 'scroll-motion:[translate:0_-20%]'
// The text over the poster's faded part: the start time and city in a column of their own, then the name, venue and
// time, notes, artists and genres. Below 700px of stage the column narrows; in a card under 300px wide everything
// stacks, the time and city above the name.
const SUMMARY = 'event-summary relative z-2 grid grid-cols-[110px_minmax(0,1fr)] [align-items:start] [gap:10px_24px] w-full p-[26px] [text-shadow:0_1px_12px_rgb(0_0_0/.55)] @max-[700px]:grid-cols-[64px_minmax(0,1fr)] @max-[700px]:[gap:6px_14px] @max-[700px]:p-5 @max-[300px]:flex @max-[300px]:flex-col @max-[300px]:items-start @max-[300px]:gap-1.5 @max-[300px]:p-4 print:[text-shadow:none] print:text-[#111]'
const TITLE = '[grid-column:2] m-0 [font:600_24px/1.25_var(--font-display)] tracking-[-.01em] text-pretty @max-[700px]:text-[17px] @max-[300px]:text-[15px] print:text-[18px]'
const TOGGLE = 'event-toggle relative inline p-0 [border:0] [background:none] text-inherit [font:inherit] text-left [text-shadow:inherit] cursor-pointer focus-visible:[outline:2px_solid_var(--focus)] focus-visible:[outline-offset:4px] focus-visible:rounded-[4px]'
const GENRE = '[padding:3px_10px] [border:1px_solid_rgb(255_255_255/.18)] rounded-[999px] [background:var(--glass-pill)] [font:500_11px/1.4_var(--font-display)] text-[#ddd] [text-shadow:none]'

// The poster stage: the poster with the summary over its faded part. In the detail sheet it is a copy whose poster opens
// the full image and starts as the version the card showed (`full`: the original once it has downloaded there).
export const EventStage = forwardRef<HTMLDivElement, { event: EventView; sheet?: { full: boolean } }>(
  function EventStage({ event, sheet }, ref) {
    const { id, poster } = event
    return (
      <div className={`${STAGE} ${sheet ? '' : CARD_STAGE}`} ref={ref}
        style={sheet ? undefined : { '--ratio': poster ? `${poster.width} / ${poster.height}` : '1', '--depth': poster ? poster.height / poster.width : 1 } as CSSProperties}>
        {/* Off-screen rows skip rendering their poster, so its lazy image waits until the row nears the screen instead of
            taking bandwidth from the hero wall (docs/event-browsing.md Q34). */}
        <div className={`event-posters poster-fade absolute inset-0 z-0 print:hidden ${sheet ? '' : `${CARD_POSTERS} [content-visibility:auto] scroll-motion:[view-timeline-name:--poster] scroll-motion:[view-timeline-inset:0]`}`} data-field="posters">
          {/* The light version shows first; near the screen, in the detail sheet and in the preview the full-size version
              takes over (data-full: the original's same-size WebP where it has one; docs/event-browsing.md Q34). */}
          {poster
            ? <a className="block h-full no-underline cursor-zoom-in focus-visible:[outline-offset:-5px]" href={poster.full} aria-haspopup="dialog" aria-label={`预览：${poster.alt}`}>
                <img className={`${POSTER} ${sheet ? SHEET_PARALLAX : ROW_PARALLAX}`} width={poster.width} height={poster.height} src={poster.thumbnail} data-full={poster.full}
                  srcSet={sheet?.full ? poster.full : undefined} loading={sheet ? 'eager' : 'lazy'} fetchPriority={sheet ? 'high' : 'low'} alt={poster.alt} />
              </a>
            : <div className="poster-empty grid place-items-center h-full pb-[50%] text-(--muted) text-[13px]">暂无图片</div>}
        </div>
        {/* In the sheet the text over the poster lets taps through, as the whole poster opens the full image
            (docs/event-browsing.md F35), and it fades while the image is open. */}
        <div className={`${SUMMARY} ${sheet ? 'pointer-events-none [transition:opacity_.2s_ease-out] [.is-previewing_&]:opacity-0' : ''}`}>
          <header className="event-heading contents" data-field="name">
            <p className="event-start [grid-row:1/span_2] m-0 [font:600_26px/1_var(--font-display)] tracking-[-.01em] text-(--brand-yellow) @max-[700px]:text-[19px] @max-[300px]:text-[17px]">
              {event.starts.length ? startLabel(event) : ''}<small className="block mt-2 [font:500_11px/1.4_var(--font-display)] tracking-[.06em] text-[#bbb]">{event.city}</small>
            </p>
            {sheet
              ? <h4 id="event-detail-title" className={TITLE}><span className={`${BAR} inline-block`} aria-hidden="true" />{event.name}</h4>
              : <h4 id={`${id}-title`} className={TITLE}>
                  <button type="button" className={TOGGLE} aria-haspopup="dialog" aria-controls="event-detail"><span className={`${BAR} inline-block`} aria-hidden="true" />{event.name}</button>
                </h4>}
            <p className="event-meta [grid-column:2] m-0 text-[12px] leading-[1.6] text-[#d8cce3]">
              {event.venues.length > 0 && `${event.venues.join('、')} · `}
              <span className="event-time [font-family:var(--font-display)] [font-variant-numeric:tabular-nums] text-(--gold) print:text-[#333]">{event.time.join(' / ')}</span>
            </p>
            {event.notes.map((note, index) => <small key={index} className="event-note [grid-column:2] block text-(--muted) text-[12px] leading-[1.7]">{note}</small>)}
          </header>
          <ArtistSummary artists={event.artists} />
          {event.genres.length > 0 && (
            <p className="row-genres [grid-column:2] flex flex-wrap gap-1.5 m-0" data-field="genres" aria-label="风格">
              {event.genres.map(genre => <span key={genre} className={GENRE}>{genre}</span>)}
            </p>
          )}
        </div>
      </div>
    )
  })

// The lineup's small print beside its title, dot-separated; on phones it takes a line of its own.
const CAPTION = `lineup-caption ml-1.5 ${SYSTEM_12} [.lineup-caption+&]:before:content-['·'] [.lineup-caption+&]:before:mr-2 screen-to-700:basis-full screen-to-700:ml-0 screen-to-700:[.lineup-caption+&]:before:content-none`

// Details: the lineup (时间表 when it has set times, otherwise 阵容) with its small print beside the title, then the
// 更多信息 sections that have content and the venue.
export function EventDetails({ event, inRow }: { event: EventView; inRow?: boolean }) {
  const lineup = lineupContent(event)
  const captions = event.lineup_caption ?? []
  const timed = event.artists.some(artist => artist.time)
  const sections = INFO_SECTIONS.filter(([, , , keys]) => keys.some(key => event.more_info[key].length))
  const hasLineup = Boolean(lineup || captions.length)
  // In a row on a wide screen (the details show there without the script), a lineup takes the left 60% and the other
  // sections stack at the top of the right (--columns of them; a last 1fr row takes a long lineup's spare height), so
  // short lineups leave no void. The sheet, at most 760px wide, has two columns with the lineup across (F11).
  const wide = inRow && hasLineup
  const field = `[padding:28px_26px_26px] screen-to-700:[padding:26px_20px_22px] screen-to-700:last:pb-5 ${wide ? 'screen-from-1101:[grid-column:2] screen-from-1101:pb-1 screen-from-1101:last:pb-[26px]' : ''}`
  const columns = inRow
    ? `grid-cols-[repeat(var(--columns,4),minmax(0,1fr))] screen-to-1100:grid-cols-[repeat(2,minmax(0,1fr))] screen-to-700:grid-cols-[minmax(0,1fr)] scripted:hidden ${wide ? 'screen-from-1101:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] screen-from-1101:grid-rows-[repeat(var(--columns),auto)_1fr]' : ''}`
    : 'grid-cols-[repeat(var(--columns,4),minmax(0,1fr))] screen-from-701:grid-cols-[repeat(2,minmax(0,1fr))] screen-to-700:grid-cols-[minmax(0,1fr)] [.is-arriving_&]:hidden'
  return (
    <div className={`event-details relative z-2 grid p-0 overflow-clip print:[background:#fff] ${columns}`} id={inRow ? `${event.id}-details` : undefined}
      style={{ '--columns': sections.length + 1 } as CSSProperties}>
      {hasLineup && (
        <DetailSection name="" english={timed ? 'TIMETABLE' : 'LINEUP'} label={timed ? '时间表' : '阵容'}
          className={`[container-type:inline-size] [grid-column:1/-1] [padding:8px_26px_26px] screen-to-700:[padding:4px_20px_22px] ${wide ? 'screen-from-1101:[grid-column:1] screen-from-1101:[grid-row:1/-1] screen-from-1101:[padding:28px_40px_26px_26px]' : ''}`}
          caption={captions.map((text, index) => <small key={index} className={CAPTION}>{text}</small>)}>
          {lineup}
        </DetailSection>
      )}
      <div className="event-info contents text-[12px] text-(--muted)" data-field="info">
        {sections.map(([name, english, label, keys]) => (
          <DetailSection key={name} name={name} english={english} label={label} className={field}>
            {keys.filter(key => event.more_info[key].length).map(key => <InfoPart key={key} name={key} event={event} />)}
          </DetailSection>
        ))}
      </div>
      <DetailSection name="location" english="VENUE" label="地点" className={`${field} text-[#d8cce3] print:text-[#333]`}><Venue location={event.location} inRow={inRow} /></DetailSection>
    </div>
  )
}

// Cards are the 24px frosted glass of the original rows; under the mouse a card shrinks to 0.95 over 0.3s power2.out, as
// in React Bits Masonry (docs/event-browsing.md Q57).
const ROW = 'event-row event-light relative min-w-0 [transition:scale_.3s_cubic-bezier(.25,.46,.45,.94)] mouse:motion-safe:hover:[scale:.95] [border:1px_solid_var(--glass-edge)] rounded-(--radius) [background:rgb(19_19_27/.40)] [box-shadow:var(--glass-shadow)] [-webkit-backdrop-filter:var(--glass-blur)] [backdrop-filter:var(--glass-blur)] scroll-mt-[96px] overflow-clip wrap-anywhere target:[border-color:var(--gold)] scripted:cursor-pointer print:static! print:w-auto! print:[translate:none]! print:[break-inside:avoid] print:[transform:none] print:[background:#fff] print:[border-color:#aaa] print:[box-shadow:none]'

// The list's card. With the script the whole card opens its event's details (a link or button of its own keeps its
// behaviour; the poster is no link of its own there), and once the page has loaded and the card nears the screen its
// poster swaps the light version for the full-size one where the light one has fewer pixels than the card shows, the
// light version staying until that has downloaded (Q34); without it the details stay in the card. Cards only render
// again when their own props change, so a filter or the page hydrating does not redraw the whole list.
export const EventRow = memo(function EventRow({ event, hidden, onOpen }: { event: EventView; hidden: boolean; onOpen: (row: HTMLElement) => void }) {
  const { id } = event
  const row = useRef<HTMLElement>(null)
  const json = (value: unknown) => JSON.stringify(value)
  useEffect(() => {
    row.current!.querySelector<HTMLElement>('.event-posters')!.inert = true
    sharpenNearScreen(row.current!.querySelector<HTMLImageElement>('.event-posters img[data-full]'))
  }, [])
  function open(click: MouseEvent) {
    if (click.defaultPrevented || click.button || click.metaKey || click.ctrlKey || click.shiftKey || click.altKey) return
    if ((click.target as Element).closest('a, button:not(.event-toggle)')) return
    click.preventDefault()
    onOpen(row.current!)
  }
  return (
    <article ref={row} className={ROW} id={id} hidden={hidden} data-families={json(event.families)} data-date={event.date}
      data-city={event.city} data-venues={json(event.venues)} data-genres={json(event.genres)} data-starts={json(event.starts)}
      aria-labelledby={`${id}-title`} onClick={open}>
      <EventStage event={event} />
      <EventDetails event={event} inRow />
    </article>
  )
})

// The light version is enough while it has as many pixels across as the screen shows of the cover (the cover is 1.25× for
// the scroll depth and may be cropped at its sides).
function sharpenIfSoft(poster: HTMLImageElement) {
  const box = poster.getBoundingClientRect()
  const shown = Math.max(box.width, box.height * poster.naturalWidth / poster.naturalHeight) * devicePixelRatio
  if (poster.naturalWidth < shown) poster.srcset = poster.dataset.full!
}

// One observer for every card poster, started once the page has loaded so the originals do not take bandwidth from the
// hero wall's first posters.
let sharpen: IntersectionObserver | undefined
const waiting: HTMLImageElement[] = []
function sharpenNearScreen(image: HTMLImageElement | null | undefined) {
  if (!image) return
  if (!sharpen) {
    sharpen = new IntersectionObserver(entries => {
      for (const { isIntersecting, target } of entries) {
        if (!isIntersecting) continue
        sharpen!.unobserve(target)
        const poster = target as HTMLImageElement
        if (poster.complete) sharpenIfSoft(poster)
        else poster.addEventListener('load', () => sharpenIfSoft(poster), { once: true })
      }
    }, { rootMargin: '50% 0px' })
    const watch = () => waiting.splice(0).forEach(poster => sharpen!.observe(poster))
    if (document.readyState === 'complete') queueMicrotask(watch)
    else addEventListener('load', watch, { once: true })
  }
  if (document.readyState === 'complete' && !waiting.length) sharpen.observe(image)
  else waiting.push(image)
}
