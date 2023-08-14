import { omit } from 'lodash'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import { useChainStore } from 'src/stores/useChainStore'

import { useIsContract } from './useIsContract'

export const useBridgeModal = () => {
  const router = useRouter()
  const { chain: selectedChain } = useChainStore()

  const { address } = useAccount()
  const { data: isContractWallet } = useIsContract({ address })
  const isL1Selected = selectedChain.id === PUBLIC_DEFAULT_CHAINS[0].id

  const openBridgeModal = () => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          bridge: true,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  const closeBridgeModal = () => {
    router.push(
      {
        pathname: router.pathname,
        query: omit(router.query, 'bridge'),
      },
      undefined,
      { shallow: true }
    )
  }

  return {
    canUserBridge: !isContractWallet && !isL1Selected,
    openBridgeModal,
    closeBridgeModal,
  }
}
