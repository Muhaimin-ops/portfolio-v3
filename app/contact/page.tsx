import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import LocalTime from "@/components/LocalTime";
import TrackedEmailLink from "@/components/TrackedEmailLink";
import { profile, availability } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about projects, roles or collaboration.",
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", url: "/contact" },
};

export default function Contact() {
  return (
    <main id="main">
      <PageHeader eyebrow="Contact" title="Let's build something">{availability.status}. {availability.detail}</PageHeader>
      <section className="mx-auto grid max-w-5xl gap-16 px-6 pb-24 pt-8 md:grid-cols-[2fr_1fr]">
        <ContactForm email={profile.email} />
        <aside className="space-y-8 text-sm">
          <div><h2 className="font-medium">Email</h2><TrackedEmailLink email={profile.email} className="mt-2 block break-all text-muted hover:text-ink" /></div>
          <div><h2 className="font-medium">Based in</h2><p className="mt-2 text-muted">{profile.location}</p><p className="text-muted"><LocalTime /></p></div>
          <div>
            <h2 className="font-medium">Elsewhere</h2>
            <ul className="mt-2 space-y-2">{profile.links.map((l) => <li key={l.label}><a href={l.href} className="text-muted hover:text-ink">{l.label} ↗</a></li>)}</ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
