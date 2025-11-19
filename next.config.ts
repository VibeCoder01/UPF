import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.openfoodfacts.org",
      },
    ],
  },
};

export default nextConfig;
