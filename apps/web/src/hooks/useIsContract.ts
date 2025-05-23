import useSWRImmutable from 'swr/immutable'

import { AddressType, CHAIN_ID } from 'src/typings'
import { getProvider } from 'src/utils/provider'

export const useIsContract = ({
  address,
  chainId = CHAIN_ID.ETHEREUM,
}: {
  address?: AddressType
  chainId?: CHAIN_ID
}) => {
  return useSWRImmutable(
    address ? [address, chainId] : null,
    async ([address, chainId]) => {
      const provider = getProvider(chainId)
      return await provider.getCode({ address }).then((x) => x !== '0x')
    }
  )
}
