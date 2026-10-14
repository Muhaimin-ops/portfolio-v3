import Link from "next/link";
import { profile, navLinks } from "@/lib/data";
import BackToTop from "./BackToTop";

const linkCls = "text-muted transition-colors hover:text-ink";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 pb-8 pt-12 md:pb-10 md:pt-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-20">
          <div className="max-w-md">
            <Link href="/" className="inline-block font-display text-2xl font-semibold tracking-tight">
              {profile.name}<span className="text-accent">.</span>
            </Link>
            <p className="mt-3 max-w-[38ch] leading-relaxed text-muted">{profile.intro}</p>
            <ul aria-label="Social links" className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {profile.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkCls} target="_blank" rel="noreferrer">
                    {link.label} <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start md:items-end md:text-right">
            <p className="text-sm text-muted">Have a project or role in mind?</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 break-all font-display text-lg font-medium underline decoration-line underline-offset-4 transition-colors hover:text-accent sm:text-xl"
            >
              {profile.email}
            </a>
            <p className="mt-3 text-sm text-muted">{profile.location}</p>
            <div className="mt-6">
              <BackToTop />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-5 border-t border-line pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {navLinks.filter((link) => link.href !== "/").map((link) => (
                <li key={link.href}><Link href={link.href} className={linkCls}>{link.label}</Link></li>
              ))}
            </ul>
          </nav>
          <p className="text-xs text-muted">© {new Date().getFullYear()} {profile.name}</p>
        </div>
      </div>
    </footer>
  );
}
