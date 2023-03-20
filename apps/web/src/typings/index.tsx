export interface Duration {
  seconds?: number
  days?: number
  hours?: number
  minutes?: number
}

export const enum NETWORK {
  GOERLI = 'GOERLI',
  MAINNET = 'MAINNET',
}

export type AddressType = `0x${string}`

export type BytesType = `0x${string}`
