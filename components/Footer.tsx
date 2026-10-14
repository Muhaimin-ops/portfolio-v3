import Link from "next/link";
import { profile, navLinks } from "@/lib/data";
import BackToTop from "./BackToTop";

const linkCls = "text-muted transition-colors hover:text-ink";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-5 px-6 py-10 text-sm">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">{profile.name}</p>
          <a href={`mailto:${profile.email}`} className={`mt-1 block break-all ${linkCls}`}>{profile.email}</a>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.map((l) => <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>)}
            {profile.links.map((l) => <li key={l.label}><a href={l.href} className={linkCls}>{l.label} ↗</a></li>)}
          </ul>
        </nav>
      </div>
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 border-t border-line px-6 py-5 text-sm text-muted">
        <span>© {new Date().getFullYear()} {profile.name} · {profile.location}</span>
        <BackToTop />
      </div>
    </footer>
  );
}
