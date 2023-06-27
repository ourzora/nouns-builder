import { CastAddData, Message, SignatureScheme } from '@farcaster/hub-nodejs'
import { Flex, Text } from '@zoralabs/zord'
import axios from 'axios'
import React from 'react'
import useSWR from 'swr'

import SWR_KEYS from 'src/constants/swrKeys'
import { useLayoutStore } from 'src/stores'

import { CardSkeleton } from './CardSkeleton'
import { CastCard } from './CastCard'
import { FeedTab } from './FeedTab'

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
    collectionAddress ? [SWR_KEYS.DAO_FEED, collectionAddress] : undefined,
    () =>
      axios
        .get<{ value: AddMsgWithUnix[] }>(`/api/feed/${collectionAddress}~${chainId}`)
        .then((x) => x.data.value.reverse())
  )

  if (error) {
    return (
      <FeedTab isMobile={isMobile}>
        <Flex
          justify="center"
          align="center"
          width="100%"
          height="100%"
          direction="column"
        >
          <Text fontSize={20} fontWeight={'heading'} mb={'x3'} color="negative">
            Error
          </Text>
          <Text color="negative">{error?.message || 'Unknown Error'}</Text>
        </Flex>
      </FeedTab>
    )
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
