// Filtering against the actual events (formerly scripts/check_filters.js).
import { expect, test } from 'bun:test'
import data from '../data/events.json'
import { matchesEvent, validRange, type Filters, type FilterEvent } from '../src/lib/filters'
import type { GuideEvent } from '../src/lib/guide'

const familiesOf = (genres: string[]) => Object.entries(data.genre_families).filter(([, members]) => members.some(genre => genres.includes(genre))).map(([name]) => name)
const events = (data.events as GuideEvent[]).map(event => ({ ...event, families: familiesOf(event.genres) }))
const filter = (values: Partial<Filters>) => events.filter(event => matchesEvent(event, values))
const count = (values: Partial<Filters>) => filter(values).length

test('dates, cities, venues and genres', () => {
  expect(count({})).toBe(events.length)
  expect(count({ from: '2026-09-30', to: '2026-09-30' })).toBe(8)
  expect(count({ city: ['香港'], from: '2026-10-02', to: '2026-10-02', genres: ['Hard Techno'] })).toBe(1)
  expect(count({ city: ['澳门'], venue: ['深圳|PLAY X'] })).toBe(0)
  expect(count({ venue: ['深圳|PLAY X'] })).toBe(7)
  expect(filter({ from: '2026-10-07' }).map(event => event.id)).toEqual([])
  expect(validRange({ from: '2026-10-04', to: '2026-10-01' })).toBe(false)
  expect(count({ from: '2026-10-04', to: '2026-10-01' })).toBe(0)
  const verknipt = filter({ city: ['香港'], from: '2026-10-02', to: '2026-10-02', genres: ['Hard Techno'] })[0]
  expect(matchesEvent(verknipt, { families: ['Techno'] })).toBe(true)
  expect(matchesEvent(verknipt, { genres: ['Techno'] })).toBe(false)
  expect(matchesEvent(verknipt, { from: '2026-10-02', to: '2026-10-02', period: ['day'] })).toBe(true)
  expect(matchesEvent(verknipt, { from: '2026-10-03' })).toBe(false)
  expect(matchesEvent(events.find(event => event.genres.includes('Psytrance'))!, { families: ['Trance'] })).toBe(true)
})

test('genre families match by explicit membership, not by name', () => {
  for (const [genre, family, excluded] of [
    ['Schranz', 'Techno', 'Hard Dance'], ['Hardstyle', 'Hard Dance', 'Techno'], ['Jungle', 'Bass', 'Techno'],
    ['Forest Psytrance', 'Trance', 'Techno'], ['Afrobeats', 'Open Format', 'House'], ['Afro House', 'House', 'Open Format'],
    ['Gqom', 'Bass', 'House'], ['UK Garage', 'Bass', 'House'], ['Psychedelic', null, 'Trance'], ['Hypnotic', null, 'Techno'],
  ] as const) {
    const sample = { genres: [genre], families: familiesOf([genre]) } as unknown as FilterEvent
    if (family) expect(matchesEvent(sample, { families: [family] })).toBe(true)
    expect(matchesEvent(sample, { families: [excluded] })).toBe(false)
  }
})

test('any value within a facet, every facet with values', () => {
  const byCity = (city: string) => events.filter(event => event.city === city).length
  expect(count({ city: ['广州', '深圳'] })).toBe(byCity('广州') + byCity('深圳'))
  expect(count({ city: ['广州', '深圳'], families: ['Techno'] })).toBe(events.filter(event => event.families.includes('Techno') && ['广州', '深圳'].includes(event.city)).length)
  expect(count({ families: ['Techno', 'House'] })).toBe(events.filter(event => event.families.includes('Techno') || event.families.includes('House')).length)
  expect(count({ families: ['Techno'], genres: ['Trap'] })).toBe(events.filter(event => event.families.includes('Techno') || event.genres.includes('Trap')).length)
  expect(count({ venue: ['深圳|PLAY X', '深圳|OIL'] })).toBe(count({ venue: ['深圳|PLAY X'] }) + count({ venue: ['深圳|OIL'] }))
  expect(count({ city: [], families: [], genres: [], period: [], venue: [] })).toBe(events.length)
})

test('unknown starts and venues are not filters (question 182)', () => {
  expect(count({ period: ['day', 'night'] })).toBe(events.filter(event => event.starts.length).length)
  expect(events.some(event => event.genres.includes('Live'))).toBe(false)
  const both = events.find(event => event.starts.includes(1020) && event.starts.includes(1320))!
  expect(matchesEvent(both, { period: ['day'] }) && matchesEvent(both, { period: ['night'] })).toBe(true)
  expect(matchesEvent(filter({ venue: ['深圳|PLAY X'], from: '2026-10-06', to: '2026-10-06' })[0], { period: ['night'] })).toBe(true)
  const unknown = filter({ venue: ['深圳|PLAY X'], to: '2026-09-30' })[0]
  expect(unknown.starts.length).toBe(0)
  expect(matchesEvent(unknown, { period: ['night'] }) || matchesEvent(unknown, { period: ['day'] })).toBe(false)
  expect(events.some(event => !event.venues.length && matchesEvent(event, { venue: [`${event.city}|`] }))).toBe(false)
})
