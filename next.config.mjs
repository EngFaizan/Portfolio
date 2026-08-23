/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The blurred hero backdrop that needed quality 35 is gone — a cut-out
    // portrait has no room to defocus — so only Next's default remains.
    qualities: [75],
  },
};

export default nextConfig;
