/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8747",
      },
    ],
  },
  env: {
    SERVER_URL: "http://localhost:8747",
  },
};

module.exports = nextConfig;
