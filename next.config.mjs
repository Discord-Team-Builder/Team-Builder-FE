/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.discordapp.com'],
      },
    devIndicators: false,
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      },
};


export default nextConfig;
