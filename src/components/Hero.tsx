import { lazy, Suspense } from 'react'
import { profile, stats } from '../data/profile'
import { useTypewriter } from '../hooks'
import { Icon, Val } from './ui'

const CoreScene = lazy(() => import('./CoreScene'))

const ROLES = ['full stack products.', 'Rails back ends.', 'React front ends.', 'products end to end.']

export default function Hero({ theme }: { theme: string }) {
  const typed = useTypewriter(ROLES)

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-28 md:pb-16">
      <div className="pointer-events-none absolute inset-0">
        <Suspense fallback={null}>
          <CoreScene theme={theme} />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent md:via-bg/70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        <div>
          <div className="label mb-6 flex items-center gap-2">
            <span className="live-dot h-2 w-2 rounded-full bg-accent" />
            Player online · {profile.location}
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
            <span className="text-muted">&gt; I build </span>
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
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-accent-ink transition hover:translate-y-[-1px]"
              style={{ boxShadow: 'var(--glow)' }}
            >
              Start: Main quest <Icon name="arrow" />
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

        {/* Player card */}
        <div className="panel hud reveal p-5 md:p-6">
          <div className="flex items-center gap-4">
            <img src={profile.avatar} alt={profile.name} width={64} height={64} className="h-16 w-16 rounded-xl border border-line-strong object-cover" />
            <div className="min-w-0">
              <div className="label">Player card</div>
              <div className="truncate text-lg font-semibold">@{profile.handle}</div>
              <div className="mt-1 flex items-center gap-2 font-mono text-xs text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {profile.status}
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-line bg-bg-2/60 p-3">
                <div className="label !text-[10px]">{s.label}</div>
                <div className="mt-1 text-lg leading-tight font-semibold">
                  <Val v={s.value} soon="syncing…" />
                </div>
                {s.hint && <div className="mt-1 text-[11px] text-muted">{s.hint}</div>}
              </div>
            ))}
          </div>
          <div className="mt-5">
            <div className="flex justify-between font-mono text-[11px] text-muted">
              <span>XP · career</span>
              <span>LVL ∞</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-accent-2 to-accent" />
            </div>
          </div>
        </div>
      </div>

      <a href="#work" className="label absolute bottom-24 left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex md:bottom-8">
        scroll <span className="kbd">↓</span>
      </a>
    </section>
  )
}
