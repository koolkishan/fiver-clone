/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: "http://localhost:3886",
  },
};

module.exports = nextConfig;
