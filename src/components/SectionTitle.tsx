// A section title (docs/event-filters.md Q18–Q21): the English title large and white in Syne, the Chinese label small and
// grey beside it on the same baseline. The list, the filter cards, the empty state and the detail sections all use it;
// `size` sets the English title's size, the host's own font size the label's.
import type { ReactNode } from 'react'

export function SectionTitle({ as: Tag, english, label, size = 'text-[20px] tracking-[.04em]', id, className = '', children }: {
  as: 'h2' | 'h3' | 'h5' | 'legend'; english: string; label: string; size?: string; id?: string; className?: string; children?: ReactNode
}) {
  return (
    <Tag id={id} className={`flex flex-wrap items-baseline [gap:4px_10px] font-medium leading-[1.3] tracking-[.08em] text-(--muted) [font-family:var(--font-display)] print:text-[#333] ${className}`}>
      <span className={`font-bold leading-none text-white print:text-[#111] ${size}`} lang="en">{english}</span>{label}{children}
    </Tag>
  )
}
