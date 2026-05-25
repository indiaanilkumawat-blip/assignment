import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Required for Vercel deployment
  experimental: {},
  // Ensure environment variables are available
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
};

export default nextConfig;
