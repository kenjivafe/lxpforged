import styles from "./logo.module.css";

/**
 * The wordmark stands in for the winged LXP logotype until the real asset is
 * available as an SVG; it keeps the same two-line lockup and proportions so
 * swapping it does not shift the header layout.
 */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`${styles.logo} ${inverted ? styles.inverted : ""}`}>
      <span className={styles.mark}>LXP</span>
      <span className={styles.tagline}>Luxury Performance Parts</span>
    </span>
  );
}
