// React Bits Shiny Text as rewritten on 2026-10-08, default settings (docs/site-rewrite.md Q13): a 40%-wide shine with
// soft edges (softness 0.8) crosses the text from right to left every 2s on a smooth ease, the text #b5b5b5 and the shine
// white blended in linear light. The original recomputes the gradient in a script every frame; here a registered
// property moves the same stops (app.css). It pauses off the screen, and with reduced motion it is the plain colour.
import { useEffect, useRef, type ReactNode } from 'react'

export function ShinyText({ children }: { children: ReactNode }) {
  const text = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const element = text.current!
    const seen = new IntersectionObserver(entries => element.classList.toggle('is-away', !entries.at(-1)!.isIntersecting))
    seen.observe(element)
    return () => seen.disconnect()
  }, [])
  return <span ref={text} className="shiny-text">{children}</span>
}
