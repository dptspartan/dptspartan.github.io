import { useState } from 'react'
import { dubizzle } from '../data/profile'
import FocusDemo from './FocusDemo'
import Freelance from './Freelance'
import { Chip, SectionHead } from './ui'

export default function Work() {
  const [sel, setSel] = useState(0)
  const m = dubizzle.missions[sel]

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHead index="02" kicker={`Main quest · ${dubizzle.company}`} title="Selected work at Dubizzle Labs">
        {dubizzle.intro}
      </SectionHead>

      <div className="reveal mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {dubizzle.totals.map((t) => (
          <div key={t.label} className="panel p-4">
            <div className="label !text-[10px]">{t.label}</div>
            <div className="mt-1 text-2xl font-semibold text-accent md:text-3xl">{t.value}</div>
          </div>
        ))}
      </div>

      <div className="reveal grid gap-4 lg:grid-cols-[300px_1fr] lg:items-start">
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
        </div>

        {/* Mission detail */}
        <article id="mission-panel" role="tabpanel" key={m.id} className="panel hud p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="accent">{m.code}</Chip>
            <Chip>{m.kind}</Chip>
          </div>
          <h3 className="mt-4 text-2xl font-semibold md:text-3xl">{m.title}</h3>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted md:text-lg">{m.summary}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {m.stack.map((x) => (
              <Chip key={x}>{x}</Chip>
            ))}
          </div>

          <div className="label mt-8 mb-3">What I built</div>
          <div className="grid gap-3 md:grid-cols-2">
            {m.modules.map((mod) => (
              <div key={mod.name} className="rounded-xl border border-line bg-bg-2/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold">{mod.name}</span>
                  {mod.tag && <Chip tone="accent">{mod.tag}</Chip>}
                </div>
                <ul className="mt-3 space-y-2">
                  {mod.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>
      </div>

      <FocusDemo />

      <Freelance />
    </section>
  )
}
