// Endless strip of words. Pauses on hover; the global reduced-motion rule stops it entirely.
export default function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => <li key={t} className="whitespace-nowrap font-display text-2xl text-muted">{t}<span aria-hidden className="ml-10 text-accent">✦</span></li>)}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden border-b border-line py-6" aria-label="Tools and topics">
      <div className="marquee-track flex w-max">{row(false)}{row(true)}</div>
    </div>
  );
}
