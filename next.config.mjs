/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // Add this line
      },
    ],
    domains: ['images.unsplash.com'],  // Add Unsplash domain here
  },
};

export default nextConfig;
