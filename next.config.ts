import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {},
  },

  // Next 16 enables Turbopack by default; this avoids the "webpack config + no turbopack config" error
  turbopack: {},
};

export default nextConfig;
