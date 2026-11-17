import { useEffect, useState } from 'react'
import { useT } from '../i18n'
import { SECTIONS } from './Nav'

/**
 * Game-style "deploy" transition: blast doors close, the page jumps to the target section,
 * then the doors open again. Call deploy(id) from anywhere.
 */

type Phase = 'idle' | 'closing' | 'hold' | 'opening'
type Mode = 'jump' | 'pass'
const listeners = new Set<(id: string, mode: Mode) => void>()
let busy = false
let quietUntil = Date.now() + 1200 // no pass while the page settles on load
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Jump to a section behind the blast doors (nav clicks, keys, buttons). */
export function deploy(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (busy || listeners.size === 0 || reduced()) {
    el.scrollIntoView({ behavior: 'auto' })
    history.replaceState(null, '', `#${id}`)
    return
  }
  listeners.forEach((l) => l(id, 'jump'))
}

/** Quick door pass when the reader scrolls into a new section. Never moves the page. */
export function pass(id: string) {
  if (busy || Date.now() < quietUntil || listeners.size === 0 || reduced()) return
  listeners.forEach((l) => l(id, 'pass'))
}

const TIMING = {
  jump: { close: 380, hold: 260, open: 480 },
  pass: { close: 260, hold: 180, open: 380 },
}

export default function Curtain() {
  const t = useT()
  const [phase, setPhase] = useState<Phase>('idle')
  const [target, setTarget] = useState('')
  const [mode, setMode] = useState<Mode>('jump')

  useEffect(() => {
    const go = (id: string, m: Mode) => {
      const t = TIMING[m]
      busy = true
      setTarget(id)
      setMode(m)
      setPhase('closing')
      window.setTimeout(() => {
        setPhase('hold')
        if (m === 'jump') {
          const html = document.documentElement
          const prev = html.style.scrollBehavior
          html.style.scrollBehavior = 'auto'
          document.getElementById(id)?.scrollIntoView()
          html.style.scrollBehavior = prev
        }
        history.replaceState(null, '', `#${id}`)
        window.setTimeout(() => {
          setPhase('opening')
          window.setTimeout(() => {
            setPhase('idle')
            busy = false
            // The jump itself changes the active section; don't replay a pass for it.
            quietUntil = Date.now() + 700
          }, t.open)
        }, t.hold)
      }, t.close)
    }
    listeners.add(go)
    return () => {
      listeners.delete(go)
    }
  }, [])

  if (phase === 'idle') return null
  const idx = SECTIONS.findIndex((s) => s.id === target)
  const label = idx >= 0 ? t(SECTIONS[idx].label) : ''
  const closed = phase === 'hold' || phase === 'closing'

  return (
    <div className={'curtain pointer-events-none fixed inset-0 z-[100] ' + phase + ' ' + mode} aria-hidden="true">
      <div className="curtain-door top" />
      <div className="curtain-door bottom" />
      <div className={'curtain-hud ' + (closed ? 'on' : '')}>
        <div className="label !text-accent">{t(mode === 'jump' ? 'Deploying to' : 'Entering sector')}</div>
        <div className="op-stencil mt-1 text-3xl text-text md:text-5xl">
          0{idx + 1} · {label}
        </div>
        <div className="curtain-bar mt-4">
          <span />
        </div>
      </div>
    </div>
  )
}
