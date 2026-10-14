import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "LLM & RAG Development in Bangladesh",
  description: "Dhaka-based AI engineering for LLM features, RAG systems and AI products—from model integration and evaluation to a complete full-stack application.",
  alternates: { canonical: "/ai-development" },
  openGraph: {
    type: "website",
    url: "/ai-development",
    title: "LLM & RAG Development in Bangladesh",
    description: "Build LLM features and RAG systems with a Dhaka-based AI engineer, from model integration through the full-stack product.",
  },
};

const capabilities = [
  { heading: "LLM product features", body: "Integrate language models into an application with bounded inputs, clear fallback behavior and a user experience that explains what the system can do." },
  { heading: "Retrieval and semantic search", body: "Build around embeddings, retrieval and application data when a product needs answers grounded in its own information." },
  { heading: "Agent backends", body: "Design APIs and task flows for agent-oriented products, with explicit lifecycle states and observable outcomes." },
  { heading: "Full-stack delivery", body: "Connect the model-facing backend to a responsive product interface, from API and persistence to the screen." },
];

export default function AiDevelopment() {
  return (
    <main id="main">
      <PageHeader eyebrow="AI product development · Dhaka, Bangladesh" title="Build the product around the model">
        Dhaka-based AI engineering for LLM features, retrieval systems and agent backends, designed as parts of a working product rather than isolated demos.
      </PageHeader>
      <Section title="What I can help build">
        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {capabilities.map((capability) => (
            <section key={capability.heading} className="border-t border-line pt-4">
              <h2 className="font-display text-xl font-medium">{capability.heading}</h2>
              <p className="mt-2 leading-relaxed text-muted">{capability.body}</p>
            </section>
          ))}
        </div>
      </Section>
      <Section title="How I approach delivery">
        <p className="max-w-3xl leading-relaxed text-muted">Start by defining the user, the task and what a useful result looks like. Then choose the smallest suitable model and application design, test the failure paths, and measure behavior before making performance claims.</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link href="/ai-agent-development" className="underline underline-offset-4">AI agent backend development</Link>
          <Link href="/my-works/suprbuild-mesh" className="underline underline-offset-4">Read the agent-mesh case study</Link>
          <Link href="/articles/a-checklist-before-you-ship-an-llm-feature" className="underline underline-offset-4">LLM release checklist</Link>
        </div>
      </Section>
      <Section title="Bangla AI and product-specific language support">
        <p className="max-w-3xl leading-relaxed text-muted">
          AI products for Bangladesh may need more than a translated interface. Route52 is a Bangla-native assistant project with persistent conversations and agent-oriented workflows. Its case study shows how I approach language-aware product design alongside the underlying AI and application engineering.
        </p>
        <Link href="/my-works/route52" className="mt-5 inline-block text-sm underline underline-offset-4">Read the Route52 case study</Link>
      </Section>
      <Section title="Discuss a project">
        <p className="max-w-2xl text-muted">Send the product context, the users it serves and the part you need help with. We can agree on scope before work begins.</p>
        <Link href="/contact" className="mt-5 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg">Contact</Link>
      </Section>
    </main>
  );
}
