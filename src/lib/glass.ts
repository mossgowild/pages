// The pills' and cards' specular light (React Bits Specular Button, CSS edition) and the panels' and pills' refraction
// (React Bits Glass Surface), started once the page has hydrated (Page.tsx). The rims themselves are CSS (specular-rim and
// event-light in src/styles/app.css); this module steers them.

// Every lit element gets the light's direction and brightness. Defaults of the original: the light steers toward the
// mouse, settles near the diagonal while over a pill, fades in within 250px (smoothstep), the angle eased at rate 7 and the
// brightness at rate 8 per second, and it is worked out again only when the mouse moves (docs/site-rewrite.md Q27). The
// pills and round buttons draw the original's streaks: windows of the angle between the light and the elliptical normal,
// so a pill's straight edge lights along its length (Q24), written as a conic gradient (--spec-rim). The event rows and
// the detail card keep their brand-coloured streaks facing the mouse (questions 193–195, docs/glass-effects.md), steered
// by --spec-angle and --spec. Screens without hover follow the phone's movement instead (below).
const PROXIMITY = 250
const LIT = '.filter-toggle, .filter-chip, .family-chip, .picker-trigger, .ms-search, .reset-empty, .filter-tag, .event-detail-close, .poster-preview-button, .poster-preview-close, .event-row, .event-detail-sheet'
const FOLLOWS = '.event-row, .event-detail-sheet'

type Light = { angle: number; bright: number; target: number; near: number; follows: boolean; width: number; height: number }

const smoothstep = (t: number) => t * t * (3 - 2 * t)
// The original's streak across the normal's angle φ from the light (size 10°, fade 40°): 1 − smoothstep(−30°, 50°, φ),
// 68% at the middle and nothing past 50°, sampled every 12.5°.
const PROFILE = [0, 12.5, 25, 37.5, 50].map(phi => [phi, 1 - smoothstep(Math.min(1, (phi + 30) / 80))] as const)

// A pill's two streaks, facing the light (a CSS conic angle) and away from it, as a conic gradient around its middle: a
// streak's window lies in the normal's angle, and the point of the edge whose elliptical normal has angle n sits at the
// angle of (a² sin n, b² cos n) for half-width a and half-height b.
function rimOf(light: number, width: number, height: number, bright: number) {
  const a2 = (width / 2) ** 2, b2 = (height / 2) ** 2
  const position = (normal: number) => {
    const n = normal * Math.PI / 180
    return Math.atan2(a2 * Math.sin(n), b2 * Math.cos(n)) * 180 / Math.PI
  }
  // From the dark gap between the streaks, so the gradient starts and ends without light.
  const from = position(light + 90)
  const stops: [number, number][] = []
  for (const centre of [light, light + 180]) {
    for (const [phi, value] of PROFILE) {
      for (const side of phi ? [-1, 1] : [1]) stops.push([((position(centre + side * phi) - from) % 360 + 360) % 360, value * bright])
    }
  }
  stops.sort((x, y) => x[0] - y[0])
  return `conic-gradient(from ${from.toFixed(2)}deg,${stops.map(([at, value]) => `rgb(255 255 255/${value.toFixed(3)}) ${at.toFixed(2)}deg`).join(',')})`
}

