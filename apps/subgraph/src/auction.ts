import {
  AuctionBid as AuctionBidEvent,
  AuctionCreated as AuctionCreatedEvent,
  AuctionSettled as AuctionSettledEvent,
  DurationUpdated as DurationUpdatedEvent,
  MinBidIncrementPercentageUpdated as MinBidIncrementPercentageUpdatedEvent,
  ReservePriceUpdated as ReservePriceUpdatedEvent,
  TimeBufferUpdated as TimeBufferUpdatedEvent,
} from '../generated/Auction/Auction'
import { Auction, AuctionBid, AuctionConfig, DAO } from '../generated/schema'
import { dataSource } from '@graphprotocol/graph-ts'

export function handleAuctionCreated(event: AuctionCreatedEvent): void {
  let context = dataSource.context()

  let tokenAddress = context.getString('tokenAddress')
  let auction = new Auction(`${tokenAddress}:${event.params.tokenId.toHexString()}`)

  auction.tokenId = event.params.tokenId
  auction.dao = tokenAddress
  auction.startTime = event.params.startTime
  auction.endTime = event.params.endTime
  auction.estimatedDurationTime = auction.endTime.minus(auction.startTime)
  auction.extended = false
  auction.settled = false
  auction.bidCount = 0
  auction.save()

  let dao = DAO.load(tokenAddress)!
  dao.currentAuction = auction.id
  dao.save()
}

export function handleAuctionSettled(event: AuctionSettledEvent): void {
  let context = dataSource.context()

  let tokenAddress = context.getString('tokenAddress')
  let auction = Auction.load(`${tokenAddress}:${event.params.tokenId.toHexString()}`)!

  auction.settled = true
  auction.save()

  let dao = DAO.load(tokenAddress)!
  dao.currentAuction = null
  dao.save()
}

export function handleAuctionBid(event: AuctionBidEvent): void {
  let context = dataSource.context()

  let tokenAddress = context.getString('tokenAddress')

  let bid = new AuctionBid(
    `${event.transaction.hash.toHexString()}:${event.logIndex.toString()}`
  )

  bid.amount = event.params.amount
  bid.bidder = event.params.bidder
  bid.auction = `${tokenAddress}:${event.params.tokenId.toHexString()}`
  bid.bidTime = event.block.timestamp
  bid.save()

  let auction = Auction.load(`${tokenAddress}:${event.params.tokenId.toHexString()}`)!
  if (auction.bidCount === 0) auction.firstBidTime = event.block.timestamp
  auction.bidCount = auction.bidCount + 1
  auction.highestBid = bid.id
  auction.extended = event.params.extended
  auction.endTime = event.params.endTime
  auction.save()
}

export function handleDurationUpdated(event: DurationUpdatedEvent): void {
  let context = dataSource.context()

  let tokenAddress = context.getString('tokenAddress')
  let auctionConfig = AuctionConfig.load(tokenAddress)!

  auctionConfig.duration = event.params.duration
  auctionConfig.save()
}

export function handleReservePriceUpdated(event: ReservePriceUpdatedEvent): void {
  let context = dataSource.context()

  let tokenAddress = context.getString('tokenAddress')
  let auctionConfig = AuctionConfig.load(tokenAddress)!

  auctionConfig.reservePrice = event.params.reservePrice
  auctionConfig.save()
}

export function handleTimeBufferUpdated(event: TimeBufferUpdatedEvent): void {
  let context = dataSource.context()

  let tokenAddress = context.getString('tokenAddress')
  let auctionConfig = AuctionConfig.load(tokenAddress)!

  auctionConfig.timeBuffer = event.params.timeBuffer
  auctionConfig.save()
}

export function handleMinBidIncrementPercentageUpdated(
  event: MinBidIncrementPercentageUpdatedEvent
): void {
  let context = dataSource.context()

  let tokenAddress = context.getString('tokenAddress')
  let auctionConfig = AuctionConfig.load(tokenAddress)!

  auctionConfig.minimumBidIncrement = event.params.minBidIncrementPercentage
  auctionConfig.save()
}
