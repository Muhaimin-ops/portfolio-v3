"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Room, RoomEvent, Track } from "livekit-client";

type Msg = { role: "user" | "assistant"; content: string; toolsUsed?: string[] };
type CallState = "idle" | "connecting" | "connected" | "error";

const greeting: Msg = { role: "assistant", content: "Hi, I'm Mahmud's AI assistant. I can look up projects, articles, experience and skills." };
const suggestions = ["Which project shows agent backend work?", "What can Mahmud help build?", "How do I discuss a project?"];
const internalPath = /^\/(?:#work-with-me|articles\/[a-z0-9-]+|my-works(?:\/[a-z0-9-]+)?|contact)$/;

function renderMessage(content: string) {
  return content.split(/(\/#work-with-me|\/articles\/[a-z0-9-]+|\/my-works(?:\/[a-z0-9-]+)?|\/contact)/g)
    .map((part, index) => internalPath.test(part)
      ? <a key={index} href={part} className="underline underline-offset-2">{part}</a>
      : part);
}

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
  const [callState, setCallState] = useState<CallState>("idle");
  const [callError, setCallError] = useState("");
  const [muted, setMuted] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const audioContainer = useRef<HTMLDivElement>(null);
  const roomRef = useRef<Room | null>(null);
  const callAttempt = useRef(0);

  useEffect(() => { end.current?.scrollIntoView({ behavior: typing ? "auto" : "smooth", block: "end" }); }, [msgs, busy, open, typing]);
  useEffect(() => () => {
    callAttempt.current += 1;
    void roomRef.current?.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    field.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        void endCall();
        setOpen(false);
      }
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [open]);

  async function startCall() {
    if (roomRef.current || callState === "connecting") return;
    const attempt = ++callAttempt.current;
    setCallState("connecting");
    setCallError("");
    try {
      const response = await fetch("/api/assistant/call", { method: "POST" });
      const result: unknown = await response.json().catch(() => null);
      const payload = typeof result === "object" && result !== null
        ? result as { server_url?: unknown; participant_token?: unknown; error?: unknown }
        : {};
      if (!response.ok) {
        throw new Error(typeof payload.error === "string" ? payload.error : "Could not start a voice call.");
      }
      if (typeof payload.server_url !== "string" || typeof payload.participant_token !== "string") {
        throw new Error("The voice service returned an invalid connection.");
      }
      if (attempt !== callAttempt.current) return;

      const room = new Room();
      roomRef.current = room;
      room.on(RoomEvent.TrackSubscribed, (track) => {
        if (track.kind !== Track.Kind.Audio || !audioContainer.current) return;
        const audio = track.attach();
        audio.autoplay = true;
        audio.setAttribute("playsinline", "");
        audioContainer.current.appendChild(audio);
        void audio.play().catch(() => setCallError("Audio playback is blocked. Allow sound for this page to hear the assistant."));
      });
      room.on(RoomEvent.Disconnected, () => {
        if (roomRef.current !== room) return;
        roomRef.current = null;
        audioContainer.current?.replaceChildren();
        setCallState("idle");
        setMuted(false);
      });

      await room.connect(payload.server_url, payload.participant_token);
      await room.localParticipant.setMicrophoneEnabled(true);
      if (attempt !== callAttempt.current || roomRef.current !== room) {
        await room.disconnect();
        return;
      }
      setCallState("connected");
    } catch (error) {
      const room = roomRef.current;
      roomRef.current = null;
      audioContainer.current?.replaceChildren();
      await room?.disconnect();
      if (attempt !== callAttempt.current) return;
      setCallState("error");
      setCallError(error instanceof Error ? error.message : "The voice call could not start.");
    }
  }

  async function endCall() {
    callAttempt.current += 1;
    const room = roomRef.current;
    roomRef.current = null;
    audioContainer.current?.replaceChildren();
    setCallState("idle");
    setCallError("");
    setMuted(false);
    await room?.disconnect();
  }

  async function toggleMute() {
    const room = roomRef.current;
    if (!room) return;
    const nextMuted = !muted;
    try {
      await room.localParticipant.setMicrophoneEnabled(!nextMuted);
      setMuted(nextMuted);
    } catch {
      setCallError("The microphone could not be changed. Check your browser permissions.");
    }
  }

  async function send(text: string) {
    const q = text.trim().slice(0, 300);
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next); setInput(""); setBusy(true);
    const revealReply = async (reply: string, toolsUsed: string[] = []) => {
      const characters = Array.from(reply);
      setTyping(true);
      setMsgs((current) => [...current, { role: "assistant", content: "", toolsUsed }]);
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
      const data: unknown = await res.json().catch(() => ({}));
      const payload = typeof data === "object" && data !== null ? data as { reply?: unknown; error?: unknown; toolsUsed?: unknown } : {};
      if (!res.ok) throw new Error(typeof payload.error === "string" ? payload.error : "The assistant could not answer just now.");
      const reply = typeof payload.reply === "string" ? payload.reply : "Sorry, I could not answer that. Please email Mahmud instead.";
      const toolsUsed = Array.isArray(payload.toolsUsed) ? payload.toolsUsed.filter((name): name is string => typeof name === "string") : [];
      await revealReply(reply, toolsUsed);
    } catch (error) {
      const message = error instanceof Error && error.message !== "Failed to fetch"
        ? error.message
        : "I could not reach the server. Please try again, or email Mahmud.";
      await revealReply(message);
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
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={callState === "connected" ? () => void endCall() : () => void startCall()}
                  disabled={callState === "connecting"}
                  aria-label={callState === "connected" ? "End voice call" : callState === "connecting" ? "Connecting voice call" : "Start voice call"}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition active:scale-95 disabled:cursor-wait disabled:opacity-60 ${callState === "connected" ? "border-line text-ink hover:bg-line" : "border-ink bg-ink text-bg hover:opacity-80"}`}
                >
                  {callState === "connecting" ? "Connecting…" : callState === "connected" ? "End call" : callState === "error" ? "Try again" : "Call"}
                </button>
                <button type="button" onClick={() => { void endCall(); setOpen(false); }} aria-label="Close assistant" className="rounded-full p-2 text-muted hover:text-ink">✕</button>
              </div>
            </div>
            {(callState !== "idle" || callError) && (
              <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 text-xs" aria-live="polite">
                <p role={callError ? "alert" : "status"} className={callError ? "text-red-700 dark:text-red-300" : "text-muted"}>
                  {callError || (callState === "connecting" ? "Connecting to the voice assistant…" : "Voice call connected. Speak when you are ready.")}
                </p>
                {callState === "connected" && (
                  <button type="button" onClick={() => void toggleMute()} aria-pressed={muted} className="shrink-0 rounded-full border border-line px-3 py-1.5 text-ink transition hover:bg-line active:scale-95">
                    {muted ? "Unmute" : "Mute"}
                  </button>
                )}
              </div>
            )}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" role="log" aria-live="polite">
              {msgs.map((m, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "ml-auto bg-ink text-bg" : "border border-line"}`}>
                  {m.role === "assistant" ? renderMessage(m.content) : m.content}
                  {m.toolsUsed && m.toolsUsed.length > 0 && (
                    <span className="mt-2 block text-[11px] text-muted">Checked: {m.toolsUsed.join(", ")}</span>
                  )}
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
            <div ref={audioContainer} className="sr-only" aria-hidden="true" />
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
