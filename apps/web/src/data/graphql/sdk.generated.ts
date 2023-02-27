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
  JSONScalar: any
  datetime: any
}

export type ActiveMarket = {
  __typename?: 'ActiveMarket'
  collectionAddress?: Maybe<Scalars['String']>
  marketAddress: Scalars['String']
  marketType: ActiveMarketType
  networkInfo: NetworkInfo
  price?: Maybe<PriceAtTime>
  properties?: Maybe<ActiveMarketProperties>
  status: Scalars['String']
  tokenId?: Maybe<Scalars['String']>
  transactionInfo: TransactionInfo
}

export type ActiveMarketProperties =
  | LilNounsAuction
  | NounsAuction
  | NounsBuilderAuction
  | V2Auction
  | V3ReserveAuction

export type ActiveMarketQueryInput = {
  collectionAddress?: InputMaybe<Scalars['String']>
  marketType: ActiveMarketType
  token?: InputMaybe<TokenInput>
}

export enum ActiveMarketType {
  ActiveLilNounsAuction = 'ACTIVE_LIL_NOUNS_AUCTION',
  ActiveNounsAuction = 'ACTIVE_NOUNS_AUCTION',
  ActiveNounsBuilderAuction = 'ACTIVE_NOUNS_BUILDER_AUCTION',
  ActiveV2Auction = 'ACTIVE_V2_AUCTION',
  ActiveV3ReserveAuction = 'ACTIVE_V3_RESERVE_AUCTION',
}

export type AggregateAttribute = {
  __typename?: 'AggregateAttribute'
  traitType: Scalars['String']
  valueMetrics: Array<AggregateAttributeValue>
}

export enum AggregateAttributeSortKey {
  Count = 'COUNT',
  None = 'NONE',
  Value = 'VALUE',
}

export type AggregateAttributeSortKeySortInput = {
  sortDirection: SortDirection
  sortKey: AggregateAttributeSortKey
}

export type AggregateAttributeValue = {
  __typename?: 'AggregateAttributeValue'
  count: Scalars['Int']
  percent: Scalars['Float']
  value: Scalars['String']
}

export type AggregateAttributesQueryInput = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
  ownerAddresses?: InputMaybe<Array<Scalars['String']>>
  tokens?: InputMaybe<Array<TokenInput>>
}

export type AggregateStat = {
  __typename?: 'AggregateStat'
  floorPrice?: Maybe<Scalars['Float']>
  nftCount: Scalars['Int']
  ownerCount: Scalars['Int']
  ownersByCount: OwnerCountConnection
  salesVolume: SalesVolume
}

export type AggregateStatFloorPriceArgs = {
  networks?: InputMaybe<Array<NetworkInput>>
  where: CollectionAddressAndAttributesInput
}

export type AggregateStatNftCountArgs = {
  networks?: InputMaybe<Array<NetworkInput>>
  where: CollectionAddressOwnerAddressAttributesInput
}

export type AggregateStatOwnerCountArgs = {
  networks?: InputMaybe<Array<NetworkInput>>
  where: CollectionAddressAndAttributesInput
}

export type AggregateStatOwnersByCountArgs = {
  networks?: InputMaybe<Array<NetworkInput>>
  pagination?: InputMaybe<PaginationInput>
  where: OwnersByCountQueryInput
}

export type AggregateStatSalesVolumeArgs = {
  filter?: InputMaybe<SalesVolumeFilter>
  networks?: InputMaybe<Array<NetworkInput>>
  where: CollectionAddressOwnerAddressAttributesInput
}

export type ApprovalEvent = {
  __typename?: 'ApprovalEvent'
  approvalEventType: ApprovalEventType
  approved?: Maybe<Scalars['Boolean']>
  approvedAddress: Scalars['String']
  collectionAddress: Scalars['String']
  ownerAddress: Scalars['String']
  tokenId?: Maybe<Scalars['String']>
}

export enum ApprovalEventType {
  Approval = 'APPROVAL',
  ApprovalForAll = 'APPROVAL_FOR_ALL',
}

export type AttributeFilter = {
  traitType: Scalars['String']
  value?: InputMaybe<Scalars['String']>
}

export type AudioEncodingTypes = {
  __typename?: 'AudioEncodingTypes'
  large?: Maybe<Scalars['String']>
  original: Scalars['String']
}

export enum Chain {
  Goerli = 'GOERLI',
  Mainnet = 'MAINNET',
  Rinkeby = 'RINKEBY',
}

export type Collection = {
  __typename?: 'Collection'
  address: Scalars['String']
  attributes?: Maybe<Array<CollectionAttribute>>
  description: Scalars['String']
  name?: Maybe<Scalars['String']>
  networkInfo: NetworkInfo
  symbol?: Maybe<Scalars['String']>
  tokenStandard?: Maybe<TokenStandard>
  totalSupply?: Maybe<Scalars['Int']>
}

export type CollectionAddressAndAttributesInput = {
  attributes?: InputMaybe<Array<AttributeFilter>>
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
}

export type CollectionAddressOwnerAddressAttributesInput = {
  attributes?: InputMaybe<Array<AttributeFilter>>
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
  ownerAddresses?: InputMaybe<Array<Scalars['String']>>
}

export type CollectionAttribute = {
  __typename?: 'CollectionAttribute'
  traitType?: Maybe<Scalars['String']>
  valueMetrics: Array<CollectionAttributeValue>
}

export type CollectionAttributeValue = {
  __typename?: 'CollectionAttributeValue'
  count: Scalars['Int']
  percent: Scalars['Float']
  value: Scalars['String']
}

export type CollectionConnection = {
  __typename?: 'CollectionConnection'
  nodes: Array<Collection>
  pageInfo: PageInfo
}

export enum CollectionSortKey {
  Created = 'CREATED',
  Name = 'NAME',
  None = 'NONE',
}

export type CollectionSortKeySortInput = {
  sortDirection: SortDirection
  sortKey: CollectionSortKey
}

export type CollectionsQueryInput = {
  collectionAddresses: Array<Scalars['String']>
}

export type Currency = {
  __typename?: 'Currency'
  address: Scalars['String']
  decimals: Scalars['Int']
  name: Scalars['String']
}

export type CurrencyAmount = {
  __typename?: 'CurrencyAmount'
  currency: Currency
  decimal: Scalars['Float']
  raw: Scalars['String']
}

export type Event = {
  __typename?: 'Event'
  collectionAddress?: Maybe<Scalars['String']>
  eventType: EventType
  networkInfo: NetworkInfo
  properties: EventProperties
  tokenId?: Maybe<Scalars['String']>
  transactionInfo: TransactionInfo
}

export type EventConnection = {
  __typename?: 'EventConnection'
  nodes: Array<Event>
  pageInfo: PageInfo
}

export type EventProperties =
  | ApprovalEvent
  | LilNounsAuctionEvent
  | MintEvent
  | NounsAuctionEvent
  | Sale
  | SeaportEvent
  | TransferEvent
  | V1MarketEvent
  | V1MediaEvent
  | V2AuctionEvent
  | V3AskEvent
  | V3ModuleManagerEvent
  | V3ReserveAuctionEvent

export enum EventSortKey {
  Created = 'CREATED',
}

export type EventSortKeySortInput = {
  sortDirection: SortDirection
  sortKey: EventSortKey
}

export enum EventType {
  ApprovalEvent = 'APPROVAL_EVENT',
  LilNounsAuctionEvent = 'LIL_NOUNS_AUCTION_EVENT',
  MintEvent = 'MINT_EVENT',
  NounsAuctionEvent = 'NOUNS_AUCTION_EVENT',
  SaleEvent = 'SALE_EVENT',
  SeaportEvent = 'SEAPORT_EVENT',
  TransferEvent = 'TRANSFER_EVENT',
  V1MarketEvent = 'V1_MARKET_EVENT',
  V1MediaEvent = 'V1_MEDIA_EVENT',
  V2AuctionEvent = 'V2_AUCTION_EVENT',
  V3AskEvent = 'V3_ASK_EVENT',
  V3ModuleManagerEvent = 'V3_MODULE_MANAGER_EVENT',
  V3ReserveAuctionEvent = 'V3_RESERVE_AUCTION_EVENT',
}

export type EventsQueryFilter = {
  bidderAddresses?: InputMaybe<Array<Scalars['String']>>
  eventTypes?: InputMaybe<Array<EventType>>
  recipientAddresses?: InputMaybe<Array<Scalars['String']>>
  sellerAddresses?: InputMaybe<Array<Scalars['String']>>
  senderAddresses?: InputMaybe<Array<Scalars['String']>>
  timeFilter?: InputMaybe<TimeFilter>
}

export type EventsQueryInput = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
  tokens?: InputMaybe<Array<TokenInput>>
}

export type ImageEncodingTypes = {
  __typename?: 'ImageEncodingTypes'
  large?: Maybe<Scalars['String']>
  original: Scalars['String']
  poster?: Maybe<Scalars['String']>
  thumbnail?: Maybe<Scalars['String']>
}

export type ImageEncodingTypesVideoEncodingTypesAudioEncodingTypesUnsupportedEncodingTypes =
  AudioEncodingTypes | ImageEncodingTypes | UnsupportedEncodingTypes | VideoEncodingTypes

export type LilNounsAuction = {
  __typename?: 'LilNounsAuction'
  address: Scalars['String']
  amount?: Maybe<PriceAtTime>
  auctionCurrency: Scalars['String']
  auctionId: Scalars['String']
  collectionAddress: Scalars['String']
  duration: Scalars['String']
  endTime: Scalars['String']
  estimatedDurationTime?: Maybe<Scalars['datetime']>
  firstBidTime?: Maybe<Scalars['datetime']>
  highestBidPrice?: Maybe<PriceAtTime>
  highestBidder?: Maybe<Scalars['String']>
  minBidIncrementPercentage?: Maybe<Scalars['Int']>
  reservePrice?: Maybe<PriceAtTime>
  startTime: Scalars['String']
  timeBuffer?: Maybe<Scalars['Int']>
  tokenId: Scalars['String']
  winner?: Maybe<Scalars['String']>
}

export type LilNounsAuctionBidEventProperties = {
  __typename?: 'LilNounsAuctionBidEventProperties'
  extended: Scalars['Boolean']
  lilNounId: Scalars['String']
  sender: Scalars['String']
  value: Scalars['String']
}

export type LilNounsAuctionCreatedEventProperties = {
  __typename?: 'LilNounsAuctionCreatedEventProperties'
  endTime: Scalars['String']
  lilNounId: Scalars['String']
  startTime: Scalars['String']
}

export type LilNounsAuctionEvent = {
  __typename?: 'LilNounsAuctionEvent'
  address: Scalars['String']
  collectionAddress: Scalars['String']
  lilNounsAuctionEventType: LilNounsAuctionEventType
  properties: LilNounsAuctionEventProperties
  tokenId: Scalars['String']
}

export type LilNounsAuctionEventProperties =
  | LilNounsAuctionBidEventProperties
  | LilNounsAuctionCreatedEventProperties
  | LilNounsAuctionExtendedEventProperties
  | LilNounsAuctionMinBidIncrementPercentageUpdatedEventProperties
  | LilNounsAuctionReservePriceUpdatedEventProperties
  | LilNounsAuctionSettledEventProperties
  | LilNounsAuctionTimeBufferUpdatedEventProperties

export enum LilNounsAuctionEventType {
  LilNounsAuctionHouseAuctionBidEvent = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT',
  LilNounsAuctionHouseAuctionCreatedEvent = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_CREATED_EVENT',
  LilNounsAuctionHouseAuctionExtendedEvent = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_EXTENDED_EVENT',
  LilNounsAuctionHouseAuctionMinBidIncrementPercentageUpdated = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_MIN_BID_INCREMENT_PERCENTAGE_UPDATED',
  LilNounsAuctionHouseAuctionReservePriceUpdatedEvent = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_RESERVE_PRICE_UPDATED_EVENT',
  LilNounsAuctionHouseAuctionSettledEvent = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT',
  LilNounsAuctionHouseAuctionTimeBufferUpdatedEvent = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_TIME_BUFFER_UPDATED_EVENT',
}

export type LilNounsAuctionExtendedEventProperties = {
  __typename?: 'LilNounsAuctionExtendedEventProperties'
  endTime: Scalars['String']
  lilNounId: Scalars['String']
}

export type LilNounsAuctionMinBidIncrementPercentageUpdatedEventProperties = {
  __typename?: 'LilNounsAuctionMinBidIncrementPercentageUpdatedEventProperties'
  minBidIncrementPercentage: Scalars['String']
}

export type LilNounsAuctionReservePriceUpdatedEventProperties = {
  __typename?: 'LilNounsAuctionReservePriceUpdatedEventProperties'
  reservePrice: Scalars['String']
}

