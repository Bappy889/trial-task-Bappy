/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["lh3.googleusercontent.com", "i.pravatar.cc"],
  },   
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    config.resolve.fallback = {
      "mongodb-client-encryption": false,
      aws4: false,
    };

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

// module.exports = nextConfig;
export default nextConfig;
