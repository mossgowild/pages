// Browser checks for the built page (bun run check:browser, after bun run build): layout rules at four widths and in
// the open states (test/browser/layout.js), then the filters with the rolling count, the detail sheet, the full-image
// preview and the venue's menu of maps on phones, in the system Chrome. They prove what they check, not how smooth
// anything is: frame rates are measured in the iOS simulator.
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { chromium, type Page } from 'playwright-core'
import { mapLinks, platformOf } from '../src/lib/maps'

const root = new URL('..', import.meta.url).pathname
const port = await new Promise<number>(resolve => {
  const probe = createServer().listen(0, '127.0.0.1', () => {
    const { port } = probe.address() as { port: number }
    probe.close(() => resolve(port))
  })
})
const server = spawn('node', ['.output/server/index.mjs'], { cwd: root, env: { ...process.env, PORT: String(port), HOST: '127.0.0.1' }, stdio: 'ignore' })
const base = `http://127.0.0.1:${port}/`
for (let i = 0; i < 50; i++) {
  if (await fetch(base).then(response => response.ok, () => false)) break
  await Bun.sleep(100)
}
const browser = await chromium.launch({ channel: 'chrome', args: ['--headless=new'] })
const layout = await Bun.file(new URL('../test/browser/layout.js', import.meta.url)).text()
const results: string[] = []

// A phone's user agent also makes the page a touch screen (no hover, a coarse pointer).
async function open(width: number, height = 900, options: { reducedMotion?: 'reduce' | 'no-preference'; hash?: string; phone?: string } = {}) {
  const touch = options.phone ? { userAgent: options.phone, hasTouch: true, isMobile: true } : {}
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: options.reducedMotion ?? 'no-preference', ...touch })
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto(base + (options.hash ?? ''), { waitUntil: options.phone ? 'load' : 'networkidle' })
  await page.addScriptTag({ content: layout })
  await page.waitForTimeout(800)
  return { page, errors }
}
const wait = (page: Page, ms: number) => page.waitForTimeout(ms)
const check = (page: Page) => page.evaluate(() => (window as unknown as { checkLayout: () => unknown }).checkLayout())
const visible = (page: Page) => page.evaluate(() => [...document.querySelectorAll('.event-row')].filter(row => !(row as HTMLElement).hidden).length)
const tags = (page: Page) => page.evaluate(() => [...document.querySelectorAll('.filter-tags li:not(.is-leaving)')].map(li => li.firstElementChild!.childNodes[0].textContent))

