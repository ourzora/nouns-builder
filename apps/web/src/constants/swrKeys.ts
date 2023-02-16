const SWR_KEYS = {
  AUCTION_BIDS: 'auction-bids',
  ETH_USD: 'eth-usd-price',
  TREASURY_SALES: 'treasury-sales',
  NFT_COUNT: 'nft-count',
  PROPOSAL: 'proposal',
  PROPOSALS: 'proposals',
  PROPOSALS_CALLDATAS: 'proposals-calldatas',
  ENS: 'ens',
  TOKEN: 'token',
  AUCTION: 'auction',
  DAO_INFO: 'dao-info',
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
