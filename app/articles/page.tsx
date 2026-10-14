import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { articles, readingMinutes } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Articles",
  description: "Technical notes on designing AI agent backends, shipping LLM features and building full-stack products.",
  alternates: { canonical: "/articles" },
  openGraph: { type: "website", url: "/articles", title: "Articles", description: "Technical notes on designing AI agent backends, shipping LLM features and building full-stack products." },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Articles by Mahmud Al Muhaimin",
  description: "Technical notes on designing AI agent backends, shipping LLM features and building full-stack products.",
  url: `${siteUrl}/articles`,
  blogPost: articles.map((article) => ({
    "@type": "BlogPosting",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    url: `${siteUrl}/articles/${article.slug}`,
  })),
};

export default function Articles() {
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHeader eyebrow="Articles" title="Notes from the build">Technical notes on AI agents, LLM features and full-stack product work.</PageHeader>
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-8">
        <ul className="divide-y divide-line border-y border-line">
          {articles.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 0.06}>
                <Link href={`/articles/${a.slug}`} className="group grid gap-2 py-8 transition-colors hover:text-accent sm:grid-cols-[1fr_2fr] sm:gap-10">
                  <p className="text-sm text-muted">{a.date} · {readingMinutes(a)} min read</p>
                  <div>
                    <h2 className="font-display text-xl font-medium">{a.title}</h2>
                    <p className="mt-2 text-muted transition-colors group-hover:text-ink">{a.summary}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">{a.tags.map((t) => <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">{t}</li>)}</ul>
                  </div>
                </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </main>
  );
}
