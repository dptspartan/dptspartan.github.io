import { useState } from 'react'
import { dubizzle, type Mission } from '../data/profile'
import FocusDemo from './FocusDemo'
import Freelance from './Freelance'
import { Chip, SectionHead, Val, isTodo } from './ui'

function FeatureLog({ features }: { features: Mission['features'] }) {
  const known = features.filter((f) => f.count != null && !isTodo(f.type))
  const total = known.reduce((a, f) => a + (f.count ?? 0), 0)
  const max = Math.max(1, ...known.map((f) => f.count ?? 0))
  return (
    <div className="mt-8 border-t border-line pt-6">
      <div className="mb-4 flex items-baseline justify-between">
        <div className="label">Quest log · features shipped</div>
        <div className="font-mono text-sm">
          {total > 0 ? <span className="text-accent">{total} total</span> : <Val v="TODO" soon="counts soon" />}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {features.map((f, i) => (
          <div key={i} className="rounded-lg border border-line bg-bg-2/60 p-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium">{isTodo(f.type) ? <Val v={f.type} soon="feature type" /> : f.type}</span>
              <span className="font-mono text-lg font-semibold text-accent">{f.count ?? '-'}</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-accent" style={{ width: `${((f.count ?? 0) / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Work() {
  const [sel, setSel] = useState(0)
  const m = dubizzle.missions[sel]
  const realHighlights = m.highlights.filter((h) => !isTodo(h))
  const moreSoon = m.highlights.length !== realHighlights.length

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHead index="02" kicker={`Main quest · ${dubizzle.company}`} title="Selected work at Dubizzle Labs">
        {dubizzle.intro}
      </SectionHead>

      <div className="reveal grid gap-4 lg:grid-cols-[300px_1fr]">
        {/* Mission select */}
        <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible" role="tablist" aria-label="Dubizzle Labs work">
          {dubizzle.missions.map((mi, i) => (
            <button
              key={mi.id}
              role="tab"
              aria-selected={sel === i}
              aria-controls="mission-panel"
              onClick={() => setSel(i)}
              className={
                'panel min-w-[200px] flex-1 p-4 text-left transition lg:min-w-0 lg:flex-none ' +
                (sel === i ? '!border-accent' : 'hover:!border-line-strong')
              }
              style={sel === i ? { boxShadow: 'var(--glow)' } : undefined}
            >
              <div className="flex items-center justify-between">
                <span className={'font-mono text-xs ' + (sel === i ? 'text-accent' : 'text-muted')}>{mi.code}</span>
                <span className={'h-2 w-2 rounded-full ' + (sel === i ? 'bg-accent' : 'bg-line-strong')} />
              </div>
              <div className="mt-2 font-semibold">{mi.title}</div>
              <div className="mt-0.5 text-xs text-muted">{mi.kind}</div>
            </button>
          ))}
          <div className="panel hidden p-4 lg:block">
            <div className="label">Period</div>
            <div className="mt-1 text-sm">
              <Val v={dubizzle.period} soon="dates soon" />
            </div>
          </div>
        </div>

        {/* Mission detail */}
        <article id="mission-panel" role="tabpanel" key={m.id} className="panel hud p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="accent">{m.code}</Chip>
            <Chip>{m.kind}</Chip>
            <Chip>Overview only, no code</Chip>
          </div>
          <h3 className="mt-4 text-2xl font-semibold md:text-3xl">{m.title}</h3>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted md:text-lg">{m.summary}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <div className="label mb-3">Objectives cleared</div>
              <ul className="space-y-2.5">
                {realHighlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
                    {h}
                  </li>
                ))}
                {moreSoon && (
                  <li className="flex gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 border border-line-strong" />
                    <Val v="TODO" soon="more objectives soon" />
                  </li>
                )}
              </ul>
            </div>
            <div className="space-y-6">
              <div>
                <div className="label mb-3">Impact</div>
                <div className="flex flex-wrap gap-2">
                  {m.impact.map((x, i) => (
                    <span key={i} className="text-sm">
                      {isTodo(x) ? <Val v={x} soon="impact numbers soon" /> : <Chip tone="accent">{x}</Chip>}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="label mb-3">Stack</div>
                <div className="flex flex-wrap gap-2">
                  {m.stack.map((x, i) => (isTodo(x) ? <Val key={i} v={x} soon="stack soon" /> : <Chip key={x}>{x}</Chip>))}
                </div>
              </div>
            </div>
          </div>

          <FeatureLog features={m.features} />
        </article>
      </div>

      <FocusDemo />

      <Freelance />
    </section>
  )
}
