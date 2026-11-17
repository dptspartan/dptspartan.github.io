import { useT } from '../i18n'

/** HUD band between sections: a line that draws itself in, with sector labels. */
export default function Divider({ n, label }: { n: string; label: string }) {
  const t = useT()
  return (
    <div className="reveal divider mx-auto flex max-w-6xl items-center gap-4 px-4" data-fx="line" aria-hidden="true">
      <span className="font-mono text-[10px] tracking-[0.3em] text-accent">{t('Sector')} {n}</span>
      <span className="divider-line relative h-px flex-1 bg-line-strong">
        <span className="divider-scan" />
      </span>
      <span className="label !text-[10px]">{t(label)}</span>
    </div>
  )
}
