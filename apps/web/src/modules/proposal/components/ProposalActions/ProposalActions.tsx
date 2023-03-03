import { Flex } from '@zoralabs/zord'
import { BigNumber, ethers } from 'ethers'
import React, { Fragment } from 'react'
import { useContractReads } from 'wagmi'

import { governorAbi } from 'src/data/contract/abis'
import { Proposal } from 'src/data/graphql/requests/proposalQuery'
import {
  NounsProposalStatus,
  ProposalVoteFragment as ProposalVote,
} from 'src/data/graphql/sdk.generated'
import { useDaoStore } from 'src/modules/dao'
import { isProposalOpen, isProposalSuccessful } from 'src/modules/proposal'
import { useLayoutStore } from 'src/stores'
import { AddressType } from 'src/typings'

import { OwnerActions } from './OwnerActions'
import { SuccessfulProposalActions } from './SuccessfulProposalActions'
import { VoteStatus } from './VoteStatus'

interface ProposalActionsProps {
  daoName?: string
  proposal: Proposal
}

export const ProposalActions: React.FC<ProposalActionsProps> = ({
  daoName,
  proposal,
}) => {
  const signerAddress = useLayoutStore((state) => state.signerAddress)
  const addresses = useDaoStore((state) => state.addresses)

  const { proposer, title, voteStart, proposalId, timeCreated, status } = proposal

  const { data } = useContractReads({
    enabled: !!signerAddress,
    contracts: [
      {
        abi: governorAbi,
        address: addresses?.governor,
        functionName: 'getVotes',
        args: [signerAddress as AddressType, BigNumber.from(timeCreated)],
      },
      {
        abi: governorAbi,
        address: addresses?.governor,
        functionName: 'vetoer',
      },
    ],
  })

  if (!data) return null

  const [votes, vetoer] = data

  const votesAvailable = !!votes ? votes.toNumber() : 0

  const signerVote: ProposalVote | undefined = signerAddress
    ? proposal.votes?.find(
        (vote) =>
          ethers.utils.getAddress(vote.voter) === ethers.utils.getAddress(signerAddress)
      )
    : undefined

  const proposalOpen = isProposalOpen(status)
  const isProposer =
    !!signerAddress &&
    ethers.utils.getAddress(proposer) == ethers.utils.getAddress(signerAddress)

  const isVetoer = signerAddress === vetoer

  const shouldShowActions =
    status === NounsProposalStatus.Active ||
    status === NounsProposalStatus.Pending ||
    signerVote ||
    votesAvailable !== 0 ||
    isProposer ||
    isVetoer

  if (!shouldShowActions) return null

  const showCancel = proposalOpen && isProposer
  const showVeto = proposalOpen && isVetoer

  const displaySucceededActions = isProposalSuccessful(proposal.status)

  return (
    <Fragment>
      {displaySucceededActions && <SuccessfulProposalActions proposal={proposal} />}

      <Flex
        direction={{ '@initial': 'column', '@768': 'row' }}
        w={'100%'}
        align={'center'}
        justify={'space-between'}
        p={{ '@initial': 'x4', '@768': 'x6' }}
        gap={'x3'}
        borderStyle={'solid'}
        borderWidth={'normal'}
        borderColor={'border'}
        borderRadius={'curved'}
      >
        <VoteStatus
          signerVote={signerVote}
          votesAvailable={votesAvailable}
          proposalId={proposalId}
          voteStart={voteStart}
          state={status}
          daoName={daoName}
          title={title}
        />

        {(showCancel || showVeto) && (
          <OwnerActions
            proposalId={proposalId}
            showCancel={showCancel}
            showVeto={showVeto}
          />
        )}
      </Flex>
    </Fragment>
  )
}
