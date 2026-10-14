import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// Private endpoint: POST { email, name, description, amount (cents) } with header x-admin-token.
export async function POST(req: Request) {
  if (req.headers.get("x-admin-token") !== process.env.ADMIN_TOKEN || !process.env.ADMIN_TOKEN)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { email, name, description, amount } = await req.json();
  if (!email || !description || !Number.isInteger(amount) || amount <= 0)
    return NextResponse.json({ error: "email, description and integer amount required" }, { status: 400 });

  const s = stripe();
  const existing = await s.customers.list({ email, limit: 1 });
  const customer = existing.data[0] ?? (await s.customers.create({ email, name }));
  await s.invoiceItems.create({ customer: customer.id, amount, currency: "usd", description });
  const draft = await s.invoices.create({
    customer: customer.id,
    collection_method: "send_invoice",
    days_until_due: 14,
    automatic_tax: { enabled: true },
    pending_invoice_items_behavior: "include",
  });
  const final = await s.invoices.finalizeInvoice(draft.id);
  await s.invoices.sendInvoice(final.id);
  return NextResponse.json({ id: final.id, url: final.hosted_invoice_url });
}
