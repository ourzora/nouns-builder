import assert from 'assert'
import { configureChains } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const CHAIN_IDS = ['1', '5']

function isValidChainEnv(chainEnv: string): chainEnv is typeof CHAIN_IDS[number] {
  return CHAIN_IDS.includes(chainEnv)
}

assert(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID env var required')
assert(
  isValidChainEnv(process.env.NEXT_PUBLIC_CHAIN_ID),
  `NEXT_PUBLIC_CHAIN_ID must be one of ${CHAIN_IDS.join(', ')}`
)

export const AVAILABLE_CHAIN = [mainnet, goerli].find(
  (chain) => chain.id.toString() === process.env.NEXT_PUBLIC_CHAIN_ID
)!

const { chains, provider } = configureChains(
  [AVAILABLE_CHAIN],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string })]
)

export { chains, provider }
