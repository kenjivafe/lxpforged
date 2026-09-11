import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product imagery is served from Shopify's CDN. `images.domains` is
    // deprecated in Next 16, so this must be remotePatterns.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
      {
        // Theme/marketing assets (hero slides, partner logos) are served from
        // the storefront domain's CDN path rather than cdn.shopify.com.
        protocol: "https",
        hostname: "lxpforged.com",
        pathname: "/cdn/shop/**",
      },
    ],
  },
};

export default nextConfig;
