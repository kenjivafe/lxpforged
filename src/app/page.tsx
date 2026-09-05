import Link from "next/link";

import { ProductCard } from "@/components/shop/product-card";
import { getProducts } from "@/lib/shopify";
import type { Product } from "@/lib/shopify/types";

import styles from "./page.module.css";

export default async function HomePage() {
  // The build should not depend on Shopify credentials being present.
  let products: Product[] = [];
  let unavailable = false;

  try {
    products = await getProducts({ first: 8 });
  } catch {
    unavailable = true;
  }

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>LXP Forged</h1>
        <p className={styles.subtitle}>
          Placeholder copy. Replace with the brand statement once the CMS is wired up.
        </p>
        <Link href="/collections/all" className={styles.cta}>
          Shop all
        </Link>
      </section>

      {unavailable ? (
        <p className={styles.notice}>
          Catalogue unavailable — set <code>SHOPIFY_STORE_DOMAIN</code> and{" "}
          <code>SHOPIFY_STOREFRONT_ACCESS_TOKEN</code> in <code>.env.local</code>.
        </p>
      ) : products.length > 0 ? (
        <section>
          <h2 className={styles.sectionTitle}>Featured</h2>
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
