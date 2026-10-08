// One event: the row (poster stage and summary) and its details, which assets/event-detail.js shows in the detail sheet
// and which stay in the row without the script (docs/event-browsing.md Q20–Q25). Unknown details leave their place empty
// rather than saying so (questions 183, 185).
import { Fragment, type CSSProperties, type ReactNode } from 'react'
import { startLabel, type Artist, type EventView, type Part, type Price, type Stage } from '../lib/guide'

const SHARE_ICON = (
  <svg className="action-icon" aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
    <path d="M8 1.5v8M5 4.5l3-3 3 3M3.5 7.5v6h9v-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const COPY_ICON = (
  <svg className="action-icon" aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
    <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 3.5v-.5a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

function RichPart({ part }: { part: Part }) {
  switch (part.type) {
    case 'text': return <>{part.text}</>
    case 'break': return <br />
    case 'link': return <a href={part.url} target="_blank" rel="noopener noreferrer">{part.label}</a>
    // The code itself copies on tap (assets/copy-share.js); without the script it stays selectable text.
    case 'mini-program': return (
      <div className="mini-program">
        <span className="mini-program-label">{part.label}</span>
        <button type="button" className="copy-target" data-copy-text={part.code} disabled>
          <code>{part.code}</code>{COPY_ICON}<span className="copy-status" aria-live="polite" />
        </button>
        <small>{part.note}</small>
      </div>
    )
  }
}

// A stage's name with the genres and note that belong to the whole stage (the `stages` field), never to each artist.
function StageHeading({ name, info }: { name: string; info?: Partial<Stage> }) {
  return (
    <>
      {name}
      {info?.genres?.length ? <span className="stage-genres">{info.genres.join(' · ')}</span> : null}
      {info?.note ? <small className="stage-note">{info.note}</small> : null}
    </>
  )
}

// An artist's name(s) with the performance form and note in small print. A B2B pairing reads as one line, “KK B2B ROCKEY”
// (question 187); other forms follow the names in small print.
function ArtistLabel({ artist, children }: { artist: Artist; children?: ReactNode }) {
  const pair = artist.format === 'B2B' && artist.names.length > 1
  const names = artist.names.map((name, index) => <span key={index} className="artist-name">{name}</span>)
  return (
    <>
      {pair
        ? <span className="artist-pair">{names.map((name, index) => <Fragment key={index}>{index > 0 && <small className="artist-b2b">B2B</small>}{name}</Fragment>)}</span>
        : names}
      {artist.format && !pair && <small className="artist-detail">{artist.format}</small>}
      {artist.note && <small className="artist-detail">{artist.note}</small>}
      {children}
    </>
  )
}

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
    <table className="artist-table artist-stage-table">
      {caption}
      <thead><tr>{stages.map(stage => <th key={stage} scope="col"><StageHeading name={stage} info={stageInfo.get(stage)} /></th>)}</tr></thead>
      <tbody><tr>{stages.map(stage => (
        <td key={stage}><ul className="artist-list">
          {artists.filter(artist => artist.stage === stage).map((artist, index) => <li key={index}><ArtistLabel artist={artist} /></li>)}
        </ul></td>
      ))}</tr></tbody>
    </table>
  )
  const rows: ReactNode[] = []
  let current: string | undefined
  artists.forEach((artist, index) => {
    const stage = artist.stage ?? ''
    if (stage && stage !== current) rows.push(
      <tr key={`stage-${index}`} className="stage-row"><th scope="colgroup" colSpan={labels.length}><StageHeading name={stage} info={stageInfo.get(stage)} /></th></tr>)
    current = stage
    // Narrow screens hide the genre column and show the same genres under the name instead; unknown stays blank.
    const genres = (artist.genres ?? []).join(' · ')
    rows.push(
      <tr key={index}>
        {hasTime && <td className="artist-time">{(artist.time ?? '').split('–').map((part, i, parts) => <Fragment key={i}>{i > 0 && <wbr />}{i < parts.length - 1 ? `${part}–` : part}</Fragment>)}</td>}
        <th scope="row"><ArtistLabel artist={artist}>{hasGenres && genres && <span className="artist-genres-inline">{genres}</span>}</ArtistLabel></th>
        {hasGenres && <td className="artist-genres">{genres}</td>}
      </tr>)
  })
  // The role takes the time column, so crew read like lineup rows.
  for (const [index, member] of (event.crew ?? []).entries()) rows.push(
    <tr key={`crew-${index}`} className="crew-row">
      {hasTime && <td className="artist-time crew-role">{member.role}</td>}
      <th scope="row">{member.names.map((name, i) => <span key={i} className="artist-name">{name}</span>)}</th>
      {hasGenres && <td className="artist-genres" />}
    </tr>)
  const headerClass: Record<string, string> = { 时段: 'artist-time', 风格: 'artist-genres' }
  return (
    <table className="artist-table">
      {caption}
      <thead><tr>{labels.map(label => <th key={label} scope="col" className={headerClass[label]}>{label}</th>)}</tr></thead>
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
      {rooms.length > 0 && <ul className="stage-rooms">{rooms.map(stage => <li key={stage.name}><StageHeading name={stage.name} info={stage} /></li>)}</ul>}
      <ul className="artist-list">{event.artists.map((artist, index) => <li key={index}><ArtistLabel artist={artist} /></li>)}</ul>
    </>
  )
}

