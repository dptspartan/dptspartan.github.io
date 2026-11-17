import { useMemo, useState } from 'react'
import { projects as rawProjects, type Build, type Project } from '../data/profile'
import { useContent, useT } from '../i18n'
import GitHubFeed from './GitHubFeed'
import { Chip, Icon, SectionHead } from './ui'

const FILTERS = ['All', 'Games & XR', 'ML'] as const
type Filter = (typeof FILTERS)[number]

const matches = (p: Project, f: Filter) =>
  f === 'All' || (f === 'ML' ? /ML/.test(p.tag) : /VR|AR|Game|Unity|Unreal/.test(p.tag))

function Media({ p }: { p: Project }) {
  const [playing, setPlaying] = useState(false)
  if (!p.media) return null
  if (p.media.type === 'image') {
    return <img src={p.media.src} alt={p.title} loading="lazy" className="aspect-video w-full border-b border-line object-cover" />
  }
  return (
    <div className="relative aspect-video border-b border-line bg-black">
      {playing ? (
        <video src={p.media.src} poster={p.media.poster} controls autoPlay muted playsInline className="h-full w-full object-cover" />
      ) : (
        <button onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={p.title}>
          <img src={p.media.poster} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-ink transition group-hover:scale-110">
              <Icon name="play" className="h-5 w-5" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}

function BuildCard({ b, i }: { b: Build; i: number }) {
  const t = useT()
  return (
    <article className={'panel reveal flex flex-col p-6 md:p-7 ' + (i === 0 ? 'hud lg:col-span-2' : '')}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-accent">B-0{i + 1}</span>
        <span className="font-mono text-xs text-muted">{b.year}</span>
      </div>
      <h3 className="mt-3 text-2xl font-semibold">{b.title}</h3>
      <div className="mt-1 text-sm text-accent-2">{b.kind}</div>
      <p className="mt-4 leading-relaxed text-muted">{b.about}</p>
      <ul className="mt-5 space-y-2">
        {b.points.map((pt) => (
          <li key={pt} className="flex gap-3 text-sm leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
            {pt}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {b.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap gap-4 pt-6 text-sm">
        {b.live && (
          <a href={b.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-accent">
            {t('Try it live')} <Icon name="external" className="h-3.5 w-3.5" />
          </a>
        )}
        {b.repo && (
          <a href={b.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-text">
            <Icon name="github" className="h-3.5 w-3.5" /> {t('Code')}
          </a>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const t = useT()
  const { builds, projects } = useContent()
  // Filter on the English data so translated tags don't affect matching.
  const list = useMemo(() => projects.filter((_, i) => matches(rawProjects[i], filter)), [filter, projects])

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHead index="03" kicker={t('Side quests')} title={t('Things I build outside work')} fx="scan">
        {t('Bigger apps I built in my own time. Live tournaments, mobile apps, AI and more.')}
      </SectionHead>

      <div className="grid gap-4 lg:grid-cols-2">
        {builds.map((b, i) => (
          <BuildCard key={b.title} b={b} i={i} />
        ))}
      </div>

      <div className="reveal mt-20 mb-6" data-fx="wipe">
        <div className="label">{t('Earlier work')}</div>
        <h3 className="mt-1 text-2xl font-semibold">{t('VR, games and ML from university')}</h3>
      </div>

      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label={t('Filter projects')}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={
              'rounded-lg border px-3 py-1.5 text-sm transition ' +
              (filter === f ? 'border-accent bg-accent text-accent-ink' : 'border-line text-muted hover:text-text')
            }
          >
            {t(f)}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <article key={p.title} className="panel group flex flex-col overflow-hidden transition hover:!border-line-strong">
            <Media p={p} />
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between gap-2">
                <Chip>{p.tag}</Chip>
                <span className="font-mono text-xs text-muted">{p.year}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent">
                  {t('View')} <Icon name="external" className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <GitHubFeed />
    </section>
  )
}
