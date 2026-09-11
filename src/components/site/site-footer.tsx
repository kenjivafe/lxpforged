import Link from "next/link";

import { contact, legalLinks, social } from "@/lib/site";

import { InstagramIcon, YouTubeIcon } from "./icons";
import { Logo } from "./logo";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.column}>
          <h2 className={styles.heading}>Contact</h2>
          <address className={styles.address}>
            {contact.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
          </address>
          <p className={styles.hours}>
            {contact.hours.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>

        <div className={styles.column}>
          <Logo inverted />
          <p className={styles.newsletterCopy}>
            Stay in the loop with our weekly newsletter
          </p>
          {/* Newsletter submission is not wired up yet — it needs a marketing
           * destination (Shopify Customer or the CMS) chosen first. */}
          <form className={styles.newsletter} action="/api/newsletter" method="post">
            <label className={styles.srOnly} htmlFor="footer-email">
              Email
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className={styles.input}
            />
            <button type="submit" className={styles.submit}>
              Sign up
            </button>
          </form>
        </div>

        <div className={styles.column}>
          <h2 className={styles.heading}>Follow</h2>
          <div className={styles.socials}>
            <a href={social.instagram} target="_blank" rel="noreferrer">
              <InstagramIcon /> Instagram
            </a>
            <a href={social.youtube} target="_blank" rel="noreferrer">
              <YouTubeIcon /> YouTube
            </a>
          </div>
        </div>
      </div>

      <div className={styles.legal}>
        <p>&copy; {new Date().getFullYear()} Luxury Performance Parts</p>
        <nav aria-label="Legal">
          {legalLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
