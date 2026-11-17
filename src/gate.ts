import { useEffect } from 'react'
import { deploy, isBusy, setScroll, topOf } from './components/Curtain'

/**
 * Section gate: scrolling works normally inside a section, but the page stops at the section's
 * edge. One more deliberate scroll past that edge plays the curtain transition and lands on the
 * next section's top (or the previous section's end when going up).
 */

const PUSH = 50 // how hard you must push past an edge to move on
const QUIET = 220 // ms of no wheel input that ends a gesture (trackpad inertia included)

type Range = { id: string; top: number; end: number }

export function useSectionGate(ids: readonly string[]) {
  useEffect(() => {
    let push = 0
    let moved = false // this gesture already scrolled the page, so an edge it reaches is a stop
    // After a stop or a transition, swallow the rest of the gesture (e.g. trackpad inertia)
    // so the next move needs a fresh scroll.
    let swallow = false
    let lastWheel = 0
    let touchY = 0
    let holdIdx = -1 // section the current gesture started in; its edges hold

    const ranges = (): Range[] => {
      const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
      const docEnd = document.documentElement.scrollHeight
      return els.map((el, i) => ({ id: el.id, top: topOf(el), end: els[i + 1] ? topOf(els[i + 1]) : docEnd }))
    }
    const currentIdx = (r: Range[]) => {
      const probe = window.scrollY + window.innerHeight / 2
      const i = r.findIndex((x) => probe >= x.top && probe < x.end)
      return i < 0 ? r.length - 1 : i
    }
    const endOf = (s: Range) => Math.max(s.top, s.end - window.innerHeight)

    /** Returns true when the input was handled here and the native scroll must be blocked. */
    const step = (delta: number): boolean => {
      if (isBusy()) return true
      if (!delta) return false
      const r = ranges()
      if (!r.length) return false
      const i = currentIdx(r)
      const s = r[i]
      const y = window.scrollY

      if (delta > 0) {
        if (i === r.length - 1) return false // last section scrolls freely
        const stop = endOf(s)
        if (y < stop - 2) {
          push = 0
          if (y + delta > stop) {
            setScroll(stop)
            swallow = true
            return true
          }
          moved = true
          return false
        }
        if (moved) {
          swallow = true
          return true
        }
        push += delta
        if (push >= PUSH) {
          push = 0
          swallow = true
          deploy(r[i + 1].id)
        }
        return true
      }

      if (i === 0 && y <= s.top + 2) return false
      if (y > s.top + 2) {
        push = 0
        if (y + delta < s.top) {
          setScroll(s.top)
          swallow = true
          return true
        }
        moved = true
        return false
      }
      if (moved) {
        swallow = true
        return true
      }
      push -= delta
      if (push >= PUSH) {
        push = 0
        swallow = true
        const prev = r[i - 1]
        deploy(prev.id, endOf(prev))
      }
      return true
    }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return // pinch zoom
      const now = performance.now()
      const gap = now - lastWheel
      lastWheel = now
      if (gap > QUIET) {
        swallow = false
        moved = false
        push = 0
        holdIdx = currentIdx(ranges())
      }
      if (swallow || isBusy()) {
        e.preventDefault()
        return
      }
      const px = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY
      if (step(px)) e.preventDefault()
    }

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.metaKey || e.ctrlKey || e.altKey || /INPUT|TEXTAREA|SELECT|BUTTON/.test(t.tagName) || t.isContentEditable) return
      const page = window.innerHeight * 0.85
      const map: Record<string, number> = {
        ArrowDown: 60,
        ArrowUp: -60,
        PageDown: page,
        PageUp: -page,
        ' ': e.shiftKey ? -page : page,
      }
      const d = map[e.key]
      if (d === undefined) return
      holdIdx = currentIdx(ranges())
      moved = false
      push = Math.max(push, PUSH) // a key press is always deliberate
      if (step(d)) e.preventDefault()
      push = 0
    }

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY
      swallow = false
      moved = false
      push = 0
      holdIdx = currentIdx(ranges())
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY
      const d = touchY - y
      touchY = y
      if (swallow || isBusy()) {
        if (e.cancelable) e.preventDefault()
        return
      }
      if (step(d) && e.cancelable) e.preventDefault()
    }
    // Smooth wheel scrolling and touch momentum can carry the page past an edge after the input
    // event was let through, so hold the edges of the section the gesture began in.
    const onScroll = () => {
      if (isBusy()) holdIdx = -1 // a transition moved us on purpose
      if (holdIdx < 0) return
      const r = ranges()
      const s = r[holdIdx]
      if (!s) return
      const y = window.scrollY
      if (holdIdx < r.length - 1 && y > endOf(s) + 2) {
        setScroll(endOf(s))
        swallow = true
      } else if (holdIdx > 0 && y < s.top - 2) {
        setScroll(s.top)
        swallow = true
      }
    }
    const onPointerDown = () => {
      holdIdx = -1 // dragging the scrollbar moves freely
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids])
}
