import { CHAIN_ID } from 'src/typings'

export const PUBLIC_SUBGRAPH_URL = {
  [CHAIN_ID.ETHEREUM]:
    'https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-mainnet',
  [CHAIN_ID.OPTIMISM]:
    'https://api.thegraph.com/subgraphs/name/neokry/noun-builder-optimism-mainnet',
  [CHAIN_ID.GOERLI]:
    'https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-goerli',
  [CHAIN_ID.OPTIMISM_GOERLI]:
    'https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-optimism-goerli',
  [CHAIN_ID.BASE_GOERLI]:
    'https://api.studio.thegraph.com/query/49279/nouns-builder-base-goerli/version/latest',
  [CHAIN_ID.ZORA]:
    'https://api.goldsky.com/api/public/project_clhk16b61ay9t49vm6ntn4mkz/subgraphs/nouns-builder-zora/stable/gn',
  [CHAIN_ID.ZORA_GOERLI]:
    'https://api.goldsky.com/api/public/project_clhk16b61ay9t49vm6ntn4mkz/subgraphs/nouns-builder-zora-goerli/stable/gn',
  [CHAIN_ID.FOUNDRY]:
    'https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-mainnet',
}
