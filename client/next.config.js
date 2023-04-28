/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://fiver-clone-server-r4nu9.kinsta.app",
      },
    ],
  },
  env: {
    SERVER_URL: "https://fiver-clone-server-r4nu9.kinsta.app",
  },
};

module.exports = nextConfig;
