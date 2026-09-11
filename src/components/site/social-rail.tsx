import Link from "next/link";

import { social } from "@/lib/site";

import { InstagramIcon, YouTubeIcon } from "./icons";
import styles from "./social-rail.module.css";

/** Fixed pill rail on the right edge, mirroring the live site's chrome. */
export function SocialRail() {
  return (
    <div className={styles.rail}>
      <a href={social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
        <InstagramIcon />
      </a>
      <a href={social.youtube} aria-label="YouTube" target="_blank" rel="noreferrer">
        <YouTubeIcon />
      </a>
      <Link href="/pages/contact" className={styles.ask}>
        Any questions?
      </Link>
    </div>
  );
}
