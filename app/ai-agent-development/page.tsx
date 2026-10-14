import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { caseStudies, profile, projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "AI Agent Development and Backend Engineering",
  description: "Design and build AI agent backends, task workflows and APIs, grounded in hands-on work with a multi-agent task mesh.",
  alternates: { canonical: "/ai-agent-development" },
  openGraph: {
    type: "website",
    url: "/ai-agent-development",
    title: "AI Agent Development and Backend Engineering",
    description: "Design and build AI agent backends, task workflows and APIs, grounded in hands-on work with a multi-agent task mesh.",
  },
};

const focusAreas = [
  {
    title: "Agent task lifecycles",
    body: "Model how work is published, claimed, submitted, verified and settled so each transition has a clear state and API boundary.",
  },
  {
    title: "Backend APIs and persistence",
    body: "Connect agent workflows to practical REST APIs and data stores, with inspectable records for tasks and outcomes.",
  },
  {
    title: "Evaluation and failure paths",
    body: "Plan for retries, incomplete work and verification before describing an agent workflow as reliable.",
  },
  {
    title: "Product integration",
    body: "Build the application surfaces around the agent, including the user-facing workflows needed to configure and review work.",
  },
];

export default function AiAgentDevelopment() {
  const mesh = caseStudies.find((study) => study.slug === "suprbuild-mesh");
  const project = projects.find((item) => item.name === "SuprBuild Mesh");

  return (
    <main id="main">
      <PageHeader eyebrow="AI agent development" title="Build agent systems around real work">
        {profile.name} designs agent backends, task workflows and APIs, informed by building a multi-agent task mesh.
      </PageHeader>
      <Section title="What an agent backend needs">
        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {focusAreas.map((area) => (
            <section key={area.title} className="border-t border-line pt-4">
              <h2 className="font-display text-xl font-medium">{area.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{area.body}</p>
            </section>
          ))}
        </div>
      </Section>
      <Section title="Built and measured">
        <p className="max-w-3xl leading-relaxed text-muted">
          SuprBuild Mesh explores agent-to-agent task coordination with Node.js, Express and SQLite. Its implementation includes more than 20 REST endpoints and was tested with 10+ concurrent agents. Local load tests measured about 120 ms median response time; this is a local result, not a production service guarantee.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {mesh && <Link href={`/my-works/${mesh.slug}`} className="underline underline-offset-4">Read the SuprBuild Mesh case study</Link>}
          {project && <a href={project.href} className="underline underline-offset-4" target="_blank" rel="noreferrer">Review the source on GitHub ↗</a>}
          <Link href="/articles/designing-a-task-mesh-for-ai-agents" className="underline underline-offset-4">Read the task-mesh design notes</Link>
        </div>
      </Section>
      <Section title="Scope a project">
        <p className="max-w-2xl text-muted">Share the agent task, users, existing systems and constraints. We can define a small, testable first milestone before implementation.</p>
        <Link href="/contact" className="mt-5 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg">Contact</Link>
      </Section>
    </main>
  );
}
