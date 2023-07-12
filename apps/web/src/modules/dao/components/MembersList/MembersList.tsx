import { Box, Flex, Text } from '@zoralabs/zord'
import axios from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { ReactNode, useMemo } from 'react'
import useSWR from 'swr'

import { Avatar } from 'src/components/Avatar'
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

export const MembersList = ({ totalSupply }: { totalSupply?: number }) => {
  const { query, isReady, push } = useRouter()
  const chain = useChainStore((x) => x.chain)
  const {
    addresses: { token },
  } = useDaoStore()

  const {
    data: members,
    error,
    isValidating,
  } = useSWR(isReady ? [token, chain.id] : undefined, () =>
    axios
      .get<MembersQuery>(`/api/membersList/${token}?chainId=${chain.id}`)
      .then((x) => x.data.membersList)
  )
  // console.log('members', members)
  if (isValidating) return <MembersPanel>Loading...</MembersPanel>
  if (error) return <MembersPanel>Error</MembersPanel>

  return (
    <MembersPanel>
      {members?.map((member) => (
        <MemberCard key={member.id} member={member} totalSupply={totalSupply} />
      ))}
    </MembersPanel>
  )
}

const MembersPanel = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Text
        mb={{ '@initial': 'x4', '@768': 'x6' }}
        mt={{ '@initial': 'x4', '@768': 'x10' }}
        fontSize={28}
        fontWeight={'display'}
      >
        Members
      </Text>
      <Box
        borderRadius={'phat'}
        borderStyle={'solid'}
        borderWidth={'normal'}
        borderColor={'border'}
        p={{ '@initial': 'x4', '@768': 'x6' }}
      >
        <TableHeader />
        {children}
      </Box>
    </>
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

const MemberCard = ({
  member,
  totalSupply,
}: {
  member: DaoMember
  totalSupply?: number
}) => {
  const { displayName, ensAvatar } = useEnsData(member.id)

  const timeJoined = useMemo(
    () => dayjs(dayjs.unix(member.timeJoined)).format('MMM DD, YYYY'),
    [member]
  )

  const votePercent = useMemo(() => {
    if (!totalSupply || !member.daoTokenCount) return '--'
    return ((Number(member.daoTokenCount) / totalSupply) * 100).toFixed(2)
  }, [totalSupply, member])

  return (
    <Flex className={row} align={'center'} mb={'x10'}>
      <Flex w="100%" className={firstRowItem} align={'center'}>
        <Avatar address={member.id} src={ensAvatar} size="32" />
        <Text mx="x2" variant="paragraph-md">
          {displayName}
        </Text>
      </Flex>
      <Text className={rowItem}>{member.daoTokenCount} Tokens</Text>
      <Text className={rowItem}>{votePercent}%</Text>
      <Text className={lastRowItem}>Since {timeJoined}</Text>
    </Flex>
  )
}