export type LilNounsAuctionSettledEventProperties = {
  __typename?: 'LilNounsAuctionSettledEventProperties'
  amount: Scalars['String']
  lilNounId: Scalars['String']
  price: PriceAtTime
  winner: Scalars['String']
}

export type LilNounsAuctionTimeBufferUpdatedEventProperties = {
  __typename?: 'LilNounsAuctionTimeBufferUpdatedEventProperties'
  timeBuffer: Scalars['String']
}

export type Market = {
  __typename?: 'Market'
  collectionAddress?: Maybe<Scalars['String']>
  marketAddress: Scalars['String']
  marketType: MarketType
  networkInfo: NetworkInfo
  price?: Maybe<PriceAtTime>
  properties?: Maybe<MarketProperties>
  status: Scalars['String']
  tokenId?: Maybe<Scalars['String']>
  transactionInfo: TransactionInfo
}

export enum MarketCategory {
  Ask = 'ASK',
  Auction = 'AUCTION',
  Offer = 'OFFER',
}

export type MarketProperties =
  | LilNounsAuction
  | NounsAuction
  | NounsBuilderAuction
  | V1Ask
  | V1BidShare
  | V1Offer
  | V2Auction
  | V3Ask
  | V3ReserveAuction

export enum MarketSortKey {
  ChainTokenPrice = 'CHAIN_TOKEN_PRICE',
  Created = 'CREATED',
  NativePrice = 'NATIVE_PRICE',
  None = 'NONE',
  TimedSaleEnding = 'TIMED_SALE_ENDING',
}

export type MarketSortKeySortInput = {
  sortDirection: SortDirection
  sortKey: MarketSortKey
}

export enum MarketStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Invalid = 'INVALID',
}

export enum MarketType {
  LilNounsAuction = 'LIL_NOUNS_AUCTION',
  NounsAuction = 'NOUNS_AUCTION',
  NounsBuilderAuction = 'NOUNS_BUILDER_AUCTION',
  V1Ask = 'V1_ASK',
  V1BidShare = 'V1_BID_SHARE',
  V1Offer = 'V1_OFFER',
  V2Auction = 'V2_AUCTION',
  V3Ask = 'V3_ASK',
  V3ReserveAuction = 'V3_RESERVE_AUCTION',
}

export type MarketTypeFilter = {
  bidderAddresses?: InputMaybe<Array<Scalars['String']>>
  marketType: MarketType
  statuses?: InputMaybe<Array<MarketStatus>>
}

export type MarketWithToken = {
  __typename?: 'MarketWithToken'
  market: Market
  token?: Maybe<Token>
}

export type MarketWithTokenConnection = {
  __typename?: 'MarketWithTokenConnection'
  nodes: Array<MarketWithToken>
  pageInfo: PageInfo
}

export type MarketsQueryFilter = {
  marketFilters?: InputMaybe<Array<MarketTypeFilter>>
  priceFilter?: InputMaybe<PriceFilter>
}

export type MarketsQueryInput = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
  tokens?: InputMaybe<Array<TokenInput>>
}

export enum MediaType {
  Audio = 'AUDIO',
  Gif = 'GIF',
  Html = 'HTML',
  Image = 'IMAGE',
  Text = 'TEXT',
  Video = 'VIDEO',
}

export type Mint = {
  __typename?: 'Mint'
  collectionAddress: Scalars['String']
  networkInfo: NetworkInfo
  originatorAddress: Scalars['String']
  price: PriceAtTime
  toAddress: Scalars['String']
  tokenId: Scalars['String']
  transactionInfo: TransactionInfo
}

export type MintEvent = {
  __typename?: 'MintEvent'
  collectionAddress: Scalars['String']
  originatorAddress: Scalars['String']
  price?: Maybe<PriceAtTime>
  toAddress: Scalars['String']
  tokenId: Scalars['String']
}

export type MintInfo = {
  __typename?: 'MintInfo'
  mintContext: TransactionInfo
  originatorAddress: Scalars['String']
  price?: Maybe<PriceAtTime>
  toAddress: Scalars['String']
}

export enum MintSortKey {
  None = 'NONE',
  Price = 'PRICE',
  Time = 'TIME',
  TokenId = 'TOKEN_ID',
}

export type MintSortKeySortInput = {
  sortDirection: SortDirection
  sortKey: MintSortKey
}

export type MintWithTokenAndMarkets = {
  __typename?: 'MintWithTokenAndMarkets'
  markets: Array<Market>
  mint: Mint
  token?: Maybe<Token>
}

export type MintWithTokenAndMarketsMarketsArgs = {
  filter?: InputMaybe<MarketsQueryFilter>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<MarketSortKeySortInput>
}

export type MintWithTokenAndMarketsConnection = {
  __typename?: 'MintWithTokenAndMarketsConnection'
  nodes: Array<MintWithTokenAndMarkets>
  pageInfo: PageInfo
}

export type MintsQueryFilter = {
  priceFilter?: InputMaybe<PriceFilter>
  timeFilter?: InputMaybe<TimeFilter>
}

export type MintsQueryInput = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
  minterAddresses?: InputMaybe<Array<Scalars['String']>>
  recipientAddresses?: InputMaybe<Array<Scalars['String']>>
  tokens?: InputMaybe<Array<TokenInput>>
}

export enum Network {
  Ethereum = 'ETHEREUM',
}

export type NetworkInfo = {
  __typename?: 'NetworkInfo'
  chain: Chain
  network: Network
}

export type NetworkInput = {
  chain: Chain
  network: Network
}

export type Nouns = {
  __typename?: 'Nouns'
  nounsActiveMarket?: Maybe<NounsBuilderAuction>
  nounsDaos: NounsDaoConnection
  nounsEvents: NounsEventConnection
  nounsMarkets: NounsBuilderAuctionConnection
  nounsProposal?: Maybe<NounsProposal>
  nounsProposals: NounsProposalConnection
  nounsSearch: NounsSearchResultConnection
}

export type NounsNounsActiveMarketArgs = {
  network?: InputMaybe<NetworkInput>
  where: NounsActiveMarketQueryInput
}

export type NounsNounsDaosArgs = {
  networks?: InputMaybe<Array<NetworkInput>>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<NounsSortKeySortInput>
  where?: InputMaybe<NounsQueryInput>
}

export type NounsNounsEventsArgs = {
  filter?: InputMaybe<NounsEventsQueryFilter>
  networks?: InputMaybe<Array<NetworkInput>>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<EventSortKeySortInput>
  where?: InputMaybe<NounsEventsQueryInput>
}

export type NounsNounsMarketsArgs = {
  filter?: InputMaybe<NounsMarketsQueryFilter>
  networks?: InputMaybe<Array<NetworkInput>>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<MarketSortKeySortInput>
  where?: InputMaybe<NounsMarketsQueryInput>
}

export type NounsNounsProposalArgs = {
  network?: InputMaybe<NetworkInput>
  where: NounsProposalQueryInput
}

export type NounsNounsProposalsArgs = {
  networks?: InputMaybe<Array<NetworkInput>>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<NounsProposalSortKeySortInput>
  where?: InputMaybe<NounsProposalsQueryInput>
}

export type NounsNounsSearchArgs = {
  filterModel?: InputMaybe<NounsSearchFilter>
  networks?: InputMaybe<Array<NetworkInput>>
  pagination: SearchPaginationInput
  query: NounsSearchQueryInput
}

export type NounsActiveMarketQueryInput = {
  collectionAddress: Scalars['String']
}

export type NounsAuction = {
  __typename?: 'NounsAuction'
  address: Scalars['String']
  amount?: Maybe<PriceAtTime>
  auctionCurrency: Scalars['String']
  auctionId: Scalars['String']
  collectionAddress: Scalars['String']
  duration: Scalars['String']
  endTime: Scalars['String']
  estimatedDurationTime?: Maybe<Scalars['datetime']>
  firstBidTime?: Maybe<Scalars['datetime']>
  highestBidPrice?: Maybe<PriceAtTime>
  highestBidder?: Maybe<Scalars['String']>
  minBidIncrementPercentage?: Maybe<Scalars['Int']>
  reservePrice?: Maybe<PriceAtTime>
  startTime: Scalars['String']
  timeBuffer?: Maybe<Scalars['Int']>
  tokenId: Scalars['String']
  winner?: Maybe<Scalars['String']>
}

export type NounsAuctionBidEventProperties = {
  __typename?: 'NounsAuctionBidEventProperties'
  extended: Scalars['Boolean']
  nounId: Scalars['String']
  sender: Scalars['String']
  value: Scalars['String']
}

export type NounsAuctionCreatedEventProperties = {
  __typename?: 'NounsAuctionCreatedEventProperties'
  endTime: Scalars['String']
  nounId: Scalars['String']
  startTime: Scalars['String']
}

export type NounsAuctionEvent = {
  __typename?: 'NounsAuctionEvent'
  address: Scalars['String']
  collectionAddress: Scalars['String']
  nounsAuctionEventType: NounsAuctionEventType
  properties: NounsAuctionEventProperties
  tokenId: Scalars['String']
}

export type NounsAuctionEventProperties =
  | NounsAuctionBidEventProperties
  | NounsAuctionCreatedEventProperties
  | NounsAuctionExtendedEventProperties
  | NounsAuctionMinBidIncrementPercentageUpdatedEventProperties
  | NounsAuctionReservePriceUpdatedEventProperties
  | NounsAuctionSettledEventProperties
  | NounsAuctionTimeBufferUpdatedEventProperties

export enum NounsAuctionEventType {
  NounsAuctionHouseAuctionBidEvent = 'NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT',
  NounsAuctionHouseAuctionCreatedEvent = 'NOUNS_AUCTION_HOUSE_AUCTION_CREATED_EVENT',
  NounsAuctionHouseAuctionExtendedEvent = 'NOUNS_AUCTION_HOUSE_AUCTION_EXTENDED_EVENT',
  NounsAuctionHouseAuctionMinBidIncrementPercentageUpdated = 'NOUNS_AUCTION_HOUSE_AUCTION_MIN_BID_INCREMENT_PERCENTAGE_UPDATED',
  NounsAuctionHouseAuctionReservePriceUpdatedEvent = 'NOUNS_AUCTION_HOUSE_AUCTION_RESERVE_PRICE_UPDATED_EVENT',
  NounsAuctionHouseAuctionSettledEvent = 'NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT',
  NounsAuctionHouseAuctionTimeBufferUpdatedEvent = 'NOUNS_AUCTION_HOUSE_AUCTION_TIME_BUFFER_UPDATED_EVENT',
}

export type NounsAuctionExtendedEventProperties = {
  __typename?: 'NounsAuctionExtendedEventProperties'
  endTime: Scalars['String']
  nounId: Scalars['String']
}

export type NounsAuctionMinBidIncrementPercentageUpdatedEventProperties = {
  __typename?: 'NounsAuctionMinBidIncrementPercentageUpdatedEventProperties'
  minBidIncrementPercentage: Scalars['String']
}

export type NounsAuctionReservePriceUpdatedEventProperties = {
  __typename?: 'NounsAuctionReservePriceUpdatedEventProperties'
  reservePrice: Scalars['String']
}

export type NounsAuctionSettledEventProperties = {
  __typename?: 'NounsAuctionSettledEventProperties'
  amount: Scalars['String']
  nounId: Scalars['String']
  price: PriceAtTime
  winner: Scalars['String']
}

export type NounsAuctionTimeBufferUpdatedEventProperties = {
  __typename?: 'NounsAuctionTimeBufferUpdatedEventProperties'
  timeBuffer: Scalars['String']
}

export type NounsBuilderAuction = {
  __typename?: 'NounsBuilderAuction'
  address: Scalars['String']
  amount?: Maybe<PriceAtTime>
  auction?: Maybe<Scalars['String']>
  collectionAddress: Scalars['String']
  duration: Scalars['String']
  endTime: Scalars['String']
  estimatedDurationTime?: Maybe<Scalars['datetime']>
  extended?: Maybe<Scalars['Boolean']>
  firstBidTime?: Maybe<Scalars['datetime']>
  governor?: Maybe<Scalars['String']>
  highestBidPrice?: Maybe<PriceAtTime>
  highestBidder?: Maybe<Scalars['String']>
  manager?: Maybe<Scalars['String']>
  metadata?: Maybe<Scalars['String']>
  minBidIncrementPercentage?: Maybe<Scalars['Int']>
  networkInfo: NetworkInfo
  reservePrice?: Maybe<PriceAtTime>
  startTime: Scalars['String']
  status: MarketStatus
  timeBuffer?: Maybe<Scalars['String']>
  tokenId: Scalars['String']
  transactionInfo: TransactionInfo
  treasury?: Maybe<Scalars['String']>
  winner?: Maybe<Scalars['String']>
}

export type NounsBuilderAuctionAuctionBidEventProperties = {
  __typename?: 'NounsBuilderAuctionAuctionBidEventProperties'
  amount: Scalars['String']
  amountPrice: PriceAtTime
  bidder: Scalars['String']
  endTime: Scalars['String']
  extended: Scalars['Boolean']
  tokenId: Scalars['String']
}

