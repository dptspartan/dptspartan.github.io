import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import * as data from './data/profile'
import ar from './locales/ar.json'
import de from './locales/de.json'
import tr from './locales/tr.json'
import ur from './locales/ur.json'

/**
 * Localisation. English text in the code and in data/profile.ts is the key; each locale file
 * maps that English text to its translation. Anything without a translation (names, tech
 * terms, numbers) shows as-is, so adding content never breaks a language.
 */

export const LANGS = [
  { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  { code: 'de', label: 'Deutsch', short: 'DE', dir: 'ltr' },
  { code: 'tr', label: 'Türkçe', short: 'TR', dir: 'ltr' },
  { code: 'ar', label: 'العربية', short: 'AR', dir: 'rtl' },
  { code: 'ur', label: 'اردو', short: 'UR', dir: 'rtl' },
] as const

export type Lang = (typeof LANGS)[number]['code']

const DICTS: Record<Lang, Record<string, string>> = { en: {}, de, tr, ar, ur }
const KEY = 'lang'
const isLang = (v: unknown): v is Lang => LANGS.some((l) => l.code === v)

function initialLang(): Lang {
  const q = new URLSearchParams(window.location.search).get('lang')
  if (isLang(q)) return q
  try {
    const s = sessionStorage.getItem(KEY)
    if (isLang(s)) return s
  } catch {
    /* storage blocked */
  }
  const nav = (navigator.language || 'en').slice(0, 2)
  return isLang(nav) ? nav : 'en'
}

type Translate = (s: string) => string

/** Translate every string leaf of a value (used for the profile data). */
function deep<T>(v: T, t: Translate): T {
  if (typeof v === 'string') return t(v) as T
  if (Array.isArray(v)) return v.map((x) => deep(x, t)) as T
  if (v && typeof v === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, x] of Object.entries(v)) out[k] = deep(x, t)
    return out as T
  }
  return v
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Translate; content: typeof data }
const LangContext = createContext<Ctx | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    const meta = LANGS.find((l) => l.code === lang)!
    document.documentElement.lang = lang
    document.documentElement.dir = meta.dir
    try {
      sessionStorage.setItem(KEY, lang)
    } catch {
      /* storage blocked */
    }
  }, [lang])

  const t = useCallback<Translate>((s) => DICTS[lang][s] ?? s, [lang])
  const content = useMemo(() => deep(data, t), [t])
  const value = useMemo(() => ({ lang, setLang, t, content }), [lang, t, content])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const c = useContext(LangContext)
  if (!c) throw new Error('useLang outside LangProvider')
  return c
}

export const useT = () => useLang().t
export const useContent = () => useLang().content
