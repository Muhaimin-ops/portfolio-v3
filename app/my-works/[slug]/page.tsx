import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { caseStudies, projects } from "@/lib/data";
import { personId, siteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return {};
  const project = projects.find((item) => item.name === study.projectName);
  return {
    title: `${study.projectName} case study`,
    description: study.context,
    alternates: { canonical: `/my-works/${study.slug}` },
    openGraph: { type: "article", url: `/my-works/${study.slug}` },
    keywords: project?.stack,
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();
  const project = projects.find((item) => item.name === study.projectName);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${siteUrl}/my-works/${study.slug}#project`,
    name: study.projectName,
    description: study.context,
    keywords: project.stack,
    url: `${siteUrl}/my-works/${study.slug}`,
    author: { "@id": personId },
    creator: { "@id": personId },
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHeader eyebrow={project.tag} title={study.projectName}>{study.context}</PageHeader>
      <Section title="Approach">
        <div className="space-y-8">
          {study.approach.map((part) => (
            <section key={part.heading}>
              <h2 className="font-display text-xl font-medium">{part.heading}</h2>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted">{part.body}</p>
            </section>
          ))}
        </div>
      </Section>
      <Section title="Outcome">
        <p className="max-w-3xl text-lg leading-relaxed text-muted">{study.outcome}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology used">
          {project.stack.map((technology) => (
            <li key={technology} className="rounded-full border border-line px-3 py-1 text-sm text-muted">{technology}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {project.href !== "#" && <a href={project.href} className="underline underline-offset-4">Source code on GitHub ↗</a>}
          <Link href="/contact" className="underline underline-offset-4">Contact about a similar project</Link>
          <Link href="/my-works" className="underline underline-offset-4">All projects</Link>
        </div>
      </Section>
    </main>
  );
}