export type NounsBuilderAuctionAuctionCreatedEventProperties = {
  __typename?: 'NounsBuilderAuctionAuctionCreatedEventProperties'
  endTime: Scalars['String']
  startTime: Scalars['String']
  tokenId: Scalars['String']
}

export type NounsBuilderAuctionAuctionSettledEventProperties = {
  __typename?: 'NounsBuilderAuctionAuctionSettledEventProperties'
  amount: Scalars['String']
  amountPrice: PriceAtTime
  tokenId: Scalars['String']
  winner: Scalars['String']
}

export type NounsBuilderAuctionConnection = {
  __typename?: 'NounsBuilderAuctionConnection'
  nodes: Array<NounsBuilderAuction>
  pageInfo: PageInfo
}

export type NounsBuilderAuctionDurationUpdatedEventProperties = {
  __typename?: 'NounsBuilderAuctionDurationUpdatedEventProperties'
  duration: Scalars['String']
}

export type NounsBuilderAuctionEvent = {
  __typename?: 'NounsBuilderAuctionEvent'
  address: Scalars['String']
  auction: Scalars['String']
  collectionAddress: Scalars['String']
  governor: Scalars['String']
  manager: Scalars['String']
  metadata: Scalars['String']
  nounsBuilderAuctionEventType: NounsBuilderAuctionEventType
  properties: NounsBuilderAuctionEventProperties
  treasury: Scalars['String']
}

export type NounsBuilderAuctionEventProperties =
  | NounsBuilderAuctionAuctionBidEventProperties
  | NounsBuilderAuctionAuctionCreatedEventProperties
  | NounsBuilderAuctionAuctionSettledEventProperties
  | NounsBuilderAuctionDurationUpdatedEventProperties
  | NounsBuilderAuctionMinBidIncrementPercentageUpdatedEventProperties
  | NounsBuilderAuctionReservePriceUpdatedEventProperties
  | NounsBuilderAuctionTimeBufferUpdatedEventProperties

export enum NounsBuilderAuctionEventType {
  NounsBuilderAuctionAuctionBidEvent = 'NOUNS_BUILDER_AUCTION_AUCTION_BID_EVENT',
  NounsBuilderAuctionAuctionCreatedEvent = 'NOUNS_BUILDER_AUCTION_AUCTION_CREATED_EVENT',
  NounsBuilderAuctionAuctionSettledEvent = 'NOUNS_BUILDER_AUCTION_AUCTION_SETTLED_EVENT',
  NounsBuilderAuctionDurationUpdatedEvent = 'NOUNS_BUILDER_AUCTION_DURATION_UPDATED_EVENT',
  NounsBuilderAuctionMinBidIncrementPercentageUpdatedEvent = 'NOUNS_BUILDER_AUCTION_MIN_BID_INCREMENT_PERCENTAGE_UPDATED_EVENT',
  NounsBuilderAuctionReservePriceUpdatedEvent = 'NOUNS_BUILDER_AUCTION_RESERVE_PRICE_UPDATED_EVENT',
  NounsBuilderAuctionTimeBufferUpdatedEvent = 'NOUNS_BUILDER_AUCTION_TIME_BUFFER_UPDATED_EVENT',
}

export type NounsBuilderAuctionMinBidIncrementPercentageUpdatedEventProperties = {
  __typename?: 'NounsBuilderAuctionMinBidIncrementPercentageUpdatedEventProperties'
  minBidIncrementPercentage: Scalars['String']
}

export type NounsBuilderAuctionReservePriceUpdatedEventProperties = {
  __typename?: 'NounsBuilderAuctionReservePriceUpdatedEventProperties'
  reserve: Scalars['String']
  reservePrice: PriceAtTime
}

export type NounsBuilderAuctionTimeBufferUpdatedEventProperties = {
  __typename?: 'NounsBuilderAuctionTimeBufferUpdatedEventProperties'
  timeBuffer: Scalars['String']
}

export type NounsBuilderGovernorEvent = {
  __typename?: 'NounsBuilderGovernorEvent'
  address: Scalars['String']
  auction: Scalars['String']
  collectionAddress: Scalars['String']
  governor: Scalars['String']
  manager: Scalars['String']
  metadata: Scalars['String']
  nounsBuilderGovernorEventType: NounsBuilderGovernorEventType
  properties: NounsBuilderGovernorEventProperties
  treasury: Scalars['String']
}

export type NounsBuilderGovernorEventProperties =
  | NounsBuilderGovernorProposalCanceledEventProperties
  | NounsBuilderGovernorProposalCreatedEventProperties
  | NounsBuilderGovernorProposalExecutedEventProperties
  | NounsBuilderGovernorProposalQueuedEventProperties
  | NounsBuilderGovernorProposalThresholdBpsUpdatedEventProperties
  | NounsBuilderGovernorProposalVetoedEventProperties
  | NounsBuilderGovernorQuorumVotesBpsUpdated
  | NounsBuilderGovernorVetoerUpdatedEventProperties
  | NounsBuilderGovernorVoteCastEventProperties
  | NounsBuilderGovernorVotingDelayUpdatedEventProperties
  | NounsBuilderGovernorVotingPeriodUpdatedEventProperties

export enum NounsBuilderGovernorEventType {
  NounsBuilderGovernorProposalCanceledEvent = 'NOUNS_BUILDER_GOVERNOR_PROPOSAL_CANCELED_EVENT',
  NounsBuilderGovernorProposalCreatedEvent = 'NOUNS_BUILDER_GOVERNOR_PROPOSAL_CREATED_EVENT',
  NounsBuilderGovernorProposalExecutedEvent = 'NOUNS_BUILDER_GOVERNOR_PROPOSAL_EXECUTED_EVENT',
  NounsBuilderGovernorProposalQueuedEvent = 'NOUNS_BUILDER_GOVERNOR_PROPOSAL_QUEUED_EVENT',
  NounsBuilderGovernorProposalVetoedEvent = 'NOUNS_BUILDER_GOVERNOR_PROPOSAL_VETOED_EVENT',
  NounsBuilderGovernorVetoerUpdatedEvent = 'NOUNS_BUILDER_GOVERNOR_VETOER_UPDATED_EVENT',
  NounsBuilderGovernorVoteCastEvent = 'NOUNS_BUILDER_GOVERNOR_VOTE_CAST_EVENT',
  NounsBuilderGovernorVotingDelayUpdatedEvent = 'NOUNS_BUILDER_GOVERNOR_VOTING_DELAY_UPDATED_EVENT',
  NounsBuilderGovernorVotingPeriodUpdatedEvent = 'NOUNS_BUILDER_GOVERNOR_VOTING_PERIOD_UPDATED_EVENT',
  NounsBuilderProposalThresholdBpsUpdated = 'NOUNS_BUILDER_PROPOSAL_THRESHOLD_BPS_UPDATED',
  NounsBuilderQuorumVotesBpsUpdated = 'NOUNS_BUILDER_QUORUM_VOTES_BPS_UPDATED',
}

export type NounsBuilderGovernorProposalCanceledEventProperties = {
  __typename?: 'NounsBuilderGovernorProposalCanceledEventProperties'
  proposalId: Scalars['String']
}

export type NounsBuilderGovernorProposalCreatedEventProperties = {
  __typename?: 'NounsBuilderGovernorProposalCreatedEventProperties'
  abstainVotes: Scalars['String']
  againstVotes: Scalars['String']
  calldatas: Array<Scalars['String']>
  canceled: Scalars['Boolean']
  description: Scalars['String']
  descriptionHash: Scalars['String']
  executed: Scalars['Boolean']
  forVotes: Scalars['String']
  proposalId: Scalars['String']
  proposalNumber?: Maybe<Scalars['String']>
  proposalThreshold: Scalars['String']
  proposer: Scalars['String']
  quorumVotes: Scalars['String']
  targets: Array<Scalars['String']>
  timeCreated: Scalars['String']
  values: Array<Scalars['String']>
  vetoed: Scalars['Boolean']
  voteEnd: Scalars['String']
  voteStart: Scalars['String']
}

export type NounsBuilderGovernorProposalExecutedEventProperties = {
  __typename?: 'NounsBuilderGovernorProposalExecutedEventProperties'
  proposalId: Scalars['String']
}

export type NounsBuilderGovernorProposalQueuedEventProperties = {
  __typename?: 'NounsBuilderGovernorProposalQueuedEventProperties'
  eta: Scalars['String']
  proposalId: Scalars['String']
}

export type NounsBuilderGovernorProposalThresholdBpsUpdatedEventProperties = {
  __typename?: 'NounsBuilderGovernorProposalThresholdBpsUpdatedEventProperties'
  newBps: Scalars['String']
  prevBps: Scalars['String']
}

export type NounsBuilderGovernorProposalVetoedEventProperties = {
  __typename?: 'NounsBuilderGovernorProposalVetoedEventProperties'
  proposalId: Scalars['String']
}

export type NounsBuilderGovernorQuorumVotesBpsUpdated = {
  __typename?: 'NounsBuilderGovernorQuorumVotesBpsUpdated'
  newBps: Scalars['String']
  prevBps: Scalars['String']
}

export type NounsBuilderGovernorVetoerUpdatedEventProperties = {
  __typename?: 'NounsBuilderGovernorVetoerUpdatedEventProperties'
  newVetoer: Scalars['String']
  prevVetoer: Scalars['String']
}

export type NounsBuilderGovernorVoteCastEventProperties = {
  __typename?: 'NounsBuilderGovernorVoteCastEventProperties'
  proposalId: Scalars['String']
  reason: Scalars['String']
  support: Scalars['String']
  voter: Scalars['String']
  weight: Scalars['String']
}

export type NounsBuilderGovernorVotingDelayUpdatedEventProperties = {
  __typename?: 'NounsBuilderGovernorVotingDelayUpdatedEventProperties'
  newVotingDelay: Scalars['String']
  prevVotingDelay: Scalars['String']
}

export type NounsBuilderGovernorVotingPeriodUpdatedEventProperties = {
  __typename?: 'NounsBuilderGovernorVotingPeriodUpdatedEventProperties'
  newVotingPeriod: Scalars['String']
  prevVotingPeriod: Scalars['String']
}

export type NounsBuilderManagerDaoDeployedEventProperties = {
  __typename?: 'NounsBuilderManagerDaoDeployedEventProperties'
  auction: Scalars['String']
  governor: Scalars['String']
  metadata: Scalars['String']
  token: Scalars['String']
  treasury: Scalars['String']
}

export type NounsBuilderManagerEvent = {
  __typename?: 'NounsBuilderManagerEvent'
  address: Scalars['String']
  nounsBuilderManagerEventType: NounsBuilderManagerEventType
  properties: NounsBuilderManagerDaoDeployedEventProperties
}

export enum NounsBuilderManagerEventType {
  NounsBuilderManagerDaoDeployedEvent = 'NOUNS_BUILDER_MANAGER_DAO_DEPLOYED_EVENT',
}

export type NounsDao = {
  __typename?: 'NounsDao'
  auctionAddress?: Maybe<Scalars['String']>
  collectionAddress: Scalars['String']
  contractAddress?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  governorAddress?: Maybe<Scalars['String']>
  metadataAddress?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  networkInfo: NetworkInfo
  symbol?: Maybe<Scalars['String']>
  totalSupply?: Maybe<Scalars['Int']>
  treasuryAddress?: Maybe<Scalars['String']>
}

export type NounsDaoConnection = {
  __typename?: 'NounsDaoConnection'
  nodes: Array<NounsDao>
  pageInfo: PageInfo
}

export type NounsEvent = {
  __typename?: 'NounsEvent'
  collectionAddress: Scalars['String']
  eventType: NounsEventType
  networkInfo: NetworkInfo
  properties: NounsEventProperties
  transactionInfo: TransactionInfo
}

export type NounsEventConnection = {
  __typename?: 'NounsEventConnection'
  nodes: Array<NounsEvent>
  pageInfo: PageInfo
}

export type NounsEventProperties =
  | LilNounsAuctionEvent
  | NounsAuctionEvent
  | NounsBuilderAuctionEvent
  | NounsBuilderGovernorEvent
  | NounsBuilderManagerEvent

export enum NounsEventType {
  LilNounsAuctionEvent = 'LIL_NOUNS_AUCTION_EVENT',
  NounsAuctionEvent = 'NOUNS_AUCTION_EVENT',
  NounsBuilderAuctionEvent = 'NOUNS_BUILDER_AUCTION_EVENT',
  NounsBuilderGovernorEvent = 'NOUNS_BUILDER_GOVERNOR_EVENT',
  NounsBuilderManagerEvent = 'NOUNS_BUILDER_MANAGER_EVENT',
}

