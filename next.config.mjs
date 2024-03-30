// @ts-check
import withSerwistInit from '@serwist/next';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withSerwist = withSerwistInit({
  swSrc: './src/app/sw.ts',
  swDest: 'public/sw.js',
  cacheOnFrontEndNav: true,
  disable: process.env.NODE_ENV === 'development',
  scope: '/',
  register: true,
  reloadOnOnline: true,
  maximumFileSizeToCacheInBytes: 3000000,
});

export default withSerwist({ nextConfig });
