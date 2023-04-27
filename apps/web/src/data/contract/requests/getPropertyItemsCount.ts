import { readContract, readContracts } from '@wagmi/core'
import { BigNumber } from 'ethers'

import { AddressType } from 'src/typings'

import { metadataAbi } from '../abis'

export const getPropertyItemsCount = async (metadataAddress: AddressType) => {
  const baseParams = { address: metadataAddress, abi: metadataAbi }
  const propertiesCount = await readContract({
    ...baseParams,
    functionName: 'propertiesCount',
  }).then((x) => x.toNumber())

  const contracts = Array(propertiesCount).map((_, i) => {
    return {
      ...baseParams,
      functionName: 'itemsCount',
      args: [i],
    }
  })

  const propertyItemsCount = (await readContracts({
    contracts,
  })) as BigNumber[]

  return {
    propertiesCount,
    propertyItemsCount: propertyItemsCount.map((x) => x.toNumber()),
  }
}
