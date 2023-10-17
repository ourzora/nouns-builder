import { Box, Flex, PopUp, Text } from '@zoralabs/zord'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { Icon } from 'src/components/Icon'
import { ProposalState } from 'src/data/contract/requests/getProposalState'
import { ProposalFragment } from 'src/data/subgraph/sdk.generated'
import { AddressType, CHAIN_ID } from 'src/typings'

import { ProposalStatus } from '../proposal/components/ProposalStatus'

type DaoProposalCardProps = ProposalFragment & {
  chainId: CHAIN_ID
  tokenAddress: AddressType
  proposalState: ProposalState
  currentChainSlug?: string
  userAddress?: AddressType
  votes: {
    voter: string
  }[]
}

export const DaoProposalCard = ({
  title,
  proposalNumber,
  tokenAddress,
  proposalState,
  voteEnd,
  voteStart,
  expiresAt,
  currentChainSlug,
  userAddress,
  chainId,
  proposalId,
  votes,
}: DaoProposalCardProps) => {
  return (
    <Link
      href={`/dao/${currentChainSlug}/${tokenAddress}/vote/${proposalNumber}`}
      passHref
    >
      <Flex
        mb={'x4'}
        direction={{ '@initial': 'column-reverse', '@768': 'row' }}
        w={'100%'}
        align={{ '@initial': 'flex-start', '@768': 'center' }}
        borderColor={'border'}
        borderStyle={'solid'}
        borderRadius={'curved'}
        borderWidth={'normal'}
        cursor={'pointer'}
        py={{ '@initial': 'x3', '@768': 'x6' }}
        px={{ '@initial': 'x6', '@768': 'x3' }}
        position={'relative'}
      >
        <Text
          fontSize={18}
          fontWeight="label"
          color={'text4'}
          mr={'x4'}
          display={{ '@initial': 'none', '@768': 'flex' }}
        >
          {proposalNumber}
        </Text>
        <Flex mr={'auto'} align="center" mb={{ '@initial': 'x2', '@768': 'x0' }}>
          <Text fontSize={18} fontWeight="label" mr="x2">
            {title}
          </Text>
          <NeedsVote
            userAddress={userAddress}
            chainId={chainId}
            proposalId={proposalId}
            proposalState={proposalState}
            votes={votes}
          />
        </Flex>
        <Flex
          justify={'space-between'}
          width={{ '@initial': '100%', '@768': 'unset' }}
          align={'center'}
          mb={{ '@initial': 'x3', '@768': 'x0' }}
        >
          <ProposalStatus
            state={proposalState}
            voteEnd={voteEnd}
            voteStart={voteStart}
            expiresAt={expiresAt}
            flipped
            showTime
          />
          <Flex display={{ '@initial': 'flex', '@768': 'none' }}>
            <Text fontSize={18} fontWeight="label" color={'text4'}>
              {proposalNumber}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  )
}

type NeedsVoteProps = {
  userAddress?: AddressType
  chainId: CHAIN_ID
  proposalId: string
  proposalState: ProposalState
  votes: { voter: string }[]
}
const NeedsVote = ({ userAddress, proposalState, votes }: NeedsVoteProps) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const hasVoted = useMemo(() => {
    if (proposalState !== ProposalState.Active) return undefined

    return votes.some((vote) => vote.voter === userAddress?.toLowerCase())
  }, [proposalState, votes])

  if (hasVoted == null) return null

  return (
    <Flex>
      <Box
        cursor="pointer"
        style={{ zIndex: 102 }}
        onMouseOver={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Icon
          id={hasVoted ? 'checkInCircle' : 'warning-16'}
          fill={hasVoted ? 'positive' : 'warning'}
          style={{
            transform: hasVoted ? 'scale(0.8)' : 'scale(1)',
          }}
          size={hasVoted ? 'md' : 'sm'}
        />
      </Box>

      <PopUp open={showTooltip} trigger={<></>} placement="right">
        <Text>{hasVoted ? 'Vote Submitted' : 'Vote Needed'}</Text>
      </PopUp>
    </Flex>
  )
}
