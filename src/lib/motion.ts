// The site's eases and the media queries the components follow.
import { useEffect, useLayoutEffect, useState } from 'react'

// GSAP power3.out (quartic out), the ease of React Bits Card Nav and Accordion Gallery (docs/site-rewrite.md Q10), as a
// CSS linear() curve: 30 even steps, within 0.002 of the curve. legacy.css has the same curve as --ease-card.
export const EASE = 'linear(0, 0.1268, 0.2412, 0.3439, 0.4358, 0.5177, 0.5904, 0.6545, 0.7108, 0.7599, 0.8025, 0.8391, 0.8704, 0.8969, 0.9191, 0.9375, 0.9526, 0.9647, 0.9744, 0.9819, 0.9877, 0.9919, 0.9949, 0.997, 0.9984, 0.9992, 0.9997, 0.9999, 1, 1, 1)'
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
