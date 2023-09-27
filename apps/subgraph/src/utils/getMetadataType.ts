import { Manager as ManagerContract } from '../../generated/Manager/Manager'
import { BASE_METADATA_INTERFACE_ID, PROPERTY_METADATA_INTERFACE_ID } from './constants'
import { Address } from '@graphprotocol/graph-ts'

export enum MetadataType {
  Base = 0,
  Property = 1,
  Unknown = 2,
}

export const getMetadataType = (
  manager: ManagerContract,
  metadata: Address
): MetadataType => {
  if (manager.supportsInterface(metadata, BASE_METADATA_INTERFACE_ID))
    return MetadataType.Base

  if (manager.supportsInterface(metadata, PROPERTY_METADATA_INTERFACE_ID))
    return MetadataType.Property

  return MetadataType.Unknown
}
