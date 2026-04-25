import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/grow-more",
  output: "export",
  images: {
    minimumCacheTTL: 31536000,
    unoptimized: true,
  }
};

export default nextConfig;
