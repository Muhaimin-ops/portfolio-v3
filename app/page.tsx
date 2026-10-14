import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import Offers from "@/components/Offers";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import SpotlightCard from "@/components/SpotlightCard";
import { caseStudies, projects, skills, offers, stats, availability, articles, readingMinutes, slugify } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/" },
};

const money = (c: number, m: string) => `$${(c / 100).toLocaleString("en-US")}${m === "subscription" ? "/mo" : ""}`;
const arrow = <span aria-hidden className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>;

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <div className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <p className="mb-8 flex items-center gap-3 text-sm">
            <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-medium">{availability.status}</span>
            <span className="text-muted">{availability.detail}</span>
          </p>
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-muted">{s.label}</dt>
                <dd className="font-display text-4xl font-medium tracking-tight">{s.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
      <Section title="How can I help?">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-medium">Hiring an engineer?</h3>
            <p className="mt-3 max-w-lg text-muted">Review my experience, technical focus and selected work for AI engineering and full-stack roles.</p>
            <Link href="/for-employers" className="mt-5 inline-block underline underline-offset-4">For employers</Link>
          </div>
          <div>
            <h3 className="font-display text-2xl font-medium">Building an AI product?</h3>
            <p className="mt-3 max-w-lg text-muted">See the kinds of LLM and agent work I take on, how a project starts and how to get in touch.</p>
            <Link href="/ai-development" className="mt-5 inline-block underline underline-offset-4">AI product development</Link>
          </div>
        </div>
      </Section>
      <Marquee items={Object.values(skills).flatMap((v) => v.split(", "))} />
      <Section title="Selected work">
        <div className="grid gap-6 sm:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <SpotlightCard className="h-full">
                <Link href={caseStudies.some((study) => study.projectName === p.name) ? `/my-works/${slugify(p.name)}` : "/my-works"} className="group flex h-full flex-col p-6">
                  <p className="text-sm text-muted">{p.tag}</p>
                  <h3 className="mt-2 font-display text-xl font-medium">{p.name}</h3>
                  <p className="mt-3 line-clamp-4 text-muted">{p.body}</p>
                  <span className="mt-6 text-sm">Read more{arrow}</span>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
        <Link href="/my-works" className="group mt-8 inline-block underline underline-offset-4">All work{arrow}</Link>
      </Section>
      <Section title="Latest writing">
        <ul className="divide-y divide-line border-y border-line">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link href={`/articles/${a.slug}`} className="group grid gap-2 py-6 transition-colors hover:text-accent sm:grid-cols-[1fr_2fr] sm:gap-10">
                <p className="text-sm text-muted">{a.date} · {readingMinutes(a)} min read</p>
                <div><h3 className="font-display text-lg font-medium">{a.title}</h3><p className="mt-1 text-muted transition-colors group-hover:text-ink">{a.summary}</p></div>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/articles" className="group mt-8 inline-block underline underline-offset-4">All articles{arrow}</Link>
      </Section>
      <Section id="work-with-me" title="Work with me">
        <Offers offers={offers.map((o) => ({ slug: o.slug, name: o.name, blurb: o.blurb, price: money(o.amount, o.mode) }))} />
        <p className="mt-6 text-sm text-muted">Something custom? I send invoices for scoped work too. <Link href="/contact" className="underline underline-offset-4">Tell me about it</Link> and we will agree the details first.</p>
      </Section>
    </main>
  );
}
