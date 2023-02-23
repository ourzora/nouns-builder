import React from 'react'
import { useContract, useSigner } from 'wagmi'
import { BigNumber } from 'ethers'
import { useDaoStore } from 'src/stores/useDaoStore'
import { governorAbi } from 'src/data/contract/abis'
import { AddressType, BytesType } from 'src/typings'

export function useProposalTransactions() {
  const { addresses } = useDaoStore()

  const governorContract = {
    address: addresses?.governor,
    abi: governorAbi,
  }

  const { data: signer } = useSigner()

  const contract = useContract({
    ...governorContract,
    signerOrProvider: signer,
  })

  const updateProposalThreshold = React.useCallback(
    async (_threshold: number) => {
      if (!contract) {
        return
      }

      return contract.updateProposalThresholdBps(BigNumber.from(_threshold))
    },
    [contract]
  )

  const updateVotingPeriod = React.useCallback(
    async (_newVotingPeriod: number) => {
      if (!contract) {
        return
      }

      return contract.updateVotingPeriod(BigNumber.from(_newVotingPeriod))
    },
    [contract]
  )

  const updateVotingDelay = React.useCallback(
    async (_newVotingDelay: number) => {
      if (!contract) {
        return
      }

      return contract.updateVotingDelay(BigNumber.from(_newVotingDelay))
    },
    [contract]
  )

  const burnVetoer = React.useCallback(async () => {
    if (!contract) {
      return
    }

    return contract.burnVetoer()
  }, [contract])

  const updateVetoer = React.useCallback(
    async (_vetoer: AddressType) => {
      if (!contract) {
        return
      }

      return contract.updateVetoer(_vetoer)
    },
    [contract]
  )

  const castVoteWithReason = React.useCallback(
    async (_proposalId: BytesType, support: number, reason: string) => {
      if (!contract) {
        return
      }

      return await contract.castVoteWithReason(
        _proposalId,
        BigNumber.from(support),
        reason
      )
    },
    [contract]
  )

  const cancel = React.useCallback(
    async (_proposalId: BytesType) => {
      if (!contract) {
        return
      }

      return await contract.cancel(_proposalId)
    },
    [contract]
  )

  const castVote = React.useCallback(
    async (_proposalId: BytesType, _support: number) => {
      if (!contract) {
        return
      }

      return await contract.castVote(_proposalId, BigNumber.from(_support))
    },
    [contract]
  )

  const veto = React.useCallback(
    async (_proposalId: BytesType) => {
      if (!contract) {
        return
      }

      return await contract.veto(_proposalId)
    },
    [contract]
  )

  const execute = React.useCallback(
    async (
      targets: AddressType[],
      values: BigNumber[],
      calldatas: BytesType[],
      description: BytesType,
      proposer: AddressType
    ) => {
      if (!contract) {
        return
      }

      return await contract.execute(targets, values, calldatas, description, proposer)
    },
    [contract]
  )

  const updateQuorumThresholdBps = React.useCallback(
    async function updateQuorumVotesBps(_quorumVotesBps: number) {
      if (!contract) {
        return
      }

      return contract.updateQuorumThresholdBps(BigNumber.from(_quorumVotesBps))
    },
    [contract]
  )

  const propose = React.useCallback(
    async (
      targets: AddressType[],
      values: any[],
      calldatas: any[],
      description: string
    ) => {
      if (!contract) {
        return
      }

      return await contract.propose(targets, values, calldatas, description)
    },
    [contract]
  )

  return {
    updateProposalThreshold,
    updateVotingPeriod,
    updateVotingDelay,
    burnVetoer,
    updateVetoer,
    castVoteWithReason,
    cancel,
    castVote,
    veto,
    execute,
    updateQuorumThresholdBps,
    propose,
  }
}
