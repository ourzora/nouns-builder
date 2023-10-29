const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()
const { withSentryConfig } = require('@sentry/nextjs')

const { NEXT_PUBLIC_SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT } = process.env

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ipfs-service', 'analytics', 'blocklist'],
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
      'ipfs.zora.co',
      'ipfs.decentralized-content.com',
    ],
  },
  async redirects() {
    const network =
      process.env.NEXT_PUBLIC_NETWORK_TYPE === 'testnet' ? 'goerli' : 'ethereum'

    return [
      {
        source: '/why',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/dao/:address(0x[0-9a-fA-F]{40})/:slug*',
        destination: `/dao/${network}/:address/:slug*`,
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

    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })

    //Tree-shake barrel files: https://github.com/vercel/next.js/issues/12557
    config.module.rules.push({
      test: [
        /src\/data\/contract\/abis\/index.ts/i,
        /(src\/components).*\index.ts$/,
        /(src\/modules).*\index.ts$/,
      ],
      sideEffects: false,
    })

    return {
      ...config,
      // Hot-fix for $RefreshReg issues: https://github.com/vanilla-extract-css/vanilla-extract/issues/679#issuecomment-1402839249
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

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const sentryEnabled = NEXT_PUBLIC_SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT
const enhancedConfig = withBundleAnalyzer(withVanillaExtract(nextConfig))

const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA(
  sentryEnabled
    ? withSentryConfig(enhancedConfig, sentryWebpackPluginOptions)
    : enhancedConfig
)
