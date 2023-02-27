import { BigNumber } from 'ethers'
import React from 'react'
import { governorAbi } from 'src/data/contract/abis'
import { useDaoStore } from 'src/stores/useDaoStore'
import { AddressType, BytesType } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'
import { useContract, useContractReads, useSigner } from 'wagmi'

import { useProposalTransactions } from './useProposalTransactions'

export const useGovernorContract = () => {
  const { addresses } = useDaoStore()

  const governorContract = {
    address: addresses?.governor as AddressType,
    abi: governorAbi,
  }

  const {
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
  } = useProposalTransactions()

  const { data } = useContractReads({
    contracts: [
      {
        ...governorContract,
        functionName: 'quorumThresholdBps',
      },
      {
        ...governorContract,
        functionName: 'proposalThresholdBps',
      },
      {
        ...governorContract,
        functionName: 'votingDelay',
      },
      {
        ...governorContract,
        functionName: 'vetoer',
      },
      {
        ...governorContract,
        functionName: 'votingPeriod',
      },
      {
        ...governorContract,
        functionName: 'owner',
      },
      {
        ...governorContract,
        functionName: 'proposalThreshold',
      },
    ],
  })

  const [
    quorumThresholdBps,
    proposalThresholdBps,
    votingDelay,
    vetoer,
    votingPeriod,
    owner,
    proposalThreshold,
  ] = unpackOptionalArray(data, 7)

  // made useProposal which takes _proposalId as arg
  // should be migrated to where applicable, but
  // leaving this here for now to not break anything
  const { data: signer } = useSigner()
  const contract = useContract({ ...governorContract, signerOrProvider: signer })

  const state = React.useCallback(
    async (proposalId: BytesType) => {
      if (!contract) return

      return await contract.state(proposalId)
    },
    [contract]
  )

  const queue = React.useCallback(
    async (proposalId: BytesType) => {
      if (!contract) return

      return await contract.queue(proposalId)
    },
    [contract]
  )

  const proposalSnapshot = React.useCallback(
    async (_proposalId: BytesType) => {
      if (!contract) return

      return await contract.proposalSnapshot(_proposalId)
    },
    [contract]
  )

  const proposalDeadline = React.useCallback(
    async (_proposalId: BytesType) => {
      if (!contract) return

      return contract.proposalDeadline(_proposalId)
    },
    [contract]
  )

  const proposalEta = React.useCallback(
    async (_proposalId: BytesType) => {
      if (!contract) return

      return contract.proposalEta(_proposalId)
    },
    [contract]
  )

  const proposalVotes = React.useCallback(
    async (_proposalId: BytesType) => {
      if (!contract) return

      return await contract.proposalVotes(_proposalId)
    },
    [contract]
  )

  return {
    proposalThreshold: proposalThreshold || BigNumber.from('0'),
    owner: owner || '',
    vetoer: vetoer || '',
    votingDelay: votingDelay || BigNumber.from('0'),
    votingPeriod: votingPeriod || BigNumber.from('0'),
    updateQuorumVotesBps: updateQuorumThresholdBps,
    proposalThresholdBps: proposalThresholdBps || BigNumber.from('0'),
    quorumVotesBps: quorumThresholdBps || BigNumber.from('0'),
    updateProposalThreshold,
    updateVotingPeriod,
    updateVotingDelay,
    contract: contract || undefined,
    burnVetoer,
    updateVetoer,
    propose,
    state,
    castVote,
    castVoteWithReason,
    veto,
    cancel,
    queue,
    execute,
    proposalSnapshot,
    proposalDeadline,
    proposalEta,
    proposalVotes,
  }
}