// Tier and note on the left, the amount on the right; each part only when the source has it.
function TicketPrice({ price }: { price: Price }) {
  const tier = price.label || price.note
  return (
    <li>
      {tier && <span className="price-tier">{price.label}{price.note && <small>{price.note}</small>}</span>}
      {price.amount && <b className="price-amount">{price.amount}</b>}
    </li>
  )
}

// 城市 · 场地 then address lines; an unknown place leaves the city alone. With a known place, the place and address
// themselves are the action (assets/copy-share.js): the system share sheet with “城市 地址 场地”, or copying it where
// sharing is unavailable. Without the script the button is inert. The city label leads the place on one line.
function Venue({ location }: { location: string[] }) {
  const [first, ...address] = location
  const split = first.indexOf(' · ')
  const [city, place] = split < 0 ? [first, ''] : [first.slice(0, split), first.slice(split + 3)]
  const lines = (
    <>
      <span className="venue-name"><span className="venue-city">{city}</span>{place}</span>
      {address.map((line, index) => <span key={index} className="venue-address">{line}</span>)}
    </>
  )
  if (!place) return lines
  const text = [city, ...address, place].join(' ')
  return (
    <button type="button" className="copy-target venue-target" data-share-text={text} data-copy-text={text} disabled>
      <span className="venue-lines">{lines}</span>{SHARE_ICON}{COPY_ICON}<span className="copy-status" aria-live="polite" />
    </button>
  )
}

type InfoKey = keyof EventView['more_info']

function InfoPart({ name, event }: { name: InfoKey; event: EventView }) {
  const info = event.more_info
  let content: ReactNode
  if (name === 'prices') content = <ul className="ticket-prices">{info.prices.map((price, index) => <TicketPrice key={index} price={price} />)}</ul>
  else if (name === 'notes') content = info.notes.map((note, index) => <p key={index}>{note}</p>)
  else content = (
    <div className="info-actions">
      {info[name].map((part, index) => part.type === 'text' ? <p key={index}><RichPart part={part} /></p> : <RichPart key={index} part={part} />)}
    </div>
  )
  return <div className={`info-section info-${name}`}>{content}</div>
}

// The 更多信息 fields split into strictly separate detail sections, in field order; empty sections are left out.
const INFO_SECTIONS: [string, string, string, InfoKey[]][] = [
  ['tickets', 'TICKETS', '票务', ['prices', 'booking']],
  ['links', 'DETAILS', '活动详情', ['details']],
  ['entry', 'ENTRY', '入场须知', ['notes']],
]

