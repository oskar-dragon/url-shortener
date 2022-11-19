/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['sangw.in', 'localhost', 'picsum.photos', 's.gravatar.com'], // <== Domain name
  },
};

module.exports = nextConfig;