export function startGlass() {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
  const hover = matchMedia('(hover: hover)')
  const lit = new Set<HTMLElement>()
  const visible = new Set<HTMLElement>()
  const state = new Map<HTMLElement, Light>()
  let pointer: { x: number; y: number } | null = null
  let reading: { x: number; y: number; time: number } | null = null
  let frame = 0
  let last = 0

  function aim() {
    for (const element of visible) {
      const box = element.getBoundingClientRect()
      const s = state.get(element)!
      s.width = box.width
      s.height = box.height
      const cx = box.left + box.width / 2, cy = box.top + box.height / 2
      const dx = Math.max(box.left - pointer!.x, 0, pointer!.x - box.right)
      const dy = Math.max(box.top - pointer!.y, 0, pointer!.y - box.bottom)
      const dist = Math.hypot(dx, dy)
      s.target = dist === 0 && !s.follows
        ? Math.atan2(2 / box.height, -2 / box.width) + (pointer!.x - cx) / (box.width / 2) * 0.3 + (cy - pointer!.y) / (box.height / 2) * 0.15
        : Math.atan2(cy - pointer!.y, pointer!.x - cx)
      s.near = smoothstep(Math.max(0, 1 - dist / PROXIMITY))
    }
  }

  function paint(element: HTMLElement, s: Light) {
    // Math angle (counter-clockwise from +x) to a CSS conic angle (clockwise from the top).
    const light = 90 - s.angle * 180 / Math.PI
    if (s.follows) {
      element.style.setProperty('--spec-angle', `${light.toFixed(1)}deg`)
      element.style.setProperty('--spec', s.bright.toFixed(3))
    } else if (s.bright < 0.002 || !s.width) element.style.removeProperty('--spec-rim')
    else element.style.setProperty('--spec-rim', rimOf(light, s.width, s.height, s.bright))
  }

  function tick(now: number) {
    // A frame's timestamp can precede the performance.now() taken when the loop was requested.
    const dt = Math.min(Math.max(0, (now - last) / 1000), 0.05)
    last = now
    let moving = false
    for (const element of visible) {
      const s = state.get(element)!
      const diff = ((s.target - s.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI
      s.angle += diff * (1 - Math.exp(-dt * 7))
      s.bright += (s.near - s.bright) * (1 - Math.exp(-dt * 8))
      if (Math.abs(diff) > 0.002 || Math.abs(s.near - s.bright) > 0.002) moving = true
      paint(element, s)
    }
    frame = moving ? requestAnimationFrame(tick) : 0
  }

  function request() {
    if (frame || reducedMotion.matches) return
    last = performance.now()
    frame = requestAnimationFrame(tick)
  }

  const seen = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const element = entry.target as HTMLElement
      if (entry.isIntersecting) {
        visible.add(element)
        const s = state.get(element)!
        s.width = entry.boundingClientRect.width
        s.height = entry.boundingClientRect.height
      } else visible.delete(element)
    }
    // An element drawn into view (a tag, a picker) takes the light at once, without waiting for the next move.
    if (reducedMotion.matches) return
    if (pointer) { aim(); request() }
    else if (reading) glow()
  })
  const litIn = (node: Node) => node instanceof Element ? [...(node.matches(LIT) ? [node] : []), ...node.querySelectorAll(LIT)] as HTMLElement[] : []
  function track(element: HTMLElement) {
    lit.add(element)
    state.set(element, { angle: 2.4, bright: 0, target: 2.4, near: 0, follows: element.matches(FOLLOWS), width: 0, height: 0 })
    seen.observe(element)
  }
  function untrack(element: HTMLElement) {
    seen.unobserve(element)
    lit.delete(element)
    visible.delete(element)
    state.delete(element)
  }
  litIn(document.body).forEach(track)
  // The toolbar's condition tags come and go (FilterDock.tsx); new tags pick up the same light.
  const tags = new MutationObserver(records => {
    for (const record of records) {
      record.removedNodes.forEach(node => litIn(node).forEach(untrack))
      record.addedNodes.forEach(node => litIn(node).forEach(track))
    }
  })
  tags.observe(document.querySelector('.filter-tags')!, { childList: true })
  const moved = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || !hover.matches || reducedMotion.matches) return
    pointer = { x: event.clientX, y: event.clientY }
    aim()
    request()
  }
  addEventListener('pointermove', moved, { passive: true })
  const reduce = () => {
    if (!reducedMotion.matches) return
    for (const element of lit) {
      element.style.setProperty('--spec', '0')
      element.style.removeProperty('--spec-rim')
    }
  }
  reducedMotion.addEventListener('change', reduce)

  // Touch screens have no pointer to follow (docs/glass-effects.md Q2, Q3): moving the phone lights every lit element on
  // the screen at once, the streaks facing the way it tilts, and a second after it stops they fade. Tilting counts once
  // its speed, smoothed over 0.1s, passes 15°/s, more than a hand holding the phone still. iOS gives the orientation only
  // after a tap has asked for it: the first tap asks and still does what it does; a refusal holds for the visit, and a
  // tap that brought no user activation (the end of a scroll) leaves the asking to the next one.
  const STILL = 1000, SMOOTH = 100, SPEED = 15, FLIP = 45
  const velocity = { x: 0, y: 0 }
  let facing = 2.4, shaking = false, dimmer = 0
  function glow() {
    for (const element of visible) {
      const s = state.get(element)!
      s.target = facing
      s.near = shaking ? 1 : 0
    }
    request()
  }
  function tilted(event: DeviceOrientationEvent) {
    if (event.beta === null || event.gamma === null || reducedMotion.matches) return
    const previous = reading
    reading = { x: event.gamma, y: event.beta, time: event.timeStamp }
    const dt = previous ? reading.time - previous.time : 0
    // Held upright or face down, an angle flips sides between two readings; that is not a movement.
    if (!previous || !(dt > 0 && dt < 250) || Math.abs(reading.x - previous.x) > FLIP || Math.abs(reading.y - previous.y) > FLIP) return
    const k = 1 - Math.exp(-dt / SMOOTH)
    velocity.x += ((reading.x - previous.x) * 1000 / dt - velocity.x) * k
    velocity.y += ((reading.y - previous.y) * 1000 / dt - velocity.y) * k
    if (Math.hypot(velocity.x, velocity.y) < SPEED) return
    // ponytail: portrait axes only, so in landscape the streaks face 90° off (they still flash); turn the velocity by
    // screen.orientation.angle if that shows.
    facing = Math.atan2(velocity.y, velocity.x)
    shaking = true
    clearTimeout(dimmer)
    dimmer = window.setTimeout(() => {
      shaking = false
      glow()
    }, STILL)
    glow()
  }
  let ask: (() => void) | undefined
  // Only secure contexts have DeviceOrientationEvent; a plain-http page (a phone on a LAN preview) must not touch it.
  if (!hover.matches && 'DeviceOrientationEvent' in window) {
    addEventListener('deviceorientation', tilted)
    const permission = (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission
    const REFUSED = 'glass-motion-refused'
    let refused = false
    try { refused = sessionStorage.getItem(REFUSED) === '1' } catch {}
    if (typeof permission === 'function' && !refused) {
      ask = () => permission().then(answer => {
        removeEventListener('touchend', ask!, true)
        if (answer === 'granted') return
        try { sessionStorage.setItem(REFUSED, '1') } catch {}
      }, () => {})
      addEventListener('touchend', ask, true)
    }
  }

  const stopRefraction = refract()
  return () => {
    cancelAnimationFrame(frame)
    seen.disconnect()
    tags.disconnect()
    removeEventListener('pointermove', moved)
    reducedMotion.removeEventListener('change', reduce)
    removeEventListener('deviceorientation', tilted)
    if (ask) removeEventListener('touchend', ask, true)
    clearTimeout(dimmer)
    stopRefraction()
  }
}

