"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Mesh from "./Mesh";
import { profile } from "@/lib/data";

const line = { hidden: { y: "105%" }, show: { y: 0, transition: { duration: .9, ease: [.2, .7, .2, 1] as const } } };

const roles = ["LLM systems", "agent backends", "full-stack products", "computer vision models"];

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2400); return () => clearInterval(id); }, []);
  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom text-ink">
      <AnimatePresence mode="wait">
        <motion.span key={roles[i]} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.4 }}>{roles[i]}</motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const words = profile.name.split(" ");
  return (
    <header className="relative flex min-h-[92svh] items-end overflow-hidden border-b border-line">
      <Mesh />
      <div className="relative mx-auto w-full max-w-5xl px-6 pb-16 pt-32">
        <motion.h1 initial="hidden" animate="show" transition={{ staggerChildren: .12 }}
          className="font-display text-[clamp(3rem,10vw,7.5rem)] font-semibold leading-[.95] tracking-tight">
          {words.map((w, i) => (
            <span key={i} className="mr-[.25em] inline-block overflow-hidden align-bottom">
              <motion.span variants={line} className="inline-block">{w}</motion.span>
            </span>
          ))}
        </motion.h1>
        <p className="reveal mt-6 text-lg text-muted" style={{ animationDelay: ".6s" }} aria-hidden>Building <Rotator /></p>
        <p className="reveal mt-4 max-w-xl text-lg text-muted" style={{ animationDelay: ".7s" }}>{profile.intro}</p>
        <div className="reveal mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ animationDelay: ".9s" }}>
          <Link className="rounded-full bg-ink px-5 py-2.5 font-medium text-bg" href="/contact">Get in touch</Link>
          <a className="py-2.5 underline underline-offset-4" href="#work-with-me">Work with me</a>
          {profile.links.map((l) => <a key={l.label} className="py-2.5 text-muted hover:text-ink" href={l.href}>{l.label}</a>)}
        </div>
      </div>
    </header>
  );
}
