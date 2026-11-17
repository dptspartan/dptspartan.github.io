import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useSeen } from '../hooks'
import { Icon } from './ui'

type Repo = {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  pushed_at: string
  fork: boolean
}

const CACHE = 'gh-repos-v1'
// Hide repos that aren't interesting to visitors (this site itself, etc.).
const HIDE = new Set([`${profile.handle}.github.io`])

function ago(iso: string) {
  const d = (Date.now() - new Date(iso).getTime()) / 86400000
  if (d < 1) return 'today'
  if (d < 30) return `${Math.floor(d)}d ago`
  if (d < 365) return `${Math.floor(d / 30)}mo ago`
  return `${Math.floor(d / 365)}y ago`
}

/** Live list of public repos, fetched in the visitor's browser and cached for the session. */
export default function GitHubFeed() {
  const [ref, seen] = useSeen<HTMLDivElement>()
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!seen) return
    try {
      const c = sessionStorage.getItem(CACHE)
      if (c) return setRepos(JSON.parse(c))
    } catch {
      /* ignore */
    }
    const ctrl = new AbortController()
    const timer = window.setTimeout(() => ctrl.abort(), 8000)
    fetch(`https://api.github.com/users/${profile.handle}/repos?per_page=100&sort=pushed`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((all: Repo[]) => {
        const list = all
          .filter((r) => !r.fork && !HIDE.has(r.name))
          .sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.pushed_at) - +new Date(a.pushed_at))
          .slice(0, 6)
        setRepos(list)
        try {
          sessionStorage.setItem(CACHE, JSON.stringify(list))
        } catch {
          /* ignore */
        }
      })
      .catch(() => setFailed(true))
      .finally(() => clearTimeout(timer))
    return () => {
      clearTimeout(timer)
      ctrl.abort()
    }
  }, [seen])

  return (
    <div ref={ref} className="reveal mt-16">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="label flex items-center gap-2">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" /> Live feed · github.com/{profile.handle}
          </div>
          <h3 className="mt-1 text-2xl font-semibold">Public repositories</h3>
        </div>
        <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent">
          All repos <Icon name="external" className="h-3.5 w-3.5" />
        </a>
      </div>

      {failed || (repos && repos.length === 0) ? (
        <a href={profile.github} target="_blank" rel="noreferrer" className="panel flex items-center gap-3 p-5 text-sm text-muted">
          <Icon name="github" className="h-5 w-5" /> Couldn’t load repositories right now. See them on GitHub.
        </a>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(repos ?? Array.from({ length: 3 }, () => null)).map((r, i) =>
            r ? (
              <a
                key={r.name}
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                className="panel flex flex-col p-4 transition hover:!border-accent"
              >
                <div className="flex items-center gap-2 font-mono text-sm font-medium">
                  <Icon name="github" className="h-3.5 w-3.5 text-muted" />
                  <span className="truncate">{r.name}</span>
                </div>
                <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted">{r.description || 'No description'}</p>
                <div className="mt-3 flex items-center gap-4 font-mono text-[11px] text-muted">
                  {r.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-accent-2" />
                      {r.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Icon name="star" className="h-3 w-3" />
                    {r.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="fork" className="h-3 w-3" />
                    {r.forks_count}
                  </span>
                  <span className="ml-auto">{ago(r.pushed_at)}</span>
                </div>
              </a>
            ) : (
              <div key={i} className="panel h-[118px] animate-pulse" />
            ),
          )}
        </div>
      )}
    </div>
  )
}
