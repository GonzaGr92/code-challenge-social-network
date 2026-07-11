import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./styles'], // Allows importing from a central styles directory without nesting paths
  },
}

export default nextConfig
