import { DAO, MetadataItem, MetadataProperty } from '../generated/schema'
import {
  AddPropertiesCall as AddPropertiesFunctionCall,
  ContractImageUpdated as ContractImageUpdatedEvent,
  DeleteAndRecreatePropertiesCall as DeleteAndRecreatePropertiesFunctionCall,
  DescriptionUpdated as DescriptionUpdatedEvent,
  WebsiteURIUpdated as URIUpdatedEvent,
} from '../generated/templates/MetadataRenderer/MetadataRenderer'
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

export function handleAddProperties(event: AddPropertiesFunctionCall): void {
  let context = dataSource.context()

  let inputs = event.inputs
  let dao = DAO.load(context.getString('tokenAddress'))!
  let id = dao.id + '-' + event.transaction.hash.toHexString()

  let property = new MetadataProperty(id)
  property.dao = dao.id
  property.names = inputs._names
  property.ipfsBaseUri = inputs._ipfsGroup.baseUri
  property.ipfsExtension = inputs._ipfsGroup.extension
  property.createdAt = event.block.timestamp
  property.deleted = false

  for (let i = 0; i < inputs._items.length; i++) {
    let input = inputs._items[i]
    let item = new MetadataItem(id + '-' + i.toString())
    item.index = i
    item.name = input.name
    item.propertyInfo = property.id
    item.propertyId = input.propertyId
    item.isNewProperty = input.isNewProperty
    item.save()
  }

  property.save()

  let properties: string[] =
    dao.metadataProperties === null ? [] : dao.metadataProperties!

  properties.push(property.id)
  dao.metadataProperties = properties
  dao.save()
}

export function handleDeleteAndRecreateProperties(
  event: DeleteAndRecreatePropertiesFunctionCall
): void {
  let context = dataSource.context()

  let inputs = event.inputs
  let dao = DAO.load(context.getString('tokenAddress'))!
  let id = dao.id + '-' + event.transaction.hash.toHexString()

  let property = new MetadataProperty(id)
  property.dao = dao.id
  property.names = inputs._names
  property.ipfsBaseUri = inputs._ipfsGroup.baseUri
  property.ipfsExtension = inputs._ipfsGroup.extension
  property.createdAt = event.block.timestamp
  property.deleted = false

  for (let i = 0; i < inputs._items.length; i++) {
    let input = inputs._items[i]
    let item = new MetadataItem(id + '-' + i.toString())
    item.index = i
    item.name = input.name
    item.propertyInfo = property.id
    item.propertyId = input.propertyId
    item.isNewProperty = input.isNewProperty
    item.save()
  }

  property.save()

  // Mark old properties as deleted
  if (dao.metadataProperties !== null) {
    let currentProperties = dao.metadataProperties!
    for (let i = 0; i < currentProperties.length; i++) {
      let property = MetadataProperty.load(currentProperties[i])!
      property.deleted = true
      property.save()
    }
  }

  let properties: string[] = []

  properties.push(property.id)
  dao.metadataProperties = properties
  dao.save()
}
