import assert from 'assert'
import { configureChains, defaultChains } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'

assert(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID env var required')

export const AVAILABLE_CHAINS = [mainnet, goerli].find(
  (chain) => chain.id.toString() === process.env.NEXT_PUBLIC_CHAIN_ID
)!

const { chains, provider } = configureChains(
  [
    defaultChains.find(
      (chain) => chain.id.toString() === process.env.NEXT_PUBLIC_CHAIN_ID
    )!,
  ],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string })]
)

export { chains, provider }
