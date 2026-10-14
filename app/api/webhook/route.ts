import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text(); // raw body is required for signature verification
  const sig = req.headers.get("stripe-signature");
  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({}, { status: 400 });
  let event;
  try {
    event = stripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }
  // TODO: persist event.id and skip repeats (Stripe retries), then fulfil.
  switch (event.type) {
    case "checkout.session.completed": /* grant access / email onboarding */ break;
    case "invoice.paid": /* mark invoice paid */ break;
    case "invoice.payment_failed": /* notify, dunning */ break;
    case "customer.subscription.deleted": /* end retainer */ break;
  }
  return NextResponse.json({ received: true });
}
