import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { profile, experience, skills, availability } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Background, experience and toolbox of Mahmud Al Muhaimin, AI engineer and full-stack developer in Dhaka.",
  alternates: { canonical: "/about" },
  openGraph: { type: "website", url: "/about" },
};

export default function About() {
  return (
    <main id="main">
      <PageHeader eyebrow="About" title={profile.role}>{profile.intro} I am based in {profile.location}.</PageHeader>
      <Section title="Experience">
        <ul className="space-y-10">
          {experience.map((e, i) => (
            <Reveal as="li" key={e.role} delay={i * 0.06} className="grid gap-2 sm:grid-cols-[1fr_2fr] sm:gap-10">
              <p className="text-sm text-muted">{e.when}</p>
              <div><h3 className="font-medium">{e.role}, {e.org}</h3><p className="mt-1 text-muted">{e.body}</p></div>
            </Reveal>
          ))}
        </ul>
      </Section>
      <Section title="Toolbox">
        <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-[8rem_1fr]">
          {Object.entries(skills).map(([k, v]) => (<div key={k} className="contents"><dt className="font-medium">{k}</dt><dd className="text-muted">{v}</dd></div>))}
        </dl>
      </Section>
      <Section title="Let's talk">
        <p className="max-w-xl text-muted">{availability.status}. {availability.detail}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/contact" className="rounded-full bg-ink px-5 py-2.5 font-medium text-bg">Get in touch</Link>
          <Link href="/my-works" className="py-2.5 underline underline-offset-4">See my work</Link>
        </div>
      </Section>
    </main>
  );
}
