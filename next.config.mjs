/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["utfs.io"],

    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "userAgentFromString.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
