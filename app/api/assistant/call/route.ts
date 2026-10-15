import { RoomAgentDispatch, RoomConfiguration, TrackSource } from "@livekit/protocol";
import { AccessToken } from "livekit-server-sdk";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

const hits = new Map<string, { count: number; startedAt: number }>();
const WINDOW_MS = 10 * 60_000;
const MAX_CALLS_PER_WINDOW = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const hit = hits.get(ip);
  if (!hit || now - hit.startedAt > WINDOW_MS) {
    hits.set(ip, { count: 1, startedAt: now });
    return false;
  }

  hit.count += 1;
  return hit.count > MAX_CALLS_PER_WINDOW;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Voice calls must be started from this site." }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ error: "Too many call attempts. Please try again later." }, { status: 429 });
  }

  const serverUrl = process.env.LIVEKIT_URL;
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  if (!serverUrl || !apiKey || !apiSecret) {
    return Response.json({ error: "Voice calls are not configured yet." }, { status: 503 });
  }

  const roomName = `portfolio-${randomUUID()}`;
  const token = new AccessToken(apiKey, apiSecret, {
    identity: `visitor-${randomUUID()}`,
    name: "Portfolio visitor",
    ttl: "5m",
  });
  token.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canPublishSources: [TrackSource.MICROPHONE],
    canPublishData: false,
    canSubscribe: true,
  });
  token.roomConfig = new RoomConfiguration({
    agents: [new RoomAgentDispatch({ agentName: "mahmud-portfolio-guide" })],
  });

  try {
    const participantToken = await token.toJwt();
    return Response.json(
      { server_url: serverUrl, participant_token: participantToken },
      { status: 201 },
    );
  } catch (error) {
    console.error("[assistant/call] Failed to create LiveKit token:", error);
    return Response.json({ error: "Could not start a voice call right now." }, { status: 500 });
  }
}
