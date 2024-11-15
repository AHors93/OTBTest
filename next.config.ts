import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['static.onthebeach.co.uk'], // Apparently images.domains is deprecated so this would be one to look into changing
  },
  reactStrictMode: false,
};

export default nextConfig;
