import { DAODeployed as DAODeployedEvent } from '../generated/Manager/Manager'
import { AuctionConfig, DAO } from '../generated/schema'
import {
  Auction as AuctionTemplate,
  Governor as GovernorTemplate,
  MetadataRenderer as MetadataRendererTemplate,
  Token as TokenTemplate,
} from '../generated/templates'
import { Auction as AuctionContract } from '../generated/templates/Auction/Auction'
import { MetadataRenderer as MetadataContract } from '../generated/templates/MetadataRenderer/MetadataRenderer'
import { Token as TokenContract } from '../generated/templates/Token/Token'
import { BigInt, DataSourceContext } from '@graphprotocol/graph-ts'

export function handleDAODeployed(event: DAODeployedEvent): void {
  let tokenContract = TokenContract.bind(event.params.token)
  let metadataContract = MetadataContract.bind(event.params.metadata)
  let auctionContract = AuctionContract.bind(event.params.auction)

  let auctionConfig = new AuctionConfig(event.params.token.toHexString())

  auctionConfig.duration = auctionContract.duration()
  auctionConfig.reservePrice = auctionContract.reservePrice()
  auctionConfig.timeBuffer = auctionContract.timeBuffer()
  auctionConfig.minimumBidIncrement = auctionContract.minBidIncrement()

  let rewards = auctionContract.founderReward()
  auctionConfig.founderRewardBPS = rewards.getPercentBps()
  auctionConfig.founderRewardRecipient = rewards.getRecipient()

  auctionConfig.save()

  let dao = new DAO(event.params.token.toHexString())

  // Metadata contract is not guaranteed to have these functions with custom renderers
  let descRes = metadataContract.try_description()
  if (!descRes.reverted) dao.description = descRes.value

  let contractImgRes = metadataContract.try_contractImage()
  if (!contractImgRes.reverted) dao.contractImage = contractImgRes.value

  let projectURIRes = metadataContract.try_projectURI()
  if (!projectURIRes.reverted) dao.projectURI = projectURIRes.value

  dao.tokenAddress = event.params.token
  dao.metadataAddress = event.params.metadata
  dao.auctionAddress = event.params.auction
  dao.treasuryAddress = event.params.treasury
  dao.governorAddress = event.params.governor
  dao.name = tokenContract.name()
  dao.symbol = tokenContract.symbol()
  dao.totalSupply = 0
  dao.proposalCount = 0
  dao.ownerCount = 0
  dao.totalAuctionSales = BigInt.fromI32(0)
  dao.auctionConfig = auctionConfig.id

  dao.save()

  let tokenCtx = new DataSourceContext()
  tokenCtx.setString('metadataAddress', event.params.metadata.toHexString())
  TokenTemplate.createWithContext(event.params.token, tokenCtx)

  let govCtx = new DataSourceContext()
  govCtx.setString('tokenAddress', event.params.token.toHexString())
  govCtx.setString('treasuryAddress', event.params.treasury.toHexString())
  GovernorTemplate.createWithContext(event.params.governor, govCtx)

  let ctx = new DataSourceContext()
  ctx.setString('tokenAddress', event.params.token.toHexString())

  MetadataRendererTemplate.createWithContext(event.params.metadata, ctx)
  AuctionTemplate.createWithContext(event.params.auction, ctx)
}
