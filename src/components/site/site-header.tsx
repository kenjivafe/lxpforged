"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { mainNav } from "@/lib/site";

import { AccountIcon, BagIcon, MenuIcon, SearchIcon } from "./icons";
import { Logo } from "./logo";
import styles from "./site-header.module.css";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  // The header rounds into the announcement bar at rest, and squares off once
  // it sticks to the viewport edge. A zero-height sentinel just above it makes
  // that observable without listening to scroll.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} className={styles.sentinel} aria-hidden="true" />
      <header className={styles.header} data-stuck={stuck || undefined}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.menuButton}
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon />
        </button>

        <Link href="/" className={styles.brand} aria-label="LXP Forged — home">
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="Main">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/search" aria-label="Search">
            <SearchIcon />
          </Link>
          <Link href="/account" aria-label="Account">
            <AccountIcon />
          </Link>
          <Link href="/cart" aria-label="Bag">
            <BagIcon />
          </Link>
        </div>
      </div>

      {open ? (
        <nav className={styles.mobileNav} aria-label="Main">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
      </header>
    </>
  );
}
