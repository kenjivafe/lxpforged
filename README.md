# LXP Forged storefront

A headless Shopify storefront built on Next.js 16 (App Router).

## What replaces what

| Concern | Where it lives now |
| --- | --- |
| Catalogue, inventory, variants, prices | Shopify (read via Storefront API) |
| Cart | Shopify cart objects, cart id in an httpOnly cookie |
| Checkout, payments, tax, shipping, orders | Shopify hosted checkout |
| Page rendering, routing, SEO, design | This Next.js app |
| Marketing pages, editorial content | Payload CMS — **not built yet, see below** |

Keeping checkout on Shopify means no card data, PCI scope, or tax engine ever
touches this app. Visitors are handed off at the `checkoutUrl` the Cart API
returns.

## Setup

1. `cp .env.example .env.local` and fill in the Shopify values. The Storefront
   access token comes from *Settings → Apps and sales channels → Develop apps*
   — create an app, tick the Storefront API scopes listed in `.env.example`,
   install it, then copy the token from the app's *API credentials* tab.
   Adding the Headless sales channel is an equivalent route and issues the
   token for you.
2. `npm install`
3. `npm run dev`

`SHOPIFY_STOREFRONT_ACCESS_TOKEN` is optional: Shopify serves public catalogue
and cart operations to unauthenticated Storefront requests, and this store does
so today. Leave it empty rather than wrong — an invalid token is rejected with a
401, whereas an absent one is not. Setting a real token is still the right end
state, since it is the documented path and unauthenticated access is behaviour
Shopify could tighten.

Without `SHOPIFY_STORE_DOMAIN` the app still builds; catalogue routes simply
render on demand and error at request time rather than being prerendered.

## Routes

- `/collections/all` — full catalogue
- `/collections/[handle]` — a Shopify collection
- `/products/[handle]` — product detail, with variant selection and JSON-LD
- `/cart` — bag and hand-off to Shopify checkout
- `/api/revalidate` — Shopify webhook receiver (HMAC-verified)

Product and collection pages are prerendered via `generateStaticParams`. The
cart is `force-dynamic` because it is cookie-derived and per-visitor.

## Cache invalidation

Catalogue reads are tagged `shopify-products` / `shopify-collections`. Point
Shopify webhooks for `products/*` and `collections/*` at `/api/revalidate` and
set `SHOPIFY_WEBHOOK_SECRET` to the signing secret. The route verifies the
`x-shopify-hmac-sha256` signature before revalidating; unsigned requests get a
401 and unknown topics are acknowledged without action so Shopify stops
retrying.

Note that Next 16 requires a cacheLife profile as the second argument to
`revalidateTag`.

## Next.js 16 specifics worth knowing

- `params` and `searchParams` are Promises and must be awaited.
- `middleware.ts` is now `proxy.ts`; the `edge` runtime is not supported there.
- `images.domains` is deprecated — Shopify's CDN is allowed via
  `images.remotePatterns` in `next.config.ts`.
- `images.qualities` now defaults to `[75]`; add other values explicitly if a
  `quality` prop needs them.
- `use cache` requires `cacheComponents: true`, which this app has not enabled,
  so caching is done with `fetch` tags instead.

## Still to do

**Payload CMS is not wired up yet.** It needs a hosting decision first, because
Payload requires its own database:

- a Postgres instance (Neon, Supabase, RDS, or self-hosted), and
- `DATABASE_URI` + `PAYLOAD_SECRET` in the environment.

Once that exists, the intended shape is Payload collections for `Pages`,
`Media`, and a `ProductContent` overlay keyed by Shopify product handle — so
editors can add editorial copy, lookbook imagery, and landing pages without
duplicating the catalogue, which stays owned by Shopify.

Also outstanding:

- Search, pagination, and collection sorting.
- Visual design. The current pages are deliberately plain and unstyled beyond
  layout basics; they are working commerce, not a reproduction of the existing
  theme.
