import { CastAddData, Message, SignatureScheme } from '@farcaster/hub-nodejs'
import { Box, Flex, Text } from '@zoralabs/zord'
import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { ReactNode, useMemo } from 'react'
import useSWR from 'swr'

import { PURPLE_COLLECTION } from 'src/constants/farcasterHub'
import SWR_KEYS from 'src/constants/swrKeys'
import { useLayoutStore } from 'src/stores'

import { cardLink, cardSkeleton, cardWrapper, feed, feedLayoutWrapper } from './Feed.css'

type FeedTabProps = {
  collectionAddress: string
}

type AddMsgWithUnix = Message & {
  data: CastAddData
  unixTime: number
  hexHash: string
  signatureScheme: SignatureScheme.ED25519
}

const Feed = ({ collectionAddress }: FeedTabProps) => {
  const isMobile = useLayoutStore((x) => x.isMobile)
  const chainId = '1'

  const { data, error, isValidating } = useSWR(
    collectionAddress ? [SWR_KEYS.DAO_FEED, PURPLE_COLLECTION] : undefined,
    () =>
      axios
        .get<{ value: AddMsgWithUnix[] }>(`/api/feed/${PURPLE_COLLECTION}~${chainId}`)
        .then((x) => x.data.value.reverse())
  )

  if (error) {
    return <FeedTab isMobile={isMobile}>error</FeedTab>
  }

  if (isValidating) {
    return (
      <FeedTab isMobile={isMobile}>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </FeedTab>
    )
  }

  if (!data?.length) {
    return (
      <FeedTab isMobile={isMobile}>
        <Flex
          justify="center"
          align="center"
          width="100%"
          height="100%"
          direction="column"
        >
          <Text fontSize={20} fontWeight={'heading'} mb={'x3'}>
            No casts found
          </Text>
          <Text>A channel feed has not been created for this DAO.</Text>
        </Flex>
      </FeedTab>
    )
  }

  return (
    <FeedTab isMobile={isMobile}>
      {data?.map((msg, index) => (
        <CastCard
          key={`${msg.unixTime}.${index}`}
          text={msg?.data?.castAddBody?.text}
          fid={msg.data.fid}
          timestamp={msg.unixTime}
          hexHash={msg.hexHash}
        />
      ))}
    </FeedTab>
  )
}

export default Feed

const FeedTab = ({ children }: { isMobile: boolean; children?: ReactNode }) => (
  <Box className={feed}>
    <Flex direction={'column'}>
      <Box mb={{ '@initial': 'x4', '@768': 'x8' }}>
        <Text
          mb={{ '@initial': 'x4', '@768': 'x6' }}
          fontSize={28}
          fontWeight={'display'}
        >
          DAO Feed
        </Text>
        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</Text>
        <Text>
          <FeedLayout>{children}</FeedLayout>
        </Text>
      </Box>
    </Flex>
  </Box>
)

const FeedLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <Flex
      className={feedLayoutWrapper}
      direction={'column'}
      py={{ '@initial': 'x0', '@768': 'x4' }}
      borderColor={'border'}
      borderStyle={'solid'}
      borderRadius={'curved'}
      borderWidth={'normal'}
      mt={'x4'}
      mb={'x8'}
    >
      {children}
    </Flex>
  )
}

const CastCard = ({
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
    return <Box>error</Box>
  }
  if (isValidating) {
    return <CardSkeleton />
  }

  return (
    <Box
      className={cardWrapper}
      px={{ '@initial': 'x0', '@768': 'x32' }}
      py={{ '@initial': 'x4', '@768': 'x4' }}
      borderRadius={'normal'}
      mb={'x3'}
    >
      <a
        href={`https://warpcast.com/~/conversations/${hexHash}`}
        target="_blank"
        className={cardLink}
      >
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

const CardSkeleton = () => (
  <Box
    className={cardSkeleton}
    borderRadius="normal"
    backgroundColor="background2"
    style={{ height: '8rem', minHeight: '8rem' }}
    mb="x3"
  />
)
