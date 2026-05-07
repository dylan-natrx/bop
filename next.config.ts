import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable static export if needed later
  // output: 'export',

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
