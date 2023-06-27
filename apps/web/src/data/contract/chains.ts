import { configureChains } from 'wagmi'
import { goerli, mainnet, optimismGoerli } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const MAINNET_CHAINS = [mainnet]

const TESTNET_CHAINS = [goerli, optimismGoerli]

const AVAILIBLE_CHAINS =
  process.env.NEXT_PUBLIC_NETWORK_TYPE === 'mainnet' ? MAINNET_CHAINS : TESTNET_CHAINS

const { chains, provider } = configureChains(
  [...AVAILIBLE_CHAINS],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string })]
)

export { chains, provider }
