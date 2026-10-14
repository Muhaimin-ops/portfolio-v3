import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ChatAssistant from "@/components/ChatAssistant";
import { profile, skills } from "@/lib/data";
import { personId, siteUrl } from "@/lib/seo";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      url: siteUrl,
      jobTitle: profile.role,
      description: profile.intro,
      email: `mailto:${profile.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Yunnan University" },
      sameAs: profile.links.map((link) => link.href),
      knowsAbout: Object.values(skills).flatMap((group) => group.split(", ")),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Mahmud Al Muhaimin",
      description: profile.intro,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mahmud Al Muhaimin · AI engineer and full-stack developer",
    template: "%s · Mahmud Al Muhaimin",
  },
  description: "Mahmud Al Muhaimin is an AI engineer and full-stack developer in Dhaka, Bangladesh, building LLM systems, agent backends and web products.",
  applicationName: "Mahmud Al Muhaimin",
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Mahmud Al Muhaimin",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", creator: "@MMuhaminn" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${grotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <Providers>
          <ScrollProgress />
          <Nav />
          {children}
          <Footer />
          <ChatAssistant />
        </Providers>
      </body>
    </html>
  );
}
