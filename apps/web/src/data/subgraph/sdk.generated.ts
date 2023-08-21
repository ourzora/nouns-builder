import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigDecimal: any
  BigInt: any
  Bytes: any
  Int8: any
}

export type Auction = {
  __typename?: 'Auction'
  bidCount: Scalars['Int']
  bids?: Maybe<Array<AuctionBid>>
  dao: Dao
  endTime: Scalars['BigInt']
  extended: Scalars['Boolean']
  firstBidTime?: Maybe<Scalars['BigInt']>
  highestBid?: Maybe<AuctionBid>
  id: Scalars['ID']
  settled: Scalars['Boolean']
  startTime: Scalars['BigInt']
  token: Token
  winningBid?: Maybe<AuctionBid>
}

export type AuctionBidsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<AuctionBid_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<AuctionBid_Filter>
}

export type AuctionBid = {
  __typename?: 'AuctionBid'
  amount: Scalars['BigInt']
  auction: Auction
  bidTime: Scalars['BigInt']
  bidder: Scalars['Bytes']
  id: Scalars['ID']
}

export type AuctionBid_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amount?: InputMaybe<Scalars['BigInt']>
  amount_gt?: InputMaybe<Scalars['BigInt']>
  amount_gte?: InputMaybe<Scalars['BigInt']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>
  amount_lt?: InputMaybe<Scalars['BigInt']>
  amount_lte?: InputMaybe<Scalars['BigInt']>
  amount_not?: InputMaybe<Scalars['BigInt']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  and?: InputMaybe<Array<InputMaybe<AuctionBid_Filter>>>
  auction?: InputMaybe<Scalars['String']>
  auction_?: InputMaybe<Auction_Filter>
  auction_contains?: InputMaybe<Scalars['String']>
  auction_contains_nocase?: InputMaybe<Scalars['String']>
  auction_ends_with?: InputMaybe<Scalars['String']>
  auction_ends_with_nocase?: InputMaybe<Scalars['String']>
  auction_gt?: InputMaybe<Scalars['String']>
  auction_gte?: InputMaybe<Scalars['String']>
  auction_in?: InputMaybe<Array<Scalars['String']>>
  auction_lt?: InputMaybe<Scalars['String']>
  auction_lte?: InputMaybe<Scalars['String']>
  auction_not?: InputMaybe<Scalars['String']>
  auction_not_contains?: InputMaybe<Scalars['String']>
  auction_not_contains_nocase?: InputMaybe<Scalars['String']>
  auction_not_ends_with?: InputMaybe<Scalars['String']>
  auction_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  auction_not_in?: InputMaybe<Array<Scalars['String']>>
  auction_not_starts_with?: InputMaybe<Scalars['String']>
  auction_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  auction_starts_with?: InputMaybe<Scalars['String']>
  auction_starts_with_nocase?: InputMaybe<Scalars['String']>
  bidTime?: InputMaybe<Scalars['BigInt']>
  bidTime_gt?: InputMaybe<Scalars['BigInt']>
  bidTime_gte?: InputMaybe<Scalars['BigInt']>
  bidTime_in?: InputMaybe<Array<Scalars['BigInt']>>
  bidTime_lt?: InputMaybe<Scalars['BigInt']>
  bidTime_lte?: InputMaybe<Scalars['BigInt']>
  bidTime_not?: InputMaybe<Scalars['BigInt']>
  bidTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  bidder?: InputMaybe<Scalars['Bytes']>
  bidder_contains?: InputMaybe<Scalars['Bytes']>
  bidder_gt?: InputMaybe<Scalars['Bytes']>
  bidder_gte?: InputMaybe<Scalars['Bytes']>
  bidder_in?: InputMaybe<Array<Scalars['Bytes']>>
  bidder_lt?: InputMaybe<Scalars['Bytes']>
  bidder_lte?: InputMaybe<Scalars['Bytes']>
  bidder_not?: InputMaybe<Scalars['Bytes']>
  bidder_not_contains?: InputMaybe<Scalars['Bytes']>
  bidder_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<AuctionBid_Filter>>>
}

export enum AuctionBid_OrderBy {
  Amount = 'amount',
  Auction = 'auction',
  AuctionBidCount = 'auction__bidCount',
  AuctionEndTime = 'auction__endTime',
  AuctionExtended = 'auction__extended',
  AuctionFirstBidTime = 'auction__firstBidTime',
  AuctionId = 'auction__id',
  AuctionSettled = 'auction__settled',
  AuctionStartTime = 'auction__startTime',
  BidTime = 'bidTime',
  Bidder = 'bidder',
  Id = 'id',
}

export type AuctionConfig = {
  __typename?: 'AuctionConfig'
  duration: Scalars['BigInt']
  id: Scalars['ID']
  minimumBidIncrement: Scalars['BigInt']
  reservePrice: Scalars['BigInt']
  timeBuffer: Scalars['BigInt']
}

export type AuctionConfig_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<AuctionConfig_Filter>>>
  duration?: InputMaybe<Scalars['BigInt']>
  duration_gt?: InputMaybe<Scalars['BigInt']>
  duration_gte?: InputMaybe<Scalars['BigInt']>
  duration_in?: InputMaybe<Array<Scalars['BigInt']>>
  duration_lt?: InputMaybe<Scalars['BigInt']>
  duration_lte?: InputMaybe<Scalars['BigInt']>
  duration_not?: InputMaybe<Scalars['BigInt']>
  duration_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  minimumBidIncrement?: InputMaybe<Scalars['BigInt']>
  minimumBidIncrement_gt?: InputMaybe<Scalars['BigInt']>
  minimumBidIncrement_gte?: InputMaybe<Scalars['BigInt']>
  minimumBidIncrement_in?: InputMaybe<Array<Scalars['BigInt']>>
  minimumBidIncrement_lt?: InputMaybe<Scalars['BigInt']>
  minimumBidIncrement_lte?: InputMaybe<Scalars['BigInt']>
  minimumBidIncrement_not?: InputMaybe<Scalars['BigInt']>
  minimumBidIncrement_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  or?: InputMaybe<Array<InputMaybe<AuctionConfig_Filter>>>
  reservePrice?: InputMaybe<Scalars['BigInt']>
  reservePrice_gt?: InputMaybe<Scalars['BigInt']>
  reservePrice_gte?: InputMaybe<Scalars['BigInt']>
  reservePrice_in?: InputMaybe<Array<Scalars['BigInt']>>
  reservePrice_lt?: InputMaybe<Scalars['BigInt']>
  reservePrice_lte?: InputMaybe<Scalars['BigInt']>
  reservePrice_not?: InputMaybe<Scalars['BigInt']>
  reservePrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  timeBuffer?: InputMaybe<Scalars['BigInt']>
  timeBuffer_gt?: InputMaybe<Scalars['BigInt']>
  timeBuffer_gte?: InputMaybe<Scalars['BigInt']>
  timeBuffer_in?: InputMaybe<Array<Scalars['BigInt']>>
  timeBuffer_lt?: InputMaybe<Scalars['BigInt']>
  timeBuffer_lte?: InputMaybe<Scalars['BigInt']>
  timeBuffer_not?: InputMaybe<Scalars['BigInt']>
  timeBuffer_not_in?: InputMaybe<Array<Scalars['BigInt']>>
}

export enum AuctionConfig_OrderBy {
  Duration = 'duration',
  Id = 'id',
  MinimumBidIncrement = 'minimumBidIncrement',
  ReservePrice = 'reservePrice',
  TimeBuffer = 'timeBuffer',
}

