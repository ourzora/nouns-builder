const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()
const { withSentryConfig } = require('@sentry/nextjs')

const { NEXT_PUBLIC_SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT } = process.env

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ipfs-service', 'analytics'],
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
  webpack(config, { dev }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    // Hot-fix for $RefreshReg issues: https://github.com/vanilla-extract-css/vanilla-extract/issues/679#issuecomment-1402839249
    return {
      ...config,
      mode: dev ? 'production' : config.mode,
    }
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
const enhancedConfig = withVanillaExtract(nextConfig)

module.exports = sentryEnabled
  ? withSentryConfig(enhancedConfig, sentryWebpackPluginOptions)
  : enhancedConfig
