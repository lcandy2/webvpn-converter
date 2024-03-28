const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public'
})

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
})
