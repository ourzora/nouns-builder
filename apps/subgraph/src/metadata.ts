import { DAO } from '../generated/schema'
import {
  AddPropertiesCall as AddPropertiesFunctionCall,
  ContractImageUpdated as ContractImageUpdatedEvent,
  DescriptionUpdated as DescriptionUpdatedEvent,
  WebsiteURIUpdated as URIUpdatedEvent,
} from '../generated/templates/MetadataRenderer/MetadataRenderer'
import { Bytes, dataSource } from '@graphprotocol/graph-ts'

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

export function handleAddProperties(event: AddPropertiesFunctionCall): void {
  let context = dataSource.context()
  let dao = DAO.load(context.getString('tokenAddress'))!
  let thisHash = event.transaction.hash
  let pastHashes = dao.metadataUpdateHashes

  let newHashes: Bytes[] = []
  if (pastHashes == null) {
    // initialize array if it doesn't exist
    newHashes = [thisHash]
  } else {
    // copy past transaction hashes
    newHashes = pastHashes
    newHashes.push(thisHash)
  }
  dao.metadataUpdateHashes = newHashes
  dao.save()
}
