const SWR_KEYS = {
  AUCTION_BIDS: 'auction-bids',
  ETH_USD: 'eth-usd-price',
  PROPOSAL_THRESHOLD: 'proposal-threshold',
  TREASURY_SALES: 'treasury-sales',
  NFT_COUNT: 'nft-count',
  PROPOSAL: 'proposal',
  PROPOSALS: 'proposals',
  PROPOSALS_CALLDATAS: 'proposals-calldatas',
  API_REDIS: 'api-redis',
  ENS: 'ens',
  TOKEN: 'token',
  AUCTION: 'auction',
  DAO_INFO: 'dao-info',
  TOKEN_IMAGE: 'token-image',
  TOKEN_URI: 'token-uri',
  DYNAMIC: {
    MY_DAOS(str: string) {
      return `my-daos-${str}`
    },
    MY_DAOS_PAGE(str: string) {
      return `my-daos-page-${str}`
    },
    TREASURY_OWNER(str: string) {
      return `treasury-owner-${str}`
    },
    TOKEN_CONTRACT: {
      OWNER(str: string) {
        return `token-contract-owner-${str}`
      },
      NAME(str: string) {
        return `token-contract-name-${str}`
      },
      SYMBOL(str: string) {
        return `token-contract-symbol-${str}`
      },
      DELEGATES(str: string) {
        return `token-contract-delegates${str}`
      },
      HAS_VOTES(str: string) {
        return `token-contract-has-votes-${str}`
      },
    },
    METADATA_CONTRACT: {
      DESCRIPTION(str: string) {
        return `metadata-contract-description-${str}`
      },
      IMAGE(str: string) {
        return `metadata-contract-image-${str}`
      },
      WEBSITE(str: string) {
        return `metadata-contract-project-uri-${str}`
      },
      CONTRACT_URI(str: string) {
        return `metadata-contract-contract-uri-${str}`
      },
    },
  },
}

export default SWR_KEYS
