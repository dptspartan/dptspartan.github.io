import { useEffect, useState } from 'react'
import { useT } from '../i18n'
import { SECTIONS } from './Nav'

/**
 * Game-style "deploy" transition: blast doors close, the page jumps to the target section,
 * then the doors open again. Call deploy(id) from anywhere.
 */

type Phase = 'idle' | 'closing' | 'hold' | 'opening'
const listeners = new Set<(id: string) => void>()
let busy = false

export function deploy(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (busy || listeners.size === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.scrollIntoView({ behavior: 'auto' })
    history.replaceState(null, '', `#${id}`)
    return
  }
  listeners.forEach((l) => l(id))
}

const CLOSE = 380
const HOLD = 260
const OPEN = 480

export default function Curtain() {
  const t = useT()
  const [phase, setPhase] = useState<Phase>('idle')
  const [target, setTarget] = useState('')

  useEffect(() => {
    const go = (id: string) => {
      busy = true
      setTarget(id)
      setPhase('closing')
      window.setTimeout(() => {
        setPhase('hold')
        const html = document.documentElement
        const prev = html.style.scrollBehavior
        html.style.scrollBehavior = 'auto'
        document.getElementById(id)?.scrollIntoView()
        html.style.scrollBehavior = prev
        history.replaceState(null, '', `#${id}`)
        window.setTimeout(() => {
          setPhase('opening')
          window.setTimeout(() => {
            setPhase('idle')
            busy = false
          }, OPEN)
        }, HOLD)
      }, CLOSE)
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
    <div className={'curtain fixed inset-0 z-[100] ' + phase} aria-hidden="true">
      <div className="curtain-door top" />
      <div className="curtain-door bottom" />
      <div className={'curtain-hud ' + (closed ? 'on' : '')}>
        <div className="label !text-accent">{t('Deploying to')}</div>
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
