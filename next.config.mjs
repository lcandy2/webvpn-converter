// @ts-check
import withSerwistInit from '@serwist/next';
import million from 'million/compiler';
import withLitSSR from '@lit-labs/nextjs';
import withBundleAnalyzer from '@next/bundle-analyzer';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
};

const withSerwist = withSerwistInit({
  swSrc: './src/app/sw.ts',
  swDest: 'public/sw.js',
  cacheOnNavigation: true,
  disable: process.env.NODE_ENV === 'development',
  scope: '/',
  register: true,
  reloadOnOnline: true,
  maximumFileSizeToCacheInBytes: 3000000,
});

const millionConfig = {
  auto: true, // if you're using RSC: auto: { rsc: true },
};

// if withLitSSR is in the withSerwist, it will not work

const config = withLitSSR(withSerwist(million.next(nextConfig, millionConfig)));

export default process.env.ANALYZE === 'true'
  ? withBundleAnalyzer(config)
  : config;
