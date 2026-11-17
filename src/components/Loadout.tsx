import { useSeen } from '../hooks'
import { useContent, useT } from '../i18n'
import { SectionHead, Val } from './ui'

export default function Loadout() {
  const [ref, seen] = useSeen<HTMLDivElement>()
  const t = useT()
  const { achievements, skills, timeline } = useContent()

  return (
    <section id="loadout" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHead index="04" kicker={t('Loadout')} title={t('Skills, history and achievements')} fx="glitch" />

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div ref={ref} className="panel hud reveal p-6">
          <div className="label mb-5">{t('Skill tree')}</div>
          <div className="space-y-5">
            {skills.map((s) => (
              <div key={s.group}>
                <div className="flex items-baseline justify-between">
                  <span className="font-medium">{s.group}</span>
                  <span className="font-mono text-xs text-muted">{s.level}/100</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                  <div
                    className="bar-fill h-full rounded-full bg-gradient-to-r from-accent-2 to-accent"
                    style={{ width: seen ? `${s.level}%` : '0%' }}
                  />
                </div>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-muted">
                  {s.items.map((i) => (
                    <span key={i}>{i}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="panel reveal p-6">
            <div className="label mb-4">{t('Timeline')}</div>
            <ol className="relative space-y-5 border-s border-line ps-5">
              {timeline.map((x) => (
                <li key={x.what + x.where} className="relative">
                  <span className="absolute top-1.5 -start-[25px] h-2 w-2 rotate-45 bg-accent" />
                  <div className="font-mono text-xs text-muted">
                    <Val v={x.when} soon="dates soon" />
                  </div>
                  <div className="mt-0.5 font-medium">{x.what}</div>
                  <div className="text-sm text-muted">{x.where}</div>
                </li>
              ))}
            </ol>
          </div>
          <div className="panel reveal p-6">
            <div className="label mb-4">{t('Achievements unlocked')}</div>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((a) => (
                <div key={a.title} className="rounded-lg border border-line bg-bg-2/60 p-3">
                  <div className="text-accent">◆</div>
                  <div className="mt-1 text-sm font-medium leading-snug">{a.title}</div>
                  <div className="mt-0.5 text-[11px] text-muted">{a.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
