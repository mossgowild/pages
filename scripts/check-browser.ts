// Browser checks for the built page (bun run check:browser, after bun run build): layout rules at four widths and in
// the open states (test/browser/layout.js), then the filters, the detail sheet and the full-image preview, in the system
// Chrome. They prove what they check, not how smooth anything is: frame rates are measured in the iOS simulator.
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { chromium, type Page } from 'playwright-core'

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

async function open(width: number, height = 900, options: { reducedMotion?: 'reduce' | 'no-preference'; hash?: string } = {}) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: options.reducedMotion ?? 'no-preference' })
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto(base + (options.hash ?? ''), { waitUntil: 'networkidle' })
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
    await wait(page, 700)
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
    const members = await page.locator(`${pop} .ms-option`).count()
    for (let i = 1; i < members; i++) await page.click(`${pop} .ms-option >> nth=${i}`)
    await wait(page, 400)
    assert.ok(await page.isChecked('input[name="family"][value="Techno"]'), 'Ticking every sub-genre turns them into the whole family')
    assert.deepEqual(await tags(page), ['深圳', 'Techno'])
    await page.keyboard.press('Escape')
    await wait(page, 900)
    assert.ok(!await page.evaluate(selector => document.querySelector(selector)!.matches(':popover-open'), pop))
    assert.equal(await page.getAttribute('.filter-toggle', 'aria-expanded'), 'true', 'Esc closes the picker before the panel')
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
    assert.deepEqual(errors, [])
    results.push('preview')
    await page.close()
  }
  console.log(`OK: ${results.join(', ')}`)
} finally {
  await browser.close()
  server.kill()
}
