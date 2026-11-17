import { useContent, useT } from '../i18n'

/** Military-style operator dossier: the "player card" in the hero. */

// Deterministic barcode bars from the handle, so it never changes between renders.
function Barcode({ seed }: { seed: string }) {
  const bars: { x: number; w: number }[] = []
  let x = 0
  for (let i = 0; x < 150; i++) {
    const c = seed.charCodeAt(i % seed.length) * (i + 7)
    const w = (c % 3) + 1
    if (c % 5 !== 0) bars.push({ x, w })
    x += w + ((c >> 2) % 2) + 1
  }
  return (
    <svg viewBox="0 0 150 28" className="h-7 w-[150px]" aria-hidden="true">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={28} fill="currentColor" />
      ))}
    </svg>
  )
}

function Field({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="min-w-0">
      <div className="label !text-[9px]">{k}</div>
      <div className={'truncate font-mono text-[13px] font-semibold uppercase ' + (accent ? 'text-accent' : '')}>{v}</div>
    </div>
  )
}

export default function OperatorCard() {
  const t = useT()
  const { profile, stats } = useContent()

  return (
    <div className="op-card reveal relative overflow-hidden" data-fx="wipe">
      {/* Hazard header */}
      <div className="op-hazard flex items-center justify-between px-4 py-2">
        <span className="op-stencil text-sm tracking-[0.2em]">{t('Operator dossier')}</span>
        <span className="rounded-sm bg-accent-ink/90 px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-widest text-accent">
          {t('Classified')}
        </span>
      </div>

      <div className="p-4 md:p-5">
        <div className="flex gap-4">
          {/* Photo with targeting frame */}
          <div className="op-photo relative h-28 w-24 shrink-0 overflow-hidden">
            <img src={profile.avatar} alt={profile.name} width={96} height={112} className="h-full w-full object-cover" />
            <span className="op-scan" />
            <span className="absolute bottom-1 start-1 z-[2] font-mono text-[9px] text-accent">ID SR-0251</span>
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-1 gap-2.5">
            <Field k={t('Callsign')} v={profile.handle} />
            <Field k={t('Rank')} v={profile.role} />
            <Field k={t('Specialisation')} v={t('Full stack')} />
          </div>
        </div>

        {/* Deployment status */}
        <div className="mt-4 flex items-center gap-3 border border-accent/40 bg-accent/10 px-3 py-2">
          <span className="live-dot h-2 w-2 shrink-0 rounded-full bg-accent" />
          <div className="min-w-0">
            <div className="label !text-[9px] !text-accent">{t('Deployment status')}</div>
            <div className="truncate font-mono text-[13px] font-semibold text-accent">{profile.status}</div>
          </div>
          <span className="ms-auto hidden font-mono text-[10px] text-muted sm:block">31.52°N 74.36°E</span>
        </div>

        {/* Service record */}
        <div className="label mt-4 mb-2 !text-[9px]">{t('Service record')}</div>
        <div className="grid grid-cols-2 gap-px bg-line">
          {stats.map((s) => (
            <div key={s.label} className="bg-panel-solid p-2.5">
              <div className="op-stencil text-2xl leading-none text-text">{s.value}</div>
              <div className="mt-1 font-mono text-[10px] tracking-wider text-muted uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Loadout */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            [t('Primary'), 'Django'],
            [t('Secondary'), 'React'],
            [t('Equipment'), 'DevOps'],
          ].map(([k, v]) => (
            <div key={k} className="border border-line px-1.5 py-2">
              <div className="label !text-[9px]">{k}</div>
              <div className="mt-0.5 truncate font-mono text-[11px] font-semibold">{v}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-end justify-between gap-3 text-muted">
          <Barcode seed={profile.handle} />
          <div className="text-end font-mono text-[9px] leading-tight">
            <div>{t('Clearance')}: LVL-5</div>
            <div>{profile.location}</div>
          </div>
        </div>
      </div>

      {/* Corner brackets */}
      <span className="op-corner top-0 left-0 border-t-2 border-l-2" />
      <span className="op-corner right-0 bottom-0 border-r-2 border-b-2" />
    </div>
  )
}
