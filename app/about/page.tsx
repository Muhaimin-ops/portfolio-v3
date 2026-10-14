import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { profile, experience, skills, certifications, availability } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Mahmud Al Muhaimin | AI Engineer in Bangladesh",
  description: "Background, freelance and software engineering experience, technical skills and certifications of AI engineer Mahmud Al Muhaimin in Dhaka, Bangladesh.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: "About Mahmud Al Muhaimin | AI Engineer in Bangladesh",
    description: "Experience, skills, education and certifications of Mahmud Al Muhaimin.",
  },
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
      <Section title="Certifications">
        <ul className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
          {certifications.map((item) => (
            <li key={item.issuer} className="border-t border-line pt-4">
              <h2 className="font-display text-lg font-medium">{item.issuer}</h2>
              <p className="mt-2 text-muted">{item.areas}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="MCP developer profile">
        <p className="max-w-2xl text-muted">Explore my public developer profile on MCPize for its current MCP-related activity.</p>
        <a href="https://mcpize.com/developers/m-Muhaimin" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block underline underline-offset-4">View my MCPize developer profile ↗</a>
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
