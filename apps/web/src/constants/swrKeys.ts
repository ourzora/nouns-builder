const SWR_KEYS = {
  AUCTION_BIDS: 'auction-bids',
  ARTWORK_PROPERTY_ITEMS_COUNT: 'artwork-property-items-count',
  AUCTION_SETTLED: 'auction-settled',
  ETH_USD: 'eth-usd-price',
  TREASURY_SALES: 'treasury-sales',
  NFT_COUNT: 'nft-count',
  PROFILE_TOKENS: 'profile-tokens',
  PROPOSAL: 'proposal',
  PROPOSALS: 'proposals',
  PROPOSALS_CALLDATAS: 'proposals-calldatas',
  PROPOSALS_TRANSACTIONS: 'proposal-transaction-data',
  ENS: 'ens',
  EXPLORE: 'explore',
  TOKEN: 'token',
  AUCTION: 'auction',
  DAO_INFO: 'dao-info',
  DAO_FEED: 'dao-feed',
  TOKEN_IMAGE: 'token-image',
  DYNAMIC: {
    MY_DAOS(str: string) {
      return `my-daos-${str}`
    },
    MY_DAOS_PAGE(str: string) {
      return `my-daos-page-${str}`
    },
  },
}

export default SWR_KEYS
