const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withTM = require('next-transpile-modules')(['ipfs-service', 'analytics'])
const withVanillaExtract = createVanillaExtractPlugin()
const { withSentryConfig } = require('@sentry/nextjs')

const { NEXT_PUBLIC_SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT } = process.env

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'api.zora.co',
      'zora-prod.mypinata.cloud',
      'nftstorage.link',
      'zora-dev.mypinata.cloud',
    ],
  },
  async redirects() {
    return [
      {
        source: '/why',
        destination: '/about',
        permanent: true,
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

/** @type {import('@sentry/nextjs').SentryWebpackPluginOptions} */
const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  dryRun: process.env.VERCEL_ENV !== 'production',
  include: '.next',
  ignore: ['node_modules'],
  urlPrefix: '~/_next',
}

const sentryEnabled = NEXT_PUBLIC_SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT
const enhancedConfig = withTM(withVanillaExtract(nextConfig))

module.exports = sentryEnabled
  ? withSentryConfig(enhancedConfig, sentryWebpackPluginOptions)
  : enhancedConfig
