# Stripe plan for muhaimin.dev

Written from Stripe's llms.txt guidance. The `stripe_implementation_planner` MCP tool was not available when this was generated, so re-run it once https://mcp.stripe.com is connected and compare.

| Product | Fit | What the code does |
|---|---|---|
| Payments | Yes | `/api/checkout` creates a hosted Checkout Session (`mode: payment`) for the AI sprint. Prices live on the server only. |
| Billing | Yes | Same route with `mode: subscription` for the retainer. Add the Customer Portal later so clients manage cancellations. |
| Invoicing | Yes | `/api/invoice` (private, `x-admin-token`) creates, finalizes and emails an invoice for custom work. |
| Tax | Yes | `automatic_tax` on Checkout and invoices, plus tax ID collection. Needs your head-office address and registrations in the Dashboard. |
| Connect | Not yet | A solo portfolio does not move money between parties. Revisit for SuprBuild Mesh or Krostio, using the Accounts v2 API (`/v2/core/accounts`) and destination charges. |

## Before going live
1. Use a Stripe sandbox, set the env vars from `.env.example`.
2. `stripe listen --forward-to localhost:3000/api/webhook`, copy the `whsec_` secret.
3. Test with card 4242 4242 4242 4242.
4. Confirm your Stripe account entity and payout country are supported (SuprBuild, LLC in Wyoming is a US entity; Stripe does not onboard Bangladesh-based businesses directly).
5. Replace placeholder prices in `lib/data.ts`; verify the tax code in `/api/checkout` against Stripe's product tax code list.
6. Persist webhook event IDs before fulfilling anything.
