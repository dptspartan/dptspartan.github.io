import { freelance } from '../data/profile'
import { Chip, Val, isTodo } from './ui'

export default function Freelance() {
  return (
    <div className="mt-20">
      <div className="reveal mb-6">
        <div className="label">Side missions · freelance</div>
        <h3 className="mt-1 text-2xl font-semibold">Client work</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {freelance.map((g) => (
          <article key={g.client} className="panel reveal flex flex-col p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xl font-semibold">{g.client}</span>
              <span className="font-mono text-xs text-muted">
                <Val v={g.period} soon="dates soon" />
              </span>
            </div>
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
