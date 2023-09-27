import { BaseMetadata as BaseMetadataContract } from '../../generated/templates/Token/BaseMetadata'
import { PropertyMetadata as PropertyMetadataContract } from '../../generated/templates/Token/PropertyMetadata'
import { Token as TokenContract } from '../../generated/templates/Token/Token'
import { MetadataType } from './getMetadataType'
import { Address, BigInt } from '@graphprotocol/graph-ts'

export class TokenDataResult {
  name: string
  image: string
  content: string

  constructor(name: string, image: string, content: string) {
    this.name = name
    this.image = image
    this.content = content
  }
}

export const getTokenData = (
  token: TokenContract,
  metadataType: MetadataType,
  metadataAddress: Address,
  tokenId: BigInt
): TokenDataResult | null => {
  if (metadataType === MetadataType.Base) {
    let metadataContract = BaseMetadataContract.bind(metadataAddress)
    let dataReq = metadataContract.tokenData(tokenId)

    return new TokenDataResult(dataReq.value0, dataReq.value1, dataReq.value2)
  }

  if (metadataType === MetadataType.Property) {
    let metadataContract = PropertyMetadataContract.bind(metadataAddress)
    let attributes = metadataContract.getAttributes(tokenId)

    return new TokenDataResult(
      `${token.name()} #${tokenId}`,
      `${metadataContract.rendererBase()}${attributes.value1}`,
      ''
    )
  }

  return null
}
