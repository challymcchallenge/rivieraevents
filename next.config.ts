import type { NextConfig } from 'next';

// ADR-004: puține dimensiuni declarate, ca să rămânem sub 5.000 de transformări pe lună pe Hobby.
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [256, 384],
    minimumCacheTTL: 2678400,
  },
  poweredByHeader: false,
};

export default nextConfig;
