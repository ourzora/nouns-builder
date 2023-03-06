import {
  ImageMediaEncodingFragment,
  MarketSortKey,
  ProposalFragment,
  NounsProposalStatus as ProposalStatus,
  ProposalVoteFragment as ProposalVote,
  Support,
} from 'src/data/graphql/sdk.generated'

export interface Duration {
  seconds?: number
  days?: number
  hours?: number
  minutes?: number
}

export interface Bid {
  id: number
  bidder: string
  amount: string
  transactionHash: string
}

export interface Token {
  id: string
  name?: string
  image?: string
  description?: string
  owner?: string
  media?: ImageMediaEncodingFragment
  mintDate?: string
}

export interface TokenWinner {
  highestBidder?: string
  price?: number
}

export interface TokenWithWinner extends Token, TokenWinner {}

export type { ProposalVote }
export interface Proposal extends Omit<ProposalFragment, 'executableFrom' | 'expiresAt'> {
  executableFrom?: number
  expiresAt?: number
  transactionInfo: {
    blockNumber: number
    transactionHash?: string | null
  }
  votes?: ProposalVote[]
}

export { Support }

export { ProposalStatus }

export type ProposalSucceededStatus = Extract<
  ProposalStatus,
  ProposalStatus.Succeeded | ProposalStatus.Queued | ProposalStatus.Executable
>

export interface ExplorePageData {
  daos: {
    tokenId: string | null
    collectionName: string | null
    collectionAddress: string | null
    name: string | null
    image: string | null
    endTime: number | null
    highestBidder: string | null
    highestBidPrice: number | null
  }[]
  pageInfo: {
    limit: number
    hasNextPage: boolean
    endCursor?: string | null
  }
}

export { MarketSortKey }

export const enum NETWORK {
  GOERLI = 'GOERLI',
  MAINNET = 'MAINNET',
}

export type AddressType = `0x${string}`

export type BytesType = `0x${string}`
