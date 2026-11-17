import { useEffect, useRef, useState } from 'react'
import type { Theme } from '../hooks'
import { LANGS, useLang } from '../i18n'
import { deploy } from './Curtain'
import { Icon } from './ui'

export const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'loadout', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

const go = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault()
  deploy(id)
}

function LangSwitch() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const cur = LANGS.find((l) => l.code === lang)!

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('Language')}
        className="flex h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 font-mono text-xs font-bold text-muted transition hover:border-accent hover:text-accent"
      >
        <Icon name="globe" className="h-4 w-4" />
        {cur.short}
      </button>
      {open && (
        <ul role="listbox" aria-label={t('Language')} className="panel absolute end-0 top-11 z-50 min-w-[150px] p-1">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                role="option"
                aria-selected={l.code === lang}
                lang={l.code}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
                className={
                  'flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition ' +
                  (l.code === lang ? 'bg-accent text-accent-ink' : 'hover:bg-line')
                }
              >
                <span>{l.label}</span>
                <span className="font-mono text-[10px] opacity-70">{l.short}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Nav({ active, theme, onToggle }: { active: string; theme: Theme; onToggle: () => void }) {
  const { t } = useLang()

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 px-4">
          <a href="#home" onClick={go('home')} className="panel flex items-center gap-2.5 px-3 py-2 font-mono text-sm font-bold">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-accent text-[10px] text-accent-ink">SR</span>
            <span className="hidden sm:inline">shoaib.rashid</span>
          </a>
          <nav className="panel hidden items-center gap-1 p-1 md:flex" aria-label={t('Sections')}>
            {SECTIONS.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={go(s.id)}
                aria-current={active === s.id ? 'true' : undefined}
                className={
                  'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition ' +
                  (active === s.id ? 'bg-accent text-accent-ink' : 'text-muted hover:text-text')
                }
              >
                {t(s.label)}
                <span className={'kbd ' + (active === s.id ? '!border-accent-ink/50 !bg-accent-ink/10 !text-accent-ink font-bold' : '')}>{i + 1}</span>
              </a>
            ))}
          </nav>
          <div className="panel flex items-center gap-1 p-1">
            <LangSwitch />
            <button
              onClick={onToggle}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition hover:border-accent hover:text-accent"
              aria-label={t(theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')}
              title={t('Toggle theme (T)')}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </button>
          </div>
        </div>
      </header>

      <nav className="panel fixed inset-x-3 bottom-3 z-50 flex justify-between p-1 md:hidden" aria-label={t('Sections')}>
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={go(s.id)}
            aria-current={active === s.id ? 'true' : undefined}
            className={
              'flex-1 truncate rounded-lg px-0.5 py-2 text-center text-[12px] font-medium transition ' +
              (active === s.id ? 'bg-accent text-accent-ink' : 'text-muted')
            }
          >
            {t(s.label)}
          </a>
        ))}
      </nav>
    </>
  )
}
