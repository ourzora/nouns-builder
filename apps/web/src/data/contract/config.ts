import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { safeWallet } from '@rainbow-me/rainbowkit/wallets'
import { createConfig } from 'wagmi'

import { PUBLIC_WALLLET_CONNECT_PROJECT_ID } from 'src/constants/walletconnect'

import { chains, publicClient } from './chains'

const { connectors: defaultConnectors } = getDefaultWallets({
  appName: 'Nouns builder',
  chains,
  projectId: PUBLIC_WALLLET_CONNECT_PROJECT_ID,
})

const safeConnector = connectorsForWallets([
  {
    groupName: 'Safe Wallet',
    wallets: [safeWallet({ chains })],
  },
])

export const config = createConfig({
  autoConnect: true,
  connectors: [...defaultConnectors(), ...safeConnector()],
  publicClient,
})
