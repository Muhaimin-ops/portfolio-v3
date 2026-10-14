import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import SpotlightCard from "@/components/SpotlightCard";
import ContactForm from "@/components/ContactForm";
import { caseStudies, projects, skills, stats, availability, articles, experience, readingMinutes, slugify, profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "AI Engineer and Full-Stack Developer in Dhaka",
  description: "Mahmud Al Muhaimin builds AI agent backends, LLM products and full-stack applications. Explore selected projects, experience and technical writing.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "AI Engineer and Full-Stack Developer in Dhaka",
    description: "Explore AI agent backends, LLM products, full-stack projects and experience by Mahmud Al Muhaimin.",
  },
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
      <Section title="Experience">
        <ul className="space-y-8">
          {experience.map((item, i) => (
            <Reveal as="li" key={`${item.role}-${item.org}`} delay={i * 0.07} className="grid gap-2 border-b border-line pb-8 last:border-0 last:pb-0 sm:grid-cols-[minmax(10rem,0.7fr)_2fr] sm:gap-10">
              <p className="text-sm text-muted">{item.when}</p>
              <div>
                <h3 className="font-display text-lg font-medium">{item.role}</h3>
                <p className="mt-1 text-sm text-muted">{item.org}</p>
                <p className="mt-3 max-w-2xl text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <Link href="/about" className="group mt-7 inline-block text-sm underline underline-offset-4">More about my background{arrow}</Link>
      </Section>
      <Section title="Technical focus">
        <dl className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
          {Object.entries(skills).map(([area, tools]) => (
            <div key={area} className="border-t border-line pt-4">
              <dt className="font-display text-lg font-medium">{area}</dt>
              <dd className="mt-2 leading-relaxed text-muted">{tools}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section title="How can I help?">
        <div className="grid gap-4 md:grid-cols-3 md:auto-rows-fr">
          <article className="glass-panel glass-panel-dark relative isolate overflow-hidden rounded-2xl border border-white/15 bg-ink p-7 text-bg md:col-span-2 md:p-9">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_55%)]" />
            <h3 className="font-display text-2xl font-medium">AI agents and LLM products</h3>
            <p className="mt-3 max-w-xl leading-relaxed text-bg/75">From retrieval and model workflows to tool integrations, evaluation and production-ready interfaces.</p>
            <Link href="/ai-development" className="mt-7 inline-block rounded-full border border-white/30 px-4 py-2 text-sm font-medium transition hover:bg-white/10 active:scale-[0.98]">Explore AI development{arrow}</Link>
          </article>
          <article className="glass-panel relative isolate overflow-hidden rounded-2xl border border-line p-7">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(125,135,130,0.16),transparent_65%)]" />
            <h3 className="font-display text-2xl font-medium">Agent backends</h3>
            <p className="mt-3 leading-relaxed text-muted">Build task APIs, stateful workflows and integrations that keep agent actions observable and controlled.</p>
            <Link href="/ai-agent-development" className="mt-7 inline-block underline underline-offset-4">Agent backend development{arrow}</Link>
          </article>
          <article className="glass-panel glass-panel-tint relative isolate overflow-hidden rounded-2xl border border-line p-7">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.28),transparent_60%)]" />
            <h3 className="font-display text-2xl font-medium">Full-stack product work</h3>
            <p className="mt-3 leading-relaxed text-muted">Turn a product brief into a working web application, including the frontend, APIs and data flows.</p>
            <Link href="/my-works" className="mt-7 inline-block underline underline-offset-4">See selected work{arrow}</Link>
          </article>
          <article className="glass-panel relative isolate overflow-hidden rounded-2xl border border-line p-7 md:col-span-2">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(125,135,130,0.12),transparent_65%)]" />
            <h3 className="font-display text-2xl font-medium">Hiring for your team?</h3>
            <p className="mt-3 max-w-xl leading-relaxed text-muted">Review my experience, technical focus and selected work for AI engineering and full-stack roles.</p>
            <Link href="/for-employers" className="mt-7 inline-block underline underline-offset-4">View employer information{arrow}</Link>
          </article>
        </div>
      </Section>
      <Marquee items={Object.values(skills).flatMap((v) => v.split(", "))} />
      <Section title="Selected work">
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} className={i === 0 ? "sm:col-span-2" : ""}>
              <SpotlightCard className="h-full">
                <Link
                  href={caseStudies.some((study) => study.projectName === p.name) ? `/my-works/${slugify(p.name)}` : "/my-works"}
                  className={`group flex h-full flex-col p-6 ${i === 0 ? "sm:grid sm:grid-cols-[1fr_0.8fr] sm:items-center sm:gap-10 sm:p-8" : ""}`}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="text-sm text-muted">{p.tag}</p>
                      {p.status === "In progress" && <span className="text-xs text-muted">In progress</span>}
                    </div>
                    <h3 className="mt-2 font-display text-xl font-medium">{p.name}</h3>
                    <p className="mt-3 line-clamp-4 text-muted">{p.body}</p>
                    <span className="mt-6 inline-block text-sm">Read more{arrow}</span>
                  </div>
                  {i === 0 && (
                    <ul className="mt-7 space-y-3 border-t border-line pt-5 text-sm text-muted sm:mt-0 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                      {p.highlights.slice(0, 3).map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>
                  )}
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
        <div className="glass-panel grid gap-10 rounded-2xl border border-line p-6 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:p-9">
          <div>
            <h3 className="font-display text-2xl font-medium">Tell me what you are building</h3>
            <p className="mt-3 max-w-sm leading-relaxed text-muted">Share the goal, what you need help with and any timing or budget context. I will reply to discuss scope and next steps.</p>
            <p className="mt-6 text-sm text-muted">Prefer email? <a className="underline underline-offset-4" href={`mailto:${profile.email}`}>{profile.email}</a></p>
          </div>
          <ContactForm email={profile.email} projectBrief />
        </div>
      </Section>
    </main>
  );
}
