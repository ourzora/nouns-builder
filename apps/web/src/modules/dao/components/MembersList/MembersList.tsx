import { Box, Flex, Text } from '@zoralabs/zord'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { ReactNode } from 'react'
import useSWR from 'swr'

import { useEnsData } from 'src/hooks'
import { useChainStore } from 'src/stores/useChainStore'

import { useDaoStore } from '../../stores'
import { firstRowItem, lastRowItem, row, rowItem } from './MembersList.css'

type DaoMember = {
  id: string
  daoTokenCount: string
  timeJoined: number
}
type MembersQuery = {
  membersList: DaoMember[]
}

const TESTING = '0x6e13ED8472fBBd384C260538323906fc1eCb0d7B'.toLowerCase()
const TEST_NETWORK = '5'
export const MembersList = () => {
  const chain = useChainStore((x) => x.chain)
  const {
    addresses: { token },
  } = useDaoStore()
  const {
    data: members,
    error,
    isValidating,
  } = useSWR(token && chain.id ? [token, chain.id] : undefined, () =>
    axios
      .get<MembersQuery>(`/api/membersList/${TESTING}?chainId=${TEST_NETWORK}`)
      .then((x) => x.data.membersList)
  )
  // console.log('members', members)
  if (isValidating) return <MembersPanel>Loading...</MembersPanel>
  if (error) return <MembersPanel>Error</MembersPanel>

  return (
    <MembersPanel>
      {members?.map((member) => (
        <MemberCard member={member} />
      ))}
    </MembersPanel>
  )
}

const MembersPanel = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      mt={{ '@initial': 'x4', '@768': 'x16' }}
      borderRadius={'phat'}
      borderStyle={'solid'}
      borderWidth={'normal'}
      borderColor={'border'}
      p={{ '@initial': 'x4', '@768': 'x10' }}
    >
      <Text mb={{ '@initial': 'x4', '@768': 'x6' }} fontSize={28} fontWeight={'display'}>
        Members
      </Text>
      <TableHeader />
      {children}
    </Box>
  )
}

const TableHeader = () => {
  return (
    <Flex className={row} mb={{ '@initial': 'x4', '@768': 'x12' }}>
      <Text fontWeight={'label'} className={firstRowItem}>
        Member
      </Text>
      <Text fontWeight={'label'} className={rowItem}>
        Tokens
      </Text>
      <Text fontWeight={'label'} className={rowItem}>
        Vote %
      </Text>
      <Text fontWeight={'label'} className={lastRowItem}>
        Joined
      </Text>
    </Flex>
  )
}

const MemberCard = ({ member }: { member: DaoMember }) => {
  const { displayName, ensAvatar } = useEnsData(member.id)

  return (
    <Flex className={row}>
      <Box w="100%" className={firstRowItem}>
        {displayName}
      </Box>
      <Text className={rowItem} mb={'x8'}>
        {member.daoTokenCount}
      </Text>
      <Text className={rowItem}>{member.daoTokenCount}</Text>
      <Text className={rowItem}>
        Since {dayjs(dayjs.unix(member.timeJoined)).format('MMM DD, YYYY')}
      </Text>
    </Flex>
  )
}
