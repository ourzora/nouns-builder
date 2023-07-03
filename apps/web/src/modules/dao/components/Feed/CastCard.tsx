import { Box, Flex, Text } from '@zoralabs/zord'
import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { useMemo } from 'react'
import useSWR from 'swr'

import { CardSkeleton } from './CardSkeleton'
import { cardWrapper, castText, pfpStyles, pfpWrapper } from './Feed.css'

const getProfile = async (fid: number) => {
  const res = await axios.get<{ displayName?: string; pfp?: string; fName?: string }>(
    `/api/feed/userData?fid=${fid}`
  )
  return res.data
}

const handleMentions = async (mentions: number[], mentionsPositions: number[]) => {
  if (!mentions || !mentionsPositions) return Promise.resolve([])

  const res = await Promise.all(
    mentions.map(async (mention, index) => {
      const profile = await getProfile(mention)
      return {
        profile,
        position: mentionsPositions[index],
        fid: mention,
      }
    })
  )
  return res
}

export const CastCard = ({
  text,
  fid,
  timestamp,
  hexHash,
  mentions,
  mentionsPositions,
}: {
  text: string
  fid: number
  timestamp: number
  hexHash: string
  mentions: number[]
  mentionsPositions: number[]
}) => {
  const { data, error, isValidating } = useSWR(fid ? [fid] : undefined, () =>
    getProfile(fid)
  )

  const {
    data: mentionsData,
    error: mentionsError,
    isValidating: mentionsIsValidating,
  } = useSWR(
    mentions && mentionsPositions ? [mentions, mentionsPositions] : undefined,
    () => handleMentions(mentions, mentionsPositions)
  )

  const time = useMemo(() => {
    dayjs.extend(relativeTime)
    const date = dayjs.unix(timestamp / 1000).fromNow()
    return date
  }, [timestamp])

  const textWithMentions = useMemo(() => {
    if (!mentionsData || !text) return
    if (!mentionsData.length) return <Text>{text}</Text>
  }, [text, mentionsData, mentions, mentionsPositions])

  if (error) {
    // Design decision: how would we like to display a profile load fail?
    return null
  }
  if (isValidating && !data) {
    return <CardSkeleton />
  }

  return (
    <Box
      className={cardWrapper}
      py={{ '@initial': 'x4', '@768': 'x6' }}
      px={{ '@initial': 'x2', '@768': 'x6' }}
      borderRadius={'phat'}
      borderStyle={'solid'}
      borderWidth={'normal'}
      borderColor={'border'}
      mb={'x6'}
    >
      <a href={`https://warpcast.com/~/conversations/${hexHash}`} target="_blank">
        <Flex align={'center'} mb={'x4'}>
          <Box mr="x2" borderRadius="round">
            <div className={pfpWrapper}>
              <img
                alt="profile picture"
                src={data?.pfp || '/nouns-avatar-circle.png'}
                className={pfpStyles}
              />
            </div>
          </Box>
          <Flex direction={{ '@initial': 'column', '@768': 'row' }}>
            <Text mr={'x1'} fontWeight={'display'}>
              {data?.displayName || '@' + data?.fName || 'Name Not Found'}
            </Text>
            <Flex>
              <Text color="text3" mr={'x1'}>
                @{data?.fName || 'fName Not Found'}
              </Text>
              <Text color="text3" mr={'x1'}>
                -
              </Text>
              <Text color="text3">{time}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Text className={castText}>{text}</Text>
      </a>
    </Box>
  )
}
