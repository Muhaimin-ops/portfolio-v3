"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, profile } from "@/lib/data";

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    const f = () => setScrolled(scrollY > 8);
    f(); addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); button.current?.focus(); return; }
      if (e.key !== "Tab" || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>("a[href], button");
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    addEventListener("keydown", key);
    panel.current?.querySelector<HTMLElement>("a[href]")?.focus();
    return () => { document.body.style.overflow = prev; removeEventListener("keydown", key); };
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">Skip to content</a>
      <header className={`fixed inset-x-0 top-0 z-40 border-b transition-colors ${scrolled ? "border-line bg-bg/80 backdrop-blur-md" : "border-transparent"}`}>
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="font-display text-lg font-semibold tracking-tight">Muhaimin<span className="text-accent">.</span></Link>
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.href} className="relative">
                <Link href={l.href} aria-current={active(l.href) ? "page" : undefined}
                  className={`block rounded-full px-4 py-2 text-sm transition-colors ${active(l.href) ? "text-ink" : "text-muted hover:text-ink"}`}>{l.label}</Link>
                {active(l.href) && <motion.span layoutId="nav-dot" className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent" />}
              </li>
            ))}
            <li><Link href="/#work-with-me" className="ml-3 rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg transition active:scale-95">Work with me</Link></li>
          </ul>
          <button ref={button} type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Open menu"
            className="-mr-2 rounded-full p-2 md:hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden><path d="M4 8h16M4 16h16" /></svg>
          </button>
        </nav>
      </header>
      <AnimatePresence>
        {open && (
          <>
            <motion.div key="overlay" aria-hidden onClick={() => setOpen(false)} className="fixed inset-0 z-[45] bg-ink/40 md:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.aside key="panel" id="mobile-menu" ref={panel} role="dialog" aria-modal="true" aria-label="Menu"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col border-l border-line bg-bg p-6 md:hidden"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 32, stiffness: 320 }}>
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold">Menu</span>
                <button type="button" onClick={() => { setOpen(false); button.current?.focus(); }} aria-label="Close menu" className="-mr-2 rounded-full p-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              </div>
              <ul className="mt-10 space-y-1">
                {navLinks.map((l, i) => (
                  <motion.li key={l.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05 }}>
                    <Link href={l.href} aria-current={active(l.href) ? "page" : undefined}
                      className={`block py-3 font-display text-3xl tracking-tight ${active(l.href) ? "text-accent" : ""}`}>{l.label}</Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto space-y-4 text-sm">
                <Link href="/#work-with-me" className="block rounded-full bg-ink px-5 py-3 text-center font-medium text-bg">Work with me</Link>
                <a href={`mailto:${profile.email}`} className="block break-all text-muted">{profile.email}</a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
