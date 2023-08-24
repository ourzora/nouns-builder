import { ethers } from 'ethers'
import useSWRImmutable from 'swr/immutable'

import { RPC_URL } from 'src/constants/rpc'
import { AddressType, CHAIN_ID } from 'src/typings'

export const useIsContract = ({
  address,
  chainId = CHAIN_ID.ETHEREUM,
}: {
  address?: AddressType
  chainId?: CHAIN_ID
}) => {
  return useSWRImmutable(address ? [address, chainId] : undefined, async (address) => {
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL[chainId])
    return await provider.getCode(address).then((x) => x !== '0x')
  })
}
