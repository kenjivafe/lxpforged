import "server-only";

/**
 * Thin Storefront API client.
 *
 * Uses `fetch` cache tags rather than `use cache`, because `use cache`
 * requires `cacheComponents: true` in next.config and this app has not
 * migrated to Cache Components. Tags are invalidated from the Shopify
 * webhook route at `app/api/revalidate`.
 */

export const TAGS = {
  products: "shopify-products",
  collections: "shopify-collections",
} as const;

const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2026-07";

/** Thrown for transport, HTTP, and GraphQL-level failures alike. */
export class ShopifyError extends Error {
  readonly query: string | undefined;
  readonly cause: unknown;

  constructor(message: string, options?: { query?: string; cause?: unknown }) {
    super(message);
    this.name = "ShopifyError";
    this.query = options?.query;
    this.cause = options?.cause;
  }
}

function endpoint(): string {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  if (!domain) {
    throw new ShopifyError(
      "SHOPIFY_STORE_DOMAIN is not set. Copy .env.example to .env.local and fill it in.",
    );
  }
  // Accept the domain with or without a scheme so either form in .env works.
  const host = domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `https://${host}/api/${API_VERSION}/graphql.json`;
}

/**
 * Which required Shopify variables are absent from the environment.
 *
 * Lets callers tell "not configured yet" apart from "configured, but Shopify
 * rejected the request" — the two need very different fixes, and conflating
 * them sends people to edit env files that are already correct.
 */
export function missingShopifyEnv(): string[] {
  const missing: string[] = [];
  if (!process.env.SHOPIFY_STORE_DOMAIN) missing.push("SHOPIFY_STORE_DOMAIN");
  return missing;
}

/**
 * The Storefront access token, when one is configured.
 *
 * Optional by design. Shopify serves public catalogue and cart operations to
 * unauthenticated Storefront requests, so the app stays functional without a
 * token — and sending a *wrong* token is worse than sending none, since that
 * is rejected with a 401 where an absent one is not.
 *
 * A real token is still the right end state: it is the documented path, it is
 * required for non-public data, and unauthenticated access is behaviour
 * Shopify could tighten. An empty string is treated as absent so a blank
 * dashboard variable doesn't produce an empty header.
 */
function accessToken(): string | undefined {
  return process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || undefined;
}

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export async function shopifyFetch<T>({
  query,
  variables,
  tags,
  cache,
  revalidate,
}: {
  query: string;
  variables?: Record<string, unknown>;
  /** Cache tags to attach. Omit for cart calls, which must never be cached. */
  tags?: string[];
  cache?: RequestCache;
  revalidate?: number;
}): Promise<T> {
  let response: Response;

  // Resolve configuration before the try, so a missing env var reports itself
  // rather than being wrapped as "could not reach the API".
  const url = endpoint();
  const token = accessToken();

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["X-Shopify-Storefront-Access-Token"] = token;

  try {
    response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      cache,
      ...(tags || revalidate !== undefined
        ? { next: { ...(tags ? { tags } : {}), ...(revalidate !== undefined ? { revalidate } : {}) } }
        : {}),
    });
  } catch (cause) {
    throw new ShopifyError("Could not reach the Shopify Storefront API.", { query, cause });
  }

  if (!response.ok) {
    // Read the body for context; Shopify puts useful detail in 4xx responses.
    const body = await response.text().catch(() => "");
    throw new ShopifyError(
      `Shopify responded ${response.status} ${response.statusText}. ${body.slice(0, 500)}`,
      { query },
    );
  }

  const json = (await response.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    throw new ShopifyError(json.errors.map((e) => e.message).join("; "), { query });
  }

  if (!json.data) {
    throw new ShopifyError("Shopify returned no data.", { query });
  }

  return json.data;
}
