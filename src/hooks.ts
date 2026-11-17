import { useCallback, useEffect, useRef, useState } from 'react'

export type Theme = 'light' | 'dark'

/** Theme lives on <html data-theme> and in sessionStorage, so it lasts for the browser session. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  )
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#eef1f6' : '#07090f')
    try {
      sessionStorage.setItem('theme', theme)
    } catch {
      /* storage blocked: theme still applies for this page view */
    }
  }, [theme])
  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, toggle }
}

/** Adds `.in` to elements with `.reveal` as they scroll into view. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/** Which section is currently in view. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

/** True once the element has been seen at least once. */
export function useSeen<T extends Element>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true)
        io.disconnect()
      }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen] as const
}

/** Typewriter that cycles through phrases. */
export function useTypewriter(list: string[], speed = 55, hold = 1600) {
  const [text, setText] = useState('')
  // Callers often pass a fresh array each render; restart only when the words really change.
  const key = list.join('\u0000')
  useEffect(() => {
    const words = key.split('\u0000')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0])
      return
    }
    let w = 0
    let i = 0
    let deleting = false
    let timer: number
    const tick = () => {
      const word = words[w]
      i += deleting ? -1 : 1
      setText(word.slice(0, i))
      let delay = deleting ? speed / 2 : speed
      if (!deleting && i === word.length) {
        deleting = true
        delay = hold
      } else if (deleting && i === 0) {
        deleting = false
        w = (w + 1) % words.length
        delay = 300
      }
      timer = window.setTimeout(tick, delay)
    }
    timer = window.setTimeout(tick, 400)
    return () => clearTimeout(timer)
  }, [key, speed, hold])
  return text
}
