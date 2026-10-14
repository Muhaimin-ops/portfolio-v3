"use client";
import { useRef } from "react";

// Card with a soft glow that follows the pointer.
export default function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return <div ref={ref} onPointerMove={move} className={`spotlight relative overflow-hidden rounded-2xl border border-line ${className}`}>{children}</div>;
}
