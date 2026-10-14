import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { articles, readingMinutes } from "@/lib/data";
import { personId, siteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return articles.map((a) => ({ slug: a.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.summary,
    alternates: { canonical: `/articles/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.summary,
      url: `${siteUrl}/articles/${a.slug}`,
      publishedTime: a.date,
      tags: a.tags,
      images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: `${a.title} - Mahmud Al Muhaimin` }],
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: a.summary,
      images: [{ url: `${siteUrl}/opengraph-image`, alt: `${a.title} - Mahmud Al Muhaimin` }],
    },
  };
}

export default async function Article({ params }: Props) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteUrl}/articles/${a.slug}#article`,
    headline: a.title,
    description: a.summary,
    datePublished: a.date,
    dateModified: a.date,
    inLanguage: "en",
    keywords: a.tags,
    image: `${siteUrl}/opengraph-image`,
    mainEntityOfPage: `${siteUrl}/articles/${a.slug}`,
    author: { "@id": personId },
    publisher: { "@id": personId },
  };
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHeader eyebrow={`${a.date} · ${readingMinutes(a)} min read`} title={a.title}>{a.summary}</PageHeader>
      <article className="mx-auto max-w-2xl px-6 pb-24 pt-8">
        {a.body.map((b, i) => (
          <div key={i} className="mt-8">
            {b.h && <h2 className="font-display text-2xl font-medium tracking-tight">{b.h}</h2>}
            <p className={`${b.h ? "mt-3" : ""} text-lg leading-relaxed text-muted`}>{b.p}</p>
          </div>
        ))}
        <p className="mt-14"><Link href="/articles" className="underline underline-offset-4">← All articles</Link></p>
      </article>
    </main>
  );
}
