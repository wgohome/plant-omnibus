/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    pageSize: 10,
  },
}

module.exports = nextConfig
