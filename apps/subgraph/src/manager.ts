import { DAODeployed as DAODeployedEvent } from '../generated/Manager/Manager'
import { Manager as ManagerContract } from '../generated/Manager/Manager'
import { PartialMirrorToken as PartialMirrorTokenContract } from '../generated/Manager/PartialMirrorToken'
import { AuctionConfig, DAO } from '../generated/schema'
import {
  Auction as AuctionTemplate,
  Governor as GovernorTemplate,
  BaseMetadata as MetadataRendererTemplate,
  Token as TokenTemplate,
} from '../generated/templates'
import { Auction as AuctionContract } from '../generated/templates/Auction/Auction'
import { MetadataRenderer as MetadataContract } from '../generated/templates/MetadataRenderer/MetadataRenderer'
import { Token as TokenContract } from '../generated/templates/Token/Token'
import { MetadataType, getMetadataType } from './utils/getMetadataType'
import { TokenType, getTokenType } from './utils/getTokenType'
import { BigInt, DataSourceContext } from '@graphprotocol/graph-ts'

export function handleDAODeployed(event: DAODeployedEvent): void {
  let tokenContract = TokenContract.bind(event.params.token)
  let metadataContract = MetadataContract.bind(event.params.metadata)
  let auctionContract = AuctionContract.bind(event.params.auction)
  let managerContract = ManagerContract.bind(event.address)

  let auctionConfig = new AuctionConfig(event.params.token.toHexString())

  auctionConfig.duration = auctionContract.duration()
  auctionConfig.reservePrice = auctionContract.reservePrice()
  auctionConfig.timeBuffer = auctionContract.timeBuffer()
  auctionConfig.minimumBidIncrement = auctionContract.minBidIncrement()

  auctionConfig.save()

  let dao = new DAO(event.params.token.toHexString())

  let metadataType = getMetadataType(managerContract, event.params.metadata)

  if (metadataType !== MetadataType.Unknown) {
    dao.description = metadataContract.description()
    dao.contractImage = metadataContract.contractImage()
    dao.projectURI = metadataContract.projectURI()
  }

  let tokenType = getTokenType(managerContract, event.params.token)

  if (tokenType === TokenType.Mirror) {
    let mirrorToken = PartialMirrorTokenContract.bind(event.params.token)
    dao.tokenToMirror = mirrorToken.tokenToMirror()
  }

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
  tokenCtx.setI32('metadataType', metadataType)
  TokenTemplate.createWithContext(event.params.token, tokenCtx)

  let govCtx = new DataSourceContext()
  govCtx.setString('tokenAddress', event.params.token.toHexString())
  govCtx.setString('treasuryAddress', event.params.treasury.toHexString())
  GovernorTemplate.createWithContext(event.params.governor, govCtx)

  let ctx = new DataSourceContext()
  ctx.setString('tokenAddress', event.params.token.toHexString())

  if (metadataType !== MetadataType.Unknown)
    MetadataRendererTemplate.createWithContext(event.params.metadata, ctx)

  AuctionTemplate.createWithContext(event.params.auction, ctx)
}
