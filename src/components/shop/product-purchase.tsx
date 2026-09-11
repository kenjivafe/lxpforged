"use client";

import { useState } from "react";

import { formatMoney, isOnSale } from "@/lib/shopify/money";
import type { Product } from "@/lib/shopify/types";

import { AddToCart } from "./add-to-cart";
import styles from "./product-purchase.module.css";

/** Finds the variant whose options exactly match the current selection. */
function matchVariant(product: Product, selection: Record<string, string>) {
  return product.variants.find((variant) =>
    variant.selectedOptions.every((option) => selection[option.name] === option.value),
  );
}

export function ProductPurchase({ product }: { product: Product }) {
  // Default to the first available variant so the price shown is purchasable.
  const initialVariant =
    product.variants.find((variant) => variant.availableForSale) ?? product.variants[0];

  const [selection, setSelection] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      (initialVariant?.selectedOptions ?? []).map((option) => [option.name, option.value]),
    ),
  );

  const variant = matchVariant(product, selection);
  const price = variant?.price ?? product.priceRange.minVariantPrice;
  const compareAt = variant?.compareAtPrice ?? null;

  // Options with a single value carry no choice; Shopify emits a synthetic
  // "Title: Default Title" option for products that have no real variants.
  const realOptions = product.options.filter(
    (option) => option.values.length > 1 || option.name !== "Title",
  );

  return (
    <div className={styles.root}>
      {product.label ? (
        <p
          className={styles.label}
          // The theme stores the pill colour per product, so it has to be an
          // inline style rather than a token.
          style={product.labelColor ? { background: product.labelColor } : undefined}
        >
          {product.label}
        </p>
      ) : null}

      <p className={styles.vendor}>{product.vendor}</p>
      <h1 className={styles.title}>{product.title}</h1>

      <p className={styles.price}>
        <span>{formatMoney(price)}</span>
        {isOnSale(price, compareAt) && compareAt ? (
          <s className={styles.compareAt}>{formatMoney(compareAt)}</s>
        ) : null}
      </p>

      <p className={styles.shipping}>
        <span className={styles.shippingLink}>Shipping</span> calculated at checkout.
      </p>

      {variant?.sku ? <p className={styles.sku}>{variant.sku}</p> : null}

      {realOptions.map((option) => (
        <fieldset key={option.id} className={styles.fieldset}>
          <legend className={styles.legend}>
            {option.name}: <span className={styles.legendValue}>{selection[option.name]}</span>
          </legend>
          <div className={styles.options}>
            {option.values.map((value) => {
              const candidate = matchVariant(product, {
                ...selection,
                [option.name]: value,
              });
              const unavailable = !candidate?.availableForSale;
              const selected = selection[option.name] === value;

              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected}
                  className={styles.option}
                  data-selected={selected || undefined}
                  data-unavailable={unavailable || undefined}
                  onClick={() =>
                    setSelection((current) => ({ ...current, [option.name]: value }))
                  }
                >
                  {value}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <AddToCart variant={variant} />

      {product.specialOrder ? (
        <aside className={styles.specialOrder}>
          <h2 className={styles.specialOrderHeading}>Special order item!</h2>
          <p>
            This product is ordered directly from the manufacturer and is not
            stocked locally. Estimated lead time: 4&ndash;6 weeks.
          </p>
          <p>
            Once confirmed, special order items cannot be cancelled, returned, or
            refunded.
          </p>
        </aside>
      ) : null}
    </div>
  );
}
