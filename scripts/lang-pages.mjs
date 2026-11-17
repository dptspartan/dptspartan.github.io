// After `vite build`: one index.html per language (/de/, /tr/, /ar/, /ur/), so each language
// has its own URL on GitHub Pages. English stays at /.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const LANGS = { de: 'ltr', tr: 'ltr', ar: 'rtl', ur: 'rtl' }
const html = readFileSync('dist/index.html', 'utf8')
for (const [code, dir] of Object.entries(LANGS)) {
  mkdirSync(`dist/${code}`, { recursive: true })
  const page = html
    .replace('<html lang="en">', `<html lang="${code}" dir="${dir}">`)
    .replace('</title>', `</title>\n    <link rel="canonical" href="https://dptspartan.github.io/${code}/" />`)
  writeFileSync(`dist/${code}/index.html`, page)
}
console.log('language pages:', Object.keys(LANGS).join(', '))
