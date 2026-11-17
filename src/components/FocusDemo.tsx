import { useState } from 'react'
import { useT } from '../i18n'

/**
 * A playable, illustrative take on the idea behind Focus Mode: every core CRM flow on one
 * screen. Entirely made-up sample data and UI, not the production product.
 */

const STAGES = ['New', 'Contacted', 'Viewing', 'Offer', 'Won']
const LEADS = [
  { name: 'Ayesha K.', want: '3-bed apartment', area: 'DHA Phase 6', budget: 'PKR 4.5 Cr' },
  { name: 'Omar F.', want: '10 marla house', area: 'Bahria Town', budget: 'PKR 3.2 Cr' },
  { name: 'Sara M.', want: 'Studio, rental', area: 'Gulberg', budget: 'PKR 85k / mo' },
]
const ACTIONS = [
  { key: 'call', label: 'Log call', text: 'Call logged: interested, wants a viewing' },
  { key: 'msg', label: 'Send message', text: 'Message sent with 3 matching listings' },
  { key: 'visit', label: 'Book viewing', text: 'Viewing booked for Saturday, 11:00' },
  { key: 'task', label: 'Follow-up', text: 'Follow-up task created for tomorrow' },
] as const

type Event = { id: number; text: string; when: string }

export default function FocusDemo() {
  const [lead, setLead] = useState(0)
  const t = useT()
  const [stage, setStage] = useState<number[]>([1, 0, 2])
  const [log, setLog] = useState<Record<number, Event[]>>({
    0: [{ id: 1, text: 'Lead created from listing inquiry', when: '09:12' }],
    1: [{ id: 2, text: 'Lead created from call center', when: '08:40' }],
    2: [{ id: 3, text: 'Lead created from website form', when: 'Yesterday' }],
  })
  const [flash, setFlash] = useState<string | null>(null)
  const L = LEADS[lead]

  const act = (text: string, key: string) => {
    const now = new Date()
    const when = now.toTimeString().slice(0, 5)
    setLog((l) => ({ ...l, [lead]: [{ id: now.getTime(), text, when }, ...(l[lead] || [])].slice(0, 5) }))
    if (key === 'visit' && stage[lead] < 2) setStage((s) => s.map((v, i) => (i === lead ? 2 : v)))
    setFlash(key)
    window.setTimeout(() => setFlash(null), 500)
  }

  return (
    <div className="reveal mt-16" data-fx="scan">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="label">{t('Playable demo')} · Jarvis · Focus Mode</div>
          <h3 className="mt-1 text-2xl font-semibold">{t('Focus Mode, in mini')}</h3>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            {t('The idea is simple: do everything from one screen. Pick a lead, move it along, and take actions without leaving the page. Try it.')}
          </p>
        </div>
        <span className="rounded-md border border-dashed border-line-strong px-2 py-1 font-mono text-[11px] text-muted">
          {t('Concept demo · sample data')}
        </span>
      </div>

      <div className="panel overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-3/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-2/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="ms-3 font-mono text-xs text-muted">focus-mode · {LEADS.length}</span>
        </div>

        <div className="grid md:grid-cols-[220px_1fr_260px]">
          {/* Queue */}
          <div className="border-b border-line p-3 md:border-e md:border-b-0">
            <div className="label mb-2 px-1">{t('Queue')}</div>
            <div className="flex gap-2 overflow-x-auto md:flex-col">
              {LEADS.map((l, i) => (
                <button
                  key={l.name}
                  onClick={() => setLead(i)}
                  aria-pressed={lead === i}
                  className={
                    'min-w-[150px] rounded-lg border p-2.5 text-start transition md:min-w-0 ' +
                    (lead === i ? 'border-accent bg-accent/10' : 'border-line hover:border-line-strong')
                  }
                >
                  <div className="text-sm font-medium">{l.name}</div>
                  <div className="text-[11px] text-muted">{t(l.want)}</div>
                  <div className="mt-1 font-mono text-[10px] text-accent-2">{t(STAGES[stage[i]])}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Record */}
          <div className="border-b border-line p-4 md:border-b-0 md:p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="text-xl font-semibold">{L.name}</div>
              <div className="font-mono text-xs text-muted">
                {L.area} · {L.budget}
              </div>
            </div>
            <div className="mt-1 text-sm text-muted">{t('Looking for')}: {t(L.want)}</div>

            <div className="label mt-5 mb-2">{t('Pipeline')}</div>
            <div className="grid grid-cols-5 gap-1">
              {STAGES.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setStage((st) => st.map((v, j) => (j === lead ? i : v)))}
                  className={
                    'rounded-md py-2 text-[11px] font-medium transition ' +
                    (i <= stage[lead] ? 'bg-accent text-accent-ink' : 'bg-line text-muted hover:text-text')
                  }
                >
                  {t(s)}
                </button>
              ))}
            </div>

            <div className="label mt-5 mb-2">{t('Actions · in place')}</div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {ACTIONS.map((a) => (
                <button
                  key={a.key}
                  onClick={() => act(a.text, a.key)}
                  className={
                    'rounded-lg border px-2 py-2.5 text-xs font-medium transition ' +
                    (flash === a.key ? 'border-accent bg-accent/15 text-accent' : 'border-line-strong hover:border-accent hover:text-accent')
                  }
                >
                  {t(a.label)}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="p-4 md:border-s md:border-line">
            <div className="label mb-3">{t('Activity')}</div>
            <ol className="space-y-3" aria-live="polite">
              {(log[lead] || []).map((e) => (
                <li key={e.id} className="flex gap-3 text-xs">
                  <span className="font-mono text-muted">{t(e.when)}</span>
                  <span>{t(e.text)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
