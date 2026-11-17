import { useContent, useT } from '../i18n'
import { Chip, isTodo } from './ui'

export default function Freelance() {
  const t = useT()
  const { freelance, studio } = useContent()
  return (
    <div className="mt-20">
      <div className="reveal mb-6" data-fx="scan">
        <div className="label">{t('Before Dubizzle')} · {studio.period}</div>
        <h3 className="mt-1 text-2xl font-semibold">
          {studio.name} <span className="text-muted">· {studio.role}</span>
        </h3>
        <p className="mt-2 max-w-2xl text-muted">{studio.about}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {freelance.map((g) => (
          <article key={g.client} className="panel reveal flex flex-col p-6">
            <span className="text-xl font-semibold">{g.client}</span>
            <div className="mt-1 text-sm text-accent-2">{g.role}</div>
            <p className="mt-4 leading-relaxed text-muted">{g.about}</p>
            <ul className="mt-4 space-y-2">
              {g.points
                .filter((p) => !isTodo(p))
                .map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
                    {p}
                  </li>
                ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
              {g.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
