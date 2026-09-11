import Image from "next/image";
import Link from "next/link";

import { HeroSlideshow } from "@/components/site/hero-slideshow";
import { ArrowRightIcon } from "@/components/site/icons";
import { Marquee } from "@/components/site/marquee";
import { ProductCard } from "@/components/shop/product-card";
import { getProducts } from "@/lib/shopify";
import { missingShopifyEnv } from "@/lib/shopify/client";
import type { Product } from "@/lib/shopify/types";
import { heroSlides, marqueeText, partners } from "@/lib/site";

import styles from "./page.module.css";

export default async function HomePage() {
  // The build should not depend on Shopify credentials being present.
  let products: Product[] = [];
  let failure: string | null = null;

  try {
    products = await getProducts({ first: 8 });
  } catch (error) {
    const missing = missingShopifyEnv();
    failure = missing.length
      ? `Not configured — ${missing.join(" and ")} missing from this environment.`
      : "Shopify rejected the catalogue request. The variables are set, so check the token and its scopes.";
    // The client builds precise messages (HTTP status, Shopify's own error
    // text); surface them in the server log instead of swallowing them.
    console.error("Catalogue fetch failed:", error);
  }

  return (
    <main>
      <HeroSlideshow slides={heroSlides} />

      <section className={styles.section}>
        <h2 className={styles.centeredHeading}>Authorized Partners</h2>
        <ul className={styles.partners}>
          {partners.map((partner) => (
            <li key={partner.name}>
              <Link href={partner.href} className={styles.partner} title={partner.name}>
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className={styles.partnerLogo}
                  sizes="180px"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${styles.section} ${styles.split}`}>
        <h2 className={styles.splitHeading}>
          Performance
          <br />
          without
          <br />
          Compromise
        </h2>
        <div className={styles.splitBody}>
          <p className={styles.lede}>Welcome to Luxury Performance Parts!</p>
          <p>
            We specialize in <strong>100% genuine performance parts</strong>{" "}
            for the world&rsquo;s most exclusive supercars and luxury vehicles. Located in{" "}
            <strong>Dubai, UAE</strong>, we are a trusted source for brands like
            Novitec, TechArt and FI Exhaust supplying expertly engineered exhaust
            systems, carbon aerodynamics, wheels, and suspension solutions for
            Ferrari, Lamborghini, McLaren, Rolls-Royce, and more.
          </p>
          <p>
            From product selection to installation support, we deliver precision,
            quality, and performance without compromise.
          </p>
          <Link href="/pages/about" className={styles.textLink}>
            Our Story
            <ArrowRightIcon />
          </Link>
        </div>
      </section>

      <Marquee text={marqueeText} />

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionHeading}>Featured</h2>
          <Link href="/collections/all" className={styles.textLink}>
            Check out all products
            <ArrowRightIcon />
          </Link>
        </div>

        {failure ? (
          <p className={styles.notice}>
            Catalogue unavailable. {failure} See the server log for the exact
            error.
          </p>
        ) : products.length > 0 ? (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
