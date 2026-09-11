/**
 * Site content that is not owned by Shopify.
 *
 * Everything here is destined for Payload once the CMS is wired up (see the
 * README) — it is typed and centralised so that swapping the source is a
 * change of one module, not a hunt through JSX.
 */

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Shop", href: "/collections/all" },
  { label: "Brands", href: "/collections/brand-novitec" },
  { label: "Installation", href: "/pages/installation" },
  { label: "About", href: "/pages/about" },
  { label: "Contact", href: "/pages/contact" },
];

export const announcements: string[] = [
  "Any questions? Visit our contact page!",
  "Free shipping across the UAE",
  "100% genuine performance parts",
];

export const social = {
  instagram: "https://www.instagram.com/lxpforged/",
  youtube: "https://www.youtube.com/@lxpforged",
  handle: "@lxpforged",
} as const;

export const contact = {
  addressLines: [
    "4th Street, Al Qouz Industrial 3, 500001",
    "Al Quoz Dubai, UAE",
  ],
  email: "info@lxpforged.com",
  phone: "+971 56 515 5886",
  hours: ["Monday – Sunday", "10:00 AM – 8:00 PM"],
} as const;

export const legalLinks: NavItem[] = [
  { label: "Privacy policy", href: "/policies/privacy-policy" },
  { label: "Terms of service", href: "/policies/terms-of-service" },
  { label: "Refund policy", href: "/policies/refund-policy" },
  { label: "Shipping policy", href: "/policies/shipping-policy" },
];

/** Marketing assets live on the storefront domain's Shopify CDN path. */
const CDN = "https://lxpforged.com/cdn/shop/files";

/**
 * The winged LXP lockup, in two variants.
 *
 * `light` is the full lockup with the tagline, rendered at the live header's
 * 150x68. Its background is opaque white — fine on the white header, a visible
 * box anywhere dark — so the ink footer uses `dark`, the genuinely transparent
 * mark, knocked out to white with a filter.
 */
export const logo = {
  light: {
    src: `${CDN}/Screenshot_2026-03-11_at_23.48.54.png`,
    width: 1758,
    height: 800,
  },
  dark: {
    src: `${CDN}/LXP_transparent.png`,
    width: 1024,
    height: 381,
  },
  alt: "LXP \u2014 Luxury Performance Parts",
} as const;

export type Slide = {
  heading: string;
  ctaLabel: string;
  href: string;
  image: string;
  alt: string;
};

export const heroSlides: Slide[] = [
  {
    heading: "Dubai's Leading Source for Novitec Performance",
    ctaLabel: "Shop Novitec",
    href: "/collections/brand-novitec",
    image: `${CDN}/Screenshot_2026-01-29_at_12.37.33.png`,
    alt: "Novitec-tuned supercar",
  },
  {
    heading: "The Official TechArt Destination in the United Arab Emirates!",
    ctaLabel: "Discover TechArt",
    href: "/collections/techart",
    image: `${CDN}/Screenshot_2026-06-05_at_14.43.54.png`,
    alt: "TechArt-tuned Porsche 911 in a white studio",
  },
];

export type Partner = {
  name: string;
  href: string;
  logo: string;
  /** Intrinsic dimensions, so next/image can reserve space without CLS. */
  width: number;
  height: number;
};

export const partners: Partner[] = [
  {
    name: "V\u00f6ltrix",
    href: "/collections/all",
    logo: `${CDN}/PHOTO-2026-06-30-11-50-26.jpg`,
    width: 1600,
    height: 260,
  },
  {
    name: "Valvetronic Designs",
    href: "/collections/all",
    logo: `${CDN}/Screenshot_2026-06-26_at_12.10.56.png`,
    width: 2468,
    height: 882,
  },
  {
    name: "Novitec",
    href: "/collections/brand-novitec",
    logo: `${CDN}/novitec-logo-png_seeklogo-249678.png`,
    width: 600,
    height: 316,
  },
  {
    name: "TechArt",
    href: "/collections/techart",
    logo: `${CDN}/TECHART_Lettering.png`,
    width: 2406,
    height: 234,
  },
  {
    name: "Fi Exhaust",
    href: "/collections/all",
    logo: `${CDN}/Screenshot_2026-05-16_at_17.44.51.png`,
    width: 1204,
    height: 838,
  },
  {
    name: "Gintani",
    href: "/collections/all",
    logo: `${CDN}/gintani_logo.png`,
    width: 2192,
    height: 664,
  },
  {
    name: "Liberty Walk",
    href: "/collections/all",
    logo: `${CDN}/liberty-walk-seeklogo.png`,
    width: 1600,
    height: 2000,
  },
];

export const marqueeText = "100% Genuine Parts";
