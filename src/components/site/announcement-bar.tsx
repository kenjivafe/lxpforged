"use client";

import { useEffect, useState } from "react";

import { announcements, social } from "@/lib/site";

import { ArrowLeftIcon, ArrowRightIcon, InstagramIcon, YouTubeIcon } from "./icons";
import styles from "./announcement-bar.module.css";

const ROTATE_MS = 6000;

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const count = announcements.length;

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearInterval(id);
  }, [count]);

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <div className={styles.bar}>
      <div className={styles.social}>
        <a href={social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
          <InstagramIcon />
        </a>
        <a href={social.youtube} aria-label="YouTube" target="_blank" rel="noreferrer">
          <YouTubeIcon />
        </a>
      </div>

      <div className={styles.rotator}>
        {count > 1 ? (
          <button type="button" onClick={() => go(-1)} aria-label="Previous announcement">
            <ArrowLeftIcon />
          </button>
        ) : null}
        {/* Announcements rotate on a timer, so changes must be announced
         * politely rather than interrupting whatever a screen reader is on. */}
        <p className={styles.message} aria-live="polite">
          {announcements[index]}
        </p>
        {count > 1 ? (
          <button type="button" onClick={() => go(1)} aria-label="Next announcement">
            <ArrowRightIcon />
          </button>
        ) : null}
      </div>

      <div className={styles.spacer} aria-hidden="true" />
    </div>
  );
}
