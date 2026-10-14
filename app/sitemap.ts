import type { MetadataRoute } from "next";
import { articles, caseStudies, navLinks } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...navLinks.map((link) => ({ url: `${siteUrl}${link.href === "/" ? "" : link.href}` })),
    ...["/for-employers", "/ai-development", "/ai-agent-development"].map((path) => ({ url: `${siteUrl}${path}` })),
    ...caseStudies.map((study) => ({ url: `${siteUrl}/my-works/${study.slug}` })),
    ...articles.map((article) => ({ url: `${siteUrl}/articles/${article.slug}`, lastModified: new Date(article.date) })),
  ];
}
