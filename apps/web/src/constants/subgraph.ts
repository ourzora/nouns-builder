import { CHAIN_ID } from 'src/typings'

export const PUBLIC_SUBGRAPH_URL = {
  [CHAIN_ID.ETHEREUM]:
    'https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-mainnet',
  [CHAIN_ID.GOERLI]:
    'https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-goerli',
  [CHAIN_ID.OPTIMISM_GOERLI]:
    'https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-optimism-goerli',
}
