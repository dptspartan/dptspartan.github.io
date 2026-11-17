import type { ReactNode } from 'react'
import { PLACEHOLDER } from '../data/profile'

export const isTodo = (v: string) => v === PLACEHOLDER

/** Renders a value, or a subtle "coming soon" chip while it's still a placeholder. */
export function Val({ v, soon = 'details soon' }: { v: string; soon?: string }) {
  if (!isTodo(v)) return <>{v}</>
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-line-strong px-1.5 py-0.5 font-mono text-[11px] font-normal tracking-wide text-muted">
      <span className="h-1 w-1 rounded-full bg-accent-2" />
      {soon}
    </span>
  )
}

export function SectionHead({
  index,
  kicker,
  title,
  children,
  fx = 'rise',
}: {
  index: string
  kicker: string
  title: string
  children?: ReactNode
  fx?: 'rise' | 'wipe' | 'scan' | 'glitch'
}) {
  return (
    <div className="reveal relative mb-10 flex flex-col gap-3 md:mb-14" data-fx={fx}>
      <div className="label flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-line-strong" />
        {kicker}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl" data-text={title}>
        {title}
      </h2>
      {children && <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">{children}</p>}
    </div>
  )
}

export function Chip({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' }) {
  return (
    <span
      className={
        'inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] tracking-wide ' +
        (tone === 'accent' ? 'border-accent/40 text-accent' : 'border-line text-muted')
      }
    >
      {children}
    </span>
  )
}

type IconName = 'globe' | 'github' | 'linkedin' | 'mail' | 'sun' | 'moon' | 'arrow' | 'file' | 'star' | 'fork' | 'play' | 'external'

const paths: Record<IconName, ReactNode> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5Z"
    />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  file: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />
      <path d="M14 3v6h6M8 13h8M8 17h5" />
    </>
  ),
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3l-5.5 2.9 1-6.2L3 9.6l6.2-.9Z" />,
  fork: (
    <>
      <circle cx="6" cy="5" r="2" />
      <circle cx="18" cy="5" r="2" />
      <circle cx="12" cy="19" r="2" />
      <path d="M6 7v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7M12 12v5" />
    </>
  ),
  play: <path fill="currentColor" d="M8 5v14l11-7Z" />,
  external: <path d="M14 4h6v6M20 4 10 14M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />,
}

export function Icon({ name, className = 'h-4 w-4' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  )
}
