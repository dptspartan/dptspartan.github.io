import { useEffect } from 'react'
import { deploy, isBusy, setScroll, topOf } from './components/Curtain'

/**
 * Section gate: scrolling works normally inside a section, but the page stops at the section's
 * edge. One more deliberate scroll past that edge plays the curtain transition and lands on the
 * next section's top (or the previous section's end when going up).
 *
 * Wheel, trackpad and keys are scrolled by this code, never by the browser, so the page can't
 * overshoot an edge and get pulled back (that was the "bounce"). Touch keeps native scrolling
 * and momentum, with the edges held by a scroll listener.
 */

const PUSH = 50 // how far you must push past an edge to move on
const QUIET = 220 // ms without wheel input that ends a gesture

type Range = { id: string; top: number; end: number }

/** Is there an inner scroll box under the pointer that can still scroll this way? */
function innerCanScroll(from: EventTarget | null, dy: number) {
  let el = from instanceof Element ? from : null
  while (el && el !== document.body && el !== document.documentElement) {
    const oy = getComputedStyle(el).overflowY
    if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 1) {
      if (dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true
      if (dy < 0 && el.scrollTop > 0) return true
    }
    el = el.parentElement
  }
  return false
}

export function useSectionGate(ids: readonly string[]) {
  useEffect(() => {
    let push = 0
    let moved = false // this gesture already scrolled the page, so an edge it reaches is a stop
    let swallow = false // ignore the rest of this gesture (e.g. trackpad inertia)
    let lastWheel = 0
    let lastAbs = 0
    let target = 0
    let raf = 0
    let touchY = 0
    let holdIdx = -1 // touch only: the section the swipe began in; its edges hold

    const ranges = (): Range[] => {
      const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
      const docEnd = document.documentElement.scrollHeight
      return els.map((el, i) => ({ id: el.id, top: topOf(el), end: els[i + 1] ? topOf(els[i + 1]) : docEnd }))
    }
    const idxAt = (r: Range[], y: number) => {
      const probe = y + window.innerHeight / 2
      const i = r.findIndex((x) => probe >= x.top && probe < x.end)
      return i < 0 ? r.length - 1 : i
    }
    const endOf = (s: Range) => Math.max(s.top, s.end - window.innerHeight)
    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight

    // Our own scrolling: instant for trackpads (they already send smooth, small steps),
    // eased for mouse wheels and keys.
    const stopAnim = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const frame = () => {
      const y = window.scrollY
      const d = target - y
      if (Math.abs(d) < 1) {
        setScroll(target)
        raf = 0
        return
      }
      setScroll(y + Math.sign(d) * Math.max(1, Math.abs(d) * 0.2))
      raf = requestAnimationFrame(frame)
    }
    const moveTo = (y: number, smooth: boolean) => {
      target = y
      if (!smooth) {
        stopAnim()
        setScroll(y)
      } else if (!raf) raf = requestAnimationFrame(frame)
    }
    const base = () => (raf ? target : window.scrollY)

    /** Move by `delta` px, stopping at section edges and transitioning on a fresh push. */
    const step = (delta: number, smooth: boolean) => {
      const r = ranges()
      if (!r.length || !delta) return
      const y = base()
      const i = idxAt(r, y)
      const s = r[i]
      const last = i === r.length - 1

      if (delta > 0) {
        const stop = last ? maxScroll() : endOf(s)
        if (y < stop - 1) {
          const to = Math.min(y + delta, stop)
          moveTo(to, smooth)
          moved = true
          push = 0
          if (to >= stop) swallow = true // stop here; the rest of this flick is ignored
          return
        }
        if (last) return
        if (moved) {
          swallow = true
          return
        }
        push += delta
        if (push >= PUSH) {
          push = 0
          swallow = true
          stopAnim()
          deploy(r[i + 1].id)
        }
        return
      }

      if (y > s.top + 1) {
        const to = Math.max(y + delta, s.top)
        moveTo(to, smooth)
        moved = true
        push = 0
        if (to <= s.top && i > 0) swallow = true
        return
      }
      if (i === 0) return
      if (moved) {
        swallow = true
        return
      }
      push -= delta
      if (push >= PUSH) {
        push = 0
        swallow = true
        stopAnim()
        const prev = r[i - 1]
        deploy(prev.id, endOf(prev))
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return // pinch zoom
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return // sideways swipes (e.g. back gesture)
      const px = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY
      if (innerCanScroll(e.target, px)) return
      e.preventDefault()
      holdIdx = -1
      if (isBusy()) {
        lastWheel = performance.now()
        lastAbs = Math.abs(px)
        return
      }

      const now = performance.now()
      const abs = Math.abs(px)
      // A new gesture: a pause, or (trackpad) a fresh swipe while old inertia is still fading out.
      const fresh = now - lastWheel > QUIET || (swallow && abs > 10 && abs > lastAbs * 1.6)
      lastWheel = now
      lastAbs = abs
      if (fresh) {
        swallow = false
        moved = false
        push = 0
      }
      if (swallow) return

      const mouse = e.deltaMode !== 0 || (abs >= 40 && Number.isInteger(px))
      step(px, mouse)
    }

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.metaKey || e.ctrlKey || e.altKey || /INPUT|TEXTAREA|SELECT|BUTTON/.test(t.tagName) || t.isContentEditable) return
      const page = window.innerHeight * 0.85
      const map: Record<string, number> = {
        ArrowDown: 80,
        ArrowUp: -80,
        PageDown: page,
        PageUp: -page,
        ' ': e.shiftKey ? -page : page,
      }
      const d = map[e.key]
      if (d === undefined) return
      e.preventDefault()
      if (isBusy()) return
      holdIdx = -1
      moved = false // every key press is its own deliberate move
      push = PUSH
      step(d, true)
      push = 0
    }

    const onTouchStart = (e: TouchEvent) => {
      stopAnim()
      touchY = e.touches[0].clientY
      swallow = false
      moved = false
      push = 0
      holdIdx = idxAt(ranges(), window.scrollY)
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY
      const d = touchY - y
      touchY = y
      if (innerCanScroll(e.target, d)) return
      if (swallow || isBusy()) {
        if (e.cancelable) e.preventDefault()
        return
      }
      const r = ranges()
      const i = idxAt(r, window.scrollY)
      const s = r[i]
      const atEnd = d > 0 && i < r.length - 1 && window.scrollY >= endOf(s) - 1
      const atTop = d < 0 && i > 0 && window.scrollY <= s.top + 1
      if (!atEnd && !atTop) {
        if (Math.abs(d) > 0) moved = true
        return // native scrolling; onScroll holds the edge
      }
      if (e.cancelable) e.preventDefault()
      if (moved) return
      push += Math.abs(d)
      if (push >= PUSH) {
        push = 0
        swallow = true
        holdIdx = -1
        if (d > 0) deploy(r[i + 1].id)
        else deploy(r[i - 1].id, endOf(r[i - 1]))
      }
    }
    // Touch momentum can't be cancelled, so hold the edges of the section the swipe began in.
    const onScroll = () => {
      if (isBusy()) holdIdx = -1 // a transition moved us on purpose
      if (holdIdx < 0) return
      const r = ranges()
      const s = r[holdIdx]
      if (!s) return
      const y = window.scrollY
      if (holdIdx < r.length - 1 && y > endOf(s) + 2) setScroll(endOf(s))
      else if (holdIdx > 0 && y < s.top - 2) setScroll(s.top)
    }
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') holdIdx = -1 // dragging the scrollbar moves freely
      stopAnim()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      stopAnim()
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids])
}
