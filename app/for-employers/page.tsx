import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { availability, experience, profile, skills } from "@/lib/data";

export const metadata: Metadata = {
  title: "AI Engineer in Dhaka | Full-Stack and LLM Experience",
  description: "Hiring profile for Mahmud Al Muhaimin, an AI engineer and full-stack developer in Dhaka, Bangladesh, with experience across LLM systems, agent backends and web products.",
  alternates: { canonical: "/for-employers" },
  openGraph: {
    type: "website",
    url: "/for-employers",
    title: "AI Engineer in Dhaka | Full-Stack and LLM Experience",
    description: "Review technical focus, experience and selected project evidence for AI engineering and full-stack roles.",
  },
};

export default function ForEmployers() {
  return (
    <main id="main">
      <PageHeader eyebrow="For employers" title="AI engineering, end to end">
        {profile.name} is an AI engineer and full-stack developer based in {profile.location}. {availability.status}.
      </PageHeader>
      <Section title="Areas of focus">
        <dl className="grid gap-6 sm:grid-cols-2">
          {Object.entries(skills).map(([area, details]) => (
            <div key={area} className="border-t border-line pt-4">
              <dt className="font-display text-xl font-medium">{area}</dt>
              <dd className="mt-2 text-muted">{details}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section title="Experience">
        <ul className="space-y-8">
          {experience.map((item) => (
            <li key={`${item.role}-${item.org}`}>
              <h2 className="font-medium">{item.role}, {item.org}</h2>
              <p className="mt-1 text-sm text-muted">{item.when}</p>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Selected evidence">
        <p className="max-w-2xl leading-relaxed text-muted">See project details, implementation notes and the limits of the published performance figures in the case studies.</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link href="/my-works/suprbuild-mesh" className="underline underline-offset-4">SuprBuild Mesh case study</Link>
          <Link href="/my-works/route52" className="underline underline-offset-4">Route52 case study</Link>
          <Link href="/my-works" className="underline underline-offset-4">All projects</Link>
        </div>
      </Section>
      <Section title="Discuss a role">
        <p className="max-w-2xl text-muted">Share the role, team and hiring process. I will reply by email.</p>
        <Link href="/contact" className="mt-5 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg">Contact</Link>
      </Section>
    </main>
  );
}
