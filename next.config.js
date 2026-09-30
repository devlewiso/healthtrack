/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportación estática para servirse en Cloudflare Workers (migrado desde Netlify).
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
    ],
  },
};

module.exports = nextConfig;