export type Auction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Auction_Filter>>>
  bidCount?: InputMaybe<Scalars['Int']>
  bidCount_gt?: InputMaybe<Scalars['Int']>
  bidCount_gte?: InputMaybe<Scalars['Int']>
  bidCount_in?: InputMaybe<Array<Scalars['Int']>>
  bidCount_lt?: InputMaybe<Scalars['Int']>
  bidCount_lte?: InputMaybe<Scalars['Int']>
  bidCount_not?: InputMaybe<Scalars['Int']>
  bidCount_not_in?: InputMaybe<Array<Scalars['Int']>>
  bids_?: InputMaybe<AuctionBid_Filter>
  dao?: InputMaybe<Scalars['String']>
  dao_?: InputMaybe<Dao_Filter>
  dao_contains?: InputMaybe<Scalars['String']>
  dao_contains_nocase?: InputMaybe<Scalars['String']>
  dao_ends_with?: InputMaybe<Scalars['String']>
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>
  dao_gt?: InputMaybe<Scalars['String']>
  dao_gte?: InputMaybe<Scalars['String']>
  dao_in?: InputMaybe<Array<Scalars['String']>>
  dao_lt?: InputMaybe<Scalars['String']>
  dao_lte?: InputMaybe<Scalars['String']>
  dao_not?: InputMaybe<Scalars['String']>
  dao_not_contains?: InputMaybe<Scalars['String']>
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>
  dao_not_ends_with?: InputMaybe<Scalars['String']>
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  dao_not_in?: InputMaybe<Array<Scalars['String']>>
  dao_not_starts_with?: InputMaybe<Scalars['String']>
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  dao_starts_with?: InputMaybe<Scalars['String']>
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>
  endTime?: InputMaybe<Scalars['BigInt']>
  endTime_gt?: InputMaybe<Scalars['BigInt']>
  endTime_gte?: InputMaybe<Scalars['BigInt']>
  endTime_in?: InputMaybe<Array<Scalars['BigInt']>>
  endTime_lt?: InputMaybe<Scalars['BigInt']>
  endTime_lte?: InputMaybe<Scalars['BigInt']>
  endTime_not?: InputMaybe<Scalars['BigInt']>
  endTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  extended?: InputMaybe<Scalars['Boolean']>
  extended_in?: InputMaybe<Array<Scalars['Boolean']>>
  extended_not?: InputMaybe<Scalars['Boolean']>
  extended_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  firstBidTime?: InputMaybe<Scalars['BigInt']>
  firstBidTime_gt?: InputMaybe<Scalars['BigInt']>
  firstBidTime_gte?: InputMaybe<Scalars['BigInt']>
  firstBidTime_in?: InputMaybe<Array<Scalars['BigInt']>>
  firstBidTime_lt?: InputMaybe<Scalars['BigInt']>
  firstBidTime_lte?: InputMaybe<Scalars['BigInt']>
  firstBidTime_not?: InputMaybe<Scalars['BigInt']>
  firstBidTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  highestBid?: InputMaybe<Scalars['String']>
  highestBid_?: InputMaybe<AuctionBid_Filter>
  highestBid_contains?: InputMaybe<Scalars['String']>
  highestBid_contains_nocase?: InputMaybe<Scalars['String']>
  highestBid_ends_with?: InputMaybe<Scalars['String']>
  highestBid_ends_with_nocase?: InputMaybe<Scalars['String']>
  highestBid_gt?: InputMaybe<Scalars['String']>
  highestBid_gte?: InputMaybe<Scalars['String']>
  highestBid_in?: InputMaybe<Array<Scalars['String']>>
  highestBid_lt?: InputMaybe<Scalars['String']>
  highestBid_lte?: InputMaybe<Scalars['String']>
  highestBid_not?: InputMaybe<Scalars['String']>
  highestBid_not_contains?: InputMaybe<Scalars['String']>
  highestBid_not_contains_nocase?: InputMaybe<Scalars['String']>
  highestBid_not_ends_with?: InputMaybe<Scalars['String']>
  highestBid_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  highestBid_not_in?: InputMaybe<Array<Scalars['String']>>
  highestBid_not_starts_with?: InputMaybe<Scalars['String']>
  highestBid_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  highestBid_starts_with?: InputMaybe<Scalars['String']>
  highestBid_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<Auction_Filter>>>
  settled?: InputMaybe<Scalars['Boolean']>
  settled_in?: InputMaybe<Array<Scalars['Boolean']>>
  settled_not?: InputMaybe<Scalars['Boolean']>
  settled_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  startTime?: InputMaybe<Scalars['BigInt']>
  startTime_gt?: InputMaybe<Scalars['BigInt']>
  startTime_gte?: InputMaybe<Scalars['BigInt']>
  startTime_in?: InputMaybe<Array<Scalars['BigInt']>>
  startTime_lt?: InputMaybe<Scalars['BigInt']>
  startTime_lte?: InputMaybe<Scalars['BigInt']>
  startTime_not?: InputMaybe<Scalars['BigInt']>
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  token?: InputMaybe<Scalars['String']>
  token_?: InputMaybe<Token_Filter>
  token_contains?: InputMaybe<Scalars['String']>
  token_contains_nocase?: InputMaybe<Scalars['String']>
  token_ends_with?: InputMaybe<Scalars['String']>
  token_ends_with_nocase?: InputMaybe<Scalars['String']>
  token_gt?: InputMaybe<Scalars['String']>
  token_gte?: InputMaybe<Scalars['String']>
  token_in?: InputMaybe<Array<Scalars['String']>>
  token_lt?: InputMaybe<Scalars['String']>
  token_lte?: InputMaybe<Scalars['String']>
  token_not?: InputMaybe<Scalars['String']>
  token_not_contains?: InputMaybe<Scalars['String']>
  token_not_contains_nocase?: InputMaybe<Scalars['String']>
  token_not_ends_with?: InputMaybe<Scalars['String']>
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  token_not_in?: InputMaybe<Array<Scalars['String']>>
  token_not_starts_with?: InputMaybe<Scalars['String']>
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  token_starts_with?: InputMaybe<Scalars['String']>
  token_starts_with_nocase?: InputMaybe<Scalars['String']>
  winningBid?: InputMaybe<Scalars['String']>
  winningBid_?: InputMaybe<AuctionBid_Filter>
  winningBid_contains?: InputMaybe<Scalars['String']>
  winningBid_contains_nocase?: InputMaybe<Scalars['String']>
  winningBid_ends_with?: InputMaybe<Scalars['String']>
  winningBid_ends_with_nocase?: InputMaybe<Scalars['String']>
  winningBid_gt?: InputMaybe<Scalars['String']>
  winningBid_gte?: InputMaybe<Scalars['String']>
  winningBid_in?: InputMaybe<Array<Scalars['String']>>
  winningBid_lt?: InputMaybe<Scalars['String']>
  winningBid_lte?: InputMaybe<Scalars['String']>
  winningBid_not?: InputMaybe<Scalars['String']>
  winningBid_not_contains?: InputMaybe<Scalars['String']>
  winningBid_not_contains_nocase?: InputMaybe<Scalars['String']>
  winningBid_not_ends_with?: InputMaybe<Scalars['String']>
  winningBid_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  winningBid_not_in?: InputMaybe<Array<Scalars['String']>>
  winningBid_not_starts_with?: InputMaybe<Scalars['String']>
  winningBid_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  winningBid_starts_with?: InputMaybe<Scalars['String']>
  winningBid_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum Auction_OrderBy {
  BidCount = 'bidCount',
  Bids = 'bids',
  Dao = 'dao',
  DaoAuctionAddress = 'dao__auctionAddress',
  DaoContractImage = 'dao__contractImage',
  DaoDescription = 'dao__description',
  DaoGovernorAddress = 'dao__governorAddress',
  DaoId = 'dao__id',
  DaoMetadataAddress = 'dao__metadataAddress',
  DaoName = 'dao__name',
  DaoOwnerCount = 'dao__ownerCount',
  DaoProjectUri = 'dao__projectURI',
  DaoProposalCount = 'dao__proposalCount',
  DaoSymbol = 'dao__symbol',
  DaoTokenAddress = 'dao__tokenAddress',
  DaoTotalAuctionSales = 'dao__totalAuctionSales',
  DaoTotalSupply = 'dao__totalSupply',
  DaoTreasuryAddress = 'dao__treasuryAddress',
  EndTime = 'endTime',
  Extended = 'extended',
  FirstBidTime = 'firstBidTime',
  HighestBid = 'highestBid',
  HighestBidAmount = 'highestBid__amount',
  HighestBidBidTime = 'highestBid__bidTime',
  HighestBidBidder = 'highestBid__bidder',
  HighestBidId = 'highestBid__id',
  Id = 'id',
  Settled = 'settled',
  StartTime = 'startTime',
  Token = 'token',
  TokenId = 'token__id',
  TokenImage = 'token__image',
  TokenMintedAt = 'token__mintedAt',
  TokenName = 'token__name',
  TokenOwner = 'token__owner',
  TokenTokenContract = 'token__tokenContract',
  TokenTokenId = 'token__tokenId',
  WinningBid = 'winningBid',
  WinningBidAmount = 'winningBid__amount',
  WinningBidBidTime = 'winningBid__bidTime',
  WinningBidBidder = 'winningBid__bidder',
  WinningBidId = 'winningBid__id',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']
}

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>
  number?: InputMaybe<Scalars['Int']>
  number_gte?: InputMaybe<Scalars['Int']>
}

export type Dao = {
  __typename?: 'DAO'
  auctionAddress: Scalars['Bytes']
  auctionConfig: AuctionConfig
  auctions: Array<Auction>
  contractImage: Scalars['String']
  currentAuction?: Maybe<Auction>
  description: Scalars['String']
  governorAddress: Scalars['Bytes']
  id: Scalars['ID']
  metadataAddress: Scalars['Bytes']
  name: Scalars['String']
  ownerCount: Scalars['Int']
  owners: Array<DaoTokenOwner>
  projectURI: Scalars['String']
  proposalCount: Scalars['Int']
  proposals: Array<Proposal>
  symbol: Scalars['String']
  tokenAddress: Scalars['Bytes']
  tokens: Array<Token>
  totalAuctionSales: Scalars['BigInt']
  totalSupply: Scalars['Int']
  treasuryAddress: Scalars['Bytes']
}

export type DaoAuctionsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Auction_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Auction_Filter>
}

export type DaoOwnersArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<DaoTokenOwner_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<DaoTokenOwner_Filter>
}

export type DaoProposalsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Proposal_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Proposal_Filter>
}

export type DaoTokensArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Token_Filter>
}

export type DaoTokenOwner = {
  __typename?: 'DAOTokenOwner'
  dao: Dao
  daoTokenCount: Scalars['Int']
  daoTokens: Array<Token>
  id: Scalars['ID']
  owner: Scalars['Bytes']
}

export type DaoTokenOwnerDaoTokensArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Token_Filter>
}

export type DaoTokenOwner_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<DaoTokenOwner_Filter>>>
  dao?: InputMaybe<Scalars['String']>
  daoTokenCount?: InputMaybe<Scalars['Int']>
  daoTokenCount_gt?: InputMaybe<Scalars['Int']>
  daoTokenCount_gte?: InputMaybe<Scalars['Int']>
  daoTokenCount_in?: InputMaybe<Array<Scalars['Int']>>
  daoTokenCount_lt?: InputMaybe<Scalars['Int']>
  daoTokenCount_lte?: InputMaybe<Scalars['Int']>
  daoTokenCount_not?: InputMaybe<Scalars['Int']>
  daoTokenCount_not_in?: InputMaybe<Array<Scalars['Int']>>
  daoTokens_?: InputMaybe<Token_Filter>
  dao_?: InputMaybe<Dao_Filter>
  dao_contains?: InputMaybe<Scalars['String']>
  dao_contains_nocase?: InputMaybe<Scalars['String']>
  dao_ends_with?: InputMaybe<Scalars['String']>
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>
  dao_gt?: InputMaybe<Scalars['String']>
  dao_gte?: InputMaybe<Scalars['String']>
  dao_in?: InputMaybe<Array<Scalars['String']>>
  dao_lt?: InputMaybe<Scalars['String']>
  dao_lte?: InputMaybe<Scalars['String']>
  dao_not?: InputMaybe<Scalars['String']>
  dao_not_contains?: InputMaybe<Scalars['String']>
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>
  dao_not_ends_with?: InputMaybe<Scalars['String']>
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  dao_not_in?: InputMaybe<Array<Scalars['String']>>
  dao_not_starts_with?: InputMaybe<Scalars['String']>
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  dao_starts_with?: InputMaybe<Scalars['String']>
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<DaoTokenOwner_Filter>>>
  owner?: InputMaybe<Scalars['Bytes']>
  owner_contains?: InputMaybe<Scalars['Bytes']>
  owner_gt?: InputMaybe<Scalars['Bytes']>
  owner_gte?: InputMaybe<Scalars['Bytes']>
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>
  owner_lt?: InputMaybe<Scalars['Bytes']>
  owner_lte?: InputMaybe<Scalars['Bytes']>
  owner_not?: InputMaybe<Scalars['Bytes']>
  owner_not_contains?: InputMaybe<Scalars['Bytes']>
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>
}

export enum DaoTokenOwner_OrderBy {
  Dao = 'dao',
  DaoTokenCount = 'daoTokenCount',
  DaoTokens = 'daoTokens',
  DaoAuctionAddress = 'dao__auctionAddress',
  DaoContractImage = 'dao__contractImage',
  DaoDescription = 'dao__description',
  DaoGovernorAddress = 'dao__governorAddress',
  DaoId = 'dao__id',
  DaoMetadataAddress = 'dao__metadataAddress',
  DaoName = 'dao__name',
  DaoOwnerCount = 'dao__ownerCount',
  DaoProjectUri = 'dao__projectURI',
  DaoProposalCount = 'dao__proposalCount',
  DaoSymbol = 'dao__symbol',
  DaoTokenAddress = 'dao__tokenAddress',
  DaoTotalAuctionSales = 'dao__totalAuctionSales',
  DaoTotalSupply = 'dao__totalSupply',
  DaoTreasuryAddress = 'dao__treasuryAddress',
  Id = 'id',
  Owner = 'owner',
}

