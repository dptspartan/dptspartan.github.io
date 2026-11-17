import { useEffect, useRef } from 'react'
import Contact from './components/Contact'
import Curtain, { deploy, pass } from './components/Curtain'
import Divider from './components/Divider'
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

  // Play a quick door pass each time scrolling carries the reader into a new section.
  const last = useRef(active)
  useEffect(() => {
    if (active === last.current) return
    last.current = active
    pass(active)
  }, [active])

  // Game-style shortcuts: 1 to 5 jump to a section, T toggles the theme.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.metaKey || e.ctrlKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable) return
      const n = Number(e.key)
      if (n >= 1 && n <= IDS.length) deploy(IDS[n - 1])
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
        <Divider n="02" label="Main quest" />
        <Work />
        <Divider n="03" label="Side quests" />
        <Projects />
        <Divider n="04" label="Loadout" />
        <Loadout />
        <Divider n="05" label="Multiplayer" />
        <Contact />
      </main>
      <Curtain />
    </>
  )
}