// React Bits Glass Surface refraction (Chromium only, like the original): a per-element SVG displacement map, sized to the
// element, splits R/G/B at scales -180/-170/-160 and is chained onto the backdrop at the original's saturation 1 (Q26);
// the panels keep their frost underneath.
function refract() {
  const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  if (isWebkit || /Firefox/.test(navigator.userAgent) || !CSS.supports('backdrop-filter', 'url(#glass)')) return () => {}
  const svgNS = 'http://www.w3.org/2000/svg'
  const defs = document.createElementNS(svgNS, 'svg')
  defs.setAttribute('aria-hidden', 'true')
  defs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden'
  document.body.append(defs)

  const displacementMap = (width: number, height: number, radius: number) => {
    const edge = Math.min(width, height) * 0.035
    return `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 ${width} ${height}" xmlns="${svgNS}">`
      + '<defs><linearGradient id="r" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient>'
      + '<linearGradient id="b" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs>'
      + `<rect width="${width}" height="${height}" fill="black"/>`
      + `<rect width="${width}" height="${height}" rx="${radius}" fill="url(#r)"/>`
      + `<rect width="${width}" height="${height}" rx="${radius}" fill="url(#b)" style="mix-blend-mode:difference"/>`
      + `<rect x="${edge}" y="${edge}" width="${width - edge * 2}" height="${height - edge * 2}" rx="${radius}" fill="hsl(0 0% 50% / .93)" style="filter:blur(11px)"/></svg>`)}`
  }
  const channel = (scale: number, matrix: string, name: string) => `<feDisplacementMap in="SourceGraphic" in2="map" scale="${scale}" xChannelSelector="R" yChannelSelector="G" result="d${name}"/>`
    + `<feColorMatrix in="d${name}" type="matrix" values="${matrix}" result="${name}"/>`
  const refracted = [...document.querySelectorAll<HTMLElement>('.filter-bar, .filter-card, .empty-state, .picker-trigger, .ms-search, .filter-select input, .reset-empty')]
  const images = new Map<Element, SVGFEImageElement>()
  refracted.forEach((element, index) => {
    const id = `glass-refraction-${index}`
    const filter = document.createElementNS(svgNS, 'filter')
    filter.id = id
    filter.setAttribute('color-interpolation-filters', 'sRGB')
    filter.setAttribute('x', '0%')
    filter.setAttribute('y', '0%')
    filter.setAttribute('width', '100%')
    filter.setAttribute('height', '100%')
    filter.innerHTML = '<feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map"/>'
      + channel(-180, '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0', 'red')
      + channel(-170, '0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0', 'green')
      + channel(-160, '0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0', 'blue')
      + '<feBlend in="red" in2="green" mode="screen" result="rg"/><feBlend in="rg" in2="blue" mode="screen"/>'
    defs.append(filter)
    images.set(element, filter.querySelector('feImage')!)
    const frost = element.matches('.filter-bar, .filter-card, .empty-state') ? 'blur(18px) ' : ''
    element.style.backdropFilter = `${frost}url(#${id}) saturate(1)`
  })
  const resized = new ResizeObserver(entries => {
    for (const { target } of entries) {
      const box = target.getBoundingClientRect()
      if (!box.width || !box.height) continue
      const radius = Math.min(parseFloat(getComputedStyle(target).borderTopLeftRadius), box.height / 2)
      images.get(target)!.setAttribute('href', displacementMap(box.width, box.height, radius))
    }
  })
  refracted.forEach(element => resized.observe(element))
  return () => {
    resized.disconnect()
    for (const element of refracted) element.style.backdropFilter = ''
    defs.remove()
  }
}
