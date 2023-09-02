import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { createConfig } from 'wagmi'

import { PUBLIC_WALLLET_CONNECT_PROJECT_ID } from 'src/constants/walletconnect'

import { chains, publicClient } from './chains'

const { connectors } = getDefaultWallets({
  appName: 'Nouns builder',
  chains,
  projectId: PUBLIC_WALLLET_CONNECT_PROJECT_ID,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})
