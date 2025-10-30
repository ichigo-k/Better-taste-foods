import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.pexels.com", "picsum.photos", "feapcnfddxqiecvepmnc.supabase.co"],
  },
  reactCompiler: true,
  experimental: {
    runtime: "nodejs",
  },
};

export default nextConfig;
