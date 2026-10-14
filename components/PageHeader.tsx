import Reveal from "./Reveal";

export default function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="mx-auto max-w-5xl px-6 pb-8 pt-40">
      <Reveal><p className="text-sm text-muted">{eyebrow}</p></Reveal>
      <Reveal delay={0.08}>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1] tracking-tight">{title}</h1>
      </Reveal>
      {children && <Reveal delay={0.16}><p className="mt-6 max-w-xl text-lg text-muted">{children}</p></Reveal>}
    </header>
  );
}
