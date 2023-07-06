import { readContract } from '@wagmi/core'
import { ethers } from 'ethers'

import { PUBLIC_MANAGER_ADDRESS } from 'src/constants/addresses'
import { AddressType, CHAIN_ID } from 'src/typings'

import { managerAbi } from '../abis'

const getDAOAddresses = async (chainId: CHAIN_ID, tokenAddress: AddressType) => {
  const addresses = await readContract({
    abi: managerAbi,
    address: PUBLIC_MANAGER_ADDRESS[chainId],
    functionName: 'getAddresses',
    args: [tokenAddress],
    chainId,
  })

  const hasMissingAddresses = Object.values(addresses).includes(
    ethers.constants.AddressZero
  )
  if (hasMissingAddresses) return null

  return {
    token: tokenAddress,
    auction: addresses.auction,
    governor: addresses.governor,
    metadata: addresses.metadata,
    treasury: addresses.treasury,
  }
}

export default getDAOAddresses
