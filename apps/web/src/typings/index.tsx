import { GetContractResult } from "@wagmi/core";
import { ContractInterface } from "ethers";
import { ReactElement } from "react";
import { auctionAbi, governorAbi, metadataAbi, tokenAbi, treasuryAbi } from "src/data/contract/abis";
import {
  ImageMediaEncodingFragment,
  MarketSortKey,
  Support
} from "src/data/graphql/sdk.generated";

export interface AddTransactionSection {
  title: string
  heading?: string | string[]
  subHeading?: string | string[]
  forms: ReactElement[]
}

export interface CustomTransactionProps {
  contract?: {
    address: string
    abi: ContractInterface
    fragments: readonly any[]
    functions: {}
  }
  address: string
  arguments?: any
  function: {
    name: string
    inputs: any[]
  }
  calldata?: string
  value: string
  customABI?: string
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

export { Support }

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

export type AddressType = `0x${string}`

export type BytesType = `0x${string}`

export interface DaoContractAddresses {
  token?: AddressType
  metadata?: AddressType
  auction?: AddressType
  treasury?: AddressType
  governor?: AddressType
}

export interface DaoContracts {
  tokenContract?: GetContractResult<typeof tokenAbi>
  metadataContract?: GetContractResult<typeof metadataAbi>
  auctionContract?: GetContractResult<typeof auctionAbi>
  treasuryContract?: GetContractResult<typeof treasuryAbi>
  governorContract?: GetContractResult<typeof governorAbi>
}
