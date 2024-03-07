/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "export",
  images: {
    domains: ["i0.wp.com"],
    unoptimized: true,
  },
};

export default nextConfig;
