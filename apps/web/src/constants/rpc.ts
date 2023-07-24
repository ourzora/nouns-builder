import { foundry } from 'wagmi/chains'

import { CHAIN_ID } from 'src/typings'

export const RPC_URL = {
  [CHAIN_ID.ETHEREUM]: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
  [CHAIN_ID.OPTIMISM]: `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
  [CHAIN_ID.GOERLI]: `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
  [CHAIN_ID.OPTIMISM_GOERLI]: `https://opt-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
  [CHAIN_ID.BASE_GOERLI]: 'https://goerli.base.org',
  [CHAIN_ID.ZORA_GOERLI]: 'https://testnet.rpc.zora.co',
  [CHAIN_ID.FOUNDRY]: foundry.rpcUrls.default.http[0],
}
