// The rendered page against the data: event rows, artist details, information order, links and posters (formerly
// scripts/check_page.py). It proves what it checks, not that the events are real or the remote links work.
import { expect, test } from 'bun:test'
import { Window } from 'happy-dom'
import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import data from '../data/events.json'
import manifest from '../public/assets/posters/sources.json'
import { Page } from '../src/components/Page'
import { guide, type GuideEvent } from '../src/lib/guide'
import { SCRIPTS } from '../src/routes/__root'

const publicFile = (path: string) => new URL(`../public/${path}`, import.meta.url)
const exists = (path: string) => Bun.file(publicFile(path)).size > 0
const html = renderToStaticMarkup(<Page guide={guide()} />)
const window = new Window()
window.document.body.innerHTML = html
const document = window.document as unknown as Document
const events = new Map((data.events as GuideEvent[]).map(event => [event.id, event]))
const lights = new Map(manifest.images.map(image => [image.path, image.thumbnail]))
const fulls = new Map(manifest.images.map(image => [image.path, image.full]))
const escape = (text: string) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const text = (element: Element | null | undefined) => element?.textContent ?? ''
const all = (scope: ParentNode, selector: string) => [...scope.querySelectorAll(selector)]

// A WebP's pixel size from its header (lossy VP8, lossless VP8L or extended VP8X).
function webpSize(bytes: Uint8Array) {
  const view = new DataView(bytes.buffer, bytes.byteOffset)
  const tag = (at: number) => String.fromCharCode(...bytes.subarray(at, at + 4))
  expect(tag(0) + tag(8)).toBe('RIFFWEBP')
  const u24 = (at: number) => bytes[at] | bytes[at + 1] << 8 | bytes[at + 2] << 16
  if (tag(12) === 'VP8X') return [1 + u24(24), 1 + u24(27)]
  if (tag(12) === 'VP8L') {
    const bits = view.getUint32(21, true)
    return [1 + (bits & 0x3fff), 1 + (bits >>> 14 & 0x3fff)]
  }
  return [view.getUint16(26, true) & 0x3fff, view.getUint16(28, true) & 0x3fff]
}

test('every poster has its light and full-size versions', () => {
  for (const image of manifest.images) {
    expect(image.thumbnail.endsWith('.thumb.webp') && exists(image.thumbnail)).toBe(true)
    // The wall's 400px version, which low-density screens show instead (docs/motion-performance.md).
    expect(image.thumbnail_small.endsWith('.thumb-400.webp') && exists(image.thumbnail_small)).toBe(true)
    // The full-size version the page shows: a PNG or JPG original's same-size WebP, or the original itself; the page no
    // longer links an original that has one (docs/motion-performance.md Q34).
    expect(exists(image.full)).toBe(true)
    if (image.full !== image.path) {
      expect(image.full.endsWith('.full.webp')).toBe(true)
      expect(webpSize(readFileSync(publicFile(image.full)))).toEqual([image.width, image.height])
      expect(html).not.toContain(`"${image.path}"`)
    }
  }
})

test('the page shows only light posters, and the wall names its 400px versions', () => {
  const smalls = new Map(manifest.images.map(image => [image.thumbnail, image.thumbnail_small]))
  for (const image of all(document, 'img')) {
    const src = image.getAttribute('src')!
    expect([...lights.values()]).toContain(src)
    const head = readFileSync(publicFile(src)).subarray(0, 4)
    expect(['ffd8ff', '89504e47', '47494638', '52494646'].some(magic => Buffer.from(head).toString('hex').startsWith(magic))).toBe(true)
    expect(image.hasAttribute('alt')).toBe(true)
    expect(image.getAttribute('alt') || image.closest('[aria-hidden="true"]')).toBeTruthy()
  }
  const wall = all(document, '.hero-poster > img')
  expect(wall.length).toBe(data.featured.length)
  for (const image of wall) {
    expect(image.getAttribute('data-small')).toBe(smalls.get(image.getAttribute('src')!)!)
    expect(Number(image.getAttribute('data-small-width'))).toBeGreaterThan(0)
  }
})