export type Dao_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Dao_Filter>>>
  auctionAddress?: InputMaybe<Scalars['Bytes']>
  auctionAddress_contains?: InputMaybe<Scalars['Bytes']>
  auctionAddress_gt?: InputMaybe<Scalars['Bytes']>
  auctionAddress_gte?: InputMaybe<Scalars['Bytes']>
  auctionAddress_in?: InputMaybe<Array<Scalars['Bytes']>>
  auctionAddress_lt?: InputMaybe<Scalars['Bytes']>
  auctionAddress_lte?: InputMaybe<Scalars['Bytes']>
  auctionAddress_not?: InputMaybe<Scalars['Bytes']>
  auctionAddress_not_contains?: InputMaybe<Scalars['Bytes']>
  auctionAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  auctionConfig?: InputMaybe<Scalars['String']>
  auctionConfig_?: InputMaybe<AuctionConfig_Filter>
  auctionConfig_contains?: InputMaybe<Scalars['String']>
  auctionConfig_contains_nocase?: InputMaybe<Scalars['String']>
  auctionConfig_ends_with?: InputMaybe<Scalars['String']>
  auctionConfig_ends_with_nocase?: InputMaybe<Scalars['String']>
  auctionConfig_gt?: InputMaybe<Scalars['String']>
  auctionConfig_gte?: InputMaybe<Scalars['String']>
  auctionConfig_in?: InputMaybe<Array<Scalars['String']>>
  auctionConfig_lt?: InputMaybe<Scalars['String']>
  auctionConfig_lte?: InputMaybe<Scalars['String']>
  auctionConfig_not?: InputMaybe<Scalars['String']>
  auctionConfig_not_contains?: InputMaybe<Scalars['String']>
  auctionConfig_not_contains_nocase?: InputMaybe<Scalars['String']>
  auctionConfig_not_ends_with?: InputMaybe<Scalars['String']>
  auctionConfig_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  auctionConfig_not_in?: InputMaybe<Array<Scalars['String']>>
  auctionConfig_not_starts_with?: InputMaybe<Scalars['String']>
  auctionConfig_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  auctionConfig_starts_with?: InputMaybe<Scalars['String']>
  auctionConfig_starts_with_nocase?: InputMaybe<Scalars['String']>
  auctions_?: InputMaybe<Auction_Filter>
  contractImage?: InputMaybe<Scalars['String']>
  contractImage_contains?: InputMaybe<Scalars['String']>
  contractImage_contains_nocase?: InputMaybe<Scalars['String']>
  contractImage_ends_with?: InputMaybe<Scalars['String']>
  contractImage_ends_with_nocase?: InputMaybe<Scalars['String']>
  contractImage_gt?: InputMaybe<Scalars['String']>
  contractImage_gte?: InputMaybe<Scalars['String']>
  contractImage_in?: InputMaybe<Array<Scalars['String']>>
  contractImage_lt?: InputMaybe<Scalars['String']>
  contractImage_lte?: InputMaybe<Scalars['String']>
  contractImage_not?: InputMaybe<Scalars['String']>
  contractImage_not_contains?: InputMaybe<Scalars['String']>
  contractImage_not_contains_nocase?: InputMaybe<Scalars['String']>
  contractImage_not_ends_with?: InputMaybe<Scalars['String']>
  contractImage_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  contractImage_not_in?: InputMaybe<Array<Scalars['String']>>
  contractImage_not_starts_with?: InputMaybe<Scalars['String']>
  contractImage_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  contractImage_starts_with?: InputMaybe<Scalars['String']>
  contractImage_starts_with_nocase?: InputMaybe<Scalars['String']>
  currentAuction?: InputMaybe<Scalars['String']>
  currentAuction_?: InputMaybe<Auction_Filter>
  currentAuction_contains?: InputMaybe<Scalars['String']>
  currentAuction_contains_nocase?: InputMaybe<Scalars['String']>
  currentAuction_ends_with?: InputMaybe<Scalars['String']>
  currentAuction_ends_with_nocase?: InputMaybe<Scalars['String']>
  currentAuction_gt?: InputMaybe<Scalars['String']>
  currentAuction_gte?: InputMaybe<Scalars['String']>
  currentAuction_in?: InputMaybe<Array<Scalars['String']>>
  currentAuction_lt?: InputMaybe<Scalars['String']>
  currentAuction_lte?: InputMaybe<Scalars['String']>
  currentAuction_not?: InputMaybe<Scalars['String']>
  currentAuction_not_contains?: InputMaybe<Scalars['String']>
  currentAuction_not_contains_nocase?: InputMaybe<Scalars['String']>
  currentAuction_not_ends_with?: InputMaybe<Scalars['String']>
  currentAuction_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  currentAuction_not_in?: InputMaybe<Array<Scalars['String']>>
  currentAuction_not_starts_with?: InputMaybe<Scalars['String']>
  currentAuction_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  currentAuction_starts_with?: InputMaybe<Scalars['String']>
  currentAuction_starts_with_nocase?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  description_contains?: InputMaybe<Scalars['String']>
  description_contains_nocase?: InputMaybe<Scalars['String']>
  description_ends_with?: InputMaybe<Scalars['String']>
  description_ends_with_nocase?: InputMaybe<Scalars['String']>
  description_gt?: InputMaybe<Scalars['String']>
  description_gte?: InputMaybe<Scalars['String']>
  description_in?: InputMaybe<Array<Scalars['String']>>
  description_lt?: InputMaybe<Scalars['String']>
  description_lte?: InputMaybe<Scalars['String']>
  description_not?: InputMaybe<Scalars['String']>
  description_not_contains?: InputMaybe<Scalars['String']>
  description_not_contains_nocase?: InputMaybe<Scalars['String']>
  description_not_ends_with?: InputMaybe<Scalars['String']>
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  description_not_in?: InputMaybe<Array<Scalars['String']>>
  description_not_starts_with?: InputMaybe<Scalars['String']>
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  description_starts_with?: InputMaybe<Scalars['String']>
  description_starts_with_nocase?: InputMaybe<Scalars['String']>
  governorAddress?: InputMaybe<Scalars['Bytes']>
  governorAddress_contains?: InputMaybe<Scalars['Bytes']>
  governorAddress_gt?: InputMaybe<Scalars['Bytes']>
  governorAddress_gte?: InputMaybe<Scalars['Bytes']>
  governorAddress_in?: InputMaybe<Array<Scalars['Bytes']>>
  governorAddress_lt?: InputMaybe<Scalars['Bytes']>
  governorAddress_lte?: InputMaybe<Scalars['Bytes']>
  governorAddress_not?: InputMaybe<Scalars['Bytes']>
  governorAddress_not_contains?: InputMaybe<Scalars['Bytes']>
  governorAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  metadataAddress?: InputMaybe<Scalars['Bytes']>
  metadataAddress_contains?: InputMaybe<Scalars['Bytes']>
  metadataAddress_gt?: InputMaybe<Scalars['Bytes']>
  metadataAddress_gte?: InputMaybe<Scalars['Bytes']>
  metadataAddress_in?: InputMaybe<Array<Scalars['Bytes']>>
  metadataAddress_lt?: InputMaybe<Scalars['Bytes']>
  metadataAddress_lte?: InputMaybe<Scalars['Bytes']>
  metadataAddress_not?: InputMaybe<Scalars['Bytes']>
  metadataAddress_not_contains?: InputMaybe<Scalars['Bytes']>
  metadataAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  name?: InputMaybe<Scalars['String']>
  name_contains?: InputMaybe<Scalars['String']>
  name_contains_nocase?: InputMaybe<Scalars['String']>
  name_ends_with?: InputMaybe<Scalars['String']>
  name_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_gt?: InputMaybe<Scalars['String']>
  name_gte?: InputMaybe<Scalars['String']>
  name_in?: InputMaybe<Array<Scalars['String']>>
  name_lt?: InputMaybe<Scalars['String']>
  name_lte?: InputMaybe<Scalars['String']>
  name_not?: InputMaybe<Scalars['String']>
  name_not_contains?: InputMaybe<Scalars['String']>
  name_not_contains_nocase?: InputMaybe<Scalars['String']>
  name_not_ends_with?: InputMaybe<Scalars['String']>
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_not_in?: InputMaybe<Array<Scalars['String']>>
  name_not_starts_with?: InputMaybe<Scalars['String']>
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  name_starts_with?: InputMaybe<Scalars['String']>
  name_starts_with_nocase?: InputMaybe<Scalars['String']>
  or?: InputMaybe<Array<InputMaybe<Dao_Filter>>>
  ownerCount?: InputMaybe<Scalars['Int']>
  ownerCount_gt?: InputMaybe<Scalars['Int']>
  ownerCount_gte?: InputMaybe<Scalars['Int']>
  ownerCount_in?: InputMaybe<Array<Scalars['Int']>>
  ownerCount_lt?: InputMaybe<Scalars['Int']>
  ownerCount_lte?: InputMaybe<Scalars['Int']>
  ownerCount_not?: InputMaybe<Scalars['Int']>
  ownerCount_not_in?: InputMaybe<Array<Scalars['Int']>>
  owners_?: InputMaybe<DaoTokenOwner_Filter>
  projectURI?: InputMaybe<Scalars['String']>
  projectURI_contains?: InputMaybe<Scalars['String']>
  projectURI_contains_nocase?: InputMaybe<Scalars['String']>
  projectURI_ends_with?: InputMaybe<Scalars['String']>
  projectURI_ends_with_nocase?: InputMaybe<Scalars['String']>
  projectURI_gt?: InputMaybe<Scalars['String']>
  projectURI_gte?: InputMaybe<Scalars['String']>
  projectURI_in?: InputMaybe<Array<Scalars['String']>>
  projectURI_lt?: InputMaybe<Scalars['String']>
  projectURI_lte?: InputMaybe<Scalars['String']>
  projectURI_not?: InputMaybe<Scalars['String']>
  projectURI_not_contains?: InputMaybe<Scalars['String']>
  projectURI_not_contains_nocase?: InputMaybe<Scalars['String']>
  projectURI_not_ends_with?: InputMaybe<Scalars['String']>
  projectURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  projectURI_not_in?: InputMaybe<Array<Scalars['String']>>
  projectURI_not_starts_with?: InputMaybe<Scalars['String']>
  projectURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  projectURI_starts_with?: InputMaybe<Scalars['String']>
  projectURI_starts_with_nocase?: InputMaybe<Scalars['String']>
  proposalCount?: InputMaybe<Scalars['Int']>
  proposalCount_gt?: InputMaybe<Scalars['Int']>
  proposalCount_gte?: InputMaybe<Scalars['Int']>
  proposalCount_in?: InputMaybe<Array<Scalars['Int']>>
  proposalCount_lt?: InputMaybe<Scalars['Int']>
  proposalCount_lte?: InputMaybe<Scalars['Int']>
  proposalCount_not?: InputMaybe<Scalars['Int']>
  proposalCount_not_in?: InputMaybe<Array<Scalars['Int']>>
  proposals_?: InputMaybe<Proposal_Filter>
  symbol?: InputMaybe<Scalars['String']>
  symbol_contains?: InputMaybe<Scalars['String']>
  symbol_contains_nocase?: InputMaybe<Scalars['String']>
  symbol_ends_with?: InputMaybe<Scalars['String']>
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>
  symbol_gt?: InputMaybe<Scalars['String']>
  symbol_gte?: InputMaybe<Scalars['String']>
  symbol_in?: InputMaybe<Array<Scalars['String']>>
  symbol_lt?: InputMaybe<Scalars['String']>
  symbol_lte?: InputMaybe<Scalars['String']>
  symbol_not?: InputMaybe<Scalars['String']>
  symbol_not_contains?: InputMaybe<Scalars['String']>
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>
  symbol_not_ends_with?: InputMaybe<Scalars['String']>
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>
  symbol_not_starts_with?: InputMaybe<Scalars['String']>
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  symbol_starts_with?: InputMaybe<Scalars['String']>
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenAddress?: InputMaybe<Scalars['Bytes']>
  tokenAddress_contains?: InputMaybe<Scalars['Bytes']>
  tokenAddress_gt?: InputMaybe<Scalars['Bytes']>
  tokenAddress_gte?: InputMaybe<Scalars['Bytes']>
  tokenAddress_in?: InputMaybe<Array<Scalars['Bytes']>>
  tokenAddress_lt?: InputMaybe<Scalars['Bytes']>
  tokenAddress_lte?: InputMaybe<Scalars['Bytes']>
  tokenAddress_not?: InputMaybe<Scalars['Bytes']>
  tokenAddress_not_contains?: InputMaybe<Scalars['Bytes']>
  tokenAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  tokens_?: InputMaybe<Token_Filter>
  totalAuctionSales?: InputMaybe<Scalars['BigInt']>
  totalAuctionSales_gt?: InputMaybe<Scalars['BigInt']>
  totalAuctionSales_gte?: InputMaybe<Scalars['BigInt']>
  totalAuctionSales_in?: InputMaybe<Array<Scalars['BigInt']>>
  totalAuctionSales_lt?: InputMaybe<Scalars['BigInt']>
  totalAuctionSales_lte?: InputMaybe<Scalars['BigInt']>
  totalAuctionSales_not?: InputMaybe<Scalars['BigInt']>
  totalAuctionSales_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  totalSupply?: InputMaybe<Scalars['Int']>
  totalSupply_gt?: InputMaybe<Scalars['Int']>
  totalSupply_gte?: InputMaybe<Scalars['Int']>
  totalSupply_in?: InputMaybe<Array<Scalars['Int']>>
  totalSupply_lt?: InputMaybe<Scalars['Int']>
  totalSupply_lte?: InputMaybe<Scalars['Int']>
  totalSupply_not?: InputMaybe<Scalars['Int']>
  totalSupply_not_in?: InputMaybe<Array<Scalars['Int']>>
  treasuryAddress?: InputMaybe<Scalars['Bytes']>
  treasuryAddress_contains?: InputMaybe<Scalars['Bytes']>
  treasuryAddress_gt?: InputMaybe<Scalars['Bytes']>
  treasuryAddress_gte?: InputMaybe<Scalars['Bytes']>
  treasuryAddress_in?: InputMaybe<Array<Scalars['Bytes']>>
  treasuryAddress_lt?: InputMaybe<Scalars['Bytes']>
  treasuryAddress_lte?: InputMaybe<Scalars['Bytes']>
  treasuryAddress_not?: InputMaybe<Scalars['Bytes']>
  treasuryAddress_not_contains?: InputMaybe<Scalars['Bytes']>
  treasuryAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>
}

