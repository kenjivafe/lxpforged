import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { AnnouncementBar } from "@/components/site/announcement-bar";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SocialRail } from "@/components/site/social-rail";

import "./globals.css";
import styles from "./layout.module.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luxury Performance Parts",
    template: "%s · LXP Forged",
  },
  description:
    "Forged performance parts for Ferrari, Lamborghini, McLaren, Rolls-Royce and more. Genuine brands, free shipping across the UAE, based in Dubai.",
};

// themeColor belongs on the viewport export, not metadata, since Next 13.4.
export const viewport: Viewport = {
  themeColor: "#171717",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AnnouncementBar />
        {/* The shell rounds into the dark announcement bar above and the dark
         * footer below, which is why <html> is painted ink rather than white. */}
        <div className={styles.shell}>
          <SiteHeader />
          {children}
        </div>
        <SiteFooter />
        <SocialRail />
      </body>
    </html>
  );
}
