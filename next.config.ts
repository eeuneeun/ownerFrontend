import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // TS 오류 무시
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint 오류 무시
  },
};

export default nextConfig;