export enum Dao_OrderBy {
  AuctionAddress = 'auctionAddress',
  AuctionConfig = 'auctionConfig',
  AuctionConfigDuration = 'auctionConfig__duration',
  AuctionConfigId = 'auctionConfig__id',
  AuctionConfigMinimumBidIncrement = 'auctionConfig__minimumBidIncrement',
  AuctionConfigReservePrice = 'auctionConfig__reservePrice',
  AuctionConfigTimeBuffer = 'auctionConfig__timeBuffer',
  Auctions = 'auctions',
  ContractImage = 'contractImage',
  CurrentAuction = 'currentAuction',
  CurrentAuctionBidCount = 'currentAuction__bidCount',
  CurrentAuctionEndTime = 'currentAuction__endTime',
  CurrentAuctionExtended = 'currentAuction__extended',
  CurrentAuctionFirstBidTime = 'currentAuction__firstBidTime',
  CurrentAuctionId = 'currentAuction__id',
  CurrentAuctionSettled = 'currentAuction__settled',
  CurrentAuctionStartTime = 'currentAuction__startTime',
  Description = 'description',
  GovernorAddress = 'governorAddress',
  Id = 'id',
  MetadataAddress = 'metadataAddress',
  Name = 'name',
  OwnerCount = 'ownerCount',
  Owners = 'owners',
  ProjectUri = 'projectURI',
  ProposalCount = 'proposalCount',
  Proposals = 'proposals',
  Symbol = 'symbol',
  TokenAddress = 'tokenAddress',
  Tokens = 'tokens',
  TotalAuctionSales = 'totalAuctionSales',
  TotalSupply = 'totalSupply',
  TreasuryAddress = 'treasuryAddress',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Proposal = {
  __typename?: 'Proposal'
  abstainVotes: Scalars['Int']
  againstVotes: Scalars['Int']
  calldatas?: Maybe<Scalars['String']>
  canceled: Scalars['Boolean']
  dao: Dao
  description?: Maybe<Scalars['String']>
  descriptionHash: Scalars['Bytes']
  executableFrom?: Maybe<Scalars['BigInt']>
  executed: Scalars['Boolean']
  expiresAt?: Maybe<Scalars['BigInt']>
  forVotes: Scalars['Int']
  id: Scalars['ID']
  proposalId: Scalars['Bytes']
  proposalNumber: Scalars['Int']
  proposalThreshold: Scalars['BigInt']
  proposer: Scalars['Bytes']
  queued: Scalars['Boolean']
  quorumVotes: Scalars['BigInt']
  snapshotBlockNumber: Scalars['BigInt']
  targets: Array<Scalars['Bytes']>
  timeCreated: Scalars['BigInt']
  title?: Maybe<Scalars['String']>
  transactionHash: Scalars['Bytes']
  values: Array<Scalars['BigInt']>
  vetoed: Scalars['Boolean']
  voteCount: Scalars['Int']
  voteEnd: Scalars['BigInt']
  voteStart: Scalars['BigInt']
  votes: Array<ProposalVote>
}

export type ProposalVotesArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ProposalVote_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ProposalVote_Filter>
}

export type ProposalVote = {
  __typename?: 'ProposalVote'
  id: Scalars['ID']
  proposal: Proposal
  reason?: Maybe<Scalars['String']>
  support: ProposalVoteSupport
  voter: Scalars['Bytes']
  weight: Scalars['Int']
}

export enum ProposalVoteSupport {
  Abstain = 'ABSTAIN',
  Against = 'AGAINST',
  For = 'FOR',
}

export type ProposalVote_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<ProposalVote_Filter>>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<ProposalVote_Filter>>>
  proposal?: InputMaybe<Scalars['String']>
  proposal_?: InputMaybe<Proposal_Filter>
  proposal_contains?: InputMaybe<Scalars['String']>
  proposal_contains_nocase?: InputMaybe<Scalars['String']>
  proposal_ends_with?: InputMaybe<Scalars['String']>
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']>
  proposal_gt?: InputMaybe<Scalars['String']>
  proposal_gte?: InputMaybe<Scalars['String']>
  proposal_in?: InputMaybe<Array<Scalars['String']>>
  proposal_lt?: InputMaybe<Scalars['String']>
  proposal_lte?: InputMaybe<Scalars['String']>
  proposal_not?: InputMaybe<Scalars['String']>
  proposal_not_contains?: InputMaybe<Scalars['String']>
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']>
  proposal_not_ends_with?: InputMaybe<Scalars['String']>
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  proposal_not_in?: InputMaybe<Array<Scalars['String']>>
  proposal_not_starts_with?: InputMaybe<Scalars['String']>
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  proposal_starts_with?: InputMaybe<Scalars['String']>
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']>
  reason?: InputMaybe<Scalars['String']>
  reason_contains?: InputMaybe<Scalars['String']>
  reason_contains_nocase?: InputMaybe<Scalars['String']>
  reason_ends_with?: InputMaybe<Scalars['String']>
  reason_ends_with_nocase?: InputMaybe<Scalars['String']>
  reason_gt?: InputMaybe<Scalars['String']>
  reason_gte?: InputMaybe<Scalars['String']>
  reason_in?: InputMaybe<Array<Scalars['String']>>
  reason_lt?: InputMaybe<Scalars['String']>
  reason_lte?: InputMaybe<Scalars['String']>
  reason_not?: InputMaybe<Scalars['String']>
  reason_not_contains?: InputMaybe<Scalars['String']>
  reason_not_contains_nocase?: InputMaybe<Scalars['String']>
  reason_not_ends_with?: InputMaybe<Scalars['String']>
  reason_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  reason_not_in?: InputMaybe<Array<Scalars['String']>>
  reason_not_starts_with?: InputMaybe<Scalars['String']>
  reason_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  reason_starts_with?: InputMaybe<Scalars['String']>
  reason_starts_with_nocase?: InputMaybe<Scalars['String']>
  support?: InputMaybe<ProposalVoteSupport>
  support_in?: InputMaybe<Array<ProposalVoteSupport>>
  support_not?: InputMaybe<ProposalVoteSupport>
  support_not_in?: InputMaybe<Array<ProposalVoteSupport>>
  voter?: InputMaybe<Scalars['Bytes']>
  voter_contains?: InputMaybe<Scalars['Bytes']>
  voter_gt?: InputMaybe<Scalars['Bytes']>
  voter_gte?: InputMaybe<Scalars['Bytes']>
  voter_in?: InputMaybe<Array<Scalars['Bytes']>>
  voter_lt?: InputMaybe<Scalars['Bytes']>
  voter_lte?: InputMaybe<Scalars['Bytes']>
  voter_not?: InputMaybe<Scalars['Bytes']>
  voter_not_contains?: InputMaybe<Scalars['Bytes']>
  voter_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  weight?: InputMaybe<Scalars['Int']>
  weight_gt?: InputMaybe<Scalars['Int']>
  weight_gte?: InputMaybe<Scalars['Int']>
  weight_in?: InputMaybe<Array<Scalars['Int']>>
  weight_lt?: InputMaybe<Scalars['Int']>
  weight_lte?: InputMaybe<Scalars['Int']>
  weight_not?: InputMaybe<Scalars['Int']>
  weight_not_in?: InputMaybe<Array<Scalars['Int']>>
}

export enum ProposalVote_OrderBy {
  Id = 'id',
  Proposal = 'proposal',
  ProposalAbstainVotes = 'proposal__abstainVotes',
  ProposalAgainstVotes = 'proposal__againstVotes',
  ProposalCalldatas = 'proposal__calldatas',
  ProposalCanceled = 'proposal__canceled',
  ProposalDescription = 'proposal__description',
  ProposalDescriptionHash = 'proposal__descriptionHash',
  ProposalExecutableFrom = 'proposal__executableFrom',
  ProposalExecuted = 'proposal__executed',
  ProposalExpiresAt = 'proposal__expiresAt',
  ProposalForVotes = 'proposal__forVotes',
  ProposalId = 'proposal__id',
  ProposalProposalId = 'proposal__proposalId',
  ProposalProposalNumber = 'proposal__proposalNumber',
  ProposalProposalThreshold = 'proposal__proposalThreshold',
  ProposalProposer = 'proposal__proposer',
  ProposalQueued = 'proposal__queued',
  ProposalQuorumVotes = 'proposal__quorumVotes',
  ProposalSnapshotBlockNumber = 'proposal__snapshotBlockNumber',
  ProposalTimeCreated = 'proposal__timeCreated',
  ProposalTitle = 'proposal__title',
  ProposalTransactionHash = 'proposal__transactionHash',
  ProposalVetoed = 'proposal__vetoed',
  ProposalVoteCount = 'proposal__voteCount',
  ProposalVoteEnd = 'proposal__voteEnd',
  ProposalVoteStart = 'proposal__voteStart',
  Reason = 'reason',
  Support = 'support',
  Voter = 'voter',
  Weight = 'weight',
}

