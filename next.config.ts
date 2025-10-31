// next.config.ts
import type { NextConfig } from "next";
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "feapcnfddxqiecvepmnc.supabase.co" },
    ],
  },
  reactCompiler: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
  turbopack: {

  },
};

export default nextConfig;
