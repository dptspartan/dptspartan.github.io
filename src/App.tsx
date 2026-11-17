import { useEffect } from 'react'
import Contact from './components/Contact'
import Hero from './components/Hero'
import Loadout from './components/Loadout'
import Nav, { SECTIONS } from './components/Nav'
import Projects from './components/Projects'
import Work from './components/Work'
import { useActiveSection, useReveal, useTheme } from './hooks'

const IDS = SECTIONS.map((s) => s.id)

export default function App() {
  const { theme, toggle } = useTheme()
  const active = useActiveSection(IDS)
  useReveal()

  // Game-style shortcuts: 1–5 jump to a section, T toggles the theme.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.metaKey || e.ctrlKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable) return
      const n = Number(e.key)
      if (n >= 1 && n <= IDS.length) document.getElementById(IDS[n - 1])?.scrollIntoView()
      else if (e.key.toLowerCase() === 't') toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])

  return (
    <>
      <div className="bg-grid pointer-events-none fixed inset-0 -z-10" />
      <Nav active={active} theme={theme} onToggle={toggle} />
      <main>
        <Hero theme={theme} />
        <Work />
        <Projects />
        <Loadout />
        <Contact />
      </main>
    </>
  )
}
