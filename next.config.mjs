// @ts-check
import withPWAInit, { runtimeCaching } from '@ducanh2912/next-pwa';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withPWA = withPWAInit({
  cacheOnFrontendNav: true,
  aggressiveFrontEndNavCaching: true,
  cacheStartUrl: true,
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  scope: '/',
  register: true,
  reloadOnOnline: false,
  skipWaiting: true,
  maximumFileSizeToCacheInBytes: 3000000,
});

export default withPWA({ nextConfig });
