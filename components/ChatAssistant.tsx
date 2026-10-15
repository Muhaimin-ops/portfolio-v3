"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Room, RoomEvent, Track } from "livekit-client";
import { CircleNotch, PaperPlaneTilt, Phone, Robot, X } from "@phosphor-icons/react";

type Msg = { id: string; role: "user" | "assistant"; content: string; partial?: boolean };
type SessionState = "idle" | "connecting" | "connected" | "error";
type CallState = "idle" | "connecting" | "connected" | "error";

const suggestions = ["Which project shows agent backend work?", "What can Mahmud help build?", "How do I discuss a project?"];
const internalPath = /^\/(?:#work-with-me|articles\/[a-z0-9-]+|my-works(?:\/[a-z0-9-]+)?|contact)$/;

function renderMessage(content: string) {
  return content.split(/(\/#work-with-me|\/articles\/[a-z0-9-]+|\/my-works(?:\/[a-z0-9-]+)?|\/contact)/g)
    .map((part, index) => internalPath.test(part)
      ? <a key={index} href={part} className="underline underline-offset-2">{part}</a>
      : part);
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function VoiceWaveform({ stream }: { stream: MediaStream | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !stream) return;

    const context = new AudioContext();
    const analyser = context.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.72;
    const source = context.createMediaStreamSource(stream);
    source.connect(analyser);
    const samples = new Uint8Array(analyser.fftSize);
    const drawing = canvas.getContext("2d");
    let frame = 0;

    const draw = () => {
      if (!drawing) return;
      const ratio = window.devicePixelRatio || 1;
      const width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      analyser.getByteTimeDomainData(samples);
      drawing.clearRect(0, 0, width, height);
      drawing.beginPath();
      for (let index = 0; index < samples.length; index += 1) {
        const x = (index / (samples.length - 1)) * width;
        const y = height / 2 + ((samples[index] - 128) / 128) * height * 0.42;
        if (index === 0) drawing.moveTo(x, y);
        else drawing.lineTo(x, y);
      }
      drawing.strokeStyle = getComputedStyle(canvas).color;
      drawing.lineWidth = 2 * ratio;
      drawing.lineCap = "round";
      drawing.stroke();
      frame = requestAnimationFrame(draw);
    };

    void context.resume().catch((error: unknown) => console.error("[assistant/call] Could not start microphone waveform:", error));
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      source.disconnect();
      analyser.disconnect();
      void context.close();
    };
  }, [stream]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Live microphone waveform"
      className="h-12 w-full text-accent"
    />
  );
}

const Bubble = () => (
  <Robot size={24} weight="duotone" aria-hidden />
);

export default function ChatAssistant() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [callState, setCallState] = useState<CallState>("idle");
  const [sessionError, setSessionError] = useState("");
  const [agentReady, setAgentReady] = useState(false);
  const [muted, setMuted] = useState(false);
  const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(null);
  const [callStartedAt, setCallStartedAt] = useState<number | null>(null);
  const [duration, setDuration] = useState(0);
  const end = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const audioContainer = useRef<HTMLDivElement>(null);
  const roomRef = useRef<Room | null>(null);
  const connectPromiseRef = useRef<Promise<Room> | null>(null);
  const callActiveRef = useRef(false);
  const remoteAudioTracksRef = useRef(new Set<Track>());
  const audioElementsRef = useRef(new Map<Track, HTMLMediaElement>());
  const messageSequenceRef = useRef(0);
  const callModeActive = callState === "connecting" || callState === "connected";

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, busy, open]);

  useEffect(() => {
    if (callStartedAt === null) return;
    const updateDuration = () => setDuration(Math.floor((Date.now() - callStartedAt) / 1000));
    updateDuration();
    const interval = window.setInterval(updateDuration, 1000);
    return () => window.clearInterval(interval);
  }, [callStartedAt]);

  useEffect(() => () => {
    callActiveRef.current = false;
    for (const [track, audio] of audioElementsRef.current) {
      track.detach(audio);
    }
    audioElementsRef.current.clear();
    const room = roomRef.current;
    roomRef.current = null;
    void room?.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    field.current?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        void endCall();
        setOpen(false);
      }
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [open]);

  function appendTranscript(text: string, role: Msg["role"], segmentId: string, isFinal: boolean) {
    setMsgs((current) => {
      const existingIndex = current.findIndex((message) => message.id === segmentId);
      const nextMessage: Msg = {
        id: segmentId,
        role,
        content: text,
        partial: !isFinal,
      };
      if (existingIndex < 0) return [...current, nextMessage];
      return current.map((message, index) => index === existingIndex ? nextMessage : message);
    });
  }

  function attachRemoteAudio(track: Track) {
    const container = audioContainer.current;
    if (!container || audioElementsRef.current.has(track)) return;
    const audio = track.attach();
    audio.autoplay = true;
    audio.setAttribute("playsinline", "");
    container.appendChild(audio);
    audioElementsRef.current.set(track, audio);
    void audio.play().catch((error: unknown) => {
      console.error("[assistant/call] Could not play assistant audio:", error);
      setSessionError("Audio playback is blocked. Allow sound for this page to hear the assistant.");
    });
  }

  function detachRemoteAudio() {
    for (const [track, audio] of audioElementsRef.current) {
      track.detach(audio);
    }
    audioElementsRef.current.clear();
    audioContainer.current?.replaceChildren();
  }

  async function connectSession(): Promise<Room> {
    if (connectPromiseRef.current) return connectPromiseRef.current;
    if (roomRef.current) return roomRef.current;

    setSessionState("connecting");
    setSessionError("");
    const connection = (async () => {
      const response = await fetch("/api/assistant/call", { method: "POST" });
      const result: unknown = await response.json().catch(() => null);
      const payload = typeof result === "object" && result !== null
        ? result as { server_url?: unknown; participant_token?: unknown; error?: unknown }
        : {};
      if (!response.ok) {
        throw new Error(typeof payload.error === "string" ? payload.error : "Could not connect to the assistant.");
      }
      if (typeof payload.server_url !== "string" || typeof payload.participant_token !== "string") {
        throw new Error("The voice service returned an invalid connection.");
      }

      const room = new Room();
      roomRef.current = room;
      room.on(RoomEvent.TrackSubscribed, (track) => {
        if (track.kind !== Track.Kind.Audio) return;
        remoteAudioTracksRef.current.add(track);
        if (callActiveRef.current) attachRemoteAudio(track);
      });
      room.on(RoomEvent.TrackUnsubscribed, (track) => {
        remoteAudioTracksRef.current.delete(track);
        const audio = audioElementsRef.current.get(track);
        if (audio) track.detach(audio);
        audioElementsRef.current.delete(track);
      });
      room.on(RoomEvent.ParticipantConnected, () => setAgentReady(true));
      room.on(RoomEvent.Disconnected, () => {
        if (roomRef.current !== room) return;
        roomRef.current = null;
        setSessionState("idle");
        setAgentReady(false);
        const wasInCall = callActiveRef.current;
        callActiveRef.current = false;
        remoteAudioTracksRef.current.clear();
        detachRemoteAudio();
        setCallState("idle");
        setMuted(false);
        setMicrophoneStream(null);
        setCallStartedAt(null);
        if (wasInCall) setSessionError("The voice session disconnected. Reconnect to continue.");
      });
      room.registerTextStreamHandler("lk.transcription", async (reader, participant) => {
        try {
          const text = (await reader.readAll()).trim();
          if (!text) return;
          const attributes = reader.info.attributes ?? {};
          const segmentId = attributes["lk.segment_id"] ?? reader.info.id;
          const isFinal = attributes["lk.transcription_final"] !== "false";
          const role = participant.identity === room.localParticipant.identity ? "user" : "assistant";
          appendTranscript(text, role, segmentId, isFinal);
        } catch (error) {
          console.error("[assistant/call] Could not read a transcription stream:", error);
          setSessionError("A live transcript could not be received. You can keep chatting or retry.");
        }
      });

      try {
        await room.connect(payload.server_url, payload.participant_token);
        setSessionState("connected");
        setAgentReady(room.remoteParticipants.size > 0);
        return room;
      } catch (error) {
        if (roomRef.current === room) roomRef.current = null;
        await room.disconnect();
        throw error;
      }
    })();
    connectPromiseRef.current = connection;
    try {
      return await connection;
    } catch (error) {
      setSessionState("error");
      setSessionError(error instanceof Error ? error.message : "Could not connect to the assistant.");
      throw error;
    } finally {
      if (connectPromiseRef.current === connection) connectPromiseRef.current = null;
    }
  }

  async function waitForAgent(room: Room) {
    const deadline = Date.now() + 15_000;
    while (room.remoteParticipants.size === 0 && Date.now() < deadline) {
      if (roomRef.current !== room) throw new Error("The assistant session ended.");
      await new Promise((resolve) => window.setTimeout(resolve, 200));
    }
    if (room.remoteParticipants.size === 0) {
      throw new Error("The assistant did not join. Please try again in a moment.");
    }
    setAgentReady(true);
  }

  async function startCall() {
    if (callState === "connecting" || callState === "connected") return;
    setCallState("connecting");
    setSessionError("");
    try {
      const room = await connectSession();
      await waitForAgent(room);
      const publication = await room.localParticipant.setMicrophoneEnabled(true);
      const mediaStreamTrack = publication?.track?.mediaStreamTrack;
      if (!mediaStreamTrack) throw new Error("The microphone could not be started. Check browser permissions.");

      callActiveRef.current = true;
      setMicrophoneStream(new MediaStream([mediaStreamTrack]));
      for (const track of remoteAudioTracksRef.current) attachRemoteAudio(track);
      setMuted(false);
      setDuration(0);
      setCallStartedAt(Date.now());
      setCallState("connected");
    } catch (error) {
      callActiveRef.current = false;
      detachRemoteAudio();
      setCallState("error");
      setSessionError(error instanceof Error ? error.message : "The voice call could not start.");
    }
  }

  async function endCall() {
    callActiveRef.current = false;
    setCallState("idle");
    setMuted(false);
    setMicrophoneStream(null);
    setCallStartedAt(null);
    setDuration(0);
    detachRemoteAudio();
    try {
      await roomRef.current?.localParticipant.setMicrophoneEnabled(false);
    } catch (error) {
      console.error("[assistant/call] Could not stop the microphone:", error);
      setSessionError("The microphone could not be stopped. Check your browser permissions.");
    }
  }

  async function toggleMute() {
    const room = roomRef.current;
    if (!room) return;
    const nextMuted = !muted;
    try {
      await room.localParticipant.setMicrophoneEnabled(!nextMuted);
      setMuted(nextMuted);
    } catch (error) {
      console.error("[assistant/call] Could not change microphone state:", error);
      setSessionError("The microphone could not be changed. Check your browser permissions.");
    }
  }

  async function send(text: string) {
    const query = text.trim().slice(0, 300);
    if (!query || busy || callState === "connecting" || callState === "connected") return;
    setInput("");
    setBusy(true);
    const messageId = `chat-${Date.now()}-${messageSequenceRef.current++}`;
    setMsgs((current) => [...current, { id: messageId, role: "user", content: query }]);
    setSessionError("");
    try {
      const room = await connectSession();
      await waitForAgent(room);
      await room.localParticipant.sendText(query, { topic: "lk.chat" });
    } catch (error) {
      setMsgs((current) => current.filter((message) => message.id !== messageId));
      setSessionError(error instanceof Error ? error.message : "The assistant could not receive your message.");
    } finally {
      setBusy(false);
    }
  }

  function closeAssistant() {
    void endCall();
    setOpen(false);
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section role="dialog" aria-label="AI assistant"
            initial={reduceMotion ? false : { opacity: 0, x: 28, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24, y: 6 }}
            transition={reduceMotion ? { duration: 0.01 } : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 right-4 z-40 flex h-[min(38rem,76svh)] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl sm:right-6">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-bg">
                  <Robot size={22} weight="duotone" />
                </span>
                <div className="min-w-0">
                  <p className="font-display font-medium">Ask Assistant</p>
                  <p className="truncate text-xs text-muted">{sessionState === "connecting" ? "Connecting to the assistant…" : agentReady ? "Your chat and call share this session." : "AI answers can be wrong. Email to confirm."}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {callState !== "connected" && (
                  <button
                    type="button"
                    onClick={() => void startCall()}
                    disabled={callState === "connecting"}
                    aria-label={callState === "connecting" ? "Connecting voice call" : callState === "error" ? "Try voice call again" : "Start voice call"}
                    title={callState === "connecting" ? "Connecting voice call" : callState === "error" ? "Try voice call again" : "Start voice call"}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink bg-ink text-bg transition active:scale-95 disabled:cursor-wait disabled:opacity-60"
                  >
                    {callState === "connecting"
                      ? <CircleNotch size={17} weight="bold" className="animate-spin" aria-hidden />
                      : <Phone size={17} weight="bold" aria-hidden />}
                  </button>
                )}
                <button type="button" onClick={closeAssistant} aria-label="Close assistant" className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition hover:bg-line hover:text-ink active:scale-95">
                  <X size={18} weight="bold" aria-hidden />
                </button>
              </div>
            </div>
            {sessionError && (
              <p role="alert" className="border-b border-line px-4 py-2.5 text-xs text-red-700 dark:text-red-300">{sessionError}</p>
            )}
            {callState === "connected" && (
              <section aria-label="Voice call in progress" className="border-b border-line px-4 py-3">
                <div className="flex items-center justify-between text-xs">
                  <p className="font-medium text-ink">Live voice call</p>
                  <time aria-label={`Call duration ${formatDuration(duration)}`} className="tabular-nums text-muted">{formatDuration(duration)}</time>
                </div>
                <VoiceWaveform stream={microphoneStream} />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-muted">{muted ? "Microphone muted" : "Listening. Speak naturally."}</p>
                  <div className="flex shrink-0 items-center gap-2">
                    <button type="button" onClick={() => void toggleMute()} aria-pressed={muted} className="rounded-full border border-line px-3 py-1.5 text-xs text-ink transition hover:bg-line active:scale-95">
                      {muted ? "Unmute" : "Mute"}
                    </button>
                    <button type="button" onClick={() => void endCall()} className="rounded-full bg-red-700 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-800 active:scale-95">
                      End call
                    </button>
                  </div>
                </div>
              </section>
            )}
            {callState === "connecting" && (
              <p role="status" className="border-b border-line px-4 py-3 text-xs text-muted">
                {agentReady ? "Starting your microphone…" : "Joining the assistant…"}
              </p>
            )}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" role="log" aria-live="polite">
              {msgs.map((message) => (
                <motion.p key={message.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${message.role === "user" ? "ml-auto bg-ink text-bg" : "border border-line"}`}>
                  {message.role === "assistant" ? renderMessage(message.content) : message.content}
                  {message.partial && <span className="sr-only"> (live transcription)</span>}
                </motion.p>
              ))}
              {msgs.length === 0 && (
                <p className="text-sm text-muted">
                  {sessionState === "connecting" ? "Connecting to your conversation…" : "Ask a question or start a voice call."}
                </p>
              )}
              {busy && <p className="text-sm text-muted">Sending…</p>}
              {msgs.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((suggestion) => (
                    <button key={suggestion} type="button" onClick={() => void send(suggestion)} disabled={busy || callModeActive}
                      className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition hover:text-ink disabled:opacity-50">
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              <div ref={end} />
            </div>
            <div ref={audioContainer} className="sr-only" aria-hidden="true" />
            <form onSubmit={(event) => { event.preventDefault(); void send(input); }} className="flex items-center gap-2 border-t border-line pb-0 pl-4 pr-0 pt-3">
              <input ref={field} value={input} onChange={(event) => setInput(event.target.value)} maxLength={300}
                placeholder={callModeActive ? "Chat is paused during the call" : "Ask a question"}
                aria-label="Your question" disabled={callModeActive}
                className="min-w-0 flex-1 rounded-full border border-line bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent disabled:cursor-not-allowed disabled:opacity-60" />
              <button type="submit" disabled={busy || !input.trim() || callModeActive}
                aria-label={busy ? "Sending message" : "Send message"}
                title={busy ? "Sending message" : "Send message"}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-bg transition active:scale-95 disabled:opacity-50">
                {busy
                  ? <CircleNotch size={20} weight="bold" className="animate-spin" aria-hidden />
                  : <PaperPlaneTilt size={20} weight="bold" aria-hidden />}
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
      <motion.button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
        className="fixed bottom-4 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-bg shadow-lg sm:right-6">
        <Bubble />
      </motion.button>
    </>
  );
}
