// @ts-check
import withPWAInit from '@ducanh2912/next-pwa';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withPWA = withPWAInit({
  dest: 'public',
});

export default withPWA({ nextConfig });
