import { Flex, Text } from '@zoralabs/zord'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useMemo } from 'react'

import { Avatar } from 'src/components/Avatar'
import { useEnsData } from 'src/hooks'

import { DaoMember } from './MembersList'
import { firstRowItem, lastRowItem, row, rowItem } from './MembersList.css'

export const MemberCard = ({
  member,
  totalSupply,
  isMobile,
}: {
  member: DaoMember
  totalSupply?: number
  isMobile: boolean
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
    <>
      {isMobile ? (
        <Link href={`/profile/${member.id}`} passHref>
          <Flex mb={'x14'} direction={'column'}>
            <Flex w="100%" align={'center'} mb={'x4'}>
              <Avatar address={member.id} src={ensAvatar} size="32" />
              <Text mx="x2" variant="paragraph-md">
                {displayName}
              </Text>
            </Flex>
            <Flex>
              <Text className={rowItem}>{member.daoTokenCount} Tokens</Text>
              <Text className={rowItem}>{votePercent}%</Text>
              <Text className={lastRowItem}>{timeJoined}</Text>
            </Flex>
          </Flex>
        </Link>
      ) : (
        <Link href={`/profile/${member.id}`} passHref>
          <Flex className={row} align={'center'} mb={'x10'}>
            <Flex w="100%" align={'center'} className={firstRowItem}>
              <Avatar address={member.id} src={ensAvatar} size="32" />
              <Text mx="x2" variant="paragraph-md">
                {displayName}
              </Text>
            </Flex>
            <Text className={rowItem}>{member.daoTokenCount} Tokens</Text>
            <Text className={rowItem}>{votePercent}%</Text>
            <Text className={lastRowItem}>Since {timeJoined}</Text>
          </Flex>
        </Link>
      )}
    </>
  )
}
