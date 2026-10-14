import { NextResponse } from "next/server";
import { stripe, siteUrl } from "@/lib/stripe";
import { offers } from "@/lib/data";

export async function POST(req: Request) {
  const { slug } = await req.json().catch(() => ({}));
  const offer = offers.find((o) => o.slug === slug);
  if (!offer) return NextResponse.json({ error: "Unknown offer" }, { status: 400 });

  const session = await stripe().checkout.sessions.create({
    mode: offer.mode,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: offer.amount,
        product_data: { name: offer.name, description: offer.blurb, tax_code: "txcd_20060000" }, // verify code in Stripe Tax docs
        tax_behavior: "exclusive",
        ...(offer.mode === "subscription" ? { recurring: { interval: "month" as const } } : {}),
      },
    }],
    automatic_tax: { enabled: true },
    billing_address_collection: "required",
    tax_id_collection: { enabled: true },
    customer_creation: offer.mode === "payment" ? "always" : undefined,
    allow_promotion_codes: true,
    success_url: `${siteUrl()}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl()}/#work-with-me`,
    metadata: { offer: offer.slug },
  });
  return NextResponse.json({ url: session.url });
}