try {
  // Layout at each width, at rest and with the filter cards, a detail sheet and the preview open.
  for (const width of [390, 768, 1024, 1440]) {
    const { page, errors } = await open(width)
    await check(page)
    await page.click('.filter-toggle')
    await wait(page, 1400)
    await check(page)
    await page.keyboard.press('Escape')
    await wait(page, 1300)
    await page.evaluate(() => document.getElementById('event-4')!.scrollIntoView({ block: 'center', behavior: 'instant' }))
    await page.click('#event-4 .event-toggle')
    await wait(page, 1500)
    await check(page)
    await page.click('.event-detail .event-posters a')
    await wait(page, 900)
    await page.mouse.move(width / 2, 300)
    await check(page)
    assert.deepEqual(errors, [], `${width}px: page errors`)
    results.push(`layout ${width}px`)
    await page.close()
  }

  // Filters: chips, tags, the family picker's whole and partial choices, venues, dates, the empty state and 清空.
  {
    const { page, errors } = await open(1440)
    const total = await visible(page)
    await page.click('.filter-toggle')
    await wait(page, 1400)
    assert.equal(await page.getAttribute('.filter-toggle', 'aria-expanded'), 'true')
    await page.click('label.filter-chip:has(input[value="深圳"])')
    // The count rolls to the new number and settles within its 0.4s (docs/event-filters.md Q7–Q9).
    await wait(page, 150)
    assert.ok(await page.$('#result-count .count-strip'), 'The count rolls to the new number')
    await wait(page, 550)
    assert.equal(await page.$('#result-count .count-strip'), null, 'The roll settles')
    const shenzhen = await visible(page)
    assert.ok(shenzhen > 0 && shenzhen < total && Number(await page.textContent('#result-count')) === shenzhen)
    assert.deepEqual(await tags(page), ['深圳'])
    await page.click('.family-chip:has(input[value="Techno"]) .family-more')
    await wait(page, 900)
    const pop = '#family-0-picker-popover'
    assert.ok(await page.evaluate(selector => document.querySelector(selector)!.matches(':popover-open'), pop))
    await page.click(`${pop} .ms-option >> nth=0`)
    await wait(page, 400)
    assert.match(await page.getAttribute('.family-chip:has(input[value="Techno"])', 'class') ?? '', /is-partial/)
    // Sub-genres only, no row named Techno; ticking them all is the whole family, events tagged just Techno included
    // (docs/event-filters.md Q10).
    assert.ok(!(await page.locator(`${pop} .ms-option`).allTextContents()).includes('Techno'), 'No row named like the family')
    const subgenres = await page.locator(`${pop} .ms-option`).count()
    for (let i = 1; i < subgenres; i++) await page.click(`${pop} .ms-option >> nth=${i}`)
    await wait(page, 400)
    assert.ok(await page.isChecked('input[name="family"][value="Techno"]'), 'Ticking every sub-genre turns them into the whole family')
    assert.deepEqual(await tags(page), ['深圳', 'Techno'])
    await page.keyboard.press('Escape')
    await wait(page, 900)
    assert.ok(!await page.evaluate(selector => document.querySelector(selector)!.matches(':popover-open'), pop))
    assert.equal(await page.getAttribute('.filter-toggle', 'aria-expanded'), 'true', 'Esc closes the picker before the panel')
    // With tags in the bar: the strip and their rims (test/browser/layout.js).
    await check(page)
    await page.click('.filter-tags li:first-child .filter-tag')
    await wait(page, 800)
    assert.deepEqual(await tags(page), ['Techno'])
    await page.click('[aria-controls="venue-popover"]')
    await wait(page, 900)
    await page.fill('#venue-popover input[type="search"]', 'PLAY X')
    await page.click('#venue-popover .ms-option:not([hidden]) >> nth=0')
    await wait(page, 500)
    assert.equal(await page.textContent('[aria-controls="venue-popover"] .picker-count'), '1')
    await page.click('#venue-popover .ms-option[aria-selected="true"]')
    await wait(page, 400)
    assert.equal(await page.textContent('[aria-controls="venue-popover"] .picker-count'), '', 'Ticking it again clears it')
    await page.keyboard.press('Escape')
    await wait(page, 900)
    await page.click('[aria-controls="dates-popover"]')
    await wait(page, 900)
    await page.click('#dates-popover button.dr-day >> nth=7')
    await wait(page, 600)
    assert.equal(await visible(page), 0)
    assert.ok(await page.isVisible('#empty-state'), 'No results show the empty state')
    await page.keyboard.press('Escape')
    await wait(page, 900)
    await page.keyboard.press('Escape')
    await wait(page, 1300)
    await page.click('#reset-empty')
    await wait(page, 1200)
    assert.equal(await visible(page), total)
    assert.deepEqual(await tags(page), [])
    assert.equal(await page.textContent('#result-summary'), `全部 ${total} 场活动`)
    await check(page)
    assert.deepEqual(errors, [])
    results.push('filters')
    await page.close()
  }

  // With reduced motion the count changes at once.
  {
    const { page, errors } = await open(1440, 900, { reducedMotion: 'reduce' })
    await page.click('.filter-toggle')
    await wait(page, 600)
    await page.click('label.filter-chip:has(input[value="深圳"])')
    await wait(page, 50)
    assert.equal(await page.$('#result-count .count-strip'), null, 'Reduced motion: no roll')
    assert.equal(Number(await page.textContent('#result-count')), await visible(page))
    assert.deepEqual(errors, [])
    results.push('count (reduce)')
    await page.close()
  }

  // A phone's picker is a bottom sheet over its own veil: a tap on the veil, over a city chip, closes the sheet and
  // reaches nothing under it (docs/event-filters.md F9); while the sheet leaves, a second tap there reaches the chip.
  {
    const { page, errors } = await open(390)
    await page.click('.filter-toggle')
    await wait(page, 1400)
    await page.click('[aria-controls="venue-popover"]')
    await wait(page, 1300)
    const [x, y, city] = await page.evaluate(() => {
      const top = document.querySelector('#venue-popover .picker-sheet')!.getBoundingClientRect().top
      const chip = [...document.querySelectorAll('label.filter-chip')].find(label => { const box = label.getBoundingClientRect(); return box.top > 60 && box.bottom < top - 4 })!
      const box = chip.getBoundingClientRect()
      return [box.left + box.width / 2, box.top + box.height / 2, chip.textContent!] as const
    })
    await page.mouse.click(x, y)
    await wait(page, 150)
    assert.deepEqual(await tags(page), [], 'The tap reaches no chip under the veil')
    await page.mouse.click(x, y)
    await wait(page, 1300)
    assert.ok(!await page.evaluate(() => document.getElementById('venue-popover')!.matches(':popover-open')), 'A tap on the veil closes the sheet')
    assert.deepEqual(await tags(page), [city], 'A tap while the sheet leaves reaches the page')
    assert.equal(await page.getAttribute('.filter-toggle', 'aria-expanded'), 'true', 'The filter panel stays open')
    assert.deepEqual(errors, [])
    results.push('picker veil')
    await page.close()
  }

  // The detail sheet: a row and a wall poster open it, the address follows, the page does not scroll under it, Esc, ×,
  // back and forward close and reopen it, and focus returns to where it came from; a shared address opens it at load.
  for (const reducedMotion of ['no-preference', 'reduce'] as const) {
    const { page, errors } = await open(390, 844, { reducedMotion })
    await page.evaluate(() => document.getElementById('event-4')!.scrollIntoView({ block: 'center', behavior: 'instant' }))
    const y = await page.evaluate(() => scrollY)
    await page.click('#event-4 .event-summary', { position: { x: 200, y: 20 } })
    await wait(page, 1300)
    assert.ok(await page.evaluate(() => (document.getElementById('event-detail') as HTMLDialogElement).open))
    assert.equal(await page.evaluate(() => location.hash), '#event-4')
    assert.equal(await page.evaluate(() => scrollY), y, 'Opening does not scroll the page')
    assert.equal(await page.textContent('#event-detail-title'), await page.textContent('#event-4-title'))
    await page.keyboard.press('Escape')
    await wait(page, 1200)
    assert.ok(!await page.evaluate(() => (document.getElementById('event-detail') as HTMLDialogElement).open))
    assert.equal(await page.evaluate(() => location.hash), '')
    assert.equal(await page.evaluate(() => scrollY), y, 'Closing does not scroll the page')
    assert.equal(await page.evaluate(() => document.activeElement?.closest('.event-row')?.id), 'event-4', 'Focus returns to the row')
    await page.goForward()
    await wait(page, 1300)
    assert.ok(await page.evaluate(() => (document.getElementById('event-detail') as HTMLDialogElement).open), 'Forward reopens it')
    await page.goBack()
    await wait(page, 1300)
    assert.ok(!await page.evaluate(() => (document.getElementById('event-detail') as HTMLDialogElement).open), 'Back closes it')
    await page.evaluate(() => scrollTo(0, 0))
    await wait(page, 600)
    const tile = await page.evaluateHandle(() => [...document.querySelectorAll<HTMLElement>('.drift-wall__tile')].find(tile => {
      const box = tile.getBoundingClientRect()
      return tile.tabIndex >= 0 && box.top > 120 && box.bottom < innerHeight - 120 && box.left > 0 && box.right < innerWidth
    }) ?? null)
    const hash = await page.evaluate(tile => (tile as HTMLAnchorElement | null)?.hash, tile)
    if (hash) {
      await page.evaluate(tile => (tile as HTMLElement).click(), tile)
      await wait(page, 1300)
      assert.equal(await page.evaluate(() => location.hash), hash, 'A wall poster opens its event')
      await page.click('.event-detail-close')
      await wait(page, 1200)
      assert.equal(await page.evaluate(tile => document.activeElement === tile, tile), true, 'Focus returns to the wall poster')
    }
    assert.deepEqual(errors, [])
    results.push(`detail (${reducedMotion})`)
    await page.close()
    const shared = await open(390, 844, { reducedMotion, hash: '#event-18' })
    assert.ok(await shared.page.evaluate(() => (document.getElementById('event-detail') as HTMLDialogElement).open), 'A shared address opens its event')
    assert.equal(await shared.page.textContent('#event-detail-title'), await shared.page.textContent('#event-18-title'))
    await shared.page.close()
  }

  // The full-image preview: it opens from the sheet's poster on its own history entry, zooms with the toolbar and the
  // keyboard within its limits, and Esc and back close it before the sheet.
  {
    const { page, errors } = await open(1440)
    await page.evaluate(() => document.getElementById('event-4')!.scrollIntoView({ block: 'center', behavior: 'instant' }))
    await page.click('#event-4 .event-toggle')
    await wait(page, 1500)
    await page.click('.event-detail .event-posters a')
    await wait(page, 800)
    const preview = '.poster-preview'
    assert.ok(await page.evaluate(selector => (document.querySelector(selector) as HTMLDialogElement).open, preview))
    assert.ok(await page.evaluate(() => history.state?.preview === true))
    await page.mouse.move(700, 400)
    await wait(page, 100)
    assert.equal(await page.getAttribute('[data-zoom="out"]', 'aria-disabled'), 'true', 'At the fit there is nothing to zoom out')
    await page.click('[data-zoom="in"]')
    await wait(page, 400)
    assert.equal(await page.getAttribute('[data-zoom="fit"]', 'aria-disabled'), 'false')
    await page.focus('.poster-preview-view')
    await page.keyboard.press('0')
    await wait(page, 400)
    assert.equal(await page.getAttribute('[data-zoom="fit"]', 'aria-disabled'), 'true', '0 goes back to the fit')
    await page.keyboard.press('Escape')
    await wait(page, 700)
    assert.ok(!await page.evaluate(selector => (document.querySelector(selector) as HTMLDialogElement).open, preview))
    assert.ok(await page.evaluate(() => (document.getElementById('event-detail') as HTMLDialogElement).open), 'Esc closes the preview, not the sheet')
    await page.click('.event-detail .event-posters a')
    await wait(page, 800)
    await page.goBack()
    await wait(page, 900)
    assert.ok(!await page.evaluate(selector => (document.querySelector(selector) as HTMLDialogElement).open, preview))
    assert.ok(await page.evaluate(() => (document.getElementById('event-detail') as HTMLDialogElement).open), 'Back closes the preview first')
    assert.match(await page.getAttribute('.event-detail .venue-target', 'class') ?? '', /\bis-(share|copy)\b/, 'With a mouse the venue shares or copies')
    assert.equal(await page.$('#venue-maps-popover'), null)
    assert.deepEqual(errors, [])
    results.push('preview')
    await page.close()
  }

  // On a touch screen the sheet's venue opens a menu of maps (docs/event-browsing.md Q37–Q42) searching for the place
  // (src/lib/maps.ts): Apple Maps only on Apple devices, the other maps' apps from iOS and Android browsers in this tab,
  // their web maps from WeChat in a new tab; a tap on the menu's veil and Esc close the menu, not the sheet.
  const phones = {
    android: 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36',
    iphone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1',
    wechat: 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.60(0x18003c2f) NetType/WIFI Language/zh_CN',
  }
  for (const [name, phone] of Object.entries(phones)) {
    const { page, errors } = await open(390, 844, { phone })
    const venue = await page.evaluate(() => {
      const row = document.querySelector<HTMLElement>('.event-row:has(.venue-address)')!
      const line = row.querySelector('.venue-name')!
      return { id: row.id, city: line.querySelector('.venue-city')!.textContent!, place: line.lastChild!.textContent!, address: [...row.querySelectorAll('.venue-address')].map(address => address.textContent!) }
    })
    await page.evaluate(id => document.getElementById(id)!.scrollIntoView({ block: 'center', behavior: 'instant' }), venue.id)
    await page.tap(`#${venue.id} .event-summary`)
    await wait(page, 1300)
    const menu = '#venue-maps-popover'
    const menuOpen = () => page.evaluate(selector => document.querySelector(selector)!.matches(':popover-open'), menu)
    const sheetOpen = () => page.evaluate(() => (document.getElementById('event-detail') as HTMLDialogElement).open)
    await page.tap('.event-detail .venue-target')
    await wait(page, 1300)
    assert.ok(await menuOpen(), `${name}: a tap on the venue opens the menu of maps`)
    const links = await page.$$eval(`${menu} a`, anchors => anchors.map(anchor => ({ name: anchor.textContent, url: anchor.getAttribute('href'), target: anchor.getAttribute('target'), rel: anchor.getAttribute('rel') })))
    const expected = mapLinks(venue.city, venue.place, venue.address, platformOf(phone, 5))
    assert.deepEqual(links.map(({ name, url }) => ({ name, url })), expected.map(({ name, url }) => ({ name, url })))
    assert.deepEqual(links.map(({ target, rel }) => [target, rel]), expected.map(({ app }) => app ? [null, null] : ['_blank', 'noopener noreferrer']),
      'An app opens in this tab, a web map in a new one')
    await page.touchscreen.tap(195, 120)
    await wait(page, 1300)
    assert.ok(!await menuOpen(), `${name}: a tap on the veil closes the menu`)
    assert.ok(await sheetOpen(), `${name}: the sheet stays open under the veil`)
    await page.tap('.event-detail .venue-target')
    await wait(page, 1300)
    await page.keyboard.press('Escape')
    await wait(page, 1300)
    assert.ok(!await menuOpen(), `${name}: Esc closes the menu`)
    assert.ok(await sheetOpen(), `${name}: Esc leaves the sheet open`)
    assert.deepEqual(errors, [])
    results.push(`maps (${name})`)
    await page.close()
  }
  console.log(`OK: ${results.join(', ')}`)
} finally {
  await browser.close()
  server.kill()
}
