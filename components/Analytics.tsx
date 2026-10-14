"use client";

import Script from "next/script";

type Plausible = ((eventName: string, options?: { props?: Record<string, string> }) => void) & {
  q?: unknown[][];
};

declare global {
  interface Window {
    plausible?: Plausible;
  }
}

const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export function trackEvent(eventName: string) {
  if (typeof window === "undefined" || !domain) return;
  if (!window.plausible) {
    const queued = ((...args: Parameters<Plausible>) => { queued.q?.push(args); }) as Plausible;
    queued.q = [];
    window.plausible = queued;
  }
  window.plausible(eventName);
}

export default function Analytics() {
  if (!domain) return null;
  return <Script src="https://plausible.io/js/script.js" data-domain={domain} strategy="afterInteractive" />;
}
