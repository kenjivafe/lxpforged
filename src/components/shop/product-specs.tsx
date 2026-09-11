import Image from "next/image";

import type { ProductSpec } from "@/lib/shopify/types";

import styles from "./product-specs.module.css";

/**
 * The "Highlights" card — brand, model and category chips driven by the
 * custom.product_icons metaobjects. Renders nothing when the storefront token
 * lacks unauthenticated_read_metafields, since the specs arrive empty.
 */
export function ProductSpecs({ specs }: { specs: ProductSpec[] }) {
  if (specs.length === 0) return null;

  return (
    <section className={styles.card} aria-labelledby="highlights">
      <h2 className={styles.heading} id="highlights">
        Highlights
      </h2>
      <ul className={styles.list}>
        {specs.map((spec) => (
          <li key={spec.id} className={styles.chip}>
            {spec.icon ? (
              <Image
                src={spec.icon.url}
                alt=""
                width={spec.icon.width}
                height={spec.icon.height}
                className={styles.icon}
                sizes="28px"
              />
            ) : null}
            <span className={styles.text}>
              <span className={styles.title}>{spec.title}</span>
              <span className={styles.description}>{spec.description}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
