// @ts-check
import withSerwistInit from '@serwist/next';
import million from 'million/compiler';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

const withSerwist = withSerwistInit({
  swSrc: './src/app/sw.ts',
  swDest: 'public/sw.js',
  cacheOnFrontEndNav: true,
  disable: process.env.NODE_ENV === 'development',
  scope: '/',
  register: true,
  reloadOnOnline: true,
  maximumFileSizeToCacheInBytes: 3000000
});

const millionConfig = {
  auto: true// if you're using RSC: auto: { rsc: true },
};

export default withSerwist({ nextConfig: million.next(nextConfig, millionConfig) });
