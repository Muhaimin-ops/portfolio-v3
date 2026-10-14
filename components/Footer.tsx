import Link from "next/link";
import { profile, navLinks } from "@/lib/data";
import BackToTop from "./BackToTop";

const linkCls = "text-muted transition-colors hover:text-ink";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 pb-6 pt-14 md:pb-8 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.35fr_0.65fr_1fr] md:gap-10">
          <div className="max-w-md">
            <Link href="/" className="inline-block font-display text-2xl font-semibold tracking-tight">
              {profile.name}<span className="text-accent">.</span>
            </Link>
            <p className="mt-4 max-w-[38ch] leading-relaxed text-muted">{profile.intro}</p>
            <ul aria-label="Social links" className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm">
              {profile.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkCls} target="_blank" rel="noreferrer">
                    {link.label} <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer" className="md:justify-self-center">
            <h2 className="text-sm font-medium">Explore</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {navLinks.filter((link) => link.href !== "/").map((link) => (
                <li key={link.href}><Link href={link.href} className={linkCls}>{link.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-sm font-medium">Have a project in mind?</h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">Send a few details and I will get back to you by email.</p>
            <Link href="/#work-with-me" className="mt-5 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition hover:opacity-85 active:scale-[0.98]">Start an inquiry</Link>
            <a href={`mailto:${profile.email}`} className="mt-4 block break-all text-sm text-muted transition-colors hover:text-ink">{profile.email}</a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
