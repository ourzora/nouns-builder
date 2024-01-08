import { encodeFunctionData } from 'viem'

import { metadataAbi } from 'src/data/contract/abis'
import { AddressType, CHAIN_ID } from 'src/typings'

import { SDK } from '../client'

const allowedChains = [CHAIN_ID.ETHEREUM, CHAIN_ID.GOERLI]

export const encodedDaoMetadataRequest = async (
  chain: CHAIN_ID,
  tokenAddress: AddressType
) => {
  if (!allowedChains.find((x) => x === chain)) throw new Error('Chain not supported')

  const res = await SDK.connect(chain)
    .daoMetadata({ tokenAddress, first: 1000 })
    .then((x) => x.dao?.metadataProperties)

  if (!res) throw new Error('No metadata found')

  return res.map((property) =>
    encodeFunctionData({
      abi: metadataAbi,
      functionName: 'addProperties',
      args: [
        property.names,
        property.items,
        { baseUri: property.ipfsBaseUri, extension: property.ipfsExtension },
      ],
    })
  )
}
