/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  images: {
    disableStaticImages: false,
    domains: [
      '/',
    ],
    deviceSizes: [320, 768, 1024, 1280, 1440],
  },
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
  env: {},
  sassOptions: {
    includePaths: ['./styles', './pages', './components'],
  },
}

module.exports = nextConfig;