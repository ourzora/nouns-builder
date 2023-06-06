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
import { DataSourceContext } from '@graphprotocol/graph-ts'

export function handleDAODeployed(event: DAODeployedEvent): void {
  let tokenContract = TokenContract.bind(event.params.token)
  let metadataContract = MetadataContract.bind(event.params.metadata)
  let auctionContract = AuctionContract.bind(event.params.auction)

  let auctionConfig = new AuctionConfig(event.params.token.toHexString())

  auctionConfig.duration = auctionContract.duration()
  auctionConfig.reservePrice = auctionContract.reservePrice()
  auctionConfig.timeBuffer = auctionContract.timeBuffer()
  auctionConfig.minimumBidIncrement = auctionContract.minBidIncrement()

  auctionConfig.save()

  let dao = new DAO(event.params.token.toHexString())

  dao.tokenAddress = event.params.token
  dao.metadataAddress = event.params.metadata
  dao.auctionAddress = event.params.auction
  dao.treasuryAddress = event.params.treasury
  dao.governorAddress = event.params.governor
  dao.name = tokenContract.name()
  dao.symbol = tokenContract.symbol()
  dao.description = metadataContract.description()
  dao.totalSupply = 0
  dao.contractImage = metadataContract.contractImage()
  dao.projectURI = metadataContract.projectURI()
  dao.proposalCount = 0
  dao.ownerCount = 0
  dao.auctionConfig = auctionConfig.id

  dao.save()

  let tokenCtx = new DataSourceContext()
  tokenCtx.setString('metadataAddress', event.params.metadata.toHexString())
  TokenTemplate.createWithContext(event.params.token, tokenCtx)

  let ctx = new DataSourceContext()
  ctx.setString('tokenAddress', event.params.token.toHexString())

  GovernorTemplate.createWithContext(event.params.governor, ctx)
  MetadataRendererTemplate.createWithContext(event.params.metadata, ctx)
  AuctionTemplate.createWithContext(event.params.auction, ctx)
}
