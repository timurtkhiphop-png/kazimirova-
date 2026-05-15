import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  webpack(config) {
    config.resolve.alias['@/sanity/client'] = path.resolve(__dirname, 'Sanity/client.ts')
    config.resolve.alias['@/sanity/queries'] = path.resolve(__dirname, 'Sanity/queries.ts')
    config.resolve.alias['@/sanity/image'] = path.resolve(__dirname, 'Sanity/image.ts')
    config.resolve.alias['@/sanity/env'] = path.resolve(__dirname, 'Sanity/env.ts')
    return config
  },
}

export default nextConfig