test('the page structure', () => {
  const ids = all(document, '[id]').map(element => element.id)
  expect(new Set(ids).size).toBe(ids.length)
  ids.push('top') // The body's, in src/routes/__root.tsx.
  for (const link of all(document, 'a[href^="#"]')) expect(ids).toContain(link.getAttribute('href')!.slice(1))
  expect(text(document.body)).not.toMatch(/尚不明确|未知|其它场地|其它时段|其它风格|TBA/)
  // The date axis and day anchors are gone (questions 171–172).
  expect(html).not.toContain('date-nav')
  expect(ids.some(id => id.startsWith('day-'))).toBe(false)
  const chips = all(document, 'input[name="family"]').map(input => input.getAttribute('value'))
  expect(chips).toEqual(data.genre_order.families)
  expect(chips).toEqual(Object.keys(data.genre_families))
  expect(html).not.toMatch(/wxid_|@chatroom|localhost|file:\/\/|\/Users\//)
  // The preview's mouse toolbar, × and help text (assets/poster-preview.js).
  expect(document.querySelector('.poster-preview-tools')?.getAttribute('role')).toBe('toolbar')
  for (const [zoom, label] of [['out', '缩小'], ['in', '放大'], ['fit', '复位']]) {
    expect(document.querySelector(`[data-zoom="${zoom}"]`)?.getAttribute('aria-label')).toBe(label)
  }
  expect(document.querySelector('.poster-preview-close')?.getAttribute('aria-label')).toBe('关闭预览')
  expect(document.querySelector('.poster-preview')?.getAttribute('aria-describedby')).toBe('poster-preview-help')
  expect(html).not.toContain('单击退出')
})

test('the wall script runs before the terrain, and every script exists', () => {
  expect(SCRIPTS.indexOf('hero')).toBeLessThan(SCRIPTS.indexOf('topography'))
  for (const name of SCRIPTS) expect(exists(`assets/${name}.js`)).toBe(true)
})

test('every event has a row with its known information', () => {
  const cards = all(document, 'article')
  expect(cards.every(card => card.classList.contains('event-row'))).toBe(true)
  expect(cards.map(card => card.id).sort()).toEqual([...events.keys()].sort())
  const dates = cards.map(card => card.getAttribute('data-date')!)
  expect(dates).toEqual([...dates].sort())
  expect(html).not.toContain('<p class="lineup-note">')
  const dailyTimes = new Map<string, number[]>()
  for (const card of cards) {
    const event = events.get(card.id)!
    const { artists } = event
    const fields = new Map<string, Element>()
    for (const field of all(card, '[data-field]')) {
      expect(fields.has(field.getAttribute('data-field')!)).toBe(false)
      fields.set(field.getAttribute('data-field')!, field)
    }
    // Six categories; an unknown lineup or genre is left out rather than shown as unknown (question 183).
    const known = ['name', 'location', 'info', 'posters', ...(artists.length ? ['artists'] : []), ...(event.genres.length ? ['genres'] : [])]
    expect([...fields.keys()].sort()).toEqual(known.sort())
    expect(ids(card)).toBe(true)
    // The title opens the event's detail sheet (docs/event-browsing.md Q20–Q25); rows no longer expand in place.
    const toggle = card.querySelector('.event-toggle')!
    expect(toggle.getAttribute('aria-haspopup')).toBe('dialog')
    expect(toggle.getAttribute('aria-controls')).toBe('event-detail')
    expect(document.getElementById('event-detail')).toBeTruthy()
    expect(toggle.hasAttribute('aria-expanded')).toBe(false)
    // Filter data.
    expect(card.getAttribute('data-city')).toBe(event.city)
    for (const key of ['venues', 'genres', 'starts'] as const) expect(JSON.parse(card.getAttribute(`data-${key}`)!)).toEqual(event[key])
    const families = Object.entries(data.genre_families).filter(([, members]) => members.some(genre => event.genres.includes(genre))).map(([name]) => name)
    expect(JSON.parse(card.getAttribute('data-families')!)).toEqual(families)
    const name = text(fields.get('name'))
    expect(name).toContain(event.name)
    const match = name.match(/(\d{1,2}):(\d{2})/)
    dailyTimes.set(event.date, [...dailyTimes.get(event.date) ?? [], match ? Number(match[1]) * 60 + Number(match[2]) : 9999])
    if (artists.length) {
      const summary = fields.get('artists')!
      expect(all(summary, 'li').length).toBe(artists.length)
      for (const artist of artists) for (const artistName of artist.names) expect(text(summary)).toContain(artistName)
    }
    for (const genre of event.genres) expect(text(fields.get('genres'))).toContain(genre)
    expect(text(fields.get('genres'))).not.toMatch(/（[^）]*[一-鿿]/)
    checkLineup(card, event)
    checkInfo(card, fields.get('info')!, event)
    checkVenue(card, event)
    checkPoster(fields.get('posters')!, event)
  }
  for (const times of dailyTimes.values()) expect(times).toEqual([...times].sort((a, b) => a - b))

  function ids(card: Element) {
    return Boolean(document.getElementById(card.getAttribute('aria-labelledby')!) && document.getElementById(`${card.id}-details`))
  }
})

function checkLineup(card: Element, event: GuideEvent) {
  const { artists } = event
  const lineups = all(card, 'section.event-lineup')
  expect(lineups.length).toBeLessThanOrEqual(1)
  const lineup = lineups[0]
  const tables = all(card, 'table')
  const hasDetails = artists.some(artist => artist.time || artist.genres?.length)
  const stages = [...new Set(artists.map(artist => artist.stage ?? ''))]
  const grouped = !hasDetails && stages.length > 1 && stages.every(Boolean)
  expect(tables.length).toBe(Number(hasDetails || grouped))
  const timed = artists.some(artist => artist.time)
  for (const table of tables) {
    expect(table.classList.contains('artist-table') && table.closest('section.event-lineup')).toBeTruthy()
    for (const cell of all(table, 'th')) {
      const row = cell.parentElement!
      expect(cell.getAttribute('scope')).toBe(cell.closest('thead') ? 'col' : row.classList.contains('stage-row') ? 'colgroup' : 'row')
    }
    const rows = all(table, 'tr').filter(row => !row.classList.contains('stage-row') && !row.classList.contains('crew-row'))
    for (const row of rows) expect(row.children.length).toBe(rows[0].children.length)
    // Unknown genres stay blank.
    expect(rows.slice(1).flatMap(row => [...row.children].slice(1).map(text)).join('')).not.toContain('未知')
  }
  if (!lineup) return
  const lineupText = text(lineup)
  const heading = text(lineup.querySelector('h5'))
  expect(all(lineup, 'a').length).toBe(0)
  for (const caption of event.lineup_caption ?? []) expect(heading).toContain(caption)
  expect(heading.startsWith(timed ? 'TIMETABLE时间表' : 'LINEUP阵容')).toBe(true)
  for (const stage of event.stages ?? []) {
    if (!artists.some(artist => artist.stage === stage.name)) continue
    for (const genre of stage.genres ?? []) expect(lineupText).toContain(genre)
    expect(lineupText).toContain(stage.note ?? '')
  }
  for (const member of event.crew ?? []) {
    expect(all(card, 'tr.crew-row').some(row => text(row.children[0]).includes(member.role) && member.names.every(name => text(row).includes(name)))).toBe(true)
  }
  // A B2B pairing reads as one line (question 187).
  const pairs = all(card, '.artist-pair').map(pair => pair.innerHTML)
  for (const artist of artists) {
    if (artist.format !== 'B2B' || artist.names.length < 2 || !tables.length) continue
    expect(pairs).toContain(artist.names.map(name => `<span class="artist-name">${escape(name)}</span>`).join('<small class="artist-b2b">B2B</small>'))
  }
  if (!tables.length) {
    // Without a table the area still lists the lineup, never small print alone (question 203).
    expect(artists.length).toBeGreaterThan(0)
    for (const artist of artists) {
      for (const name of artist.names) expect(lineupText).toContain(name)
      for (const key of ['format', 'note'] as const) expect(lineupText).toContain(artist[key] ?? '')
    }
    for (const stage of (event.stages ?? []).filter(stage => !artists.some(artist => artist.stage === stage.name))) {
      expect(lineupText).toContain(stage.name)
      for (const genre of stage.genres ?? []) expect(lineupText).toContain(genre)
    }
  } else if (grouped) {
    const rows = all(tables[0], 'tr')
    expect(rows.length).toBe(2)
    expect([...rows[0].children].map(text).every((cell, index) => cell.startsWith(stages[index]))).toBe(true)
    expect(rows[0].children.length).toBe(stages.length)
    stages.forEach((stage, index) => {
      const cell = text(rows[1].children[index])
      for (const artist of artists.filter(artist => artist.stage === stage)) {
        for (const name of artist.names) expect(cell).toContain(name)
        expect(cell).toContain(artist.format ?? '')
      }
    })
  } else {
    const rows = all(tables[0], 'tr').filter(row => !row.classList.contains('stage-row') && !row.classList.contains('crew-row'))
    expect(rows.length).toBe(artists.length + 1)
    const heads = [...rows[0].children].map(text)
    expect(heads.length).toBeGreaterThanOrEqual(2)
    expect(heads.length).toBeLessThanOrEqual(3)
    expect(heads.slice(0, 2)).toEqual(timed ? ['时段', '艺人'] : ['艺人', '风格'])
    for (const artist of artists) {
      expect(lineupText).toContain(artist.time ?? '')
      for (const genre of artist.genres ?? []) expect(lineupText).toContain(genre)
    }
  }
}

function checkInfo(card: Element, field: Element, event: GuideEvent) {
  const info = event.more_info
  expect(all(field, 'a').length).toBeGreaterThan(0)
  // Each 更多信息 section appears only with content, in order.
  const expected = ([['tickets', ['prices', 'booking']], ['links', ['details']], ['entry', ['notes']]] as const)
    .filter(([, keys]) => keys.some(key => info[key].length)).map(([name]) => name)
  expect(all(card, '.event-details section.event-field').map(section => section.className.match(/event-(tickets|links|entry)\b/)?.[1]).filter(Boolean)).toEqual(expected)
  const parts = all(field, '.info-section').map(section => [...section.classList].find(name => name !== 'info-section')!.replace('info-', ''))
  expect(parts).toEqual((['prices', 'booking', 'details', 'notes'] as const).filter(key => info[key].length))
  for (const price of info.prices) for (const key of ['label', 'amount', 'note'] as const) expect(text(field)).toContain(price[key])
  const codes = all(field, '.copy-target').map(button => button.getAttribute('data-copy-text'))
  for (const part of [...info.booking, ...info.details]) if (part.type === 'mini-program') expect(codes).toContain(part.code)
}

function checkVenue(card: Element, event: GuideEvent) {
  const venue = card.querySelector('.event-details section.event-location')!
  const [first, ...address] = event.location
  const [city, place = ''] = first.split(/ · (.*)/s)
  // The city label leads the place on one line.
  expect(all(venue, '.venue-name').map(name => name.innerHTML)).toContain(`<span class="venue-city">${escape(city)}</span>${escape(place)}`)
  const share = venue.querySelector('button.copy-target.venue-target')
  if (!place) expect(venue.querySelector('.copy-target')).toBeNull()
  else {
    expect(share?.firstElementChild?.classList.contains('venue-lines')).toBe(true)
    expect(share?.getAttribute('data-share-text')).toBe([city, ...address, place].join(' '))
  }
  expect(venue.innerHTML).not.toMatch(/分享地址|复制地址/)
}

function checkPoster(field: Element, event: GuideEvent) {
  // Rows show the light version and name the full-size version for the screen, the detail sheet and the preview
  // (event-browsing Q34; motion-performance Q34).
  const originals = event.posters.map(poster => poster.image)
  const images = all(field, 'img')
  expect(images.map(image => image.getAttribute('src'))).toEqual(originals.map(original => lights.get(original)!))
  expect(images.map(image => image.getAttribute('data-full'))).toEqual(originals.map(original => fulls.get(original)!))
  for (const image of images) expect(Number(image.getAttribute('width')) > 0 && Number(image.getAttribute('height')) > 0).toBe(true)
  const links = all(field, 'a')
  for (const link of links) {
    expect(link.getAttribute('aria-haspopup')).toBe('dialog')
    expect(link.hasAttribute('target')).toBe(false)
  }
  if (images.length) {
    expect(text(field).trim()).toBe('')
    expect(links.map(link => link.getAttribute('href'))).toEqual(originals.map(original => fulls.get(original)!))
    for (const link of links) expect(exists(link.getAttribute('href')!)).toBe(true)
  } else {
    expect(links.length).toBe(0)
    expect(text(field)).toContain('暂无图片')
  }
}
