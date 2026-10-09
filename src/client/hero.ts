// The hero's Drift Wall (src/lib/wall.ts lays it out). It runs as its own script before React hydrates
// (docs/site-rewrite.md Q20), so the stage's posters start downloading at once (docs/motion-performance.md Q7); React
// renders the stage with the no-script poster list (Page.tsx) and leaves what this builds in it alone.
import { DEPTH, GAP, PARALLAX, PROJECTION, ROTATE, SCALE, TILT, TURN, loadOrder, planeHeight, turnedReach, wallLayout, wallZoom, type Column } from '../lib/wall'

type Poster = {
  tile: HTMLAnchorElement; image: HTMLImageElement; src: string; width: number; column: number; middle: number; size: number
  pan: number; wide: boolean; still: boolean; away?: boolean; value?: string
}

function buildWall(stage: HTMLElement, links: HTMLAnchorElement[], layout: Column[], span: number) {
  // The original's group of tiles, named as it names it (Q27); each tile reads as its poster's description.
  const wall = document.createElement('div')
  wall.className = 'drift-wall'
  wall.setAttribute('role', 'group')
  wall.setAttribute('aria-label', 'Drifting wall of tiles')
  const plane = document.createElement('div')
  plane.className = 'drift-wall__plane'
  plane.style.height = `${span}px`
  const posters: Poster[] = []
  const tracks = layout.map((column, c) => {
    const col = document.createElement('div')
    col.className = 'drift-wall__col'
    col.style.width = `${column.tileWidth + GAP}px`
    const track = document.createElement('div')
    track.className = 'drift-wall__track'
    for (let copy = 0; copy < column.copies; copy++) {
      column.posters.forEach((poster, k) => {
        const tile = links[poster].cloneNode(false) as HTMLAnchorElement
        tile.className = 'drift-wall__tile spotlight-card'
        tile.removeAttribute('aria-label')
        tile.style.height = `${column.heights[k]}px`
        tile.dataset.col = String(c)
        tile.dataset.k = String(k)
        if (!column.focusable(k, copy)) {
          tile.tabIndex = -1
          tile.setAttribute('aria-hidden', 'true')
        }
        const inner = document.createElement('span')
        inner.className = 'drift-wall__inner'
        // A fresh image without its source (a clone would start downloading at once): the picture downloads once the wall
        // knows which tiles are on screen (load in initHero).
        const original = links[poster].querySelector('img')!, src = original.getAttribute('src')!
        const image = document.createElement('img')
        for (const { name, value } of original.attributes) if (name !== 'src' && name !== 'loading') image.setAttribute(name, value)
        // Height over width; src/styles/hero.css sizes the uncropped poster from it while motion is allowed.
        const ratio = Number(image.getAttribute('height')) / Number(image.getAttribute('width'))
        image.style.setProperty('--ratio', String(ratio))
        image.classList.toggle('is-wide', ratio < 1)
        inner.append(image)
        tile.append(inner)
        // The share of the poster that overflows the square tile, as a percentage of the poster along its pan.
        const pan = ratio < 1 ? (1 - ratio) * 100 : (1 - 1 / ratio) * 100
        // How wide the poster shows in its tile (CSS px): the tile's width, or its height times the ratio when wide.
        const width = ratio < 1 ? column.tileWidth / ratio : column.tileWidth
        posters.push({ tile, image, src, width, column: c, middle: column.middle(k, copy), size: column.heights[k], pan, wide: ratio < 1, still: tile.tabIndex === -1 })
        track.append(tile)
      })
    }
    col.append(track)
    plane.append(col)
    return track
  })
  wall.append(plane)
  stage.querySelector('.drift-wall')?.remove()
  stage.append(wall)
  return { wall, plane, tracks, posters }
}

