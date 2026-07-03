import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // SECURITY: do NOT list MONGODB_URI / JWT_SECRET / ADMIN_PASSWORD in an
  // `env` block here — that inlines them into the built JS bundles.
  // Server code reads them from process.env at runtime on Vercel.
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
