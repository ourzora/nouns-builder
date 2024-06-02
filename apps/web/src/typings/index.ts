import { Chain as WagmiChain } from 'wagmi'

export interface Duration {
  seconds?: number
  days?: number
  hours?: number
  minutes?: number
}

export const enum CHAIN_ID {
  ETHEREUM = 1,
  SEPOLIA = 11155111,
  OPTIMISM = 10,
  OPTIMISM_SEPOLIA = 11155420,
  BASE = 8453,
  BASE_SEPOLIA = 84532,
  ZORA = 7777777,
  ZORA_SEPOLIA = 999999999,
  FOUNDRY = 31337,
}

export interface Chain extends WagmiChain {
  id: CHAIN_ID
  slug: string
  icon: string
}

export type AddressType = `0x${string}`

export type BytesType = `0x${string}`

export const CHAIN_NAME_TO_ID: { [key: string]: CHAIN_ID } = {
  ethereum: CHAIN_ID.ETHEREUM,
  sepolia: CHAIN_ID.SEPOLIA,
  optimism: CHAIN_ID.OPTIMISM,
  optimism_sepolia: CHAIN_ID.OPTIMISM_SEPOLIA,
  base: CHAIN_ID.BASE,
  base_sepolia: CHAIN_ID.BASE_SEPOLIA,
  zora: CHAIN_ID.ZORA,
  zora_sepolia: CHAIN_ID.ZORA_SEPOLIA,
  foundry: CHAIN_ID.FOUNDRY,
};
