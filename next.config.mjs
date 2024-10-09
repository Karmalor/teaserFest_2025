/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/a/<APP_ID>/*",
      },
      {
        protocol: "https",
        hostname: "userAgentFromString.io",
        port: "",
      },
    ],
    domains: ["utfs.io"],
  },
};

export default nextConfig;
