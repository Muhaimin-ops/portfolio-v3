import { articles, caseStudies, experience, profile, projects, skills } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

export function GET() {
  const content = [
    `# ${profile.name}`,
    "",
    `> ${profile.role} based in ${profile.location}. ${profile.intro}`,
    "",
    "## About",
    `- Profile: ${siteUrl}/about`,
    `- Projects: ${siteUrl}/my-works`,
    `- Articles: ${siteUrl}/articles`,
    `- Contact: ${siteUrl}/contact`,
    `- For employers: ${siteUrl}/for-employers`,
    `- AI product development: ${siteUrl}/ai-development`,
    "",
    "## Expertise",
    ...Object.entries(skills).map(([area, details]) => `- ${area}: ${details}`),
    "",
    "## Selected projects",
    ...projects.map((project) => `- ${project.href.startsWith("https://") ? `[${project.name}](${project.href})` : project.name} (${project.status}): ${project.body}`),
    "",
    "## Case studies",
    ...caseStudies.map((study) => `- [${study.projectName}](${siteUrl}/my-works/${study.slug}): ${study.context}`),
    "",
    "## Experience",
    ...experience.map((item) => `- ${item.role}, ${item.org} (${item.when}): ${item.body}`),
    "",
    "## Articles",
    ...articles.map((article) => `- [${article.title}](${siteUrl}/articles/${article.slug}): ${article.summary}`),
    "",
  ].join("\n");

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
