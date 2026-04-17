/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['pdf-parse'],
  turbopack: {
    resolveAlias: {
      canvas: { browser: '' },
      encoding: { browser: '' },
    },
  },
};

export default nextConfig;
