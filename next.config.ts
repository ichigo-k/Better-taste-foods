import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.pexels.com", "picsum.photos"],
  },
  reactCompiler: true,
};

export default nextConfig;
