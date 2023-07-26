import { CHAIN_ID } from 'src/typings'

export const ETHERSCAN_BASE_URL = {
  [CHAIN_ID.ETHEREUM]: 'https://etherscan.io',
  [CHAIN_ID.GOERLI]: 'https://goerli.etherscan.io',
  [CHAIN_ID.OPTIMISM_GOERLI]: 'https://goerli-optimism.etherscan.io/',
  [CHAIN_ID.BASE_GOERLI]: 'https://goerli.basescan.org/',
  [CHAIN_ID.ZORA]: 'https://explorer.zora.energy/',
  [CHAIN_ID.ZORA_GOERLI]: 'https://testnet.explorer.zora.energy/',
  [CHAIN_ID.FOUNDRY]: '',
}
