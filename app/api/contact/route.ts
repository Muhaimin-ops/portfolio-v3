import { profile } from "@/lib/data";

export const runtime = "nodejs";
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "");

// Delivers through Resend when RESEND_API_KEY and CONTACT_FROM are set; otherwise reports that the form is not configured.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ error: "Invalid request." }, { status: 400 });
  if (body.company) return Response.json({ ok: true }); // honeypot: bots fill it, people never see it
  const name = clean(body.name, 100), email = clean(body.email, 200), topic = clean(body.topic, 40);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 2000) : "";
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10)
    return Response.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });

  const key = process.env.RESEND_API_KEY, from = process.env.CONTACT_FROM;
  if (!key || !from) return Response.json({ error: "The contact form is not set up yet." }, { status: 503 });
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({ from, to: [process.env.CONTACT_TO || profile.email], reply_to: email, subject: `[Portfolio] ${topic || "Message"} from ${name}`, text: `${message}\n\n— ${name} <${email}>` }),
    signal: AbortSignal.timeout(10000),
  }).catch(() => null);
  if (!res || !res.ok) return Response.json({ error: "The message could not be sent." }, { status: 502 });
  return Response.json({ ok: true });
}
