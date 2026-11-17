import { useEffect, useState } from 'react'
import { useT } from '../i18n'
import { SECTIONS } from './Nav'

/**
 * Game-style "deploy" transition: blast doors close, the page jumps to the target section,
 * then the doors open again. Call deploy(id) from anywhere.
 */

type Phase = 'idle' | 'closing' | 'hold' | 'opening'
const listeners = new Set<(id: string, y: number) => void>()
let busy = false
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isBusy = () => busy

/** Page offset of a section's top edge. */
export const topOf = (el: Element) => el.getBoundingClientRect().top + window.scrollY

/** Jump instantly, ignoring the page's smooth-scroll setting. */
export const setScroll = (y: number) => window.scrollTo({ top: y, behavior: 'instant' })

/**
 * Jump to a section behind the blast doors. `y` is where to land (defaults to the section's top),
 * so scrolling back up can land at the end of the previous section.
 */
export function deploy(id: string, y?: number) {
  const el = document.getElementById(id)
  if (!el) return
  const to = y ?? topOf(el)
  if (busy) return
  if (listeners.size === 0 || reduced()) {
    setScroll(to)
    history.replaceState(null, '', `#${id}`)
    return
  }
  listeners.forEach((l) => l(id, to))
}

const CLOSE = 340
const HOLD = 220
const OPEN = 440

export default function Curtain() {
  const t = useT()
  const [phase, setPhase] = useState<Phase>('idle')
  const [target, setTarget] = useState('')

  useEffect(() => {
    const go = (id: string, y: number) => {
      busy = true
      setTarget(id)
      setPhase('closing')
      window.setTimeout(() => {
        setPhase('hold')
        setScroll(y)
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
    <div className={'curtain pointer-events-none fixed inset-0 z-[100] ' + phase} aria-hidden="true">
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