export type Proposal_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  abstainVotes?: InputMaybe<Scalars['Int']>
  abstainVotes_gt?: InputMaybe<Scalars['Int']>
  abstainVotes_gte?: InputMaybe<Scalars['Int']>
  abstainVotes_in?: InputMaybe<Array<Scalars['Int']>>
  abstainVotes_lt?: InputMaybe<Scalars['Int']>
  abstainVotes_lte?: InputMaybe<Scalars['Int']>
  abstainVotes_not?: InputMaybe<Scalars['Int']>
  abstainVotes_not_in?: InputMaybe<Array<Scalars['Int']>>
  againstVotes?: InputMaybe<Scalars['Int']>
  againstVotes_gt?: InputMaybe<Scalars['Int']>
  againstVotes_gte?: InputMaybe<Scalars['Int']>
  againstVotes_in?: InputMaybe<Array<Scalars['Int']>>
  againstVotes_lt?: InputMaybe<Scalars['Int']>
  againstVotes_lte?: InputMaybe<Scalars['Int']>
  againstVotes_not?: InputMaybe<Scalars['Int']>
  againstVotes_not_in?: InputMaybe<Array<Scalars['Int']>>
  and?: InputMaybe<Array<InputMaybe<Proposal_Filter>>>
  calldatas?: InputMaybe<Scalars['String']>
  calldatas_contains?: InputMaybe<Scalars['String']>
  calldatas_contains_nocase?: InputMaybe<Scalars['String']>
  calldatas_ends_with?: InputMaybe<Scalars['String']>
  calldatas_ends_with_nocase?: InputMaybe<Scalars['String']>
  calldatas_gt?: InputMaybe<Scalars['String']>
  calldatas_gte?: InputMaybe<Scalars['String']>
  calldatas_in?: InputMaybe<Array<Scalars['String']>>
  calldatas_lt?: InputMaybe<Scalars['String']>
  calldatas_lte?: InputMaybe<Scalars['String']>
  calldatas_not?: InputMaybe<Scalars['String']>
  calldatas_not_contains?: InputMaybe<Scalars['String']>
  calldatas_not_contains_nocase?: InputMaybe<Scalars['String']>
  calldatas_not_ends_with?: InputMaybe<Scalars['String']>
  calldatas_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  calldatas_not_in?: InputMaybe<Array<Scalars['String']>>
  calldatas_not_starts_with?: InputMaybe<Scalars['String']>
  calldatas_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  calldatas_starts_with?: InputMaybe<Scalars['String']>
  calldatas_starts_with_nocase?: InputMaybe<Scalars['String']>
  canceled?: InputMaybe<Scalars['Boolean']>
  canceled_in?: InputMaybe<Array<Scalars['Boolean']>>
  canceled_not?: InputMaybe<Scalars['Boolean']>
  canceled_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  dao?: InputMaybe<Scalars['String']>
  dao_?: InputMaybe<Dao_Filter>
  dao_contains?: InputMaybe<Scalars['String']>
  dao_contains_nocase?: InputMaybe<Scalars['String']>
  dao_ends_with?: InputMaybe<Scalars['String']>
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>
  dao_gt?: InputMaybe<Scalars['String']>
  dao_gte?: InputMaybe<Scalars['String']>
  dao_in?: InputMaybe<Array<Scalars['String']>>
  dao_lt?: InputMaybe<Scalars['String']>
  dao_lte?: InputMaybe<Scalars['String']>
  dao_not?: InputMaybe<Scalars['String']>
  dao_not_contains?: InputMaybe<Scalars['String']>
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>
  dao_not_ends_with?: InputMaybe<Scalars['String']>
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  dao_not_in?: InputMaybe<Array<Scalars['String']>>
  dao_not_starts_with?: InputMaybe<Scalars['String']>
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  dao_starts_with?: InputMaybe<Scalars['String']>
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  descriptionHash?: InputMaybe<Scalars['Bytes']>
  descriptionHash_contains?: InputMaybe<Scalars['Bytes']>
  descriptionHash_gt?: InputMaybe<Scalars['Bytes']>
  descriptionHash_gte?: InputMaybe<Scalars['Bytes']>
  descriptionHash_in?: InputMaybe<Array<Scalars['Bytes']>>
  descriptionHash_lt?: InputMaybe<Scalars['Bytes']>
  descriptionHash_lte?: InputMaybe<Scalars['Bytes']>
  descriptionHash_not?: InputMaybe<Scalars['Bytes']>
  descriptionHash_not_contains?: InputMaybe<Scalars['Bytes']>
  descriptionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  description_contains?: InputMaybe<Scalars['String']>
  description_contains_nocase?: InputMaybe<Scalars['String']>
  description_ends_with?: InputMaybe<Scalars['String']>
  description_ends_with_nocase?: InputMaybe<Scalars['String']>
  description_gt?: InputMaybe<Scalars['String']>
  description_gte?: InputMaybe<Scalars['String']>
  description_in?: InputMaybe<Array<Scalars['String']>>
  description_lt?: InputMaybe<Scalars['String']>
  description_lte?: InputMaybe<Scalars['String']>
  description_not?: InputMaybe<Scalars['String']>
  description_not_contains?: InputMaybe<Scalars['String']>
  description_not_contains_nocase?: InputMaybe<Scalars['String']>
  description_not_ends_with?: InputMaybe<Scalars['String']>
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  description_not_in?: InputMaybe<Array<Scalars['String']>>
  description_not_starts_with?: InputMaybe<Scalars['String']>
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  description_starts_with?: InputMaybe<Scalars['String']>
  description_starts_with_nocase?: InputMaybe<Scalars['String']>
  executableFrom?: InputMaybe<Scalars['BigInt']>
  executableFrom_gt?: InputMaybe<Scalars['BigInt']>
  executableFrom_gte?: InputMaybe<Scalars['BigInt']>
  executableFrom_in?: InputMaybe<Array<Scalars['BigInt']>>
  executableFrom_lt?: InputMaybe<Scalars['BigInt']>
  executableFrom_lte?: InputMaybe<Scalars['BigInt']>
  executableFrom_not?: InputMaybe<Scalars['BigInt']>
  executableFrom_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  executed?: InputMaybe<Scalars['Boolean']>
  executed_in?: InputMaybe<Array<Scalars['Boolean']>>
  executed_not?: InputMaybe<Scalars['Boolean']>
  executed_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  expiresAt?: InputMaybe<Scalars['BigInt']>
  expiresAt_gt?: InputMaybe<Scalars['BigInt']>
  expiresAt_gte?: InputMaybe<Scalars['BigInt']>
  expiresAt_in?: InputMaybe<Array<Scalars['BigInt']>>
  expiresAt_lt?: InputMaybe<Scalars['BigInt']>
  expiresAt_lte?: InputMaybe<Scalars['BigInt']>
  expiresAt_not?: InputMaybe<Scalars['BigInt']>
  expiresAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  forVotes?: InputMaybe<Scalars['Int']>
  forVotes_gt?: InputMaybe<Scalars['Int']>
  forVotes_gte?: InputMaybe<Scalars['Int']>
  forVotes_in?: InputMaybe<Array<Scalars['Int']>>
  forVotes_lt?: InputMaybe<Scalars['Int']>
  forVotes_lte?: InputMaybe<Scalars['Int']>
  forVotes_not?: InputMaybe<Scalars['Int']>
  forVotes_not_in?: InputMaybe<Array<Scalars['Int']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<Proposal_Filter>>>
  proposalId?: InputMaybe<Scalars['Bytes']>
  proposalId_contains?: InputMaybe<Scalars['Bytes']>
  proposalId_gt?: InputMaybe<Scalars['Bytes']>
  proposalId_gte?: InputMaybe<Scalars['Bytes']>
  proposalId_in?: InputMaybe<Array<Scalars['Bytes']>>
  proposalId_lt?: InputMaybe<Scalars['Bytes']>
  proposalId_lte?: InputMaybe<Scalars['Bytes']>
  proposalId_not?: InputMaybe<Scalars['Bytes']>
  proposalId_not_contains?: InputMaybe<Scalars['Bytes']>
  proposalId_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  proposalNumber?: InputMaybe<Scalars['Int']>
  proposalNumber_gt?: InputMaybe<Scalars['Int']>
  proposalNumber_gte?: InputMaybe<Scalars['Int']>
  proposalNumber_in?: InputMaybe<Array<Scalars['Int']>>
  proposalNumber_lt?: InputMaybe<Scalars['Int']>
  proposalNumber_lte?: InputMaybe<Scalars['Int']>
  proposalNumber_not?: InputMaybe<Scalars['Int']>
  proposalNumber_not_in?: InputMaybe<Array<Scalars['Int']>>
  proposalThreshold?: InputMaybe<Scalars['BigInt']>
  proposalThreshold_gt?: InputMaybe<Scalars['BigInt']>
  proposalThreshold_gte?: InputMaybe<Scalars['BigInt']>
  proposalThreshold_in?: InputMaybe<Array<Scalars['BigInt']>>
  proposalThreshold_lt?: InputMaybe<Scalars['BigInt']>
  proposalThreshold_lte?: InputMaybe<Scalars['BigInt']>
  proposalThreshold_not?: InputMaybe<Scalars['BigInt']>
  proposalThreshold_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  proposer?: InputMaybe<Scalars['Bytes']>
  proposer_contains?: InputMaybe<Scalars['Bytes']>
  proposer_gt?: InputMaybe<Scalars['Bytes']>
  proposer_gte?: InputMaybe<Scalars['Bytes']>
  proposer_in?: InputMaybe<Array<Scalars['Bytes']>>
  proposer_lt?: InputMaybe<Scalars['Bytes']>
  proposer_lte?: InputMaybe<Scalars['Bytes']>
  proposer_not?: InputMaybe<Scalars['Bytes']>
  proposer_not_contains?: InputMaybe<Scalars['Bytes']>
  proposer_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  queued?: InputMaybe<Scalars['Boolean']>
  queued_in?: InputMaybe<Array<Scalars['Boolean']>>
  queued_not?: InputMaybe<Scalars['Boolean']>
  queued_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  quorumVotes?: InputMaybe<Scalars['BigInt']>
  quorumVotes_gt?: InputMaybe<Scalars['BigInt']>
  quorumVotes_gte?: InputMaybe<Scalars['BigInt']>
  quorumVotes_in?: InputMaybe<Array<Scalars['BigInt']>>
  quorumVotes_lt?: InputMaybe<Scalars['BigInt']>
  quorumVotes_lte?: InputMaybe<Scalars['BigInt']>
  quorumVotes_not?: InputMaybe<Scalars['BigInt']>
  quorumVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  snapshotBlockNumber?: InputMaybe<Scalars['BigInt']>
  snapshotBlockNumber_gt?: InputMaybe<Scalars['BigInt']>
  snapshotBlockNumber_gte?: InputMaybe<Scalars['BigInt']>
  snapshotBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>
  snapshotBlockNumber_lt?: InputMaybe<Scalars['BigInt']>
  snapshotBlockNumber_lte?: InputMaybe<Scalars['BigInt']>
  snapshotBlockNumber_not?: InputMaybe<Scalars['BigInt']>
  snapshotBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  targets?: InputMaybe<Array<Scalars['Bytes']>>
  targets_contains?: InputMaybe<Array<Scalars['Bytes']>>
  targets_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>
  targets_not?: InputMaybe<Array<Scalars['Bytes']>>
  targets_not_contains?: InputMaybe<Array<Scalars['Bytes']>>
  targets_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>
  timeCreated?: InputMaybe<Scalars['BigInt']>
  timeCreated_gt?: InputMaybe<Scalars['BigInt']>
  timeCreated_gte?: InputMaybe<Scalars['BigInt']>
  timeCreated_in?: InputMaybe<Array<Scalars['BigInt']>>
  timeCreated_lt?: InputMaybe<Scalars['BigInt']>
  timeCreated_lte?: InputMaybe<Scalars['BigInt']>
  timeCreated_not?: InputMaybe<Scalars['BigInt']>
  timeCreated_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  title?: InputMaybe<Scalars['String']>
  title_contains?: InputMaybe<Scalars['String']>
  title_contains_nocase?: InputMaybe<Scalars['String']>
  title_ends_with?: InputMaybe<Scalars['String']>
  title_ends_with_nocase?: InputMaybe<Scalars['String']>
  title_gt?: InputMaybe<Scalars['String']>
  title_gte?: InputMaybe<Scalars['String']>
  title_in?: InputMaybe<Array<Scalars['String']>>
  title_lt?: InputMaybe<Scalars['String']>
  title_lte?: InputMaybe<Scalars['String']>
  title_not?: InputMaybe<Scalars['String']>
  title_not_contains?: InputMaybe<Scalars['String']>
  title_not_contains_nocase?: InputMaybe<Scalars['String']>
  title_not_ends_with?: InputMaybe<Scalars['String']>
  title_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  title_not_in?: InputMaybe<Array<Scalars['String']>>
  title_not_starts_with?: InputMaybe<Scalars['String']>
  title_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  title_starts_with?: InputMaybe<Scalars['String']>
  title_starts_with_nocase?: InputMaybe<Scalars['String']>
  transactionHash?: InputMaybe<Scalars['Bytes']>
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>
  transactionHash_not?: InputMaybe<Scalars['Bytes']>
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  values?: InputMaybe<Array<Scalars['BigInt']>>
  values_contains?: InputMaybe<Array<Scalars['BigInt']>>
  values_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
  values_not?: InputMaybe<Array<Scalars['BigInt']>>
  values_not_contains?: InputMaybe<Array<Scalars['BigInt']>>
  values_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
  vetoed?: InputMaybe<Scalars['Boolean']>
  vetoed_in?: InputMaybe<Array<Scalars['Boolean']>>
  vetoed_not?: InputMaybe<Scalars['Boolean']>
  vetoed_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  voteCount?: InputMaybe<Scalars['Int']>
  voteCount_gt?: InputMaybe<Scalars['Int']>
  voteCount_gte?: InputMaybe<Scalars['Int']>
  voteCount_in?: InputMaybe<Array<Scalars['Int']>>
  voteCount_lt?: InputMaybe<Scalars['Int']>
  voteCount_lte?: InputMaybe<Scalars['Int']>
  voteCount_not?: InputMaybe<Scalars['Int']>
  voteCount_not_in?: InputMaybe<Array<Scalars['Int']>>
  voteEnd?: InputMaybe<Scalars['BigInt']>
  voteEnd_gt?: InputMaybe<Scalars['BigInt']>
  voteEnd_gte?: InputMaybe<Scalars['BigInt']>
  voteEnd_in?: InputMaybe<Array<Scalars['BigInt']>>
  voteEnd_lt?: InputMaybe<Scalars['BigInt']>
  voteEnd_lte?: InputMaybe<Scalars['BigInt']>
  voteEnd_not?: InputMaybe<Scalars['BigInt']>
  voteEnd_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  voteStart?: InputMaybe<Scalars['BigInt']>
  voteStart_gt?: InputMaybe<Scalars['BigInt']>
  voteStart_gte?: InputMaybe<Scalars['BigInt']>
  voteStart_in?: InputMaybe<Array<Scalars['BigInt']>>
  voteStart_lt?: InputMaybe<Scalars['BigInt']>
  voteStart_lte?: InputMaybe<Scalars['BigInt']>
  voteStart_not?: InputMaybe<Scalars['BigInt']>
  voteStart_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  votes_?: InputMaybe<ProposalVote_Filter>
}

