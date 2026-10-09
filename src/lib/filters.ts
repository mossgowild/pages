// Which events a set of filter conditions shows. Each facet holds a list: an event matches any value within a facet and
// every facet that has values; genre families and specific genres form one facet.
import type { EventView } from './guide'

export type Filters = { city: string[]; families: string[]; genres: string[]; period: string[]; venue: string[]; from: string; to: string }
export type FilterEvent = Pick<EventView, 'date' | 'city' | 'venues' | 'genres' | 'starts' | 'families'>

export const NO_FILTERS: Filters = { city: [], families: [], genres: [], period: [], venue: [], from: '', to: '' }

export const validRange = (filters: Pick<Filters, 'from' | 'to'>) => !filters.from || !filters.to || filters.from <= filters.to

// Events with an unknown start match neither period (question 182: unknown details are not filters).
const PERIODS: Record<string, (event: FilterEvent) => boolean> = {
  day: event => event.starts.some(time => time < 1080),
  night: event => event.starts.some(time => time >= 1080),
}

export function matchesEvent(event: FilterEvent, filters: Partial<Filters>) {
  if (!validRange({ from: filters.from ?? '', to: filters.to ?? '' })) return false
  const { city = [], venue = [], families = [], genres = [], period = [] } = filters
  if (city.length && !city.includes(event.city)) return false
  if (venue.length && !event.venues.some(name => venue.includes(`${event.city}|${name}`))) return false
  if (filters.from && event.date < filters.from) return false
  if (filters.to && event.date > filters.to) return false
  if ((families.length || genres.length)
    && !event.families.some(name => families.includes(name)) && !event.genres.some(name => genres.includes(name))) return false
  if (period.length && !period.some(name => PERIODS[name](event))) return false
  return true
}

export const hasConditions = (filters: Filters) =>
  Boolean(filters.city.length || filters.families.length || filters.genres.length || filters.period.length || filters.venue.length || filters.from || filters.to)

// 9/30, or 9/30 起 and so on, for the tags and the date picker.
export const shortDate = (value: string) => `${Number(value.slice(5, 7))}/${Number(value.slice(8))}`
