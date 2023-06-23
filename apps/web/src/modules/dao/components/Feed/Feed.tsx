import { CastAddMessage } from '@farcaster/hub-nodejs'
import { Box, Flex, Text } from '@zoralabs/zord'
import axios from 'axios'
import Image from 'next/legacy/image'
import React, { ReactNode } from 'react'
import useSWR from 'swr'

import { PURPLE_COLLECTION } from 'src/constants/farcasterHub'
import SWR_KEYS from 'src/constants/swrKeys'
import { useLayoutStore } from 'src/stores'

import { feed, feedLayoutWrapper } from './Feed.css'

type FeedTabProps = {
  collectionAddress: string
}

// add proper type
type DAOFeedResponse = any

const Feed = ({ collectionAddress }: FeedTabProps) => {
  const isMobile = useLayoutStore((x) => x.isMobile)
  const chainId = '1'

  const { data, error, isValidating } = useSWR(
    collectionAddress ? [SWR_KEYS.DAO_FEED, PURPLE_COLLECTION] : undefined,
    () =>
      axios
        .get<{ value: CastAddMessage[] }>(`/api/feed/${PURPLE_COLLECTION}_${chainId}`)
        .then((x) => x.data.value)
  )
  if (error) {
    return <FeedTab isMobile={isMobile}>error</FeedTab>
  }
  if (isValidating) {
    return <FeedTab isMobile={isMobile}>loading</FeedTab>
  }
  return (
    <FeedTab isMobile={isMobile}>
      <>
        {data?.map((msg) => (
          <CastCard text={msg?.data?.castAddBody?.text} />
        ))}
      </>
    </FeedTab>
  )
}

export default Feed

const FeedTab = ({ isMobile, children }: { isMobile: boolean; children?: ReactNode }) => (
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
      px={{ '@initial': 'x0', '@768': 'x18' }}
      py={{ '@initial': 'x0', '@768': 'x8' }}
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

const CastCard = ({ text }: { text: string }) => {
  return (
    <Box mb={'x10'}>
      <Flex align={'center'} fontWeight={'display'} mb={'x3'}>
        <Box mr="x3" borderRadius="round">
          <Image
            src={'/nouns-avatar-circle.png'}
            layout="fixed"
            objectFit="contain"
            style={{ borderRadius: '100%' }}
            alt=""
            height={32}
            width={32}
          />
        </Box>
        <Text>UserName</Text>
      </Flex>
      <Text wordBreak="break-word">{text}</Text>
    </Box>
  )
}
