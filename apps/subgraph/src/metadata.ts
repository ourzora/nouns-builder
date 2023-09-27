import { DAO } from '../generated/schema'
import {
  ContractImageUpdated as ContractImageUpdatedEvent,
  DescriptionUpdated as DescriptionUpdatedEvent,
  WebsiteURIUpdated as URIUpdatedEvent,
} from '../generated/templates/BaseMetadata/BaseMetadata'
import { dataSource } from '@graphprotocol/graph-ts'

export function handleContractImageUpdated(event: ContractImageUpdatedEvent): void {
  let context = dataSource.context()
  let dao = DAO.load(context.getString('tokenAddress'))!
  dao.contractImage = event.params.newImage
  dao.save()
}

export function handleWebsiteURIUpdated(event: URIUpdatedEvent): void {
  let context = dataSource.context()
  let dao = DAO.load(context.getString('tokenAddress'))!
  dao.projectURI = event.params.newURI
  dao.save()
}

export function handleDescriptionUpdated(event: DescriptionUpdatedEvent): void {
  let context = dataSource.context()
  let dao = DAO.load(context.getString('tokenAddress'))!
  dao.description = event.params.newDescription
  dao.save()
}
