import type { NextConfig } from "next";

const nextConfig: NextConfig = {

   typescript: {
    ignoreBuildErrors: true
  },

  eslint: {
    ignoreDuringBuilds: true
  },

  images: { 
    remotePatterns: [
      { hostname: 'github.com'}
    ]
  }
  /* config options here */
};

export default nextConfig;
