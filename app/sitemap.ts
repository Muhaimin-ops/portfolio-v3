import type { MetadataRoute } from "next";
import { articles, navLinks } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...navLinks.map((link) => ({ url: `${siteUrl}${link.href === "/" ? "" : link.href}` })),
    ...articles.map((article) => ({ url: `${siteUrl}/articles/${article.slug}`, lastModified: new Date(article.date) })),
  ];
}