export enum Proposal_OrderBy {
  AbstainVotes = 'abstainVotes',
  AgainstVotes = 'againstVotes',
  Calldatas = 'calldatas',
  Canceled = 'canceled',
  Dao = 'dao',
  DaoAuctionAddress = 'dao__auctionAddress',
  DaoContractImage = 'dao__contractImage',
  DaoDescription = 'dao__description',
  DaoGovernorAddress = 'dao__governorAddress',
  DaoId = 'dao__id',
  DaoMetadataAddress = 'dao__metadataAddress',
  DaoName = 'dao__name',
  DaoOwnerCount = 'dao__ownerCount',
  DaoProjectUri = 'dao__projectURI',
  DaoProposalCount = 'dao__proposalCount',
  DaoSymbol = 'dao__symbol',
  DaoTokenAddress = 'dao__tokenAddress',
  DaoTotalAuctionSales = 'dao__totalAuctionSales',
  DaoTotalSupply = 'dao__totalSupply',
  DaoTreasuryAddress = 'dao__treasuryAddress',
  Description = 'description',
  DescriptionHash = 'descriptionHash',
  ExecutableFrom = 'executableFrom',
  Executed = 'executed',
  ExpiresAt = 'expiresAt',
  ForVotes = 'forVotes',
  Id = 'id',
  ProposalId = 'proposalId',
  ProposalNumber = 'proposalNumber',
  ProposalThreshold = 'proposalThreshold',
  Proposer = 'proposer',
  Queued = 'queued',
  QuorumVotes = 'quorumVotes',
  SnapshotBlockNumber = 'snapshotBlockNumber',
  Targets = 'targets',
  TimeCreated = 'timeCreated',
  Title = 'title',
  TransactionHash = 'transactionHash',
  Values = 'values',
  Vetoed = 'vetoed',
  VoteCount = 'voteCount',
  VoteEnd = 'voteEnd',
  VoteStart = 'voteStart',
  Votes = 'votes',
}

export type Query = {
  __typename?: 'Query'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  auction?: Maybe<Auction>
  auctionBid?: Maybe<AuctionBid>
  auctionBids: Array<AuctionBid>
  auctionConfig?: Maybe<AuctionConfig>
  auctionConfigs: Array<AuctionConfig>
  auctions: Array<Auction>
  dao?: Maybe<Dao>
  daos: Array<Dao>
  daotokenOwner?: Maybe<DaoTokenOwner>
  daotokenOwners: Array<DaoTokenOwner>
  proposal?: Maybe<Proposal>
  proposalVote?: Maybe<ProposalVote>
  proposalVotes: Array<ProposalVote>
  proposals: Array<Proposal>
  token?: Maybe<Token>
  tokens: Array<Token>
}

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type QueryAuctionArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryAuctionBidArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryAuctionBidsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<AuctionBid_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<AuctionBid_Filter>
}

export type QueryAuctionConfigArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryAuctionConfigsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<AuctionConfig_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<AuctionConfig_Filter>
}

export type QueryAuctionsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Auction_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Auction_Filter>
}

export type QueryDaoArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryDaosArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Dao_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Dao_Filter>
}

export type QueryDaotokenOwnerArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryDaotokenOwnersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<DaoTokenOwner_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<DaoTokenOwner_Filter>
}

export type QueryProposalArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryProposalVoteArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryProposalVotesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ProposalVote_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ProposalVote_Filter>
}

export type QueryProposalsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Proposal_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Proposal_Filter>
}

export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Token_Filter>
}

export type Subscription = {
  __typename?: 'Subscription'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  auction?: Maybe<Auction>
  auctionBid?: Maybe<AuctionBid>
  auctionBids: Array<AuctionBid>
  auctionConfig?: Maybe<AuctionConfig>
  auctionConfigs: Array<AuctionConfig>
  auctions: Array<Auction>
  dao?: Maybe<Dao>
  daos: Array<Dao>
  daotokenOwner?: Maybe<DaoTokenOwner>
  daotokenOwners: Array<DaoTokenOwner>
  proposal?: Maybe<Proposal>
  proposalVote?: Maybe<ProposalVote>
  proposalVotes: Array<ProposalVote>
  proposals: Array<Proposal>
  token?: Maybe<Token>
  tokens: Array<Token>
}

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type SubscriptionAuctionArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionAuctionBidArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionAuctionBidsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<AuctionBid_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<AuctionBid_Filter>
}

export type SubscriptionAuctionConfigArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionAuctionConfigsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<AuctionConfig_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<AuctionConfig_Filter>
}

export type SubscriptionAuctionsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Auction_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Auction_Filter>
}

export type SubscriptionDaoArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionDaosArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Dao_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Dao_Filter>
}

export type SubscriptionDaotokenOwnerArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionDaotokenOwnersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<DaoTokenOwner_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<DaoTokenOwner_Filter>
}

export type SubscriptionProposalArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionProposalVoteArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionProposalVotesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ProposalVote_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ProposalVote_Filter>
}

export type SubscriptionProposalsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Proposal_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Proposal_Filter>
}

export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Token_Filter>
}

export type Token = {
  __typename?: 'Token'
  auction?: Maybe<Auction>
  dao: Dao
  id: Scalars['ID']
  image: Scalars['String']
  mintedAt: Scalars['BigInt']
  name: Scalars['String']
  owner: Scalars['Bytes']
  ownerInfo: DaoTokenOwner
  tokenContract: Scalars['Bytes']
  tokenId: Scalars['BigInt']
}

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>
  auction_?: InputMaybe<Auction_Filter>
  dao?: InputMaybe<Scalars['String']>
  dao_?: InputMaybe<Dao_Filter>
  dao_contains?: InputMaybe<Scalars['String']>
  dao_contains_nocase?: InputMaybe<Scalars['String']>
  dao_ends_with?: InputMaybe<Scalars['String']>
  dao_ends_with_nocase?: InputMaybe<Scalars['String']>
  dao_gt?: InputMaybe<Scalars['String']>
  dao_gte?: InputMaybe<Scalars['String']>
  dao_in?: InputMaybe<Array<Scalars['String']>>
  dao_lt?: InputMaybe<Scalars['String']>
  dao_lte?: InputMaybe<Scalars['String']>
  dao_not?: InputMaybe<Scalars['String']>
  dao_not_contains?: InputMaybe<Scalars['String']>
  dao_not_contains_nocase?: InputMaybe<Scalars['String']>
  dao_not_ends_with?: InputMaybe<Scalars['String']>
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  dao_not_in?: InputMaybe<Array<Scalars['String']>>
  dao_not_starts_with?: InputMaybe<Scalars['String']>
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  dao_starts_with?: InputMaybe<Scalars['String']>
  dao_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  image?: InputMaybe<Scalars['String']>
  image_contains?: InputMaybe<Scalars['String']>
  image_contains_nocase?: InputMaybe<Scalars['String']>
  image_ends_with?: InputMaybe<Scalars['String']>
  image_ends_with_nocase?: InputMaybe<Scalars['String']>
  image_gt?: InputMaybe<Scalars['String']>
  image_gte?: InputMaybe<Scalars['String']>
  image_in?: InputMaybe<Array<Scalars['String']>>
  image_lt?: InputMaybe<Scalars['String']>
  image_lte?: InputMaybe<Scalars['String']>
  image_not?: InputMaybe<Scalars['String']>
  image_not_contains?: InputMaybe<Scalars['String']>
  image_not_contains_nocase?: InputMaybe<Scalars['String']>
  image_not_ends_with?: InputMaybe<Scalars['String']>
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  image_not_in?: InputMaybe<Array<Scalars['String']>>
  image_not_starts_with?: InputMaybe<Scalars['String']>
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  image_starts_with?: InputMaybe<Scalars['String']>
  image_starts_with_nocase?: InputMaybe<Scalars['String']>
  mintedAt?: InputMaybe<Scalars['BigInt']>
  mintedAt_gt?: InputMaybe<Scalars['BigInt']>
  mintedAt_gte?: InputMaybe<Scalars['BigInt']>
  mintedAt_in?: InputMaybe<Array<Scalars['BigInt']>>
  mintedAt_lt?: InputMaybe<Scalars['BigInt']>
  mintedAt_lte?: InputMaybe<Scalars['BigInt']>
  mintedAt_not?: InputMaybe<Scalars['BigInt']>
  mintedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  name?: InputMaybe<Scalars['String']>
  name_contains?: InputMaybe<Scalars['String']>
  name_contains_nocase?: InputMaybe<Scalars['String']>
  name_ends_with?: InputMaybe<Scalars['String']>
  name_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_gt?: InputMaybe<Scalars['String']>
  name_gte?: InputMaybe<Scalars['String']>
  name_in?: InputMaybe<Array<Scalars['String']>>
  name_lt?: InputMaybe<Scalars['String']>
  name_lte?: InputMaybe<Scalars['String']>
  name_not?: InputMaybe<Scalars['String']>
  name_not_contains?: InputMaybe<Scalars['String']>
  name_not_contains_nocase?: InputMaybe<Scalars['String']>
  name_not_ends_with?: InputMaybe<Scalars['String']>
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_not_in?: InputMaybe<Array<Scalars['String']>>
  name_not_starts_with?: InputMaybe<Scalars['String']>
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  name_starts_with?: InputMaybe<Scalars['String']>
  name_starts_with_nocase?: InputMaybe<Scalars['String']>
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>
  owner?: InputMaybe<Scalars['Bytes']>
  ownerInfo?: InputMaybe<Scalars['String']>
  ownerInfo_?: InputMaybe<DaoTokenOwner_Filter>
  ownerInfo_contains?: InputMaybe<Scalars['String']>
  ownerInfo_contains_nocase?: InputMaybe<Scalars['String']>
  ownerInfo_ends_with?: InputMaybe<Scalars['String']>
  ownerInfo_ends_with_nocase?: InputMaybe<Scalars['String']>
  ownerInfo_gt?: InputMaybe<Scalars['String']>
  ownerInfo_gte?: InputMaybe<Scalars['String']>
  ownerInfo_in?: InputMaybe<Array<Scalars['String']>>
  ownerInfo_lt?: InputMaybe<Scalars['String']>
  ownerInfo_lte?: InputMaybe<Scalars['String']>
  ownerInfo_not?: InputMaybe<Scalars['String']>
  ownerInfo_not_contains?: InputMaybe<Scalars['String']>
  ownerInfo_not_contains_nocase?: InputMaybe<Scalars['String']>
  ownerInfo_not_ends_with?: InputMaybe<Scalars['String']>
  ownerInfo_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  ownerInfo_not_in?: InputMaybe<Array<Scalars['String']>>
  ownerInfo_not_starts_with?: InputMaybe<Scalars['String']>
  ownerInfo_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  ownerInfo_starts_with?: InputMaybe<Scalars['String']>
  ownerInfo_starts_with_nocase?: InputMaybe<Scalars['String']>
  owner_contains?: InputMaybe<Scalars['Bytes']>
  owner_gt?: InputMaybe<Scalars['Bytes']>
  owner_gte?: InputMaybe<Scalars['Bytes']>
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>
  owner_lt?: InputMaybe<Scalars['Bytes']>
  owner_lte?: InputMaybe<Scalars['Bytes']>
  owner_not?: InputMaybe<Scalars['Bytes']>
  owner_not_contains?: InputMaybe<Scalars['Bytes']>
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  tokenContract?: InputMaybe<Scalars['Bytes']>
  tokenContract_contains?: InputMaybe<Scalars['Bytes']>
  tokenContract_gt?: InputMaybe<Scalars['Bytes']>
  tokenContract_gte?: InputMaybe<Scalars['Bytes']>
  tokenContract_in?: InputMaybe<Array<Scalars['Bytes']>>
  tokenContract_lt?: InputMaybe<Scalars['Bytes']>
  tokenContract_lte?: InputMaybe<Scalars['Bytes']>
  tokenContract_not?: InputMaybe<Scalars['Bytes']>
  tokenContract_not_contains?: InputMaybe<Scalars['Bytes']>
  tokenContract_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  tokenId?: InputMaybe<Scalars['BigInt']>
  tokenId_gt?: InputMaybe<Scalars['BigInt']>
  tokenId_gte?: InputMaybe<Scalars['BigInt']>
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenId_lt?: InputMaybe<Scalars['BigInt']>
  tokenId_lte?: InputMaybe<Scalars['BigInt']>
  tokenId_not?: InputMaybe<Scalars['BigInt']>
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>
}

