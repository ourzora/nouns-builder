import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { createClient } from 'wagmi'

import { PUBLIC_WALLLET_CONNECT_PROJECT_ID } from 'src/constants/walletconnect'

import { chains, provider } from './chains'

const { connectors } = getDefaultWallets({
  appName: 'Nouns builder',
  chains,
  projectId: PUBLIC_WALLLET_CONNECT_PROJECT_ID,
})

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})
