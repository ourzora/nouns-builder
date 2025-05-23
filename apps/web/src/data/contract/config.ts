import { farcasterFrame as miniAppConnector } from '@farcaster/frame-wagmi-connector'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { CreateConnectorFn, createConfig } from 'wagmi'

import { PUBLIC_WALLLET_CONNECT_PROJECT_ID } from 'src/constants/walletconnect'

import { chains, transports } from './chains'

const appName = 'Nouns Builder'
const appDescription = 'Nouns Builder'
const appUrl = 'https://nouns.build'
const appIcon = ''

const metadata = {
  name: appName,
  description: appDescription ?? appName,
  url: appUrl ?? (typeof window !== 'undefined' ? window.location.origin : ''),
  icons: [...(appIcon ? [appIcon] : [])],
}

const rainbowConnectors = connectorsForWallets(
  [
    {
      groupName: 'Popular',
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        coinbaseWallet,
        walletConnectWallet,
        injectedWallet,
        ledgerWallet,
        safeWallet,
      ],
    },
  ],
  {
    projectId: PUBLIC_WALLLET_CONNECT_PROJECT_ID,
    appName,
    appDescription,
    appUrl,
    appIcon,
    walletConnectParameters: { metadata },
  }
)

const connectors: CreateConnectorFn[] = [
  ...rainbowConnectors,
  miniAppConnector as unknown as CreateConnectorFn,
]

export const config = createConfig({
  ssr: true,
  chains,
  transports,
  connectors,
})
