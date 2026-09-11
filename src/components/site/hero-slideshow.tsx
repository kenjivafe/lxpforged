"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { Slide } from "@/lib/site";

import { ArrowLeftIcon, ArrowRightIcon } from "./icons";
import styles from "./hero-slideshow.module.css";

const ROTATE_MS = 7000;

export function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearInterval(id);
  }, [count]);

  if (count === 0) return null;

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <section className={styles.hero} aria-roledescription="carousel">
      {slides.map((slide, i) => (
        <div
          key={slide.href + i}
          className={styles.slide}
          data-active={i === index}
          // `inert` rather than bare `aria-hidden`: an aria-hidden subtree that
          // still contains focusable links is an a11y violation, and the
          // off-screen slides each carry a CTA.
          inert={i !== index}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            // The hero is the LCP element on the homepage, so the first slide
            // must not be lazy-loaded.
            priority={i === 0}
            sizes="100vw"
            className={styles.image}
          />
          <div className={styles.overlay}>
            <h1 className={styles.heading}>{slide.heading}</h1>
            <Link href={slide.href} className={styles.cta}>
              {slide.ctaLabel}
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      ))}

      {count > 1 ? (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.prev}`}
            onClick={() => go(-1)}
            aria-label="Previous slide"
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.next}`}
            onClick={() => go(1)}
            aria-label="Next slide"
          >
            <ArrowRightIcon />
          </button>
          <div className={styles.dots}>
            {slides.map((slide, i) => (
              <button
                key={slide.href + i}
                type="button"
                className={styles.dot}
                data-active={i === index}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
