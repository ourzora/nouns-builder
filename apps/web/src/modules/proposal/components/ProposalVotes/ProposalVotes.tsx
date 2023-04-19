import { Flex } from '@zoralabs/zord'
import { useMemo } from 'react'

import { Proposal } from 'src/data/graphql/requests/proposalQuery'
import { propPageWrapper } from 'src/styles/Proposals.css'

import { VotePlacard } from './VotePlacard'

export type ProposalVotesProps = {
  proposal: Proposal
}

export const ProposalVotes: React.FC<ProposalVotesProps> = ({ proposal }) => {
  const totalVotes = useMemo(() => {
    if (!proposal.votes) return 0
    return proposal.votes.reduce((acc, vote) => acc + vote.weight, 0)
  }, [proposal.votes])

  return (
    <Flex className={propPageWrapper}>
      {proposal.votes?.map((vote) => (
        <VotePlacard vote={vote} totalVotes={totalVotes} />
      ))}
    </Flex>
  )
}
