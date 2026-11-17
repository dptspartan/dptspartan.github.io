import { lazy, Suspense } from 'react'
import { useTypewriter } from '../hooks'
import { useContent, useT } from '../i18n'
import { deploy } from './Curtain'
import OperatorCard from './OperatorCard'
import { Icon } from './ui'

const CoreScene = lazy(() => import('./CoreScene'))

const ROLES = ['full stack products.', 'solid back ends.', 'clean front ends.', 'products end to end.']

export default function Hero({ theme }: { theme: string }) {
  const t = useT()
  const { profile } = useContent()
  const typed = useTypewriter(ROLES.map(t))

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-28 md:pb-16">
      <div className="pointer-events-none absolute inset-0">
        <Suspense fallback={null}>
          <CoreScene theme={theme} />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent md:via-bg/70 rtl:bg-gradient-to-l" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <div className="label mb-6 flex items-center gap-2">
            <span className="live-dot h-2 w-2 rounded-full bg-accent" />
            {t('Player online')} · {profile.location}
          </div>
          <h1 className="text-5xl leading-[1.02] font-bold tracking-tight sm:text-6xl md:text-7xl">
            {profile.name.split(' ')[0]}
            <br />
            <span className="text-muted">{profile.name.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="mt-6 font-mono text-base sm:text-lg">
            <span className="text-muted">&gt; </span>
            {profile.role} @ <span className="text-accent">{profile.company}</span>
            <br />
            <span className="text-muted">&gt; {t('I build')} </span>
            <span className="text-accent-2">{typed}</span>
            <span className="caret text-accent-2">▍</span>
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.strengths.map((x) => (
              <span key={x} className="rounded-md border border-accent/40 px-2.5 py-1 font-mono text-xs text-accent">
                {x}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                deploy('work')
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-accent-ink transition hover:translate-y-[-1px]"
              style={{ boxShadow: 'var(--glow)' }}
            >
              {t('Start: Main quest')} <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-5 py-3 font-medium transition hover:border-accent hover:text-accent"
            >
              <Icon name="github" /> GitHub
            </a>
          </div>
        </div>

        <OperatorCard />
      </div>

      <a
        href="#work"
        onClick={(e) => {
          e.preventDefault()
          deploy('work')
        }}
        className="label absolute bottom-24 left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex md:bottom-8"
      >
        {t('scroll')} <span className="kbd">↓</span>
      </a>
    </section>
  )
}