export enum Token_OrderBy {
  Auction = 'auction',
  AuctionBidCount = 'auction__bidCount',
  AuctionEndTime = 'auction__endTime',
  AuctionExtended = 'auction__extended',
  AuctionFirstBidTime = 'auction__firstBidTime',
  AuctionId = 'auction__id',
  AuctionSettled = 'auction__settled',
  AuctionStartTime = 'auction__startTime',
  Dao = 'dao',
  DaoAuctionAddress = 'dao__auctionAddress',
  DaoContractImage = 'dao__contractImage',
  DaoDescription = 'dao__description',
  DaoGovernorAddress = 'dao__governorAddress',
  DaoId = 'dao__id',
  DaoMetadataAddress = 'dao__metadataAddress',
  DaoName = 'dao__name',
  DaoOwnerCount = 'dao__ownerCount',
  DaoProjectUri = 'dao__projectURI',
  DaoProposalCount = 'dao__proposalCount',
  DaoSymbol = 'dao__symbol',
  DaoTokenAddress = 'dao__tokenAddress',
  DaoTotalAuctionSales = 'dao__totalAuctionSales',
  DaoTotalSupply = 'dao__totalSupply',
  DaoTreasuryAddress = 'dao__treasuryAddress',
  Id = 'id',
  Image = 'image',
  MintedAt = 'mintedAt',
  Name = 'name',
  Owner = 'owner',
  OwnerInfo = 'ownerInfo',
  OwnerInfoDaoTokenCount = 'ownerInfo__daoTokenCount',
  OwnerInfoId = 'ownerInfo__id',
  OwnerInfoOwner = 'ownerInfo__owner',
  TokenContract = 'tokenContract',
  TokenId = 'tokenId',
}

export type _Block_ = {
  __typename?: '_Block_'
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>
  /** The block number */
  number: Scalars['Int']
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>
}

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_'
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_
  /** The deployment ID */
  deployment: Scalars['String']
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type AuctionFragment = {
  __typename?: 'Auction'
  dao: { __typename?: 'DAO'; name: string; auctionAddress: any; tokenAddress: any }
}

export type AuctionBidFragment = {
  __typename?: 'AuctionBid'
  id: string
  amount: any
  bidder: any
}

export type DaoFragment = {
  __typename?: 'DAO'
  name: string
  tokenAddress: any
  auctionAddress: any
}

export type ExploreDaoFragment = {
  __typename?: 'Auction'
  endTime: any
  dao: { __typename?: 'DAO'; name: string; tokenAddress: any }
  highestBid?: { __typename?: 'AuctionBid'; amount: any; bidder: any } | null
  token: { __typename?: 'Token'; name: string; image: string; tokenId: any }
}

export type ProposalFragment = {
  __typename?: 'Proposal'
  abstainVotes: number
  againstVotes: number
  calldatas?: string | null
  description?: string | null
  descriptionHash: any
  executableFrom?: any | null
  expiresAt?: any | null
  forVotes: number
  proposalId: any
  proposalNumber: number
  proposalThreshold: any
  proposer: any
  quorumVotes: any
  targets: Array<any>
  timeCreated: any
  title?: string | null
  values: Array<any>
  voteEnd: any
  voteStart: any
  snapshotBlockNumber: any
  transactionHash: any
  dao: { __typename?: 'DAO'; governorAddress: any; tokenAddress: any }
}

export type ProposalVoteFragment = {
  __typename?: 'ProposalVote'
  voter: any
  support: ProposalVoteSupport
  weight: number
  reason?: string | null
}

export type TokenFragment = {
  __typename?: 'Token'
  tokenId: any
  tokenContract: any
  name: string
  image: string
  owner: any
  mintedAt: any
  dao: { __typename?: 'DAO'; description: string }
}

export type ActiveAuctionsQueryVariables = Exact<{
  first: Scalars['Int']
  where: Auction_Filter
}>

export type ActiveAuctionsQuery = {
  __typename?: 'Query'
  auctions: Array<{
    __typename?: 'Auction'
    dao: { __typename?: 'DAO'; name: string; auctionAddress: any; tokenAddress: any }
  }>
}

export type ActiveDaosQueryVariables = Exact<{
  first: Scalars['Int']
  where: Dao_Filter
}>

export type ActiveDaosQuery = {
  __typename?: 'Query'
  daos: Array<{ __typename?: 'DAO'; id: string }>
}

export type AuctionBidsQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type AuctionBidsQuery = {
  __typename?: 'Query'
  auction?: {
    __typename?: 'Auction'
    bids?: Array<{
      __typename?: 'AuctionBid'
      id: string
      amount: any
      bidder: any
    }> | null
  } | null
}

export type AuctionHistoryQueryVariables = Exact<{
  startTime: Scalars['BigInt']
  daoId: Scalars['ID']
  orderBy?: InputMaybe<Auction_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  first?: InputMaybe<Scalars['Int']>
}>

export type AuctionHistoryQuery = {
  __typename?: 'Query'
  dao?: {
    __typename?: 'DAO'
    auctions: Array<{
      __typename?: 'Auction'
      id: string
      endTime: any
      settled: boolean
      winningBid?: { __typename?: 'AuctionBid'; amount: any } | null
    }>
  } | null
}

export type DaoInfoQueryVariables = Exact<{
  tokenAddress: Scalars['ID']
}>

export type DaoInfoQuery = {
  __typename?: 'Query'
  dao?: { __typename?: 'DAO'; totalSupply: number; ownerCount: number } | null
}

export type DaoMembersListQueryVariables = Exact<{
  where?: InputMaybe<DaoTokenOwner_Filter>
  first?: InputMaybe<Scalars['Int']>
  skip?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<DaoTokenOwner_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
}>

export type DaoMembersListQuery = {
  __typename?: 'Query'
  daotokenOwners: Array<{
    __typename?: 'DAOTokenOwner'
    id: string
    owner: any
    daoTokenCount: number
    daoTokens: Array<{ __typename?: 'Token'; mintedAt: any }>
  }>
}

export type DaoOgMetadataQueryVariables = Exact<{
  tokenAddress: Scalars['ID']
}>

export type DaoOgMetadataQuery = {
  __typename?: 'Query'
  dao?: {
    __typename?: 'DAO'
    name: string
    description: string
    contractImage: string
    totalSupply: number
    ownerCount: number
    proposalCount: number
    tokenAddress: any
    metadataAddress: any
    auctionAddress: any
    treasuryAddress: any
    governorAddress: any
  } | null
}

export type DaoTokenOwnersQueryVariables = Exact<{
  where?: InputMaybe<DaoTokenOwner_Filter>
  first?: InputMaybe<Scalars['Int']>
  skip?: InputMaybe<Scalars['Int']>
}>

export type DaoTokenOwnersQuery = {
  __typename?: 'Query'
  daotokenOwners: Array<{
    __typename?: 'DAOTokenOwner'
    dao: { __typename?: 'DAO'; name: string; tokenAddress: any; auctionAddress: any }
  }>
}

export type ExploreDaosPageQueryVariables = Exact<{
  orderBy?: InputMaybe<Auction_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  where?: InputMaybe<Auction_Filter>
  skip?: InputMaybe<Scalars['Int']>
  first?: InputMaybe<Scalars['Int']>
}>

export type ExploreDaosPageQuery = {
  __typename?: 'Query'
  auctions: Array<{
    __typename?: 'Auction'
    endTime: any
    dao: { __typename?: 'DAO'; name: string; tokenAddress: any }
    highestBid?: { __typename?: 'AuctionBid'; amount: any; bidder: any } | null
    token: { __typename?: 'Token'; name: string; image: string; tokenId: any }
  }>
}

export type MyDaosPageQueryVariables = Exact<{
  daos?: InputMaybe<Array<Scalars['String']> | Scalars['String']>
  orderBy?: InputMaybe<Auction_OrderBy>
  skip?: InputMaybe<Scalars['Int']>
}>

export type MyDaosPageQuery = {
  __typename?: 'Query'
  auctions: Array<{
    __typename?: 'Auction'
    endTime: any
    dao: { __typename?: 'DAO'; name: string; tokenAddress: any }
    highestBid?: { __typename?: 'AuctionBid'; amount: any; bidder: any } | null
    token: { __typename?: 'Token'; name: string; image: string; tokenId: any }
  }>
}

export type ProposalQueryVariables = Exact<{
  proposalId: Scalars['ID']
}>

export type ProposalQuery = {
  __typename?: 'Query'
  proposal?: {
    __typename?: 'Proposal'
    abstainVotes: number
    againstVotes: number
    calldatas?: string | null
    description?: string | null
    descriptionHash: any
    executableFrom?: any | null
    expiresAt?: any | null
    forVotes: number
    proposalId: any
    proposalNumber: number
    proposalThreshold: any
    proposer: any
    quorumVotes: any
    targets: Array<any>
    timeCreated: any
    title?: string | null
    values: Array<any>
    voteEnd: any
    voteStart: any
    snapshotBlockNumber: any
    transactionHash: any
    votes: Array<{
      __typename?: 'ProposalVote'
      voter: any
      support: ProposalVoteSupport
      weight: number
      reason?: string | null
    }>
    dao: { __typename?: 'DAO'; governorAddress: any; tokenAddress: any }
  } | null
}

export type ProposalOgMetadataQueryVariables = Exact<{
  proposalId: Scalars['ID']
}>

export type ProposalOgMetadataQuery = {
  __typename?: 'Query'
  proposal?: {
    __typename?: 'Proposal'
    abstainVotes: number
    againstVotes: number
    calldatas?: string | null
    description?: string | null
    descriptionHash: any
    executableFrom?: any | null
    expiresAt?: any | null
    forVotes: number
    proposalId: any
    proposalNumber: number
    proposalThreshold: any
    proposer: any
    quorumVotes: any
    targets: Array<any>
    timeCreated: any
    title?: string | null
    values: Array<any>
    voteEnd: any
    voteStart: any
    snapshotBlockNumber: any
    transactionHash: any
    dao: {
      __typename?: 'DAO'
      name: string
      contractImage: string
      tokenAddress: any
      metadataAddress: any
      auctionAddress: any
      treasuryAddress: any
      governorAddress: any
    }
  } | null
}

export type ProposalsQueryVariables = Exact<{
  where?: InputMaybe<Proposal_Filter>
  first: Scalars['Int']
  skip?: InputMaybe<Scalars['Int']>
}>

