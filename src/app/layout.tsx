import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: {
    default: "LXP Forged",
    template: "%s · LXP Forged",
  },
  description: "LXP Forged online store.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <Link href="/" className={styles.wordmark}>
            LXP Forged
          </Link>
          <nav className={styles.nav}>
            <Link href="/collections/all">Shop</Link>
            <Link href="/cart">Bag</Link>
          </nav>
        </header>

        {children}

        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} LXP Forged</p>
        </footer>
      </body>
    </html>
  );
}