export type NounsEventsQueryFilter = {
  nounsBuilderAuctionEventType?: InputMaybe<NounsBuilderAuctionEventType>
  nounsBuilderGovernorEventType?: InputMaybe<NounsBuilderGovernorEventType>
  nounsBuilderManagerEventType?: InputMaybe<NounsBuilderManagerEventType>
  nounsEventTypes?: InputMaybe<Array<NounsEventType>>
  timeFilter?: InputMaybe<TimeFilter>
}

export type NounsEventsQueryInput = {
  auctionAddresses?: InputMaybe<Array<Scalars['String']>>
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
  governorAddresses?: InputMaybe<Array<Scalars['String']>>
}

export enum NounsMarketType {
  LilNounsAuction = 'LIL_NOUNS_AUCTION',
  NounsAuction = 'NOUNS_AUCTION',
  NounsBuilderAuction = 'NOUNS_BUILDER_AUCTION',
}

export type NounsMarketsQueryFilter = {
  nounsMarketType?: InputMaybe<NounsMarketType>
  status?: InputMaybe<MarketStatus>
}

export type NounsMarketsQueryInput = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
  tokens?: InputMaybe<Array<TokenInput>>
}

export type NounsProposal = {
  __typename?: 'NounsProposal'
  abstainVotes: Scalars['Int']
  againstVotes: Scalars['Int']
  auction: Scalars['String']
  calldatas: Array<Scalars['String']>
  collectionAddress: Scalars['String']
  description: Scalars['String']
  descriptionHash: Scalars['String']
  executableFrom?: Maybe<Scalars['Int']>
  expiresAt?: Maybe<Scalars['Int']>
  forVotes: Scalars['Int']
  governor: Scalars['String']
  manager: Scalars['String']
  metadata: Scalars['String']
  networkInfo: NetworkInfo
  proposalId: Scalars['String']
  proposalNumber: Scalars['Int']
  proposalThreshold: Scalars['Int']
  proposer: Scalars['String']
  quorumVotes: Scalars['Int']
  status: NounsProposalStatus
  targets: Array<Scalars['String']>
  timeCreated: Scalars['Int']
  title: Scalars['String']
  transactionInfo: TransactionInfo
  treasury: Scalars['String']
  values: Array<Scalars['String']>
  voteEnd: Scalars['Int']
  voteStart: Scalars['Int']
  votes: Array<NounsProposalVote>
}

export type NounsProposalConnection = {
  __typename?: 'NounsProposalConnection'
  nodes: Array<NounsProposal>
  pageInfo: PageInfo
}

export type NounsProposalQueryInput = {
  proposal?: InputMaybe<ProposalInput>
  proposalId?: InputMaybe<Scalars['String']>
}

export enum NounsProposalSortKey {
  Created = 'CREATED',
  None = 'NONE',
}

export type NounsProposalSortKeySortInput = {
  sortDirection: SortDirection
  sortKey: NounsProposalSortKey
}

export enum NounsProposalStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Created = 'CREATED',
  Defeated = 'DEFEATED',
  Executable = 'EXECUTABLE',
  Executed = 'EXECUTED',
  Expired = 'EXPIRED',
  Pending = 'PENDING',
  Queued = 'QUEUED',
  Succeeded = 'SUCCEEDED',
  Vetoed = 'VETOED',
}

export type NounsProposalVote = {
  __typename?: 'NounsProposalVote'
  proposalId: Scalars['String']
  reason: Scalars['String']
  support: Support
  transactionInfo: TransactionInfo
  voter: Scalars['String']
  weight: Scalars['Int']
}

export type NounsProposalsQueryInput = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
  proposalIds?: InputMaybe<Array<Scalars['String']>>
  proposals?: InputMaybe<Array<ProposalInput>>
}

export type NounsQueryInput = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
  memberAddresses?: InputMaybe<Array<Scalars['String']>>
}

export type NounsSearchFilter = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
}

export type NounsSearchQueryInput = {
  text: Scalars['String']
}

export type NounsSearchResult = {
  __typename?: 'NounsSearchResult'
  collectionAddress: Scalars['String']
  entityType: Scalars['String']
  name?: Maybe<Scalars['String']>
  networkInfo: NetworkInfo
}

export type NounsSearchResultConnection = {
  __typename?: 'NounsSearchResultConnection'
  nodes: Array<NounsSearchResult>
  pageInfo: PageInfo
}

export enum NounsSortKey {
  Created = 'CREATED',
  None = 'NONE',
}

export type NounsSortKeySortInput = {
  sortDirection: SortDirection
  sortKey: NounsSortKey
}

export type OffchainOrder = {
  __typename?: 'OffchainOrder'
  calldata?: Maybe<Scalars['String']>
  collectionAddress?: Maybe<Scalars['String']>
  contractAddress: Scalars['String']
  endTime: Scalars['datetime']
  networkInfo: NetworkInfo
  offerer: Scalars['String']
  orderType: Scalars['String']
  price: PriceAtTime
  properties: SeaportOrder
  startTime: Scalars['datetime']
  tokenId?: Maybe<Scalars['String']>
}

export enum OffchainOrderSortKey {
  ChainTokenPrice = 'CHAIN_TOKEN_PRICE',
  EndTime = 'END_TIME',
  NativePrice = 'NATIVE_PRICE',
  None = 'NONE',
  UsdcPrice = 'USDC_PRICE',
}

export type OffchainOrderSortKeySortInput = {
  sortDirection: SortDirection
  sortKey: OffchainOrderSortKey
}

export type OffchainOrderWithToken = {
  __typename?: 'OffchainOrderWithToken'
  offchainOrder: OffchainOrder
  token?: Maybe<Token>
}

export type OffchainOrderWithTokenConnection = {
  __typename?: 'OffchainOrderWithTokenConnection'
  nodes: Array<OffchainOrderWithToken>
  pageInfo: PageInfo
}

export type OffchainOrdersQueryFilter = {
  priceFilter?: InputMaybe<PriceFilter>
}

export type OffchainOrdersQueryInput = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
  sellerAddresses?: InputMaybe<Array<Scalars['String']>>
  tokens?: InputMaybe<Array<TokenInput>>
}

export type OwnerCount = {
  __typename?: 'OwnerCount'
  count: Scalars['Int']
  owner: Scalars['String']
  tokenIds: Array<Scalars['String']>
}

export type OwnerCountConnection = {
  __typename?: 'OwnerCountConnection'
  nodes: Array<OwnerCount>
  pageInfo: PageInfo
}

export type OwnersByCountQueryInput = {
  attributes?: InputMaybe<Array<AttributeFilter>>
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
  tokens?: InputMaybe<Array<TokenInput>>
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['String']>
  hasNextPage: Scalars['Boolean']
  limit: Scalars['Int']
}

export type PaginationInput = {
  after?: InputMaybe<Scalars['String']>
  limit: Scalars['Int']
}

export type PriceAtTime = {
  __typename?: 'PriceAtTime'
  blockNumber: Scalars['Int']
  chainTokenPrice?: Maybe<CurrencyAmount>
  nativePrice: CurrencyAmount
  usdcPrice?: Maybe<CurrencyAmount>
}

export type PriceFilter = {
  currencyAddress?: InputMaybe<Scalars['String']>
  maximumChainTokenPrice?: InputMaybe<Scalars['String']>
  maximumNativePrice?: InputMaybe<Scalars['String']>
  minimumChainTokenPrice?: InputMaybe<Scalars['String']>
  minimumNativePrice?: InputMaybe<Scalars['String']>
}

export type ProposalInput = {
  address: Scalars['String']
  proposalNumber: Scalars['String']
}

export type ReceivedItem = {
  __typename?: 'ReceivedItem'
  address: Scalars['String']
  amount: Scalars['String']
  itemType: Scalars['String']
  price?: Maybe<PriceAtTime>
  recipient: Scalars['String']
  tokenId: Scalars['String']
}

export type RootQuery = {
  __typename?: 'RootQuery'
  /** Gets the total set of NFT attributes */
  aggregateAttributes: Array<AggregateAttribute>
  /** Gets counts, sales volume, and other statistics */
  aggregateStat: AggregateStat
  /** NFT collection data */
  collections: CollectionConnection
  /** Contract event information, e.g. Sales, Transfers, Mints, etc. */
  events: EventConnection
  /** Real time data for active markets */
  market?: Maybe<ActiveMarket>
  /** Data for specific ZORA markets, e.g. Buy Now, Auctions, Offers */
  markets: MarketWithTokenConnection
  /** Historical minting data */
  mints: MintWithTokenAndMarketsConnection
  /** Nouns Builder DAOs */
  nouns: Nouns
  /** Offchain liquidity */
  offchainOrders: OffchainOrderWithTokenConnection
  /** Historical sales data from ZORA, OpenSea, LooksRare, 0x, and more */
  sales: SaleWithTokenConnection
  /** Returns search results for a query */
  search: SearchResultConnection
  /** Gets data on a single token */
  token?: Maybe<TokenWithFullMarketHistory>
  /** Gets data for multiple tokens */
  tokens: TokenWithMarketsSummaryConnection
}

export type RootQueryAggregateAttributesArgs = {
  networks?: InputMaybe<Array<NetworkInput>>
  sort?: InputMaybe<AggregateAttributeSortKeySortInput>
  where: AggregateAttributesQueryInput
}

export type RootQueryCollectionsArgs = {
  networks?: InputMaybe<Array<NetworkInput>>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<CollectionSortKeySortInput>
  where?: InputMaybe<CollectionsQueryInput>
}

export type RootQueryEventsArgs = {
  filter?: InputMaybe<EventsQueryFilter>
  networks?: InputMaybe<Array<NetworkInput>>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<EventSortKeySortInput>
  where?: InputMaybe<EventsQueryInput>
}

export type RootQueryMarketArgs = {
  network?: InputMaybe<NetworkInput>
  where: ActiveMarketQueryInput
}

export type RootQueryMarketsArgs = {
  filter?: InputMaybe<MarketsQueryFilter>
  networks?: InputMaybe<Array<NetworkInput>>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<MarketSortKeySortInput>
  where?: InputMaybe<MarketsQueryInput>
}

export type RootQueryMintsArgs = {
  filter?: InputMaybe<MintsQueryFilter>
  networks?: InputMaybe<Array<NetworkInput>>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<MintSortKeySortInput>
  where?: InputMaybe<MintsQueryInput>
}

export type RootQueryOffchainOrdersArgs = {
  filter?: InputMaybe<OffchainOrdersQueryFilter>
  networks?: InputMaybe<Array<NetworkInput>>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<OffchainOrderSortKeySortInput>
  where?: InputMaybe<OffchainOrdersQueryInput>
}

export type RootQuerySalesArgs = {
  filter?: InputMaybe<SalesQueryFilter>
  networks?: InputMaybe<Array<NetworkInput>>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<SaleSortKeySortInput>
  where?: InputMaybe<SalesQueryInput>
}

export type RootQuerySearchArgs = {
  filter?: InputMaybe<SearchFilter>
  pagination: SearchPaginationInput
  query: SearchQueryInput
}

export type RootQueryTokenArgs = {
  network?: InputMaybe<NetworkInput>
  token: TokenInput
}

export type RootQueryTokensArgs = {
  filter?: InputMaybe<TokensQueryFilter>
  networks?: InputMaybe<Array<NetworkInput>>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<TokenSortInput>
  where?: InputMaybe<TokensQueryInput>
}

export type Sale = {
  __typename?: 'Sale'
  buyerAddress: Scalars['String']
  collectionAddress: Scalars['String']
  networkInfo: NetworkInfo
  price?: Maybe<PriceAtTime>
  saleContractAddress?: Maybe<Scalars['String']>
  saleType: Scalars['String']
  sellerAddress: Scalars['String']
  tokenId: Scalars['String']
  transactionInfo: TransactionInfo
}

export enum SaleSortKey {
  ChainTokenPrice = 'CHAIN_TOKEN_PRICE',
  NativePrice = 'NATIVE_PRICE',
  None = 'NONE',
  Time = 'TIME',
}

export type SaleSortKeySortInput = {
  sortDirection: SortDirection
  sortKey: SaleSortKey
}

export enum SaleType {
  CryptopunksSale = 'CRYPTOPUNKS_SALE',
  FoundationSale = 'FOUNDATION_SALE',
  LilNounsAuctionSale = 'LIL_NOUNS_AUCTION_SALE',
  LooksRareSale = 'LOOKS_RARE_SALE',
  NounsAuctionSale = 'NOUNS_AUCTION_SALE',
  NounsBuilderAuctionSale = 'NOUNS_BUILDER_AUCTION_SALE',
  OpenseaBundleSale = 'OPENSEA_BUNDLE_SALE',
  OpenseaSingleSale = 'OPENSEA_SINGLE_SALE',
  RaribleSale = 'RARIBLE_SALE',
  SeaportSale = 'SEAPORT_SALE',
  SuperrareSale = 'SUPERRARE_SALE',
  ZeroxSale = 'ZEROX_SALE',
  ZoraV2AuctionSale = 'ZORA_V2_AUCTION_SALE',
  ZoraV3AskSale = 'ZORA_V3_ASK_SALE',
  ZoraV3ReserveAuctionSale = 'ZORA_V3_RESERVE_AUCTION_SALE',
}

