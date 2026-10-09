// React Bits Star Border on a 1px divider (docs/site-rewrite.md Q22): over a faint base line fading at both ends, two
// brand-pink stars, each a radial glow three times the line's width, cross it in opposite directions on the original's 6s
// linear alternate timing, fading from full to nothing as they go. They move by transform and opacity, so the compositor
// runs them; a divider off the screen still pauses its stars (docs/motion-performance.md Q6, Q28). Reduced motion keeps
// the base line alone; printed, the line is plain grey.
import { useEffect, useRef } from 'react'

const LINE = 'divider block h-px overflow-hidden pointer-events-none [background:linear-gradient(90deg,transparent,rgb(255_255_255/.26)_8%,rgb(255_255_255/.26)_92%,transparent)] print:[background:#aaa]'
const STAR = 'absolute top-0 h-full w-[300%] [background:radial-gradient(circle,var(--brand-pink),transparent_10%)] [animation-duration:6s] [animation-timing-function:linear] [animation-iteration-count:infinite] [animation-direction:alternate] [.is-offscreen>&]:[animation-play-state:paused] motion-reduce:hidden print:hidden'

// One observer marks every divider on or off the screen.
let watcher: IntersectionObserver | undefined
const watch = () => watcher ??= new IntersectionObserver(entries => {
  for (const { target, isIntersecting } of entries) target.classList.toggle('is-offscreen', !isIntersecting)
})

export function Divider({ className = '' }: { className?: string }) {
  const line = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const element = line.current!
    watch().observe(element)
    return () => watch().unobserve(element)
  }, [])
  return (
    <span ref={line} className={`${LINE} ${className}`} aria-hidden="true">
      <span className={`${STAR} right-[-250%] [animation-name:star-movement-bottom]`} />
      <span className={`${STAR} left-[-250%] [animation-name:star-movement-top]`} />
    </span>
  )
}
