import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment received",
  robots: { index: false, follow: false },
};

export default function Success() {
  return (
    <main className="mx-auto max-w-xl px-6 py-32">
      <h1 className="font-display text-4xl">Payment received</h1>
      <p className="mt-4 text-muted">Thanks. A receipt is on its way to your email, and I will follow up within one business day to schedule the kickoff.</p>
      <a href="/" className="mt-8 inline-block underline underline-offset-4">Back to the site</a>
    </main>
  );
}
