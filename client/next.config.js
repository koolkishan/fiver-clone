/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8746",
      },
    ],
  },
  env: {
    SERVER_URL: "http://localhost:8746",
  },
};

module.exports = nextConfig;
