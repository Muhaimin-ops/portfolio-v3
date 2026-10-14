"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import type { Project } from "@/lib/data";

export default function WorksGrid({ projects }: { projects: Project[] }) {
  const filters = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.tag.split(" · ")[0]))), "In progress"], [projects]);
  const [f, setF] = useState("All");
  const shown = projects.filter((p) => f === "All" || (f === "In progress" ? p.status === f : p.tag.startsWith(f)));
  return (
    <div>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {filters.map((x) => (
          <button key={x} type="button" onClick={() => setF(x)} aria-pressed={f === x}
            className={`rounded-full border px-4 py-1.5 text-sm transition active:scale-95 ${f === x ? "border-ink bg-ink text-bg" : "border-line text-muted hover:text-ink"}`}>{x}</button>
        ))}
      </div>
      <p className="sr-only" role="status">{shown.length} projects shown</p>
      <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.li key={p.name} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
              <SpotlightCard className="h-full">
                <article className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-muted">{p.tag}</p>
                    {p.status === "In progress" && <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">In progress</span>}
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-medium">{p.name}</h2>
                  <p className="mt-3 text-muted">{p.body}</p>
                  <ul className="mt-4 space-y-1 text-sm">
                    {p.highlights.map((h) => <li key={h} className="flex gap-2"><span aria-hidden className="text-accent">→</span>{h}</li>)}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
                    {p.stack.map((t) => <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">{t}</li>)}
                  </ul>
                  {p.href !== "#" && <a href={p.href} className="mt-6 pt-2 text-sm underline underline-offset-4">View on GitHub ↗</a>}
                </article>
              </SpotlightCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
