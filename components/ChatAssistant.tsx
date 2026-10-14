"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Msg = { role: "user" | "assistant"; content: string };

const greeting: Msg = { role: "assistant", content: "Hi, I'm Mahmud's AI assistant. Ask about his projects, experience, skills or rates." };
const suggestions = ["What has Mahmud built?", "Is he available for work?", "What are his rates?"];

const Bubble = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" />
  </svg>
);

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: typing ? "auto" : "smooth", block: "end" }); }, [msgs, busy, open, typing]);
  useEffect(() => {
    if (!open) return;
    field.current?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [open]);

  async function send(text: string) {
    const q = text.trim().slice(0, 300);
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next); setInput(""); setBusy(true);
    const revealReply = async (reply: string) => {
      const characters = Array.from(reply);
      setTyping(true);
      setMsgs((current) => [...current, { role: "assistant", content: "" }]);
      for (let visible = 0; visible < characters.length; visible += 3) {
        await new Promise((resolve) => setTimeout(resolve, 12));
        const content = characters.slice(0, visible + 3).join("");
        setMsgs((current) => current.map((message, index) =>
          index === current.length - 1 ? { ...message, content } : message
        ));
      }
      setTyping(false);
    };
    try {
      const res = await fetch("/api/assistant", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: next.slice(-8) }) });
      const data = await res.json().catch(() => ({}));
      const reply = typeof data.reply === "string" ? data.reply : "Sorry, I could not answer that. Please email Mahmud instead.";
      await revealReply(reply);
    } catch {
      await revealReply("I could not reach the server. Please try again, or email Mahmud.");
    } finally { setBusy(false); }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section role="dialog" aria-label="AI assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed bottom-24 right-4 z-40 flex h-[min(34rem,70svh)] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl sm:right-6">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div><p className="font-display font-medium">Ask Mahmud&apos;s AI</p><p className="text-xs text-muted">AI answers can be wrong. Email to confirm.</p></div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded-full p-2 text-muted hover:text-ink">✕</button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" role="log" aria-live="polite">
              {msgs.map((m, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "ml-auto bg-ink text-bg" : "border border-line"}`}>
                  {m.content}
                  {typing && i === msgs.length - 1 && <span aria-hidden className="ml-0.5 inline-block h-4 w-1 animate-pulse bg-ink align-middle" />}
                </motion.p>
              ))}
              {busy && !typing && <p className="text-sm text-muted">Thinking…</p>}
              {msgs.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((s) => <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition hover:text-ink">{s}</button>)}
                </div>
              )}
              <div ref={end} />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-line p-3">
              <input ref={field} value={input} onChange={(e) => setInput(e.target.value)} maxLength={300} placeholder="Ask a question" aria-label="Your question"
                className="min-w-0 flex-1 rounded-full border border-line bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent" />
              <button disabled={busy || !input.trim()} className="rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-bg transition active:scale-95 disabled:opacity-50">Send</button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
      <motion.button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
        className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg shadow-lg sm:right-6">
        <Bubble />
      </motion.button>
    </>
  );
}
