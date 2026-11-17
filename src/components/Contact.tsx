import { useState, type FormEvent } from 'react'
import { useContent, useT } from '../i18n'
import { Icon, SectionHead } from './ui'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const t = useT()
  const { profile } = useContent()

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = encodeURIComponent(String(f.get('subject') || 'Hello from your portfolio'))
    const body = encodeURIComponent(`${f.get('message')}\n\nFrom ${f.get('name')}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const links = [
    { href: profile.github, label: 'GitHub', icon: 'github' as const, sub: `@${profile.handle}` },
    profile.linkedin && { href: profile.linkedin, label: 'LinkedIn', icon: 'linkedin' as const, sub: t('Connect') },
    profile.email && { href: `mailto:${profile.email}`, label: t('Email'), icon: 'mail' as const, sub: profile.email },
    { href: profile.resume, label: t('Résumé'), icon: 'file' as const, sub: 'PDF' },
  ].filter(Boolean) as { href: string; label: string; icon: 'github' | 'linkedin' | 'mail' | 'file'; sub: string }[]

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pt-24 pb-36 md:pt-32 md:pb-24">
      <SectionHead index="05" kicker={t('Multiplayer')} title={t('Let’s build something together')} fx="wipe">
        {t('Have an idea or a role in mind? Reach out below.')}
      </SectionHead>

      <div className={'grid gap-4 ' + (profile.email ? 'lg:grid-cols-[1fr_1.2fr]' : '')}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="panel reveal group flex items-center gap-4 p-5 transition hover:!border-accent"
            >
              <span className="grid h-11 w-11 place-items-center rounded-lg border border-line-strong transition group-hover:border-accent group-hover:text-accent">
                <Icon name={l.icon} className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-medium">{l.label}</span>
                <span className="block truncate font-mono text-xs text-muted">{l.sub}</span>
              </span>
              <Icon name="arrow" className="ms-auto h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-accent rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </a>
          ))}
        </div>

        {profile.email && (
          <form onSubmit={submit} className="panel hud reveal grid gap-3 p-6">
            <div className="label">{t('Send a message')}</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input required name="name" placeholder={t('Your name')} className="rounded-lg border border-line bg-bg-2/60 px-3 py-2.5 text-sm outline-none focus:border-accent" />
              <input name="subject" placeholder={t('Subject')} className="rounded-lg border border-line bg-bg-2/60 px-3 py-2.5 text-sm outline-none focus:border-accent" />
            </div>
            <textarea required name="message" rows={5} placeholder={t('What are we building?')} className="rounded-lg border border-line bg-bg-2/60 px-3 py-2.5 text-sm outline-none focus:border-accent" />
            <button className="justify-self-start rounded-lg bg-accent px-5 py-2.5 font-semibold text-accent-ink">{t('Send')}</button>
            {sent && <p className="text-xs text-muted">{t('Your email app should have opened with the message ready to send.')}</p>}
          </form>
        )}
      </div>

      <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 font-mono text-xs text-muted">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="hidden md:inline">
          {t('Press')} <span className="kbd">1</span>-<span className="kbd">5</span> {t('to jump')} · <span className="kbd">T</span> {t('theme')}
        </span>
      </footer>
    </section>
  )
}
