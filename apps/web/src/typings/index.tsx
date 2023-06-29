import { Chain as WagmiChain } from 'wagmi'

export interface Duration {
  seconds?: number
  days?: number
  hours?: number
  minutes?: number
}

export const enum CHAIN_ID {
  ETHEREUM = 1,
  GOERLI = 5,
  OPTIMISM_GOERLI = 420,
}

export interface Chain extends WagmiChain {
  id: CHAIN_ID
  slug: string
  icon: string
}

export type AddressType = `0x${string}`

export type BytesType = `0x${string}`
