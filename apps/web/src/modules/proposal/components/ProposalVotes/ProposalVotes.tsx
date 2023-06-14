import { Flex, Text } from '@zoralabs/zord'
import { useMemo } from 'react'
import useSWR from 'swr'

import SWR_KEYS from 'src/constants/swrKeys'
import { auctionSettledRequest } from 'src/data/graphql/requests/auctionSettledQuery'
import { Proposal } from 'src/data/subgraph/requests/proposalQuery'
import { useDaoStore } from 'src/modules/dao'
import { propPageWrapper } from 'src/styles/Proposals.css'

import { VotePlacard } from './VotePlacard'
import { VoterParticipation } from './VoterParticipation'

export type ProposalVotesProps = {
  proposal: Proposal
}

export const ProposalVotes: React.FC<ProposalVotesProps> = ({ proposal }) => {
  const totalVotes = useMemo(() => {
    if (!proposal.votes) return 0
    return proposal.votes.reduce((acc, vote) => acc + vote.weight, 0)
  }, [proposal.votes])
  const addresses = useDaoStore((x) => x.addresses)

  const hasVotes = proposal.votes?.length || 0 > 0

  const { data: auctionSettled } = useSWR(
    addresses.auction
      ? [SWR_KEYS.AUCTION_SETTLED, addresses.auction, proposal.timeCreated]
      : undefined,
    () =>
      auctionSettledRequest([addresses.auction as string], proposal.timeCreated, 1).then(
        (x) => x[0]
      )
  )

  const maxVotes = useMemo(() => {
    if (!auctionSettled) return 0
    return parseInt(auctionSettled?.tokenId) + 1 // + 1 for tokenId 0
  }, [auctionSettled])

  return (
    <Flex className={propPageWrapper}>
      {hasVotes ? (
        <>
          <VoterParticipation totalVotes={totalVotes} maxVotes={maxVotes} />
          {proposal.votes
            ?.map((vote) => <VotePlacard vote={vote} totalVotes={totalVotes} />)
            .reverse()}
        </>
      ) : (
        <Text textAlign={'center'} color="text3" mt="x4">
          No votes yet for this proposal.
        </Text>
      )}
    </Flex>
  )
}
