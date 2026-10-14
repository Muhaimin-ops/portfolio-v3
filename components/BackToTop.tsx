"use client";

export default function BackToTop() {
  return (
    <button type="button" onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
      className="rounded-full border border-line px-4 py-2 text-sm text-muted transition hover:text-ink active:scale-95">
      Back to top ↑
    </button>
  );
}
