import { Flex, Text } from '@zoralabs/zord'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useMemo } from 'react'

import { Avatar } from 'src/components/Avatar'
import { DaoMember } from 'src/data/subgraph/requests/daoMembersList'
import { useEnsData } from 'src/hooks'

import { firstRowItem, lastRowItem, rowItem } from './MembersList.css'

export const MemberCard = (
  {
    member,
    totalSupply,
    isMobile,
  }: {
    member: DaoMember
    totalSupply?: number
    isMobile: boolean
  }
) => {
  const { displayName, ensAvatar } = useEnsData(member.address)

  const timeJoined = useMemo(
    () => dayjs(dayjs.unix(member.timeJoined)).format('MMM DD, YYYY'),
    [member]
  )

  const votePercent = useMemo(() => {
    if (!totalSupply || !member.daoTokenCount) return '--'
    return ((Number(member.daoTokenCount) / totalSupply) * 100).toFixed(2)
  }, [totalSupply, member])

  const gridInfo = (
    <>
      <Text className={rowItem}>{member.daoTokenCount} Tokens</Text>
      <Text className={rowItem}>{votePercent}%</Text>
      <Text className={lastRowItem}>{timeJoined}</Text>
    </>
  )

  return (
    <Link href={`/profile/${member.address}`} passHref>
      <Flex
        mb={'x14'}
        direction={{ '@initial': 'column', '@768': 'row' }}
        align={{ '@initial': 'start', '@768': 'center' }}
      >
        <Flex
          className={firstRowItem}
          align={'center'}
          mb={{ '@initial': 'x4', '@768': 'x0' }}
        >
          <Avatar address={member.address} src={ensAvatar} size="32" />
          <Text mx="x2" variant="paragraph-md">
            {displayName}
          </Text>
        </Flex>
        {isMobile ? <Flex w="100%">{gridInfo}</Flex> : gridInfo}
      </Flex>
    </Link>
  )
}
