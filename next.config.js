/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['*.preview.vercel.app', 'localhost:3000', 'staging.acme-internal.dev'],
    },
  },
};

module.exports = nextConfig;
