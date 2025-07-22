import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {}, 
  },
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
