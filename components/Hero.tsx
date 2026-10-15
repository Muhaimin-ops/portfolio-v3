"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Mesh from "./Mesh";
import MagneticLink from "./MagneticLink";
import { profile } from "@/lib/data";

const line = { hidden: { y: "105%" }, show: { y: 0, transition: { duration: .9, ease: [.2, .7, .2, 1] as const } } };

const roles = ["LLM systems", "agent backends", "full-stack products", "computer vision models"];

function Rotator() {
  const [i, setI] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, [reduceMotion]);
  if (reduceMotion) return <span className="text-ink">{roles[0]}</span>;
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
  const headerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
  const meshY = useTransform(scrollYProgress, [0, 1], [0, 72]);

  return (
    <header ref={headerRef} className="relative flex min-h-[92svh] items-end overflow-hidden border-b border-line">
      <motion.div aria-hidden className="absolute inset-x-0 -top-[8%] h-[116%]" style={{ y: reduceMotion ? 0 : meshY }}>
        <Mesh />
      </motion.div>
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
        <p className="reveal mt-3 max-w-xl text-sm leading-relaxed text-muted" style={{ animationDelay: ".8s" }}>
          Based in Dhaka, Bangladesh, I work on LLM and RAG applications, AI agent backends, and full-stack AI products for local and remote teams.
        </p>
        <div className="reveal mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ animationDelay: ".9s" }}>
          <MagneticLink href="/contact" className="rounded-full bg-ink px-5 py-2.5 font-medium text-bg">Get in touch</MagneticLink>
          <a className="py-2.5 underline underline-offset-4" href="#work-with-me">Work with me</a>
        </div>
      </div>
    </header>
  );
}