export function initHero(root: HTMLElement | null) {
  const stage = root?.querySelector<HTMLElement>('.hero-stage')
  const links = stage ? [...stage.querySelectorAll<HTMLAnchorElement>('.hero-poster')] : []
  if (!stage || !links.length) return
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const canHover = matchMedia('(hover: hover)')
  let layout: Column[] = [], wall: HTMLDivElement, plane: HTMLDivElement, tracks: HTMLDivElement[] = [], posters: Poster[] = []
  let offsets: number[] = [], velocities: number[] = [], span = 0, view = 0, reach = 0
  let active: HTMLElement | null = null, activeCol = -1, keyboard = false
  let pointer = { x: 0, y: 0 }, tilt = { x: 0, y: 0 }, shift = 0, shiftGoal = 0, hover: { x: number; y: number } | null = null
  let size = '', visible = false, raf = 0, last: number | null = null, zoom = 1, holding = false, held = false

  const paint = () => {
    plane.style.transform = `translate(-50%, -50%) rotate(${ROTATE}deg) scale(${SCALE * zoom}) rotateX(${TILT + tilt.y}deg) rotateY(${TURN + tilt.x}deg) `
      + `translateZ(${-DEPTH}px) translateX(${shift}px)`
    tracks.forEach((track, c) => { track.style.transform = `translate3d(0, ${layout[c].base - offsets[c]}px, 0)` })
    // The pan follows the tile's middle from the top of the stage (0) to its bottom (the whole overflow); none when still.
    for (const poster of posters) {
      const { image, column, middle, pan, wide } = poster
      const y = layout[column].base - offsets[column] + middle
      // Every column loops the whole list, so most copies sit far off the stage: skipping their rendering keeps the
      // frame rate of the shorter round-robin columns. Focusable copies always render, so Tab still reaches them.
      const away = poster.still && Math.abs(y - span / 2) > reach / 2 + poster.size
      if (poster.away !== away) poster.tile.style.visibility = (poster.away = away) ? 'hidden' : ''
      const down = Math.min(Math.max((y - (span - view) / 2) / view, 0), 1)
      const move = (-pan * down).toFixed(2)
      const value = reduced.matches ? '' : wide ? `${move}% 0` : `0 ${move}%`
      if (poster.value !== value) image.style.translate = poster.value = value
    }
  }

  const frame = (ts: number) => {
    raf = 0
    const dt = last === null ? 0 : Math.min(0.05, Math.max(0, ts - last) / 1000)
    last = ts
    const damp = 1 - Math.exp(-dt / 0.12)
    tilt.x += (pointer.x * PARALLAX * 8 - tilt.x) * damp
    tilt.y += (-pointer.y * PARALLAX * 8 - tilt.y) * damp
    shift += (shiftGoal - shift) * damp
    layout.forEach((column, c) => {
      const target = holding || activeCol === c ? 0 : column.velocity
      velocities[c] += (target - velocities[c]) * (1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28)))
      offsets[c] = column.wrap(offsets[c] + velocities[c] * dt)
    })
    paint()
    track()
    request()
  }
  // Frames run only while the wall is on screen, the page is shown, motion is allowed and no event's details cover the
  // page (src/components/EventDetail.tsx pauses the wall so a poster it opened from is still there to return to).
  const request = () => {
    if (!visible || document.hidden || reduced.matches || document.documentElement.classList.contains('is-detail')) last = null
    else if (!raf) raf = requestAnimationFrame(frame)
  }
  // Reduced motion keeps the wall still without parallax; focus changes jump instead of easing.
  const settle = () => {
    if (!reduced.matches) return request()
    tilt = { x: 0, y: 0 }
    shift = shiftGoal
    paint()
  }

  // The highlight follows whatever poster is under the mouse, also while the columns drift beneath a still pointer.
  const track = () => {
    const tile = hover && document.elementFromPoint(hover.x, hover.y)?.closest<HTMLElement>('.drift-wall__tile')
    if (tile) activate(tile)
  }
  const activate = (tile: HTMLElement | null) => {
    if (tile === active) return
    active?.classList.remove('is-active')
    active = tile
    activeCol = tile ? Number(tile.dataset.col) : -1
    tile?.classList.add('is-active')
  }

  const build = () => {
    // The layout is computed at the reference width and scaled; height and width in the plane's own pixels.
    const box = stage.getBoundingClientRect()
    zoom = wallZoom(box.width)
    const width = box.width / zoom, height = box.height / zoom
    const key = `${Math.round(width)}x${Math.round(height)}x${zoom.toFixed(3)}`
    if (key === size || !height) return
    size = key
    active = null
    activeCol = -1
    keyboard = false
    shift = shiftGoal = 0
    layout = wallLayout(links.length, width, height)
    span = planeHeight(width, height)
    view = height
    // The stage's reach along the turned columns, in plane pixels.
    reach = turnedReach(width, height).along;
    ({ wall, plane, tracks, posters } = buildWall(stage, links, layout, span))
    offsets = layout.map(column => column.start)
    velocities = layout.map(() => 0)
    // Highlighting, stopping a column and the parallax follow a hovering mouse only: on touch screens (also when a phone's
    // taps arrive as mouse events) the wall keeps drifting under a finger and a tap opens the event's details (Q6, Q24).
    wall.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || !canHover.matches) return
      const rect = wall.getBoundingClientRect()
      if (!reduced.matches) pointer = { x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 }
      hover = { x: event.clientX, y: event.clientY }
      track()
    })
    wall.addEventListener('pointerleave', () => {
      pointer = { x: 0, y: 0 }
      hover = null
      if (!keyboard) activate(null)
    })
    wall.addEventListener('focusin', event => {
      const tile = (event.target as Element).closest<HTMLElement>('.drift-wall__tile')!
      if (!tile.matches(':focus-visible')) return
      keyboard = true
      activate(tile)
      // The column brings the poster to the middle height, and the wall slides sideways only as far as needed to keep it
      // inside the unfaded middle (the original mask is opaque within 40% of its 78%-wide ellipse).
      const c = Number(tile.dataset.col)
      offsets[c] = layout[c].centre(Number(tile.dataset.k))
      velocities[c] = 0
      const box = tile.getBoundingClientRect(), view = stage.getBoundingClientRect()
      const reach = Math.max(0, 0.4 * 0.78 * view.width - box.width / 2)
      const off = box.left + box.width / 2 - (view.left + view.width / 2)
      shiftGoal = shift + (Math.min(Math.max(off, -reach), reach) - off) / (PROJECTION * zoom)
      settle()
    })
    wall.addEventListener('focusout', event => {
      if (!keyboard || wall.contains(event.relatedTarget as Node | null)) return
      keyboard = false
      shiftGoal = 0
      activate(null)
      settle()
    })
    // The wall's group replaces the no-script list's region.
    stage.classList.add('is-wall')
    stage.removeAttribute('role')
    stage.removeAttribute('aria-label')
    paint()
    load()
    settle()
  }

  // After the first paint the light posters download in order: the files on the stage first, then the rest by how soon
  // they drift in, at most four files at a time so each arrives quickly instead of all sharing the bandwidth. The wall
  // holds still until the files on the stage have arrived (at most 8s), so it never drifts blank tiles in (Q36).
  type File = { tiles: Poster[]; priority: 'high' | 'low'; ready?: Promise<void>; arrived?: () => void }
  const load = () => {
    const tiles = posters, box = stage.getBoundingClientRect()
    // On the stage: overlapping it inside the edge fade (src/styles/hero.css fades the outer 12% of its height).
    const inset = { left: box.left + box.width * 0.1, right: box.right - box.width * 0.1, top: box.top + box.height * 0.12, bottom: box.bottom - box.height * 0.12 }
    const shown = tiles.map(({ tile }) => {
      const rect = tile.getBoundingClientRect()
      return rect.right > inset.left && rect.left < inset.right && rect.bottom > inset.top && rect.top < inset.bottom && tile.style.visibility !== 'hidden'
    })
    // Only columns crossing the stage ever show their tiles (a phone shows about two of five).
    const columns = new Set(tiles.filter((_, index) => shown[index]).map(({ column }) => column))
    const [first, rest] = loadOrder(tiles.map(({ column, middle, size }, index) => {
      if (shown[index]) return { shown: true, time: 0 }
      if (!columns.has(column)) return { shown: false, time: Infinity }
      // Along its column, from the plane's middle; a column with positive velocity moves its tiles up (paint).
      const { velocity } = layout[column]
      const y = layout[column].base - offsets[column] + middle - span / 2, edge = reach / 2 + size / 2
      const ahead = velocity > 0 ? y - edge : -y - edge
      return { shown: false, time: Math.abs(y) < edge ? 0 : ahead > 0 ? ahead / Math.abs(velocity) : Infinity }
    }))
    // The largest tiles on the stage first: the biggest poster is what the page's largest paint (LCP) waits for
    // (docs/motion-performance.md F15).
    first.sort((a, b) => tiles[b].size - tiles[a].size)
    // One download per file: every tile showing that file gets it at once.
    const files = new Map<string, File>()
    for (const index of [...first, ...rest]) {
      const { src } = tiles[index]
      if (!files.has(src)) files.set(src, { tiles: [], priority: first.includes(index) ? 'high' : 'low' })
      files.get(src)!.tiles.push(tiles[index])
    }
    const queue = [...files.values()]
    for (const file of queue) file.ready = new Promise(resolve => { file.arrived = resolve })
    const onStage = queue.filter(file => file.priority === 'high')
    const next = () => {
      const file = queue.shift()
      if (!file) return
      // One light version for all the file's tiles, so each poster downloads once: the 400px one when it covers the widest
      // of them on the screen (the plane shows a tile at about PROJECTION × zoom its CSS size), else the 720px one. Every
      // column loops the whole list, so this picks the small one on low-density screens up to 1440px wide.
      const need = Math.max(...file.tiles.map(tile => tile.width)) * PROJECTION * zoom * devicePixelRatio
      const { small, smallWidth } = file.tiles[0].image.dataset
      const pick = small && Number(smallWidth) >= need ? small : null
      for (const { image, src } of file.tiles) {
        image.fetchPriority = file.priority
        image.src = pick ?? src
      }
      file.tiles[0].image.decode().catch(() => {}).then(() => {
        file.arrived!()
        next()
      })
    }
    for (let lane = 0; lane < 4; lane++) next()
    // Only the first build waits: a rebuild after a resize finds the files downloaded.
    if (held) return
    held = holding = true
    Promise.race([Promise.all(onStage.map(file => file.ready)), new Promise(resolve => setTimeout(resolve, 8000))]).then(() => {
      holding = false
      request()
    })
  }

  // Focusing a tile must not scroll the clipped stage; the column brings the poster into view instead.
  stage.addEventListener('scroll', event => {
    const target = event.target as HTMLElement
    if (target !== stage && target !== wall) return
    target.scrollTop = 0
    target.scrollLeft = 0
  }, true)
  // The detail sheet starts from a wall poster turned like the wall.
  stage.style.setProperty('--wall-turn', `${ROTATE}deg`)
  build()
  new ResizeObserver(build).observe(stage)
  // The latest entry of a batch decides (a reload restoring a deep scroll reports the first layout, then the real place).
  new IntersectionObserver(entries => {
    visible = entries.at(-1)!.isIntersecting
    request()
  }).observe(stage)
  document.addEventListener('visibilitychange', request)
  document.addEventListener('detail-toggle', request)
  reduced.addEventListener('change', settle)
}

initHero(document.getElementById('spotlight'))
