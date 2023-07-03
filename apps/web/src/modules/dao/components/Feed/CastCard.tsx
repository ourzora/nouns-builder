import { Box, Flex, Text } from '@zoralabs/zord'
import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { useMemo } from 'react'
import useSWR from 'swr'

import { CardSkeleton } from './CardSkeleton'
import { cardWrapper } from './Feed.css'

export const CastCard = ({
  text,
  fid,
  timestamp,
  hexHash,
}: {
  text: string
  fid: number
  timestamp: number
  hexHash: string
}) => {
  const { data, error, isValidating } = useSWR(fid ? [fid] : undefined, () =>
    axios
      .get<{ displayName?: string; pfp?: string; fName?: string }>(
        `/api/feed/userData?fid=${fid}`
      )
      .then((x) => x.data)
  )

  const time = useMemo(() => {
    dayjs.extend(relativeTime)
    const date = dayjs.unix(timestamp / 1000).fromNow()
    return date
  }, [timestamp])

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
          <Box mr="x3" borderRadius="round">
            <div
              style={{
                width: '32px',
                height: '32px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                alt="profile picture"
                src={data?.pfp || '/nouns-avatar-circle.png'}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  height: '100%',
                  width: '100%',
                  transform: 'translate(-50%, -50%)',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
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
        <Text wordBreak="break-word">{text}</Text>
      </a>
    </Box>
  )
}
