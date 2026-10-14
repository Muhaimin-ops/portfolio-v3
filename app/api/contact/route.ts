import { profile } from "@/lib/data";

export const runtime = "nodejs";
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "");

// Delivers through Resend when RESEND_API_KEY and CONTACT_FROM are set; otherwise reports that the form is not configured.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ error: "Invalid request." }, { status: 400 });
  if (body.company) return Response.json({ ok: true }); // honeypot: bots fill it, people never see it
  const name = clean(body.name, 100), email = clean(body.email, 200), topic = clean(body.topic, 40);
  const projectType = clean(body.projectType, 80), budget = clean(body.budget, 60), timeline = clean(body.timeline, 60);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 2000) : "";
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10)
    return Response.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  const validProjectTypes = ["AI or LLM product", "Agent backend or integration", "Full-stack application", "Technical consulting", "Other"];
  const validBudgets = ["Under $1,000", "$1,000 to $5,000", "$5,000 to $10,000", "$10,000+", "Not sure yet"];
  const validTimelines = ["As soon as possible", "Within a month", "In 1 to 3 months", "Still exploring"];
  if (
    (body.projectType && !validProjectTypes.includes(projectType)) ||
    (body.budget && !validBudgets.includes(budget)) ||
    (body.timeline && !validTimelines.includes(timeline))
  )
    return Response.json({ error: "Project details contain invalid values." }, { status: 400 });

  const key = process.env.RESEND_API_KEY, from = process.env.CONTACT_FROM;
  if (!key || !from) return Response.json({ error: "The contact form is not set up yet." }, { status: 503 });
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from,
      to: [process.env.CONTACT_TO || profile.email],
      reply_to: email,
      subject: `[Portfolio] ${projectType ? "Project inquiry" : topic || "Message"} from ${name}`,
      text: [
        projectType && `Project type: ${projectType}`,
        timeline && `Timeline: ${timeline}`,
        budget && `Budget: ${budget}`,
        "",
        message,
        "",
        `From: ${name} <${email}>`,
      ].filter((line) => line !== undefined).join("\n"),
    }),
    signal: AbortSignal.timeout(10000),
  }).catch(() => null);
  if (!res || !res.ok) return Response.json({ error: "The message could not be sent." }, { status: 502 });
  return Response.json({ ok: true });
}
