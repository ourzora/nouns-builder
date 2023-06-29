import { CastAddData, Message, SignatureScheme } from '@farcaster/hub-nodejs'
import { Button, Flex, Text } from '@zoralabs/zord'
import axios from 'axios'
import React, { useMemo } from 'react'
import useSWRInfinite from 'swr/infinite'

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
type PageData = { value: AddMsgWithUnix[]; nextPageToken?: string }

const Feed = ({ collectionAddress }: FeedTabProps) => {
  const isMobile = useLayoutStore((x) => x.isMobile)
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID || '1'

  const { data, error, isValidating, setSize } = useSWRInfinite(
    (pageIndex: number, prevPageData: PageData) => {
      if (prevPageData && !prevPageData.nextPageToken) return null
      return `/api/feed/${collectionAddress}~${chainId}~${
        prevPageData?.nextPageToken || ''
      }`
    },
    (url) =>
      axios.get<PageData>(url).then((x) => {
        return x.data
      })
  )

  const { casts } = useMemo(() => {
    if (!data) return {}
    return { casts: data.flatMap((pageData) => pageData.value) }
  }, [data])

  const loadMore = () => {
    setSize((size) => size + 1)
  }

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

  if (isValidating && !casts?.length) {
    return (
      <FeedTab isMobile={isMobile}>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </FeedTab>
    )
  }

  if (!casts?.length) {
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
      {casts?.map((msg) => (
        <CastCard
          key={msg.hexHash}
          text={msg?.data?.castAddBody?.text}
          fid={msg.data.fid}
          timestamp={msg.unixTime}
          hexHash={msg.hexHash}
        />
      ))}
      <Button onClick={loadMore}> Load More</Button>
    </FeedTab>
  )
}

export default Feed
