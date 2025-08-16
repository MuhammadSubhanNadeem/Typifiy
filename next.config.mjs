// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.snapshot = {
      ...config.snapshot,
      managedPaths: [],
    };
    return config;
  },
};

export default nextConfig;
