import { CastAddMessage } from '@farcaster/hub-nodejs'
import { Box, Flex, Text } from '@zoralabs/zord'
import axios from 'axios'
import React, { ReactNode } from 'react'
import useSWR from 'swr'

import { PURPLE_COLLECTION } from 'src/constants/farcasterHub'
import SWR_KEYS from 'src/constants/swrKeys'
import { useLayoutStore } from 'src/stores'

import { feed } from './Feed.css'

type FeedTabProps = {
  collectionAddress: string
}

// add proper type
type DAOFeedResponse = any

const FeedTab = ({ collectionAddress }: FeedTabProps) => {
  const isMobile = useLayoutStore((x) => x.isMobile)
  //   const { query } = useRouter()
  const chainId = '1'

  const { data, error, isValidating } = useSWR(
    collectionAddress ? [SWR_KEYS.DAO_FEED, PURPLE_COLLECTION] : undefined,
    () =>
      axios
        .get<{ value: CastAddMessage[] }>(`/api/feed/${PURPLE_COLLECTION}_${chainId}`)
        .then((x) => x.data.value)
  )
  if (error) {
    return <FeedLayout isMobile={isMobile}>error</FeedLayout>
  }
  if (isValidating) {
    return <FeedLayout isMobile={isMobile}>loading</FeedLayout>
  }
  return (
    <FeedLayout isMobile={isMobile}>
      <>
        {data?.map((msg) => (
          <Text mb={'x10'}>{msg?.data?.castAddBody?.text}</Text>
        ))}
      </>
    </FeedLayout>
  )
}

export default FeedTab

const FeedLayout = ({
  isMobile,
  children,
}: {
  isMobile: boolean
  children?: ReactNode
}) => (
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
        <Text>{children}</Text>
      </Box>
    </Flex>
  </Box>
)
