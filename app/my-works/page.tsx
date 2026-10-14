import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WorksGrid from "@/components/WorksGrid";
import { projects } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI systems, agent backends, machine learning and full-stack products I have built.",
  alternates: { canonical: "/my-works" },
  openGraph: { type: "website", url: "/my-works" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projects by Mahmud Al Muhaimin",
  url: `${siteUrl}/my-works`,
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.name,
      description: project.body,
      keywords: project.stack,
      ...(project.href.startsWith("https://") ? { url: project.href } : {}),
    },
  })),
};

export default function MyWorks() {
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHeader eyebrow="My work" title="Things I have built">AI agents, language models, computer vision and the products around them. Filter by area, or open any project on GitHub.</PageHeader>
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-8"><WorksGrid projects={projects} /></section>
    </main>
  );
}
