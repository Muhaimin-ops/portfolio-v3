import Reveal from "./Reveal";

export default function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-24">
      <Reveal><h2 className="font-display text-3xl font-medium tracking-tight">{title}</h2></Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}