export type SaleWithToken = {
  __typename?: 'SaleWithToken'
  sale: Sale
  token?: Maybe<Token>
}

export type SaleWithTokenConnection = {
  __typename?: 'SaleWithTokenConnection'
  nodes: Array<SaleWithToken>
  pageInfo: PageInfo
}

export type SalesQueryFilter = {
  priceFilter?: InputMaybe<PriceFilter>
  saleTypes?: InputMaybe<Array<SaleType>>
  timeFilter?: InputMaybe<TimeFilter>
}

export type SalesQueryInput = {
  buyerAddresses?: InputMaybe<Array<Scalars['String']>>
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
  sellerAddresses?: InputMaybe<Array<Scalars['String']>>
  tokens?: InputMaybe<Array<TokenInput>>
}

export type SalesVolume = {
  __typename?: 'SalesVolume'
  chainTokenPrice: Scalars['Float']
  totalCount: Scalars['Int']
  usdcPrice: Scalars['Float']
}

export type SalesVolumeFilter = {
  saleTypes?: InputMaybe<Array<SaleType>>
  timeFilter?: InputMaybe<TimeFilter>
}

export type SeaportCounterIncrementedProperties = {
  __typename?: 'SeaportCounterIncrementedProperties'
  newCounter: Scalars['String']
}

export type SeaportEvent = {
  __typename?: 'SeaportEvent'
  address: Scalars['String']
  eventType: SeaportEventType
  offerer: Scalars['String']
  orderHash?: Maybe<Scalars['String']>
  properties?: Maybe<SeaportEventProperties>
  zone?: Maybe<Scalars['String']>
}

export type SeaportEventProperties =
  | SeaportCounterIncrementedProperties
  | SeaportOrderFulfilledProperties

export enum SeaportEventType {
  SeaportCounterIncrementedEvent = 'SEAPORT_COUNTER_INCREMENTED_EVENT',
  SeaportOrderCancelledEvent = 'SEAPORT_ORDER_CANCELLED_EVENT',
  SeaportOrderFulfilledEvent = 'SEAPORT_ORDER_FULFILLED_EVENT',
  SeaportOrderValidatedEvent = 'SEAPORT_ORDER_VALIDATED_EVENT',
}

export type SeaportOrder = {
  __typename?: 'SeaportOrder'
  conduitKey: Scalars['String']
  considerations: Array<SeaportOrderItem>
  counter: Scalars['String']
  endTime: Scalars['datetime']
  offerer: Scalars['String']
  offers: Array<SeaportOrderItem>
  orderHash: Scalars['String']
  orderType: Scalars['String']
  price: PriceAtTime
  salt: Scalars['String']
  schemaHash: Scalars['String']
  signature: Scalars['String']
  startTime: Scalars['datetime']
  zone: Scalars['String']
  zoneHash: Scalars['String']
}

export type SeaportOrderFulfilledProperties = {
  __typename?: 'SeaportOrderFulfilledProperties'
  consideration: Array<ReceivedItem>
  offer: Array<SpentItem>
  recipient: Scalars['String']
}

export type SeaportOrderItem = {
  __typename?: 'SeaportOrderItem'
  address: Scalars['String']
  criteria?: Maybe<Scalars['String']>
  endAmount: Scalars['String']
  endPrice?: Maybe<PriceAtTime>
  itemType: Scalars['String']
  recipient?: Maybe<Scalars['String']>
  startAmount: Scalars['String']
  startPrice?: Maybe<PriceAtTime>
  tokenId?: Maybe<Scalars['String']>
}

export type SearchFilter = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
  entityType?: InputMaybe<SearchableEntity>
}

export type SearchPaginationInput = {
  after?: InputMaybe<Scalars['String']>
  limit: Scalars['Int']
}

export type SearchQueryInput = {
  text: Scalars['String']
}

export type SearchResult = {
  __typename?: 'SearchResult'
  collectionAddress: Scalars['String']
  description?: Maybe<Scalars['String']>
  entity?: Maybe<TokenCollection>
  entityType: Scalars['String']
  name?: Maybe<Scalars['String']>
  networkInfo: NetworkInfo
  tokenId?: Maybe<Scalars['String']>
}

export type SearchResultConnection = {
  __typename?: 'SearchResultConnection'
  nodes: Array<SearchResult>
  pageInfo: PageInfo
}

export enum SearchableEntity {
  Collection = 'COLLECTION',
  Token = 'TOKEN',
}

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type SpentItem = {
  __typename?: 'SpentItem'
  address: Scalars['String']
  amount: Scalars['String']
  itemType: Scalars['String']
  price?: Maybe<PriceAtTime>
  tokenId: Scalars['String']
}

export enum Support {
  Abstain = 'ABSTAIN',
  Against = 'AGAINST',
  For = 'FOR',
}

export type TimeFilter = {
  endBlock?: InputMaybe<Scalars['Int']>
  endDate?: InputMaybe<Scalars['String']>
  endDatetime?: InputMaybe<Scalars['datetime']>
  lookbackHours?: InputMaybe<Scalars['Int']>
  startBlock?: InputMaybe<Scalars['Int']>
  startDate?: InputMaybe<Scalars['String']>
  startDatetime?: InputMaybe<Scalars['datetime']>
}

export type Token = {
  __typename?: 'Token'
  attributes?: Maybe<Array<TokenAttribute>>
  collectionAddress: Scalars['String']
  collectionName?: Maybe<Scalars['String']>
  content?: Maybe<TokenContentMedia>
  description?: Maybe<Scalars['String']>
  image?: Maybe<TokenContentMedia>
  lastRefreshTime?: Maybe<Scalars['datetime']>
  metadata?: Maybe<Scalars['JSONScalar']>
  mintInfo?: Maybe<MintInfo>
  name?: Maybe<Scalars['String']>
  networkInfo: NetworkInfo
  owner?: Maybe<Scalars['String']>
  tokenContract?: Maybe<TokenContract>
  tokenId: Scalars['String']
  tokenStandard?: Maybe<TokenStandard>
  tokenUrl?: Maybe<Scalars['String']>
  tokenUrlMimeType?: Maybe<Scalars['String']>
}

