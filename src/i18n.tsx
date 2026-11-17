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
const isLang = (v: unknown): v is Lang => LANGS.some((l) => l.code === v)

/**
 * The language lives in the URL: / is English, /de/, /tr/, /ar/ and /ur/ are the others.
 * Each has its own copy of index.html at build time, so links can be shared and indexed.
 */
export const pathFor = (l: Lang) => (l === 'en' ? '/' : `/${l}/`)

function langFromUrl(): Lang {
  const seg = window.location.pathname.split('/')[1]
  if (isLang(seg)) return seg
  const q = new URLSearchParams(window.location.search).get('lang') // old ?lang= links
  return isLang(q) ? q : 'en'
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
  const [lang, setLangState] = useState<Lang>(langFromUrl)

  // Switching language changes the URL (keeping the current section) without a reload.
  const setLang = useCallback((l: Lang) => {
    history.pushState(null, '', pathFor(l) + window.location.hash)
    setLangState(l)
  }, [])

  useEffect(() => {
    // Normalise old ?lang= links to the path form.
    if (new URLSearchParams(window.location.search).has('lang')) {
      history.replaceState(null, '', pathFor(lang) + window.location.hash)
    }
    const onPop = () => setLangState(langFromUrl())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const meta = LANGS.find((l) => l.code === lang)!
    document.documentElement.lang = lang
    document.documentElement.dir = meta.dir
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
