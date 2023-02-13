import React from 'react'
import { BigNumber } from 'ethers'
import { useDaoStore } from 'src/stores/useDaoStore'
import { useProposalTransactions } from 'src/hooks/useProposalTransactions'
import { useContract, useContractReads, useSigner } from 'wagmi'
import { governorAbi } from 'src/constants/abis/Governor'
import { AddressType, BytesType } from 'src/typings'

const useGovernorContract = () => {
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

  const contractReads = React.useMemo(() => {
    if (typeof data === 'undefined') {
      return {
        quorumThresholdBps: BigNumber.from('0'),
        proposalThresholdBps: BigNumber.from('0'),
        votingDelay: BigNumber.from('0'),
        votingPeriod: BigNumber.from('0'),
        owner: '',
        vetoer: '',
        proposalThreshold: BigNumber.from('0'),
      }
    }

    const [
      quorumThresholdBps,
      proposalThresholdBps,
      votingDelay,
      vetoer,
      votingPeriod,
      owner,
      proposalThreshold,
    ] = data

    return {
      quorumVotesBps: quorumThresholdBps,
      proposalThresholdBps,
      votingDelay,
      vetoer,
      votingPeriod,
      owner,
      proposalThreshold,
    }
  }, [data])

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
    proposalThreshold: contractReads.proposalThreshold,
    owner: contractReads.owner,
    vetoer: contractReads.vetoer,
    votingDelay: contractReads.votingDelay,
    votingPeriod: contractReads.votingPeriod,
    updateQuorumVotesBps: updateQuorumThresholdBps,
    proposalThresholdBps: contractReads.proposalThresholdBps,
    quorumVotesBps: contractReads.quorumVotesBps,
    updateProposalThreshold,
    updateVotingPeriod,
    updateVotingDelay,
    contract,
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

export default useGovernorContract
