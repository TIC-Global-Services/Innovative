import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'ik.imagekit.io',
      'images.unsplash.com', // Add Unsplash domain
      'source.unsplash.com' // Also include source.unsplash.com if needed
    ],
  },
};

export default nextConfig;