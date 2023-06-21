export const PUBLIC_SUBGRAPH_URL = {
  1: 'https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-mainnet',
  5: 'https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-goerli',
}[process.env.NEXT_PUBLIC_CHAIN_ID || 1] as string
