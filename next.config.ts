import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "feapcnfddxqiecvepmnc.supabase.co" },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
