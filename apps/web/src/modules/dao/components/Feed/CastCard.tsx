import { Box, Flex, Text } from '@zoralabs/zord'
import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { useMemo } from 'react'
import useSWR from 'swr'

import { CardSkeleton } from './CardSkeleton'
import {
  cardLink,
  cardWrapper,
  castText,
  inlineLink,
  pfpStyles,
  pfpWrapper,
} from './Feed.css'

const getProfile = async (fid: number) => {
  const res = await axios.get<{ displayName?: string; pfp?: string; fName?: string }>(
    `/api/feed/userData?fid=${fid}`
  )
  return res.data
}

const handleMentions = async (mentions: number[], mentionsPositions: number[]) => {
  if (!mentions || !mentionsPositions) return []

  const res = await Promise.all(
    mentions.map(async (mention) => {
      const profile = await getProfile(mention)
      return {
        fName: profile.fName,
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
    if (!mentions.length) return text

    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)

    const decoder = new TextDecoder()
    let elements = []
    let indexBytes = 0

    for (let i = 0; i < mentions.length; i++) {
      elements.push(
        <span key={`${mentionsPositions[1]}-${i}-pre`}>
          {decoder.decode(bytes.slice(indexBytes, mentionsPositions[i]))}
        </span>
      )
      const fName = mentionsData.find((mentionData) => mentionData.fid)?.fName
      elements.push(
        <a
          className={inlineLink}
          href={`https://warpcast.com/${fName}`}
          key={`${mentionsPositions[1]}-${fName}`}
          target="_blank"
        >
          {fName}
        </a>
      )
      indexBytes = mentionsPositions[i]
    }

    elements.push(
      <span key="end">{decoder.decode(bytes.slice(indexBytes, bytes.length))}</span>
    )

    const newElements = elements.map((element) => {
      if (element.type === 'a') {
        return React.cloneElement(element, {
          children: `@${element.props.children}`,
        })
      } else {
        return element
      }
    })

    return newElements
  }, [text, mentionsData, mentions, mentionsPositions])

  if (error) {
    // Design decision: how would we like to display a profile load fail?
    return null
  }
  if (isValidating && !data) {
    return <CardSkeleton />
  }
  if (!textWithMentions) {
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
      <Flex align={'center'} mb={'x4'}>
        <a
          className={cardLink}
          href={`https://warpcast.com/~/conversations/${hexHash}`}
          target="_blank"
        />
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
            <a
              href={`https://warpcast.com/${data?.fName || ''}`}
              className={inlineLink}
              target="_blank"
            >
              {data?.displayName || '@' + data?.fName || 'Name Not Found'}
            </a>
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
      <Text className={castText}>{textWithMentions}</Text>
    </Box>
  )
}
