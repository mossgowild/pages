// The guide's types and the helpers the page shares with the browser. The data itself is read and checked on the server
// (guide.server.ts), so events.json never ships inside a script.
import type { Guide } from './guide.server'

export type Part =
  | { type: 'text'; text: string }
  | { type: 'break' }
  | { type: 'link'; url: string; label: string }
  | { type: 'mini-program'; label: string; code: string; note: string }
export type Price = { label: string; amount: string; note: string }
export type Artist = { names: string[]; format?: string; note?: string; time?: string; genres?: string[]; stage?: string; genre_sources?: string[] }
export type Stage = { name: string; genres?: string[]; note?: string }
export type GuideEvent = {
  id: string; date: string; city: string; venues: string[]; genres: string[]; starts: number[]; name: string; time: string[]
  notes: string[]; artists: Artist[]; location: string[]; posters: { image: string; alt: string }[]
  more_info: { prices: Price[]; booking: Part[]; details: Part[]; notes: string[] }
  stages?: Stage[]; crew?: { role: string; names: string[] }[]; lineup_caption?: string[]
}
export type Poster = { path: string; width: number; height: number; thumbnail: string; thumbnail_small: string; full: string }
export type EventView = GuideEvent & { families: string[]; poster: (Poster & { alt: string }) | null }
export type { Guide }

const pad = (value: number) => String(value).padStart(2, '0')
export const startLabel = (event: GuideEvent) => {
  const minutes = Math.min(...event.starts)
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`
}
