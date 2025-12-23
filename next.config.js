/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
  // Transpile recharts to fix SSR issues
  transpilePackages: ['recharts'],
  // Webpack configuration for recharts
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'recharts': require.resolve('recharts'),
    };
    return config;
  },
}

module.exports = nextConfig