export type ProposalsQuery = {
  __typename?: 'Query'
  proposals: Array<{
    __typename?: 'Proposal'
    abstainVotes: number
    againstVotes: number
    calldatas?: string | null
    description?: string | null
    descriptionHash: any
    executableFrom?: any | null
    expiresAt?: any | null
    forVotes: number
    proposalId: any
    proposalNumber: number
    proposalThreshold: any
    proposer: any
    quorumVotes: any
    targets: Array<any>
    timeCreated: any
    title?: string | null
    values: Array<any>
    voteEnd: any
    voteStart: any
    snapshotBlockNumber: any
    transactionHash: any
    votes: Array<{
      __typename?: 'ProposalVote'
      voter: any
      support: ProposalVoteSupport
      weight: number
      reason?: string | null
    }>
    dao: { __typename?: 'DAO'; governorAddress: any; tokenAddress: any }
  }>
}

export type TokenQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type TokenQuery = {
  __typename?: 'Query'
  token?: {
    __typename?: 'Token'
    tokenId: any
    tokenContract: any
    name: string
    image: string
    owner: any
    mintedAt: any
    dao: { __typename?: 'DAO'; description: string }
  } | null
}

export type TokenWinnerQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type TokenWinnerQuery = {
  __typename?: 'Query'
  auction?: {
    __typename?: 'Auction'
    winningBid?: { __typename?: 'AuctionBid'; amount: any; bidder: any } | null
  } | null
}

export type TokensQueryVariables = Exact<{
  where?: InputMaybe<Token_Filter>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  first?: InputMaybe<Scalars['Int']>
  skip?: InputMaybe<Scalars['Int']>
}>

export type TokensQuery = {
  __typename?: 'Query'
  tokens: Array<{
    __typename?: 'Token'
    tokenId: any
    tokenContract: any
    name: string
    image: string
    owner: any
    mintedAt: any
    dao: { __typename?: 'DAO'; description: string }
  }>
}

export type TotalAuctionSalesQueryVariables = Exact<{
  tokenAddress: Scalars['ID']
}>

export type TotalAuctionSalesQuery = {
  __typename?: 'Query'
  dao?: { __typename?: 'DAO'; totalAuctionSales: any } | null
}

export const AuctionFragmentDoc = gql`
  fragment Auction on Auction {
    dao {
      name
      auctionAddress
      tokenAddress
    }
  }
`
export const AuctionBidFragmentDoc = gql`
  fragment AuctionBid on AuctionBid {
    id
    amount
    bidder
  }
`
export const DaoFragmentDoc = gql`
  fragment DAO on DAO {
    name
    tokenAddress
    auctionAddress
  }
`
export const ExploreDaoFragmentDoc = gql`
  fragment ExploreDao on Auction {
    dao {
      name
      tokenAddress
    }
    endTime
    highestBid {
      amount
      bidder
    }
    token {
      name
      image
      tokenId
    }
  }
`
export const ProposalFragmentDoc = gql`
  fragment Proposal on Proposal {
    abstainVotes
    againstVotes
    calldatas
    description
    descriptionHash
    executableFrom
    expiresAt
    forVotes
    proposalId
    proposalNumber
    proposalThreshold
    proposer
    quorumVotes
    targets
    timeCreated
    title
    values
    voteEnd
    voteStart
    snapshotBlockNumber
    transactionHash
    dao {
      governorAddress
      tokenAddress
    }
  }
`
export const ProposalVoteFragmentDoc = gql`
  fragment ProposalVote on ProposalVote {
    voter
    support
    weight
    reason
  }
`
export const TokenFragmentDoc = gql`
  fragment Token on Token {
    tokenId
    tokenContract
    name
    dao {
      description
    }
    image
    owner
    mintedAt
  }
`
export const ActiveAuctionsDocument = gql`
  query activeAuctions($first: Int!, $where: Auction_filter!) {
    auctions(
      orderBy: highestBid__amount
      orderDirection: desc
      first: $first
      where: $where
    ) {
      ...Auction
    }
  }
  ${AuctionFragmentDoc}
`
export const ActiveDaosDocument = gql`
  query activeDaos($first: Int!, $where: DAO_filter!) {
    daos(first: $first, where: $where) {
      id
    }
  }
`
export const AuctionBidsDocument = gql`
  query auctionBids($id: ID!) {
    auction(id: $id) {
      bids(orderBy: bidTime, orderDirection: desc) {
        ...AuctionBid
      }
    }
  }
  ${AuctionBidFragmentDoc}
`
export const AuctionHistoryDocument = gql`
  query auctionHistory(
    $startTime: BigInt!
    $daoId: ID!
    $orderBy: Auction_orderBy
    $orderDirection: OrderDirection
    $first: Int
  ) {
    dao(id: $daoId) {
      auctions(
        where: { endTime_gt: $startTime, settled: true }
        orderBy: $orderBy
        orderDirection: $orderDirection
        first: $first
      ) {
        id
        endTime
        winningBid {
          amount
        }
        settled
      }
    }
  }
`
export const DaoInfoDocument = gql`
  query daoInfo($tokenAddress: ID!) {
    dao(id: $tokenAddress) {
      totalSupply
      ownerCount
    }
  }
`
export const DaoMembersListDocument = gql`
  query daoMembersList(
    $where: DAOTokenOwner_filter
    $first: Int
    $skip: Int
    $orderBy: DAOTokenOwner_orderBy
    $orderDirection: OrderDirection
  ) {
    daotokenOwners(
      where: $where
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      owner
      daoTokenCount
      daoTokens {
        mintedAt
      }
    }
  }
`
export const DaoOgMetadataDocument = gql`
  query daoOGMetadata($tokenAddress: ID!) {
    dao(id: $tokenAddress) {
      name
      description
      contractImage
      totalSupply
      ownerCount
      proposalCount
      tokenAddress
      metadataAddress
      auctionAddress
      treasuryAddress
      governorAddress
    }
  }
`
export const DaoTokenOwnersDocument = gql`
  query daoTokenOwners($where: DAOTokenOwner_filter, $first: Int, $skip: Int) {
    daotokenOwners(where: $where, first: $first, skip: $skip) {
      dao {
        ...DAO
      }
    }
  }
  ${DaoFragmentDoc}
`
export const ExploreDaosPageDocument = gql`
  query exploreDaosPage(
    $orderBy: Auction_orderBy
    $orderDirection: OrderDirection
    $where: Auction_filter
    $skip: Int
    $first: Int
  ) {
    auctions(
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      skip: $skip
    ) {
      ...ExploreDao
    }
  }
  ${ExploreDaoFragmentDoc}
`
export const MyDaosPageDocument = gql`
  query myDaosPage($daos: [String!], $orderBy: Auction_orderBy, $skip: Int) {
    auctions(
      where: { settled: false, dao_in: $daos }
      orderBy: $orderBy
      orderDirection: desc
      first: 30
      skip: $skip
    ) {
      ...ExploreDao
    }
  }
  ${ExploreDaoFragmentDoc}
`
export const ProposalDocument = gql`
  query proposal($proposalId: ID!) {
    proposal(id: $proposalId) {
      ...Proposal
      votes {
        ...ProposalVote
      }
    }
  }
  ${ProposalFragmentDoc}
  ${ProposalVoteFragmentDoc}
`
export const ProposalOgMetadataDocument = gql`
  query proposalOGMetadata($proposalId: ID!) {
    proposal(id: $proposalId) {
      ...Proposal
      dao {
        name
        contractImage
        tokenAddress
        metadataAddress
        auctionAddress
        treasuryAddress
        governorAddress
      }
    }
  }
  ${ProposalFragmentDoc}
`
export const ProposalsDocument = gql`
  query proposals($where: Proposal_filter, $first: Int!, $skip: Int) {
    proposals(
      where: $where
      first: $first
      skip: $skip
      orderBy: timeCreated
      orderDirection: desc
    ) {
      ...Proposal
      votes {
        ...ProposalVote
      }
    }
  }
  ${ProposalFragmentDoc}
  ${ProposalVoteFragmentDoc}
`
export const TokenDocument = gql`
  query token($id: ID!) {
    token(id: $id) {
      ...Token
    }
  }
  ${TokenFragmentDoc}
`
export const TokenWinnerDocument = gql`
  query tokenWinner($id: ID!) {
    auction(id: $id) {
      winningBid {
        amount
        bidder
      }
    }
  }
`
export const TokensDocument = gql`
  query tokens(
    $where: Token_filter
    $orderBy: Token_orderBy
    $orderDirection: OrderDirection
    $first: Int
    $skip: Int
  ) {
    tokens(
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      skip: $skip
    ) {
      ...Token
    }
  }
  ${TokenFragmentDoc}
`
export const TotalAuctionSalesDocument = gql`
  query totalAuctionSales($tokenAddress: ID!) {
    dao(id: $tokenAddress) {
      totalAuctionSales
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) =>
  action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    activeAuctions(
      variables: ActiveAuctionsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<ActiveAuctionsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ActiveAuctionsQuery>(ActiveAuctionsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'activeAuctions',
        'query'
      )
    },
    activeDaos(
      variables: ActiveDaosQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<ActiveDaosQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ActiveDaosQuery>(ActiveDaosDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'activeDaos',
        'query'
      )
    },
    auctionBids(
      variables: AuctionBidsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<AuctionBidsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AuctionBidsQuery>(AuctionBidsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'auctionBids',
        'query'
      )
    },
    auctionHistory(
      variables: AuctionHistoryQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<AuctionHistoryQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AuctionHistoryQuery>(AuctionHistoryDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'auctionHistory',
        'query'
      )
    },
    daoInfo(
      variables: DaoInfoQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DaoInfoQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DaoInfoQuery>(DaoInfoDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'daoInfo',
        'query'
      )
    },
    daoMembersList(
      variables?: DaoMembersListQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DaoMembersListQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DaoMembersListQuery>(DaoMembersListDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'daoMembersList',
        'query'
      )
    },
    daoOGMetadata(
      variables: DaoOgMetadataQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DaoOgMetadataQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DaoOgMetadataQuery>(DaoOgMetadataDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'daoOGMetadata',
        'query'
      )
    },
    daoTokenOwners(
      variables?: DaoTokenOwnersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DaoTokenOwnersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DaoTokenOwnersQuery>(DaoTokenOwnersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'daoTokenOwners',
        'query'
      )
    },
    exploreDaosPage(
      variables?: ExploreDaosPageQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<ExploreDaosPageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ExploreDaosPageQuery>(ExploreDaosPageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'exploreDaosPage',
        'query'
      )
    },
    myDaosPage(
      variables?: MyDaosPageQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<MyDaosPageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<MyDaosPageQuery>(MyDaosPageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'myDaosPage',
        'query'
      )
    },
    proposal(
      variables: ProposalQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<ProposalQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ProposalQuery>(ProposalDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'proposal',
        'query'
      )
    },
    proposalOGMetadata(
      variables: ProposalOgMetadataQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<ProposalOgMetadataQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ProposalOgMetadataQuery>(ProposalOgMetadataDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'proposalOGMetadata',
        'query'
      )
    },
    proposals(
      variables: ProposalsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<ProposalsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ProposalsQuery>(ProposalsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'proposals',
        'query'
      )
    },
    token(
      variables: TokenQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<TokenQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TokenQuery>(TokenDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'token',
        'query'
      )
    },
    tokenWinner(
      variables: TokenWinnerQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<TokenWinnerQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TokenWinnerQuery>(TokenWinnerDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'tokenWinner',
        'query'
      )
    },
    tokens(
      variables?: TokensQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<TokensQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TokensQuery>(TokensDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'tokens',
        'query'
      )
    },
    totalAuctionSales(
      variables: TotalAuctionSalesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<TotalAuctionSalesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TotalAuctionSalesQuery>(TotalAuctionSalesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'totalAuctionSales',
        'query'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
