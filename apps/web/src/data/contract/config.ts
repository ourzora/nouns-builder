import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import {
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'

import { PUBLIC_WALLLET_CONNECT_PROJECT_ID } from 'src/constants/walletconnect'

import { chains, transports } from './chains'

export const config = getDefaultConfig({
  ssr: true,
  appName: 'Nouns Builder',
  projectId: PUBLIC_WALLLET_CONNECT_PROJECT_ID,
  chains,
  transports,
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [
        injectedWallet,
        rainbowWallet,
        ledgerWallet,
        safeWallet,
        metaMaskWallet,
        coinbaseWallet,
        walletConnectWallet,
      ],
    },
  ],
})
