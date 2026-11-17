import { Icon } from './ui'
import type { Theme } from '../hooks'

export const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'loadout', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

export default function Nav({ active, theme, onToggle }: { active: string; theme: Theme; onToggle: () => void }) {
  const themeBtn = (
    <button
      onClick={onToggle}
      className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition hover:border-accent hover:text-accent"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title="Toggle theme (T)"
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  )

  return (
    <>
      {/* Desktop / tablet top bar */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 px-4">
          <a href="#home" className="panel flex items-center gap-2.5 px-3 py-2 font-mono text-sm font-bold">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-accent text-[10px] text-accent-ink">SR</span>
            <span className="hidden sm:inline">shoaib.rashid</span>
          </a>
          <nav className="panel hidden items-center gap-1 p-1 md:flex" aria-label="Sections">
            {SECTIONS.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={active === s.id ? 'true' : undefined}
                className={
                  'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition ' +
                  (active === s.id ? 'bg-accent text-accent-ink' : 'text-muted hover:text-text')
                }
              >
                {s.label}
                <span className={'kbd ' + (active === s.id ? 'border-accent-ink/30 text-accent-ink/70' : '')}>{i + 1}</span>
              </a>
            ))}
          </nav>
          <div className="panel flex items-center gap-1 p-1">{themeBtn}</div>
        </div>
      </header>

      {/* Phone bottom dock */}
      <nav className="panel fixed inset-x-3 bottom-3 z-50 flex justify-between p-1 md:hidden" aria-label="Sections">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={active === s.id ? 'true' : undefined}
            className={
              'flex-1 rounded-lg py-2 text-center text-[12px] font-medium transition ' +
              (active === s.id ? 'bg-accent text-accent-ink' : 'text-muted')
            }
          >
            {s.label}
          </a>
        ))}
      </nav>
    </>
  )
}
