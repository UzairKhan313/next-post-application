/** @type {import('next').NextConfig} */
// const nextConfig = {};

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};
export default nextConfig;
