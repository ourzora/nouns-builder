import { GetContractResult } from '@wagmi/core'
import {
  auctionAbi,
  governorAbi,
  metadataAbi,
  tokenAbi,
  treasuryAbi,
} from 'src/data/contract/abis'
import { ImageMediaEncodingFragment } from 'src/data/graphql/sdk.generated'
import { AddressType } from 'src/typings'

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