export type TokenAttribute = {
  __typename?: 'TokenAttribute'
  displayType?: Maybe<Scalars['String']>
  traitType?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type TokenCollection = Collection | Token

export type TokenContentMedia = {
  __typename?: 'TokenContentMedia'
  mediaEncoding?: Maybe<ImageEncodingTypesVideoEncodingTypesAudioEncodingTypesUnsupportedEncodingTypes>
  mimeType?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type TokenContract = {
  __typename?: 'TokenContract'
  chain: Scalars['Int']
  collectionAddress: Scalars['String']
  description?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  network: Scalars['String']
  symbol?: Maybe<Scalars['String']>
  totalSupply?: Maybe<Scalars['Int']>
}

export type TokenInput = {
  address: Scalars['String']
  tokenId: Scalars['String']
}

export type TokenSortInput = {
  sortAxis?: InputMaybe<MarketCategory>
  sortDirection: SortDirection
  sortKey: TokenSortKey
}

export enum TokenSortKey {
  ChainTokenPrice = 'CHAIN_TOKEN_PRICE',
  Minted = 'MINTED',
  NativePrice = 'NATIVE_PRICE',
  None = 'NONE',
  TimedSaleEnding = 'TIMED_SALE_ENDING',
  TokenId = 'TOKEN_ID',
  Transferred = 'TRANSFERRED',
}

export enum TokenStandard {
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155',
}

export type TokenWithFullMarketHistory = {
  __typename?: 'TokenWithFullMarketHistory'
  events: Array<Event>
  markets: Array<Market>
  sales: Array<Sale>
  token: Token
}

export type TokenWithFullMarketHistoryEventsArgs = {
  filter?: InputMaybe<EventsQueryFilter>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<EventSortKeySortInput>
}

export type TokenWithFullMarketHistoryMarketsArgs = {
  filter?: InputMaybe<MarketsQueryFilter>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<MarketSortKeySortInput>
}

export type TokenWithFullMarketHistorySalesArgs = {
  filter?: InputMaybe<SalesQueryFilter>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<SaleSortKeySortInput>
}

export type TokenWithMarketsSummary = {
  __typename?: 'TokenWithMarketsSummary'
  events: Array<Event>
  marketsSummary: Array<Market>
  sales: Array<Sale>
  token: Token
}

export type TokenWithMarketsSummaryEventsArgs = {
  filter?: InputMaybe<EventsQueryFilter>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<EventSortKeySortInput>
}

export type TokenWithMarketsSummarySalesArgs = {
  filter?: InputMaybe<SalesQueryFilter>
  pagination?: InputMaybe<PaginationInput>
  sort?: InputMaybe<SaleSortKeySortInput>
}

export type TokenWithMarketsSummaryConnection = {
  __typename?: 'TokenWithMarketsSummaryConnection'
  nodes: Array<TokenWithMarketsSummary>
  pageInfo: PageInfo
}

export type TokensQueryFilter = {
  attributeFilters?: InputMaybe<Array<AttributeFilter>>
  marketFilters?: InputMaybe<Array<MarketTypeFilter>>
  mediaType?: InputMaybe<MediaType>
  priceFilter?: InputMaybe<PriceFilter>
  timeFilter?: InputMaybe<TimeFilter>
}

export type TokensQueryInput = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
  ownerAddresses?: InputMaybe<Array<Scalars['String']>>
  tokens?: InputMaybe<Array<TokenInput>>
}

export type TransactionInfo = {
  __typename?: 'TransactionInfo'
  blockNumber: Scalars['Int']
  blockTimestamp: Scalars['datetime']
  logIndex?: Maybe<Scalars['Int']>
  transactionHash?: Maybe<Scalars['String']>
}

export type TransferEvent = {
  __typename?: 'TransferEvent'
  collectionAddress: Scalars['String']
  fromAddress: Scalars['String']
  toAddress: Scalars['String']
  tokenId: Scalars['String']
}

export type UnsupportedEncodingTypes = {
  __typename?: 'UnsupportedEncodingTypes'
  original: Scalars['String']
}

export type V1Ask = {
  __typename?: 'V1Ask'
  address: Scalars['String']
  amount: PriceAtTime
  collectionAddress: Scalars['String']
  currency: Scalars['String']
  tokenId: Scalars['String']
  tokenOwner?: Maybe<Scalars['String']>
  v1AskStatus: Scalars['String']
}

export type V1BidShare = {
  __typename?: 'V1BidShare'
  address: Scalars['String']
  collectionAddress: Scalars['String']
  creator: Scalars['String']
  owner: Scalars['String']
  previousOwner: Scalars['String']
  tokenId: Scalars['String']
  v1BidShareStatus: Scalars['String']
}

export type V1MarketAskCreatedEventProperties = {
  __typename?: 'V1MarketAskCreatedEventProperties'
  amount: Scalars['String']
  currency: Scalars['String']
  price: PriceAtTime
}

export type V1MarketAskRemovedEventProperties = {
  __typename?: 'V1MarketAskRemovedEventProperties'
  amount: Scalars['String']
  currency: Scalars['String']
  price: PriceAtTime
}

export type V1MarketBidShareUpdatedEventProperties = {
  __typename?: 'V1MarketBidShareUpdatedEventProperties'
  creator: Scalars['String']
  owner: Scalars['String']
  previousOwner: Scalars['String']
}

export type V1MarketEvent = {
  __typename?: 'V1MarketEvent'
  address: Scalars['String']
  collectionAddress: Scalars['String']
  properties: V1MarketEventProperties
  tokenId: Scalars['String']
  v1MarketEventType: V1MarketEventType
}

export type V1MarketEventProperties =
  | V1MarketAskCreatedEventProperties
  | V1MarketAskRemovedEventProperties
  | V1MarketBidShareUpdatedEventProperties
  | V1MarketOfferCreatedEventProperties
  | V1MarketOfferFinalizedEventProperties
  | V1MarketOfferRemovedEventProperties

export enum V1MarketEventType {
  V1MarketAskCreated = 'V1_MARKET_ASK_CREATED',
  V1MarketAskRemoved = 'V1_MARKET_ASK_REMOVED',
  V1MarketBidCreated = 'V1_MARKET_BID_CREATED',
  V1MarketBidFinalized = 'V1_MARKET_BID_FINALIZED',
  V1MarketBidRemoved = 'V1_MARKET_BID_REMOVED',
  V1MarketBidShareUpdated = 'V1_MARKET_BID_SHARE_UPDATED',
}

export type V1MarketOfferCreatedEventProperties = {
  __typename?: 'V1MarketOfferCreatedEventProperties'
  amount: Scalars['String']
  bidder: Scalars['String']
  currency: Scalars['String']
  price: PriceAtTime
  recipient: Scalars['String']
  sellOnShare: Scalars['String']
}

export type V1MarketOfferFinalizedEventProperties = {
  __typename?: 'V1MarketOfferFinalizedEventProperties'
  amount: Scalars['String']
  bidder: Scalars['String']
  currency: Scalars['String']
  price: PriceAtTime
  recipient: Scalars['String']
  sellOnShare: Scalars['String']
}

export type V1MarketOfferRemovedEventProperties = {
  __typename?: 'V1MarketOfferRemovedEventProperties'
  amount: Scalars['String']
  bidder: Scalars['String']
  currency: Scalars['String']
  price: PriceAtTime
  recipient: Scalars['String']
  sellOnShare: Scalars['String']
}

export type V1MediaEvent = {
  __typename?: 'V1MediaEvent'
  address: Scalars['String']
  collectionAddress: Scalars['String']
  eventType: V1MediaEventType
  owner: Scalars['String']
  tokenId: Scalars['String']
  uri: Scalars['String']
}

export enum V1MediaEventType {
  V1MediaTokenMetadataUriUpdatedEvent = 'V1_MEDIA_TOKEN_METADATA_URI_UPDATED_EVENT',
  V1MediaTokenUriUpdatedEvent = 'V1_MEDIA_TOKEN_URI_UPDATED_EVENT',
}

export type V1Offer = {
  __typename?: 'V1Offer'
  address: Scalars['String']
  amount: PriceAtTime
  bidder: Scalars['String']
  collectionAddress: Scalars['String']
  currency: Scalars['String']
  recipient: Scalars['String']
  sellOnShare: Scalars['String']
  tokenId: Scalars['String']
  v1OfferStatus: Scalars['String']
}

export type V2Auction = {
  __typename?: 'V2Auction'
  address: Scalars['String']
  amountCuratorReceived?: Maybe<PriceAtTime>
  amountTokenOwnerReceived?: Maybe<PriceAtTime>
  approved: Scalars['Boolean']
  auctionCurrency: Scalars['String']
  auctionId: Scalars['String']
  collectionAddress: Scalars['String']
  curator: Scalars['String']
  curatorFeePercentage: Scalars['Int']
  duration: Scalars['String']
  estimatedExpirationTime?: Maybe<Scalars['datetime']>
  firstBidTime?: Maybe<Scalars['datetime']>
  highestBidPrice?: Maybe<PriceAtTime>
  highestBidder?: Maybe<Scalars['String']>
  reservePrice: PriceAtTime
  tokenId: Scalars['String']
  tokenOwner: Scalars['String']
  v2AuctionStatus: Scalars['String']
}

export type V2AuctionApprovalUpdatedEventProperties = {
  __typename?: 'V2AuctionApprovalUpdatedEventProperties'
  approved: Scalars['Boolean']
}

export type V2AuctionBidEventProperties = {
  __typename?: 'V2AuctionBidEventProperties'
  extended: Scalars['Boolean']
  firstBid: Scalars['Boolean']
  price: PriceAtTime
  sender: Scalars['String']
  value: Scalars['String']
}

export type V2AuctionCanceledEventProperties = {
  __typename?: 'V2AuctionCanceledEventProperties'
  tokenOwner: Scalars['String']
}

export type V2AuctionCreatedEventProperties = {
  __typename?: 'V2AuctionCreatedEventProperties'
  auctionCurrency: Scalars['String']
  curator: Scalars['String']
  curatorFeePercentage: Scalars['Int']
  duration: Scalars['String']
  price: PriceAtTime
  reservePrice: Scalars['String']
  tokenOwner: Scalars['String']
}

export type V2AuctionDurationExtendedEventProperties = {
  __typename?: 'V2AuctionDurationExtendedEventProperties'
  duration: Scalars['String']
}

export type V2AuctionEndedEventProperties = {
  __typename?: 'V2AuctionEndedEventProperties'
  amount: Scalars['String']
  auctionCurrency: Scalars['String']
  curator: Scalars['String']
  curatorFee: Scalars['String']
  tokenOwner: Scalars['String']
  winner: Scalars['String']
}

export type V2AuctionEvent = {
  __typename?: 'V2AuctionEvent'
  address: Scalars['String']
  auctionId: Scalars['Int']
  collectionAddress: Scalars['String']
  properties: V2AuctionEventProperties
  tokenId: Scalars['String']
  v2AuctionEventType: V2AuctionEventType
}

export type V2AuctionEventProperties =
  | V2AuctionApprovalUpdatedEventProperties
  | V2AuctionBidEventProperties
  | V2AuctionCanceledEventProperties
  | V2AuctionCreatedEventProperties
  | V2AuctionDurationExtendedEventProperties
  | V2AuctionEndedEventProperties
  | V2AuctionReservePriceUpdatedEventProperties

export enum V2AuctionEventType {
  V2AuctionApprovalUpdated = 'V2_AUCTION_APPROVAL_UPDATED',
  V2AuctionBid = 'V2_AUCTION_BID',
  V2AuctionCanceled = 'V2_AUCTION_CANCELED',
  V2AuctionCreated = 'V2_AUCTION_CREATED',
  V2AuctionDurationExtended = 'V2_AUCTION_DURATION_EXTENDED',
  V2AuctionEnded = 'V2_AUCTION_ENDED',
  V2AuctionReservePriceUpdated = 'V2_AUCTION_RESERVE_PRICE_UPDATED',
}

export type V2AuctionReservePriceUpdatedEventProperties = {
  __typename?: 'V2AuctionReservePriceUpdatedEventProperties'
  price: PriceAtTime
  reservePrice: Scalars['String']
}

export type V3Ask = {
  __typename?: 'V3Ask'
  address: Scalars['String']
  askCurrency: Scalars['String']
  askPrice: PriceAtTime
  buyer?: Maybe<Scalars['String']>
  collectionAddress: Scalars['String']
  finder?: Maybe<Scalars['String']>
  findersFeeBps?: Maybe<Scalars['Int']>
  seller: Scalars['String']
  sellerFundsRecipient?: Maybe<Scalars['String']>
  tokenId: Scalars['String']
  v3AskStatus: Scalars['String']
}

export type V3AskCanceledEventProperties = {
  __typename?: 'V3AskCanceledEventProperties'
  askCurrency: Scalars['String']
  askPrice: Scalars['String']
  findersFeeBps: Scalars['Int']
  price: PriceAtTime
  seller: Scalars['String']
  sellerFundsRecipient: Scalars['String']
}

export type V3AskCreatedEventProperties = {
  __typename?: 'V3AskCreatedEventProperties'
  askCurrency: Scalars['String']
  askPrice: Scalars['String']
  findersFeeBps: Scalars['Int']
  price: PriceAtTime
  seller: Scalars['String']
  sellerFundsRecipient: Scalars['String']
}

export type V3AskEvent = {
  __typename?: 'V3AskEvent'
  address: Scalars['String']
  collectionAddress: Scalars['String']
  properties: V3AskEventProperties
  tokenId: Scalars['String']
  v3AskEventType: V3AskEventType
}

export type V3AskEventProperties =
  | V3AskCanceledEventProperties
  | V3AskCreatedEventProperties
  | V3AskFilledEventProperties
  | V3AskPriceUpdatedEventProperties
  | V3AsksCoreEthAskEventProperties
  | V3AsksCoreEthAskFilledEventProperties
  | V3AsksCoreEthRoyaltyPayoutEventProperties
  | V3PrivateAskEventProperties

export enum V3AskEventType {
  V3AsksCoreEthCanceled = 'V3_ASKS_CORE_ETH_CANCELED',
  V3AsksCoreEthCreated = 'V3_ASKS_CORE_ETH_CREATED',
  V3AsksCoreEthFilled = 'V3_ASKS_CORE_ETH_FILLED',
  V3AsksCoreEthPriceUpdated = 'V3_ASKS_CORE_ETH_PRICE_UPDATED',
  V3AsksCoreEthRoyaltyPayout = 'V3_ASKS_CORE_ETH_ROYALTY_PAYOUT',
  V3AskCanceled = 'V3_ASK_CANCELED',
  V3AskCreated = 'V3_ASK_CREATED',
  V3AskFilled = 'V3_ASK_FILLED',
  V3AskPriceUpdated = 'V3_ASK_PRICE_UPDATED',
  V3PrivateAskCanceled = 'V3_PRIVATE_ASK_CANCELED',
  V3PrivateAskCreated = 'V3_PRIVATE_ASK_CREATED',
  V3PrivateAskFilled = 'V3_PRIVATE_ASK_FILLED',
  V3PrivateAskPriceUpdated = 'V3_PRIVATE_ASK_PRICE_UPDATED',
}

export type V3AskFilledEventProperties = {
  __typename?: 'V3AskFilledEventProperties'
  askCurrency: Scalars['String']
  askPrice: Scalars['String']
  buyer: Scalars['String']
  finder: Scalars['String']
  findersFeeBps: Scalars['Int']
  price: PriceAtTime
  seller: Scalars['String']
  sellerFundsRecipient: Scalars['String']
}

export type V3AskPriceUpdatedEventProperties = {
  __typename?: 'V3AskPriceUpdatedEventProperties'
  askCurrency: Scalars['String']
  askPrice: Scalars['String']
  findersFeeBps: Scalars['Int']
  price: PriceAtTime
  seller: Scalars['String']
  sellerFundsRecipient: Scalars['String']
}

export type V3AsksCoreEthAskEventProperties = {
  __typename?: 'V3AsksCoreEthAskEventProperties'
  askCurrency: Scalars['String']
  askPrice: Scalars['String']
  price: PriceAtTime
  seller: Scalars['String']
  tokenContract: Scalars['String']
  tokenId: Scalars['String']
}

export type V3AsksCoreEthAskFilledEventProperties = {
  __typename?: 'V3AsksCoreEthAskFilledEventProperties'
  askCurrency: Scalars['String']
  askPrice: Scalars['String']
  buyer: Scalars['String']
  price: PriceAtTime
  seller: Scalars['String']
  tokenContract: Scalars['String']
  tokenId: Scalars['String']
}

export type V3AsksCoreEthRoyaltyPayoutEventProperties = {
  __typename?: 'V3AsksCoreEthRoyaltyPayoutEventProperties'
  amount: PriceAtTime
  askCurrency: Scalars['String']
  askPrice: Scalars['String']
  recipient: Scalars['String']
  tokenContract: Scalars['String']
  tokenId: Scalars['String']
}

export type V3ModuleManagerEvent = {
  __typename?: 'V3ModuleManagerEvent'
  address: Scalars['String']
  approved: Scalars['Boolean']
  eventType: V3ModuleManagerEventType
  moduleAddress: Scalars['String']
  userAddress: Scalars['String']
}

export enum V3ModuleManagerEventType {
  V3ModuleManagerApproved = 'V3_MODULE_MANAGER_APPROVED',
}

export type V3PrivateAskEventProperties = {
  __typename?: 'V3PrivateAskEventProperties'
  askCurrency: Scalars['String']
  askPrice: Scalars['String']
  buyer: Scalars['String']
  price: PriceAtTime
  seller: Scalars['String']
  tokenContract: Scalars['String']
  tokenId: Scalars['String']
}

export type V3ReserveAuction = {
  __typename?: 'V3ReserveAuction'
  address: Scalars['String']
  collectionAddress: Scalars['String']
  currency: Scalars['String']
  duration: Scalars['String']
  estimatedDurationTime?: Maybe<Scalars['datetime']>
  extended: Scalars['Boolean']
  finder: Scalars['String']
  findersFeeBps: Scalars['String']
  firstBid: Scalars['Boolean']
  firstBidTime: Scalars['String']
  highestBid: Scalars['String']
  highestBidPrice?: Maybe<PriceAtTime>
  highestBidder: Scalars['String']
  price?: Maybe<PriceAtTime>
  reserve: Scalars['String']
  reservePrice: PriceAtTime
  seller: Scalars['String']
  sellerFundsRecipient: Scalars['String']
  startTime: Scalars['String']
  status: Scalars['String']
  tokenId: Scalars['String']
}

export type V3ReserveAuctionAuctionProperties = {
  __typename?: 'V3ReserveAuctionAuctionProperties'
  currency: Scalars['String']
  duration: Scalars['String']
  finder: Scalars['String']
  findersFeeBps: Scalars['String']
  firstBidTime: Scalars['String']
  highestBid: Scalars['String']
  highestBidPrice: PriceAtTime
  highestBidder: Scalars['String']
  reserve: Scalars['String']
  reservePrice: PriceAtTime
  seller: Scalars['String']
  sellerFundsRecipient: Scalars['String']
  startTime: Scalars['String']
}

export type V3ReserveAuctionEvent = {
  __typename?: 'V3ReserveAuctionEvent'
  address: Scalars['String']
  collectionAddress: Scalars['String']
  eventType: V3ReserveAuctionEventType
  properties: V3ReserveAuctionEventProperties
  tokenId: Scalars['String']
}

export type V3ReserveAuctionEventProperties =
  | V3ReserveAuctionV1AuctionBidProperties
  | V3ReserveAuctionV1AuctionCanceledProperties
  | V3ReserveAuctionV1AuctionCreatedProperties
  | V3ReserveAuctionV1AuctionEndedProperties
  | V3ReserveAuctionV1AuctionReservePriceUpdatedProperties

export enum V3ReserveAuctionEventType {
  V3ReserveAuctionBid = 'V3_RESERVE_AUCTION_BID',
  V3ReserveAuctionCanceled = 'V3_RESERVE_AUCTION_CANCELED',
  V3ReserveAuctionCreated = 'V3_RESERVE_AUCTION_CREATED',
  V3ReserveAuctionEnded = 'V3_RESERVE_AUCTION_ENDED',
  V3ReserveAuctionReservePriceUpdated = 'V3_RESERVE_AUCTION_RESERVE_PRICE_UPDATED',
}

export type V3ReserveAuctionV1AuctionBidProperties = {
  __typename?: 'V3ReserveAuctionV1AuctionBidProperties'
  auction: V3ReserveAuctionAuctionProperties
  extended: Scalars['Boolean']
  firstBid: Scalars['Boolean']
  price: PriceAtTime
}

export type V3ReserveAuctionV1AuctionCanceledProperties = {
  __typename?: 'V3ReserveAuctionV1AuctionCanceledProperties'
  auction: V3ReserveAuctionAuctionProperties
}

export type V3ReserveAuctionV1AuctionCreatedProperties = {
  __typename?: 'V3ReserveAuctionV1AuctionCreatedProperties'
  auction: V3ReserveAuctionAuctionProperties
}

export type V3ReserveAuctionV1AuctionEndedProperties = {
  __typename?: 'V3ReserveAuctionV1AuctionEndedProperties'
  auction: V3ReserveAuctionAuctionProperties
}

export type V3ReserveAuctionV1AuctionReservePriceUpdatedProperties = {
  __typename?: 'V3ReserveAuctionV1AuctionReservePriceUpdatedProperties'
  auction: V3ReserveAuctionAuctionProperties
}

export type VideoEncodingTypes = {
  __typename?: 'VideoEncodingTypes'
  large?: Maybe<Scalars['String']>
  original: Scalars['String']
  poster?: Maybe<Scalars['String']>
  preview?: Maybe<Scalars['String']>
  thumbnail?: Maybe<Scalars['String']>
}

export type AuctionFragment = {
  __typename?: 'NounsBuilderAuction'
  auction?: string | null
  collectionAddress: string
}

export type DaoFragment = {
  __typename?: 'NounsDao'
  name?: string | null
  collectionAddress: string
  auctionAddress?: string | null
}

export type ImageMediaEncodingFragment = {
  __typename?: 'ImageEncodingTypes'
  original: string
  thumbnail?: string | null
}

export type ProposalFragment = {
  __typename: 'NounsProposal'
  abstainVotes: number
  againstVotes: number
  auction: string
  calldatas: Array<string>
  collectionAddress: string
  description: string
  descriptionHash: string
  executableFrom?: number | null
  expiresAt?: number | null
  forVotes: number
  governor: string
  manager: string
  metadata: string
  proposalId: string
  proposalNumber: number
  proposalThreshold: number
  proposer: string
  quorumVotes: number
  status: NounsProposalStatus
  targets: Array<string>
  timeCreated: number
  title: string
  treasury: string
  values: Array<string>
  voteEnd: number
  voteStart: number
}

export type ProposalVoteFragment = {
  __typename?: 'NounsProposalVote'
  voter: string
  support: Support
  weight: number
  reason: string
}

export type TokenFragment = {
  __typename?: 'Token'
  tokenId: string
  name?: string | null
  description?: string | null
  owner?: string | null
  image?: {
    __typename?: 'TokenContentMedia'
    url?: string | null
    mediaEncoding?:
      | { __typename: 'AudioEncodingTypes' }
      | { __typename: 'ImageEncodingTypes'; original: string; thumbnail?: string | null }
      | { __typename: 'UnsupportedEncodingTypes' }
      | { __typename: 'VideoEncodingTypes' }
      | null
  } | null
  mintInfo?: {
    __typename?: 'MintInfo'
    mintContext: { __typename?: 'TransactionInfo'; blockTimestamp: any }
  } | null
}

export type VoteFragment = {
  __typename?: 'NounsBuilderGovernorVoteCastEventProperties'
  proposalId: string
  voter: string
  reason: string
  support: string
  weight: string
}

export type ActiveAuctionsQueryVariables = Exact<{
  chain: Chain
}>

export type ActiveAuctionsQuery = {
  __typename?: 'RootQuery'
  nouns: {
    __typename?: 'Nouns'
    nounsMarkets: {
      __typename?: 'NounsBuilderAuctionConnection'
      nodes: Array<{
        __typename?: 'NounsBuilderAuction'
        auction?: string | null
        collectionAddress: string
      }>
    }
  }
}

export type DaoInfoQueryVariables = Exact<{
  chain: Chain
  collectionAddress?: InputMaybe<Array<Scalars['String']> | Scalars['String']>
}>

export type DaoInfoQuery = {
  __typename?: 'RootQuery'
  aggregateStat: { __typename?: 'AggregateStat'; ownerCount: number }
  nouns: {
    __typename?: 'Nouns'
    nounsDaos: {
      __typename?: 'NounsDaoConnection'
      nodes: Array<{ __typename?: 'NounsDao'; totalSupply?: number | null }>
    }
  }
}

export type DaosQueryVariables = Exact<{
  where?: InputMaybe<NounsQueryInput>
  chain: Chain
  pagination?: InputMaybe<PaginationInput>
}>

export type DaosQuery = {
  __typename?: 'RootQuery'
  nouns: {
    __typename?: 'Nouns'
    nounsDaos: {
      __typename?: 'NounsDaoConnection'
      nodes: Array<{
        __typename?: 'NounsDao'
        name?: string | null
        collectionAddress: string
        auctionAddress?: string | null
      }>
    }
  }
}

export type ExploreDaosPageQueryVariables = Exact<{
  chain: Chain
  after?: InputMaybe<Scalars['String']>
  sortKey: MarketSortKey
  collectionAddresses?: InputMaybe<Array<Scalars['String']> | Scalars['String']>
}>

export type ExploreDaosPageQuery = {
  __typename?: 'RootQuery'
  nouns: {
    __typename?: 'Nouns'
    nounsMarkets: {
      __typename?: 'NounsBuilderAuctionConnection'
      nodes: Array<{
        __typename?: 'NounsBuilderAuction'
        collectionAddress: string
        tokenId: string
        endTime: string
        highestBidder?: string | null
        highestBidPrice?: {
          __typename?: 'PriceAtTime'
          chainTokenPrice?: { __typename?: 'CurrencyAmount'; decimal: number } | null
        } | null
      }>
      pageInfo: {
        __typename?: 'PageInfo'
        limit: number
        hasNextPage: boolean
        endCursor?: string | null
      }
    }
  }
}

export type ExploreTokensQueryVariables = Exact<{
  chain: Chain
  tokens?: InputMaybe<Array<TokenInput> | TokenInput>
}>

export type ExploreTokensQuery = {
  __typename?: 'RootQuery'
  tokens: {
    __typename?: 'TokenWithMarketsSummaryConnection'
    nodes: Array<{
      __typename?: 'TokenWithMarketsSummary'
      token: {
        __typename?: 'Token'
        collectionAddress: string
        collectionName?: string | null
        name?: string | null
        image?: { __typename?: 'TokenContentMedia'; url?: string | null } | null
      }
    }>
    pageInfo: {
      __typename?: 'PageInfo'
      limit: number
      hasNextPage: boolean
      endCursor?: string | null
    }
  }
}

export type MyDaosPageQueryVariables = Exact<{
  address?: InputMaybe<Array<Scalars['String']> | Scalars['String']>
  chain: Chain
}>

export type MyDaosPageQuery = {
  __typename?: 'RootQuery'
  nouns: {
    __typename?: 'Nouns'
    nounsDaos: {
      __typename?: 'NounsDaoConnection'
      nodes: Array<{ __typename?: 'NounsDao'; collectionAddress: string }>
      pageInfo: {
        __typename?: 'PageInfo'
        limit: number
        hasNextPage: boolean
        endCursor?: string | null
      }
    }
  }
}

export type NftCountQueryVariables = Exact<{
  collectionAddress?: InputMaybe<Array<Scalars['String']> | Scalars['String']>
  ownerAddress?: InputMaybe<Array<Scalars['String']> | Scalars['String']>
  chain: Chain
}>

export type NftCountQuery = {
  __typename?: 'RootQuery'
  aggregateStat: { __typename?: 'AggregateStat'; nftCount: number }
}

export type ProposalQueryVariables = Exact<{
  proposalId: Scalars['String']
  chain: Chain
}>

export type ProposalQuery = {
  __typename?: 'RootQuery'
  nouns: {
    __typename?: 'Nouns'
    nounsProposal?: {
      __typename: 'NounsProposal'
      abstainVotes: number
      againstVotes: number
      auction: string
      calldatas: Array<string>
      collectionAddress: string
      description: string
      descriptionHash: string
      executableFrom?: number | null
      expiresAt?: number | null
      forVotes: number
      governor: string
      manager: string
      metadata: string
      proposalId: string
      proposalNumber: number
      proposalThreshold: number
      proposer: string
      quorumVotes: number
      status: NounsProposalStatus
      targets: Array<string>
      timeCreated: number
      title: string
      treasury: string
      values: Array<string>
      voteEnd: number
      voteStart: number
      transactionInfo: {
        __typename?: 'TransactionInfo'
        blockNumber: number
        transactionHash?: string | null
      }
      votes: Array<{
        __typename?: 'NounsProposalVote'
        voter: string
        support: Support
        weight: number
        reason: string
      }>
    } | null
  }
}

export type ProposalsQueryVariables = Exact<{
  token?: InputMaybe<Array<Scalars['String']> | Scalars['String']>
  chain: Chain
  pagination: PaginationInput
}>

export type ProposalsQuery = {
  __typename?: 'RootQuery'
  nouns: {
    __typename?: 'Nouns'
    nounsProposals: {
      __typename?: 'NounsProposalConnection'
      nodes: Array<{
        __typename: 'NounsProposal'
        abstainVotes: number
        againstVotes: number
        auction: string
        calldatas: Array<string>
        collectionAddress: string
        description: string
        descriptionHash: string
        executableFrom?: number | null
        expiresAt?: number | null
        forVotes: number
        governor: string
        manager: string
        metadata: string
        proposalId: string
        proposalNumber: number
        proposalThreshold: number
        proposer: string
        quorumVotes: number
        status: NounsProposalStatus
        targets: Array<string>
        timeCreated: number
        title: string
        treasury: string
        values: Array<string>
        voteEnd: number
        voteStart: number
        transactionInfo: {
          __typename?: 'TransactionInfo'
          blockNumber: number
          transactionHash?: string | null
        }
      }>
      pageInfo: {
        __typename?: 'PageInfo'
        limit: number
        hasNextPage: boolean
        endCursor?: string | null
      }
    }
  }
}

export type ProposalsWithCalldataQueryVariables = Exact<{
  token?: InputMaybe<Array<Scalars['String']> | Scalars['String']>
  chain: Chain
}>

export type ProposalsWithCalldataQuery = {
  __typename?: 'RootQuery'
  nouns: {
    __typename?: 'Nouns'
    nounsProposals: {
      __typename?: 'NounsProposalConnection'
      nodes: Array<{
        __typename?: 'NounsProposal'
        proposalId: string
        proposalNumber: number
        status: NounsProposalStatus
        calldatas: Array<string>
        targets: Array<string>
        values: Array<string>
      }>
    }
  }
}

export type SalesVolumeQueryVariables = Exact<{
  chain: Chain
  collectionAddress?: InputMaybe<Array<Scalars['String']> | Scalars['String']>
}>

export type SalesVolumeQuery = {
  __typename?: 'RootQuery'
  aggregateStat: {
    __typename?: 'AggregateStat'
    salesVolume: {
      __typename?: 'SalesVolume'
      chainTokenPrice: number
      usdcPrice: number
      totalCount: number
    }
  }
}

export type TokenQueryVariables = Exact<{
  address: Scalars['String']
  tokenId: Scalars['String']
  chain: Chain
}>

export type TokenQuery = {
  __typename?: 'RootQuery'
  token?: {
    __typename?: 'TokenWithFullMarketHistory'
    token: {
      __typename?: 'Token'
      tokenId: string
      name?: string | null
      description?: string | null
      owner?: string | null
      image?: {
        __typename?: 'TokenContentMedia'
        url?: string | null
        mediaEncoding?:
          | { __typename: 'AudioEncodingTypes' }
          | {
              __typename: 'ImageEncodingTypes'
              original: string
              thumbnail?: string | null
            }
          | { __typename: 'UnsupportedEncodingTypes' }
          | { __typename: 'VideoEncodingTypes' }
          | null
      } | null
      mintInfo?: {
        __typename?: 'MintInfo'
        mintContext: { __typename?: 'TransactionInfo'; blockTimestamp: any }
      } | null
    }
  } | null
}

export type TokenOwnersQueryVariables = Exact<{
  token?: InputMaybe<Array<Scalars['String']> | Scalars['String']>
  chain: Chain
}>

export type TokenOwnersQuery = {
  __typename?: 'RootQuery'
  aggregateStat: {
    __typename?: 'AggregateStat'
    ownersByCount: {
      __typename?: 'OwnerCountConnection'
      nodes: Array<{ __typename?: 'OwnerCount'; owner: string; count: number }>
    }
  }
}

export type TokenWinnerQueryVariables = Exact<{
  address: Scalars['String']
  tokenId: Scalars['String']
  chain: Chain
}>

export type TokenWinnerQuery = {
  __typename?: 'RootQuery'
  nouns: {
    __typename?: 'Nouns'
    nounsMarkets: {
      __typename?: 'NounsBuilderAuctionConnection'
      nodes: Array<{
        __typename?: 'NounsBuilderAuction'
        highestBidder?: string | null
        highestBidPrice?: {
          __typename?: 'PriceAtTime'
          chainTokenPrice?: { __typename?: 'CurrencyAmount'; decimal: number } | null
        } | null
      }>
    }
  }
}

export type TokensQueryVariables = Exact<{
  chain: Chain
  pagination?: InputMaybe<PaginationInput>
  filter?: InputMaybe<TokensQueryFilter>
  where?: InputMaybe<TokensQueryInput>
  sort?: InputMaybe<TokenSortInput>
}>

export type TokensQuery = {
  __typename?: 'RootQuery'
  tokens: {
    __typename?: 'TokenWithMarketsSummaryConnection'
    nodes: Array<{
      __typename?: 'TokenWithMarketsSummary'
      token: {
        __typename?: 'Token'
        name?: string | null
        image?: {
          __typename?: 'TokenContentMedia'
          url?: string | null
          mediaEncoding?:
            | { __typename: 'AudioEncodingTypes' }
            | {
                __typename: 'ImageEncodingTypes'
                original: string
                thumbnail?: string | null
              }
            | { __typename: 'UnsupportedEncodingTypes' }
            | { __typename: 'VideoEncodingTypes' }
            | null
        } | null
      }
    }>
  }
}

export const AuctionFragmentDoc = gql`
  fragment Auction on NounsBuilderAuction {
    auction
    collectionAddress
  }
`
export const DaoFragmentDoc = gql`
  fragment Dao on NounsDao {
    name
    collectionAddress
    auctionAddress
  }
`
export const ProposalFragmentDoc = gql`
  fragment Proposal on NounsProposal {
    __typename
    abstainVotes
    againstVotes
    auction
    calldatas
    collectionAddress
    description
    descriptionHash
    executableFrom
    expiresAt
    forVotes
    governor
    manager
    metadata
    proposalId
    proposalNumber
    proposalThreshold
    proposer
    quorumVotes
    status
    targets
    timeCreated
    title
    treasury
    values
    voteEnd
    voteStart
  }
`
export const ProposalVoteFragmentDoc = gql`
  fragment ProposalVote on NounsProposalVote {
    voter
    support
    weight
    reason
  }
`
export const ImageMediaEncodingFragmentDoc = gql`
  fragment ImageMediaEncoding on ImageEncodingTypes {
    original
    thumbnail
  }
`
export const TokenFragmentDoc = gql`
  fragment Token on Token {
    tokenId
    name
    description
    image {
      url
      mediaEncoding {
        __typename
        ...ImageMediaEncoding
      }
    }
    owner
    mintInfo {
      mintContext {
        blockTimestamp
      }
    }
  }
  ${ImageMediaEncodingFragmentDoc}
`
export const VoteFragmentDoc = gql`
  fragment Vote on NounsBuilderGovernorVoteCastEventProperties {
    proposalId
    voter
    reason
    support
    weight
  }
`
export const ActiveAuctionsDocument = gql`
  query activeAuctions($chain: Chain!) {
    nouns {
      nounsMarkets(
        networks: { network: ETHEREUM, chain: $chain }
        pagination: { limit: 10 }
        sort: { sortKey: CHAIN_TOKEN_PRICE, sortDirection: DESC }
        filter: { nounsMarketType: NOUNS_BUILDER_AUCTION, status: ACTIVE }
      ) {
        nodes {
          ...Auction
        }
      }
    }
  }
  ${AuctionFragmentDoc}
`
export const DaoInfoDocument = gql`
  query daoInfo($chain: Chain!, $collectionAddress: [String!]) {
    aggregateStat {
      ownerCount(
        where: { collectionAddresses: $collectionAddress }
        networks: { network: ETHEREUM, chain: $chain }
      )
    }
    nouns {
      nounsDaos(
        where: { collectionAddresses: $collectionAddress }
        pagination: { limit: 1 }
        networks: { network: ETHEREUM, chain: $chain }
      ) {
        nodes {
          totalSupply
        }
      }
    }
  }
`
export const DaosDocument = gql`
  query daos($where: NounsQueryInput, $chain: Chain!, $pagination: PaginationInput) {
    nouns {
      nounsDaos(
        networks: { chain: $chain, network: ETHEREUM }
        where: $where
        pagination: $pagination
      ) {
        nodes {
          ...Dao
        }
      }
    }
  }
  ${DaoFragmentDoc}
`
export const ExploreDaosPageDocument = gql`
  query exploreDaosPage(
    $chain: Chain!
    $after: String
    $sortKey: MarketSortKey!
    $collectionAddresses: [String!]
  ) {
    nouns {
      nounsMarkets(
        networks: { network: ETHEREUM, chain: $chain }
        filter: { nounsMarketType: NOUNS_BUILDER_AUCTION, status: ACTIVE }
        sort: { sortDirection: DESC, sortKey: $sortKey }
        where: { collectionAddresses: $collectionAddresses }
        pagination: { limit: 30, after: $after }
      ) {
        nodes {
          collectionAddress
          tokenId
          endTime
          highestBidder
          highestBidPrice {
            chainTokenPrice {
              decimal
            }
          }
        }
        pageInfo {
          limit
          hasNextPage
          endCursor
        }
      }
    }
  }
`
export const ExploreTokensDocument = gql`
  query exploreTokens($chain: Chain!, $tokens: [TokenInput!]) {
    tokens(
      networks: { network: ETHEREUM, chain: $chain }
      where: { tokens: $tokens }
      pagination: { limit: 30 }
    ) {
      nodes {
        token {
          collectionAddress
          collectionName
          name
          image {
            url
          }
        }
      }
      pageInfo {
        limit
        hasNextPage
        endCursor
      }
    }
  }
`
export const MyDaosPageDocument = gql`
  query myDaosPage($address: [String!], $chain: Chain!) {
    nouns {
      nounsDaos(
        networks: { chain: $chain, network: ETHEREUM }
        where: { memberAddresses: $address }
        pagination: { limit: 30 }
      ) {
        nodes {
          collectionAddress
        }
        pageInfo {
          limit
          hasNextPage
          endCursor
        }
      }
    }
  }
`
export const NftCountDocument = gql`
  query nftCount(
    $collectionAddress: [String!]
    $ownerAddress: [String!]
    $chain: Chain!
  ) {
    aggregateStat {
      nftCount(
        where: { collectionAddresses: $collectionAddress, ownerAddresses: $ownerAddress }
        networks: { network: ETHEREUM, chain: $chain }
      )
    }
  }
`
export const ProposalDocument = gql`
  query proposal($proposalId: String!, $chain: Chain!) {
    nouns {
      nounsProposal(
        where: { proposalId: $proposalId }
        network: { chain: $chain, network: ETHEREUM }
      ) {
        ...Proposal
        transactionInfo {
          blockNumber
          transactionHash
        }
        votes {
          ...ProposalVote
        }
      }
    }
  }
  ${ProposalFragmentDoc}
  ${ProposalVoteFragmentDoc}
`
export const ProposalsDocument = gql`
  query proposals($token: [String!], $chain: Chain!, $pagination: PaginationInput!) {
    nouns {
      nounsProposals(
        networks: [{ chain: $chain, network: ETHEREUM }]
        sort: { sortKey: CREATED, sortDirection: DESC }
        where: { collectionAddresses: $token }
        pagination: $pagination
      ) {
        nodes {
          ...Proposal
          transactionInfo {
            blockNumber
            transactionHash
          }
        }
        pageInfo {
          limit
          hasNextPage
          endCursor
        }
      }
    }
  }
  ${ProposalFragmentDoc}
`
export const ProposalsWithCalldataDocument = gql`
  query proposalsWithCalldata($token: [String!], $chain: Chain!) {
    nouns {
      nounsProposals(
        networks: { network: ETHEREUM, chain: $chain }
        sort: { sortKey: CREATED, sortDirection: DESC }
        pagination: { limit: 100 }
        where: { collectionAddresses: $token }
      ) {
        nodes {
          proposalId
          proposalNumber
          status
          calldatas
          targets
          values
        }
      }
    }
  }
`
export const SalesVolumeDocument = gql`
  query salesVolume($chain: Chain!, $collectionAddress: [String!]) {
    aggregateStat {
      salesVolume(
        where: { collectionAddresses: $collectionAddress }
        networks: { network: ETHEREUM, chain: $chain }
      ) {
        chainTokenPrice
        usdcPrice
        totalCount
      }
    }
  }
`
export const TokenDocument = gql`
  query token($address: String!, $tokenId: String!, $chain: Chain!) {
    token(
      network: { chain: $chain, network: ETHEREUM }
      token: { address: $address, tokenId: $tokenId }
    ) {
      token {
        ...Token
      }
    }
  }
  ${TokenFragmentDoc}
`
export const TokenOwnersDocument = gql`
  query tokenOwners($token: [String!], $chain: Chain!) {
    aggregateStat {
      ownersByCount(
        where: { collectionAddresses: $token }
        networks: { chain: $chain, network: ETHEREUM }
        pagination: { limit: 50 }
      ) {
        nodes {
          owner
          count
        }
      }
    }
  }
`
export const TokenWinnerDocument = gql`
  query tokenWinner($address: String!, $tokenId: String!, $chain: Chain!) {
    nouns {
      nounsMarkets(
        networks: { network: ETHEREUM, chain: $chain }
        where: { tokens: { address: $address, tokenId: $tokenId } }
        pagination: { limit: 1 }
        filter: { nounsMarketType: NOUNS_BUILDER_AUCTION }
      ) {
        nodes {
          highestBidPrice {
            chainTokenPrice {
              decimal
            }
          }
          highestBidder
        }
      }
    }
  }
`
export const TokensDocument = gql`
  query tokens(
    $chain: Chain!
    $pagination: PaginationInput = null
    $filter: TokensQueryFilter = null
    $where: TokensQueryInput = null
    $sort: TokenSortInput = null
  ) {
    tokens(
      pagination: $pagination
      networks: { network: ETHEREUM, chain: $chain }
      filter: $filter
      where: $where
      sort: $sort
    ) {
      nodes {
        token {
          name
          image {
            url
            mediaEncoding {
              __typename
              ... on ImageEncodingTypes {
                original
                thumbnail
              }
            }
          }
        }
      }
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
    daos(
      variables: DaosQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DaosQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DaosQuery>(DaosDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'daos',
        'query'
      )
    },
    exploreDaosPage(
      variables: ExploreDaosPageQueryVariables,
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
    exploreTokens(
      variables: ExploreTokensQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<ExploreTokensQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ExploreTokensQuery>(ExploreTokensDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'exploreTokens',
        'query'
      )
    },
    myDaosPage(
      variables: MyDaosPageQueryVariables,
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
    nftCount(
      variables: NftCountQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<NftCountQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<NftCountQuery>(NftCountDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'nftCount',
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
    proposalsWithCalldata(
      variables: ProposalsWithCalldataQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<ProposalsWithCalldataQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ProposalsWithCalldataQuery>(
            ProposalsWithCalldataDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'proposalsWithCalldata',
        'query'
      )
    },
    salesVolume(
      variables: SalesVolumeQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<SalesVolumeQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SalesVolumeQuery>(SalesVolumeDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'salesVolume',
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
    tokenOwners(
      variables: TokenOwnersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<TokenOwnersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TokenOwnersQuery>(TokenOwnersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'tokenOwners',
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
      variables: TokensQueryVariables,
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
  }
}
export type Sdk = ReturnType<typeof getSdk>
