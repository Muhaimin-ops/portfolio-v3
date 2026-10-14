"use client";
import { useState } from "react";

type Offer = { slug: string; name: string; blurb: string; price: string };

export default function Offers({ offers }: { offers: Offer[] }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  async function buy(slug: string) {
    setBusy(slug); setError("");
    try {
      const res = await fetch("/api/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ slug }) });
      const { url } = await res.json();
      if (!url) throw new Error();
      location.href = url;
    } catch { setError("Checkout could not start. Please email me instead."); setBusy(null); }
  }
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2">
        {offers.map((o) => (
          <div key={o.slug} className="flex flex-col justify-between rounded-2xl border border-line p-6">
            <div>
              <h3 className="font-display text-xl font-medium">{o.name}</h3>
              <p className="mt-2 text-muted">{o.blurb}</p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <span className="font-display text-2xl">{o.price}</span>
              <button onClick={() => buy(o.slug)} disabled={!!busy}
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition active:scale-95 disabled:opacity-60">
                {busy === o.slug ? "Opening checkout…" : "Book and pay"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {error && <p role="alert" className="mt-4 text-sm text-muted">{error}</p>}
    </div>
  );
}
