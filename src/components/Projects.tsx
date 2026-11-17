import { useMemo, useState } from 'react'
import { projects, type Project } from '../data/profile'
import GitHubFeed from './GitHubFeed'
import { Chip, Icon, SectionHead } from './ui'

const FILTERS = ['All', 'Games & XR', 'ML'] as const
type Filter = (typeof FILTERS)[number]

const matches = (p: Project, f: Filter) =>
  f === 'All' || (f === 'ML' ? /ML/.test(p.tag) : /VR|AR|Game|Unity|Unreal/.test(p.tag))

function Media({ p }: { p: Project }) {
  const [playing, setPlaying] = useState(false)
  if (!p.media) {
    return (
      <div className="bg-grid relative grid aspect-video place-items-center border-b border-line">
        <span className="font-mono text-3xl font-bold text-line-strong">{p.title.slice(0, 2).toUpperCase()}</span>
      </div>
    )
  }
  if (p.media.type === 'image') {
    return <img src={p.media.src} alt={p.title} loading="lazy" className="aspect-video w-full border-b border-line object-cover" />
  }
  return (
    <div className="relative aspect-video border-b border-line bg-black">
      {playing ? (
        <video src={p.media.src} poster={p.media.poster} controls autoPlay muted playsInline className="h-full w-full object-cover" />
      ) : (
        <button onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play ${p.title} video`}>
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

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const list = useMemo(() => projects.filter((p) => matches(p, filter)), [filter])

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHead index="03" kicker="Side quests" title="Things I built for the love of it">
        Before CRMs, I was building VR worlds, games and computer vision experiments. Some of them are below.
      </SectionHead>

      <div className="reveal mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
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
            {f}
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
                  View <Icon name="external" className="h-3.5 w-3.5" />
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
