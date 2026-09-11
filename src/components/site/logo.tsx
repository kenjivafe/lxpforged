import Image from "next/image";

import { logo } from "@/lib/site";

import styles from "./logo.module.css";

/**
 * The winged LXP lockup. `inverted` swaps to the transparent mark and knocks
 * it out to white, because the header artwork carries an opaque white
 * background that would show as a box on the ink footer.
 */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  const art = inverted ? logo.dark : logo.light;

  return (
    <Image
      src={art.src}
      alt={logo.alt}
      width={art.width}
      height={art.height}
      className={`${styles.logo} ${inverted ? styles.inverted : ""}`}
      sizes="150px"
      priority={!inverted}
    />
  );
}
