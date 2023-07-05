import { readContract, readContracts } from '@wagmi/core'
import { BigNumber } from 'ethers'

import { AddressType, CHAIN_ID } from 'src/typings'

import { metadataAbi } from '../abis'

export const getPropertyItemsCount = async (
  chainId: CHAIN_ID,
  metadataAddress: AddressType
) => {
  const baseParams = { address: metadataAddress, abi: metadataAbi, chainId: chainId }
  const propertiesCount = await readContract({
    ...baseParams,
    functionName: 'propertiesCount',
  }).then((x) => x.toNumber())

  const contracts = Array(propertiesCount)
    .fill(0)
    .map((_, i) => {
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
