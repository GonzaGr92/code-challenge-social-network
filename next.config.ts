import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./styles'], // Allows importing from a central styles directory without nesting paths
  },
  basePath: process.env.PAGES_BASE_PATH,
  output: 'export',
}

export default nextConfig
