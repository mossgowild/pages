// The site's eases and the media queries the components follow.
import { useEffect, useLayoutEffect, useState } from 'react'

// GSAP power3.out (quartic out), the ease of React Bits Card Nav and Accordion Gallery (docs/site-rewrite.md Q10): 30
// even steps, within 0.002 of the curve, as a CSS linear() curve. app.css has the same curve as --ease-card.
const CURVE = [0, 0.1268, 0.2412, 0.3439, 0.4358, 0.5177, 0.5904, 0.6545, 0.7108, 0.7599, 0.8025, 0.8391, 0.8704, 0.8969, 0.9191, 0.9375, 0.9526, 0.9647, 0.9744, 0.9819, 0.9877, 0.9919, 0.9949, 0.997, 0.9984, 0.9992, 0.9997, 0.9999, 1, 1, 1]
export const EASE = `linear(${CURVE.join(', ')})`

// An animation along EASE that Safari can run off the main thread (docs/event-filters.md F11, F12, F16). Safari runs an
// animation with a linear() easing, a reversed one, or one still waiting out its delay on the main thread, where any
// busy frame stalls it; so the curve is written out as keyframes, one per point with plain linear easing between them,
// a delay is a still start within the animation, and leaving plays the same keyframes forwards from the end. `frame`
// gives the keyframe at a progress along the curve: 0 away, 1 arrived.
export function eased(element: Element, frame: (progress: number) => Keyframe,
  { delay = 0, duration = 400, leaving = false }: { delay?: number; duration?: number; leaving?: boolean } = {}) {
  const points = leaving ? CURVE.toReversed() : CURVE
  const total = delay + duration
  const keyframes = points.map((progress, index) => ({ ...frame(progress), offset: (delay + duration * index / (points.length - 1)) / total }))
  if (delay) keyframes.unshift({ ...frame(points[0]), offset: 0 })
  return element.animate(keyframes, { duration: total, easing: 'linear', fill: leaving ? 'forwards' : 'backwards' })
}

// power4.out (quintic out) for sheets coming in or springing back after a drag.
export const OUT = 'cubic-bezier(.22,1,.36,1)'
// power2.inOut for a leaving tag (question 202).
export const IN_OUT = 'cubic-bezier(.45,0,.55,1)'

export const reducedMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

// Layout effects only run in the browser; on the server they would warn.
export const useIsomorphicLayoutEffect = typeof document === 'undefined' ? useEffect : useLayoutEffect

// A media query's current answer; false on the server and in the first client render, so hydration matches.
export function useMedia(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const list = matchMedia(query)
    const update = () => setMatches(list.matches)
    update()
    list.addEventListener('change', update)
    return () => list.removeEventListener('change', update)
  }, [query])
  return matches
}

// True once the page has hydrated: the parts that only work with the script show from then on.
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}
