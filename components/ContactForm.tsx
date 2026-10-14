"use client";
import { useState } from "react";
import { trackEvent } from "./Analytics";

type State = "idle" | "sending" | "sent" | "error";
const field = "mt-2 w-full rounded-xl border border-line bg-transparent px-4 py-3 outline-none transition focus:border-accent";

export default function ContactForm({ email }: { email: string }) {
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending"); setMsg("");
    const data = Object.fromEntries(new FormData(form));
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
      <label className="block text-sm font-medium">What do you need help with?
        <select name="topic" defaultValue="Project" className={field}>
          <option>Project</option><option>Job opportunity</option><option>Collaboration</option><option>Something else</option>
        </select>
      </label>
      <label className="block text-sm font-medium">Message<textarea name="message" required minLength={10} maxLength={2000} rows={6} className={field} /></label>
      <div className="hidden" aria-hidden><label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="flex flex-wrap items-center gap-4">
        <button disabled={state === "sending"} className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition active:scale-95 disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        {state === "error" && <p role="alert" className="text-sm text-muted">{msg} You can also email <a className="underline underline-offset-4" href={`mailto:${email}`}>{email}</a>.</p>}
      </div>
    </form>
  );
}
