import styles from "./marquee.module.css";

/**
 * Scrolling brand strip. The text is repeated four times so the track can loop
 * seamlessly at -50% regardless of viewport width.
 */
export function Marquee({ text }: { text: string }) {
  const repeats = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className={styles.marquee} aria-label={text}>
      <div className={styles.track} aria-hidden="true">
        {repeats.map((i) => (
          <span key={i} className={styles.item}>
            <span className={styles.mark}>LXP</span>
            <span className={styles.text}>{text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
