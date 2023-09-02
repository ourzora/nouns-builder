import { Box, Flex, Label, Paragraph } from '@zoralabs/zord'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { ProposalState } from 'src/data/contract/requests/getProposalState'
import { useIsMounted } from 'src/hooks/useIsMounted'

import { statusStyle, titleStyle } from './ProposalCard.css'
import { ProposalStatus } from './ProposalStatus'

type ProposalCardProps = {
  proposalId: string
  title: string
  proposalNumber: number
  state: ProposalState
  timeCreated: number
  voteEnd: number
  voteStart: number
  expiresAt?: number
  collection?: string
}

export const ProposalCard: React.FC<ProposalCardProps> = ({
  proposalId,
  title,
  proposalNumber,
  state,
  timeCreated,
  voteEnd,
  voteStart,
  expiresAt,
  collection,
}) => {
  const isMounted = useIsMounted()
  const router = useRouter()

  if (!isMounted) return null

  return (
    <Link
      href={
        collection
          ? `/dao/${router?.query.network}/${collection}/vote/${proposalNumber}`
          : ''
      }
      passHref
    >
      <Flex
        direction={{ '@initial': 'column', '@768': 'row' }}
        my={'x2'}
        borderColor={'border'}
        borderStyle={'solid'}
        borderRadius={'curved'}
        borderWidth={'normal'}
        cursor={'pointer'}
        wrap="wrap"
        p={{ '@initial': 'x4', '@768': 'x6' }}
      >
        <Box display={{ '@initial': 'none', '@768': 'flex' }} w={'x8'} mr={'x4'}>
          <Label size="lg" color={'text4'}>
            {proposalNumber}
          </Label>
        </Box>
        <Box
          mr="auto"
          mt={{ '@initial': 'x2', '@768': 'x0' }}
          className={titleStyle}
          style={{ order: 2 }}
        >
          <Label size="lg">{title}</Label>
          <Paragraph color="tertiary">
            {dayjs(dayjs.unix(timeCreated)).format('MMM DD, YYYY')}
          </Paragraph>
        </Box>

        <ProposalStatus
          state={state}
          voteEnd={voteEnd}
          voteStart={voteStart}
          expiresAt={expiresAt}
          className={statusStyle}
          flipped
          showTime
        />
        <Flex
          display={{ '@initial': 'flex', '@768': 'none' }}
          justify={'flex-end'}
          h={'x0'}
        >
          <Label size="lg" color={'text4'}>
            {proposalNumber}
          </Label>
        </Flex>
      </Flex>
    </Link>
  )
}
