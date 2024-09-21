// next.config.js

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "alrajhost.com",
      },
      {
        protocol: "https",
        hostname: "blbl.store", // أضف الواجهة الأمامية هنا
      },
    ],
  },
};
