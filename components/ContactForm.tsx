"use client";
import { useState } from "react";
import { trackEvent } from "./Analytics";

type State = "idle" | "sending" | "sent" | "error";
const field = "mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/20";

export default function ContactForm({ email, projectBrief = false }: { email: string; projectBrief?: boolean }) {
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");
  const [fallbackHref, setFallbackHref] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending"); setMsg("");
    const data = Object.fromEntries(new FormData(form));
    const emailBody = [
      `Name: ${String(data.name ?? "")}`,
      `Email: ${String(data.email ?? "")}`,
      projectBrief ? `Project type: ${String(data.projectType ?? "")}` : `Topic: ${String(data.topic ?? "")}`,
      projectBrief && data.timeline ? `Timeline: ${String(data.timeline)}` : "",
      projectBrief && data.budget ? `Budget: ${String(data.budget)}` : "",
      "",
      String(data.message ?? ""),
    ].filter(Boolean).join("\n");
    setFallbackHref(`mailto:${email}?subject=${encodeURIComponent(projectBrief ? "Project inquiry" : "Portfolio inquiry")}&body=${encodeURIComponent(emailBody)}`);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || "Something went wrong.");
      trackEvent("Contact Form Submitted");
      setState("sent"); form.reset();
    } catch (err) {
      setState("error"); setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }
  if (state === "sent") return (
    <div role="status" className="rounded-2xl border border-line p-8">
      <h2 className="font-display text-2xl font-medium">Message sent</h2>
      <p className="mt-2 text-muted">Thanks for reaching out. I will reply by email.</p>
    </div>
  );
  return (
    <form onSubmit={submit} className="space-y-6" noValidate={false}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm font-medium">Name<input name="name" required maxLength={100} autoComplete="name" className={field} /></label>
        <label className="block text-sm font-medium">Email<input name="email" type="email" required maxLength={200} autoComplete="email" className={field} /></label>
      </div>
      {projectBrief ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block text-sm font-medium">Project type
            <select name="projectType" defaultValue="" required className={field}>
              <option value="" disabled>Select a project type</option>
              <option>AI or LLM product</option><option>Agent backend or integration</option><option>Full-stack application</option><option>Technical consulting</option><option>Other</option>
            </select>
          </label>
          <label className="block text-sm font-medium">When are you looking to start?
            <select name="timeline" defaultValue="" className={field}>
              <option value="">Select a timeline (optional)</option>
              <option>As soon as possible</option><option>Within a month</option><option>In 1 to 3 months</option><option>Still exploring</option>
            </select>
          </label>
          <label className="block text-sm font-medium sm:col-span-2">Budget range
            <select name="budget" defaultValue="" className={field}>
              <option value="">Prefer not to say</option>
              <option>Under $1,000</option><option>$1,000 to $5,000</option><option>$5,000 to $10,000</option><option>$10,000+</option><option>Not sure yet</option>
            </select>
          </label>
        </div>
      ) : (
        <label className="block text-sm font-medium">What do you need help with?
          <select name="topic" defaultValue="Project" className={field}>
            <option>Project</option><option>Job opportunity</option><option>Collaboration</option><option>Something else</option>
          </select>
        </label>
      )}
      <label className="block text-sm font-medium">{projectBrief ? "Project details" : "Message"}
        <textarea name="message" required minLength={10} maxLength={2000} rows={projectBrief ? 5 : 6} aria-describedby={projectBrief ? "project-message-help" : undefined} className={field} />
        {projectBrief && <span id="project-message-help" className="mt-2 block text-sm text-muted">What are you trying to achieve, and what would a useful outcome look like?</span>}
      </label>
      <div className="hidden" aria-hidden><label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="flex flex-wrap items-center gap-4">
        <button disabled={state === "sending"} className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition active:scale-95 disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        {state === "error" && <p role="alert" className="text-sm text-muted">{msg} <a className="underline underline-offset-4" href={fallbackHref}>Send the details by email</a>.</p>}
      </div>
    </form>
  );
}
