// The guide's data: data/events.json and the poster manifest, checked and arranged for the page, on the server only.
// data/events.json stays the only place events are edited (AGENTS.md); every rule here used to live in
// scripts/build_page.py and scripts/check_page.py (docs/site-rewrite.md Q4).
import data from '../../data/events.json'
import manifest from '../../public/assets/posters/sources.json'
import type { EventView, GuideEvent, Poster } from './guide'

const events = data.events as GuideEvent[]
export const posters = new Map((manifest.images as Poster[]).map(image => [image.path, image]))

function check(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const sameSet = (a: Iterable<string>, b: Iterable<string>) => {
  const x = new Set(a), y = new Set(b)
  return x.size === y.size && [...x].every(value => y.has(value))
}

// Every rule the data must keep; it throws on the first one broken.
export function validate(input: typeof data = data, images: Map<string, Poster> = posters) {
  const events = input.events as GuideEvent[]
  const families = input.genre_families as Record<string, string[]>
  for (const [name, members] of Object.entries(families)) {
    check(name && members.length && new Set(members).size === members.length, 'Invalid genre family')
    check(!members.includes('TBA') && !members.includes('Live'), 'Unknown and performance formats are not genres')
  }
  // Unknown or vague details are left out of the data entirely (questions 183, 185).
  check(!/尚不明确|未知|"TBA"/.test(JSON.stringify(events)), 'Leave unknown details out instead of writing a placeholder')
  const placeholders = new Set(['阵容尚不明确', '嘉宾尚不明确', 'DJ / MC 组合'])
  check(!events.some(event => event.artists.some(artist => artist.names.some(name => placeholders.has(name)))), 'No stand-in lineup names')
  check(input.start_date <= input.end_date, 'The edition must start before it ends')
  check(new Set(events.map(event => event.id)).size === events.length, 'Duplicate event IDs')
  for (const event of events) {
    check(input.start_date <= event.date && event.date <= input.end_date, `${event.id}: outside the edition`)
    check(event.city && event.name && event.time.length, `${event.id}: city, name and time are required`)
    check((event.venues.length > 0) === event.location[0].includes(' · '), `${event.id}: venue and location disagree`)
    check(event.starts.every(time => Number.isInteger(time) && time >= 0 && time < 1440), `${event.id}: start minutes out of range`)
    check(event.posters.length <= 1, `${event.id}: one poster per event`)
    for (const poster of event.posters) {
      const image = images.get(poster.image)
      check(image && image.width > 0 && image.height > 0, `${event.id}: unknown poster ${poster.image}`)
      check([image.path, image.thumbnail, image.thumbnail_small, image.full].every(path => path.startsWith('assets/posters/') && !path.includes('..')), `${event.id}: poster outside assets/posters`)
    }
    const info = event.more_info
    const parts = [...info.booking, ...info.details]
    check(parts.some(part => part.type === 'link'), `${event.id}: needs a source or booking link`)
    check(parts.every(part => part.type !== 'link' || /^(https?|weixin):/.test(part.url)), `${event.id}: unsupported link`)
    check(!event.genres.some(genre => /（[^）]*[\u4e00-\u9fff]/.test(genre)), `${event.id}: remove genre translations`)
    check(info.prices.every(price => price.label || price.amount), `${event.id}: a price needs a tier or an amount`)
    for (const artist of event.artists) {
      check(!artist.genre_sources || artist.genre_sources.length === (artist.genres ?? []).length, `${event.id}: one source per genre line`)
    }
  }
  const genres = new Set(events.flatMap(event => event.genres))
  const broad = new Set(input.broad_genres as string[])
  const members = new Set(Object.values(families).flat())
  // Broad source labels (Acid, Afro, EDM…) stay on the rows but are not filters; every other genre has a family.
  check(![...broad].some(genre => members.has(genre)), 'Broad labels are not family members')
  const unassigned = [...genres].filter(genre => !broad.has(genre) && !members.has(genre))
  check(!unassigned.length, `Assign every known genre to a family or to broad_genres: ${unassigned.sort().join(', ')}`)
  const active = Object.keys(families).filter(name => families[name].some(genre => genres.has(genre)))
  const order = input.genre_order as { families: string[]; genres: string[] }
  check(new Set(order.families).size === order.families.length && sameSet(order.families, active), 'Update genre_order.families')
  check(order.families.join() === Object.keys(families).join(), 'Family chips follow genre_order')
  const filterable = [...genres].filter(genre => !broad.has(genre))
  check(new Set(order.genres).size === order.genres.length && sameSet(order.genres, filterable), 'Update genre_order.genres')
  check(input.featured.length >= 3 && new Set(input.featured).size === input.featured.length, 'Choose distinct featured events')
  check(input.featured.every(id => events.some(event => event.id === id && event.posters.length)), 'Featured events need posters')
  check(!/wxid_|@chatroom|localhost|file:\/\/|\/Users\//.test(JSON.stringify(input) + JSON.stringify([...images.values()])), 'No private identifiers or local paths')
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthDay = (iso: string) => iso.slice(5).replace('-', '.')
// Python's round(), which the wall's widths were first computed with: halves go to the even neighbour.
const roundHalfEven = (value: number) => {
  const rounded = Math.round(value)
  return Math.abs(value % 1) === 0.5 && rounded % 2 ? rounded - 1 : rounded
}

// Everything the page renders, in order.
function build() {
  validate()
  const families = data.genre_families as Record<string, string[]>
  const firstStart = (event: GuideEvent) => event.starts.length ? Math.min(...event.starts) : 1440
  const sorted: EventView[] = [...events]
    .sort((a, b) => a.date.localeCompare(b.date) || firstStart(a) - firstStart(b))
    .map(event => ({
      ...event,
      families: Object.keys(families).filter(name => families[name].some(genre => event.genres.includes(genre))),
      poster: event.posters.length ? { ...posters.get(event.posters[0].image)!, alt: event.posters[0].alt } : null,
    }))
  const days = []
  for (let day = new Date(`${data.start_date}T00:00:00Z`); day <= new Date(`${data.end_date}T00:00:00Z`); day.setUTCDate(day.getUTCDate() + 1)) {
    const iso = day.toISOString().slice(0, 10)
    days.push({ iso, label: monthDay(iso), title: `${day.getUTCMonth() + 1} 月 ${day.getUTCDate()} 日`, weekday: WEEKDAYS[day.getUTCDay()], events: sorted.filter(event => event.date === iso) })
  }
  // Sub-genres in each family picker: most events this edition first, ties in the JSON member order (question 179).
  const count = (genre: string) => events.filter(event => event.genres.includes(genre)).length
  const { title, publisher } = data
  const [, updatedDate, updatedTime] = data.updated_at.match(/^\d{4}-(\d\d-\d\d)T(\d\d:\d\d)/)!
  return {
    title, fullTitle: title.region + title.topic + title.guide, byline: `By ${publisher.name}${publisher.latin}`,
    updatedIso: data.updated_at, updatedDate: updatedDate.replace('-', '.'), updatedTime,
    editionYear: data.start_date.slice(0, 4), dateRange: `${monthDay(data.start_date)} — ${monthDay(data.end_date)}`,
    startDate: data.start_date, endDate: data.end_date, eventCount: events.length, days,
    cities: [...new Set(events.map(event => event.city))].sort(),
    families: data.genre_order.families.map(name => ({ name, members: families[name].filter(count).sort((a, b) => count(b) - count(a)) })),
    genres: data.genre_order.genres,
    // The wall's posters; each names its 400px light version and that version's width, which assets/hero.js shows instead
    // of the 720px one where it covers the tile on the screen (docs/motion-performance.md).
    featured: data.featured.map(id => {
      const event = sorted.find(item => item.id === id)!
      const image = event.poster!
      return { id, name: event.name, alt: image.alt, src: image.thumbnail, width: image.width, height: image.height,
        small: image.thumbnail_small, smallWidth: roundHalfEven(image.width * Math.min(1, 400 / Math.min(image.width, image.height))) }
    }),
  }
}

let cached: ReturnType<typeof build> | undefined
// The data only changes with a new build, so the page is arranged once per server instance.
export const guide = () => (cached ??= build())
export type Guide = ReturnType<typeof build>