function DetailSection({ name, english, label, caption, children }: { name: string; english: string; label: string; caption?: ReactNode; children: ReactNode }) {
  return (
    <section className={`event-field event-${name || 'lineup'}`} data-field={name === 'location' ? name : undefined}>
      <h5><span lang="en">{english}</span>{label}{caption}</h5>
      {children}
    </section>
  )
}

// One line per lineup entry for the row summary: B2B and other pairings stay together, Live and the like follow the name.
function ArtistSummary({ artists }: { artists: Artist[] }) {
  if (!artists.length) return null
  return (
    <ul className="row-artists" data-field="artists" aria-label="艺人">
      {artists.map((artist, index) => {
        const { names, format = '' } = artist
        return <li key={index}>{names.length > 1 ? names.join(` ${format || '&'} `) : names[0] + (format ? ` ${format}` : '')}</li>
      })}
    </ul>
  )
}

export function EventRow({ event }: { event: EventView }) {
  const { id, poster } = event
  const json = (value: unknown) => JSON.stringify(value)
  // Details: the lineup (时间表 when it has set times, otherwise 阵容) with its small print beside the title, then the
  // 更多信息 sections that have content and the venue. With the script they open in the event's detail sheet
  // (assets/event-detail.js); without it they stay in the row.
  const lineup = lineupContent(event)
  const captions = event.lineup_caption ?? []
  const timed = event.artists.some(artist => artist.time)
  const sections = INFO_SECTIONS.filter(([, , , keys]) => keys.some(key => event.more_info[key].length))
  return (
    <article className="event-row" id={id} data-families={json(event.families)} data-date={event.date} data-city={event.city}
      data-venues={json(event.venues)} data-genres={json(event.genres)} data-starts={json(event.starts)} aria-labelledby={`${id}-title`}>
      <div className="event-stage">
        <div className="event-posters" data-field="posters">
          {/* The light version shows first; near the screen, in the detail sheet and in the preview the full-size version
              takes over (data-full: the original's same-size WebP where it has one; docs/event-browsing.md Q34). */}
          {poster
            ? <a href={poster.full} aria-haspopup="dialog" aria-label={`预览：${poster.alt}`}>
                <img width={poster.width} height={poster.height} src={poster.thumbnail} data-full={poster.full} loading="lazy" fetchPriority="low" alt={poster.alt} />
              </a>
            : <div className="poster-empty">暂无图片</div>}
        </div>
        <div className="event-summary">
          <header className="event-heading" data-field="name">
            <p className="event-start">{event.starts.length ? startLabel(event) : ''}<small>{event.city}</small></p>
            <h4 id={`${id}-title`}><button type="button" className="event-toggle" aria-haspopup="dialog" aria-controls="event-detail">{event.name}</button></h4>
            <p className="event-meta">
              {event.venues.length > 0 && `${event.venues.join('、')} · `}
              <span className="event-time">{event.time.join(' / ')}</span>
            </p>
            {event.notes.map((note, index) => <small key={index} className="event-note">{note}</small>)}
          </header>
          <ArtistSummary artists={event.artists} />
          {event.genres.length > 0 && (
            <p className="row-genres" data-field="genres" aria-label="风格">{event.genres.map(genre => <span key={genre}>{genre}</span>)}</p>
          )}
        </div>
      </div>
      <div className="event-details" id={`${id}-details`} style={{ '--columns': sections.length + 1 } as CSSProperties}>
        {(lineup || captions.length > 0) && (
          <DetailSection name="" english={timed ? 'TIMETABLE' : 'LINEUP'} label={timed ? '时间表' : '阵容'}
            caption={captions.map((text, index) => <small key={index} className="lineup-caption">{text}</small>)}>
            {lineup}
          </DetailSection>
        )}
        <div className="event-info" data-field="info">
          {sections.map(([name, english, label, keys]) => (
            <DetailSection key={name} name={name} english={english} label={label}>
              {keys.filter(key => event.more_info[key].length).map(key => <InfoPart key={key} name={key} event={event} />)}
            </DetailSection>
          ))}
        </div>
        <DetailSection name="location" english="VENUE" label="地点"><Venue location={event.location} /></DetailSection>
      </div>
    </article>
  )
}
