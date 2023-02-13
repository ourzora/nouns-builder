import { BigNumber, BigNumberish, BytesLike, ContractTransaction, ethers } from 'ethers'
import React from 'react'
import { Treasury, Treasury__factory } from 'src/constants/typechain'
import { useLayoutStore } from 'src/stores'
import { useDaoStore } from 'src/stores/useDaoStore'
import useSWR from 'swr'
import SWR_KEYS from 'src/constants/swrKeys'

interface TreasuryResponseProps {
  contract: Treasury | undefined
  isQueued: (_proposalId: BytesLike) => Promise<boolean | undefined>
  isReadyToExecute: (_proposalId: BytesLike) => Promise<boolean | undefined>
  isExpired: (_proposalId: BytesLike) => Promise<boolean | undefined>
  cancel: (_proposalId: BytesLike) => void
  updateDelay: (threshold: BigNumberish) => Promise<ContractTransaction | undefined>
  timestamp: (proposalId: BytesLike) => Promise<BigNumber | undefined>
  owner: string | undefined
}

const useTreasuryContract = () => {
  const { signer, provider } = useLayoutStore()
  const { addresses } = useDaoStore()
  const contract =
    provider && Treasury__factory.connect(addresses?.treasury || '', signer ?? provider)

  // owner
  const { data: owner } = useSWR(
    contract ? SWR_KEYS.DYNAMIC.TREASURY_OWNER(addresses?.treasury as string) : null,
    () => {
      return contract?.owner()
    },
    { revalidateOnFocus: false }
  )

  const isQueued = React.useCallback(
    async function isQueued(_proposalId: BytesLike) {
      if (!contract) return

      return contract.isQueued(_proposalId)
    },
    [contract]
  )

  const isReadyToExecute = React.useCallback(
    async function isReadyToExecute(_proposalId: BytesLike) {
      if (!contract) return

      return contract.isReady(_proposalId)
    },
    [contract]
  )

  const isExpired = React.useCallback(
    async function isExpired(_proposalId: BytesLike) {
      if (!contract) return

      return contract.isExpired(_proposalId)
    },
    [contract]
  )

  const timestamp = React.useCallback(
    async function timestamp(_proposalId: BytesLike) {
      if (!contract) return

      return contract.timestamp(_proposalId)
    },
    [contract]
  )

  const cancel = React.useCallback(
    async function cancel(_proposalId: BytesLike) {
      if (!contract) return

      return contract.cancel(_proposalId)
    },
    [contract]
  )

  const updateDelay = React.useCallback(
    async function updateDelayBps(_threshold: BigNumberish) {
      if (!contract) return

      return contract.updateDelay(_threshold)
    },
    [contract]
  )

  const response: TreasuryResponseProps = {
    contract,
    isQueued,
    isReadyToExecute,
    isExpired,
    cancel,
    updateDelay,
    timestamp,
    owner,
  }

  return { ...response }
}

export default useTreasuryContract
