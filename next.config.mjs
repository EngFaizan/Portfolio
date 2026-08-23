/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 35 is the ambient hero backdrop, which is blurred to 52px and never
    // needs detail. 75 is Next's default, used for the avatar plate itself.
    qualities: [35, 75],
  },
};

export default nextConfig;
