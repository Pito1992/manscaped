/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  images: {
    disableStaticImages: true,
    domains: [
      '/',
      'localhost'
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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    })

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [{
                name: 'preset-default',
                params: {
                  overrides: { removeViewBox: false },
                },
              }],
            },
          },
        },
      ],
    });

    return config;
  }
}

module.exports = nextConfig;