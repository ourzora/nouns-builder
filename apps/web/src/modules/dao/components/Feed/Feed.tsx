import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'

import SWR_KEYS from 'src/constants/swrKeys'
import { useLayoutStore } from 'src/stores'

type FeedTabProps = {
  collectionAddress: string
}

// add proper type
type DAOFeedResponse = any

const FeedTab = ({ collectionAddress }: FeedTabProps) => {
  const isMobile = useLayoutStore((x) => x.isMobile)
  const { query } = useRouter()
  console.log('first')
  const { data, error, isValidating } = useSWR(
    collectionAddress ? [SWR_KEYS.DAO_FEED, collectionAddress, '1'] : undefined,
    () => axios.get<DAOFeedResponse>(`/api/feed/${collectionAddress}/`)
  )

  if (error) {
    return <div>error</div>
  }
  if (isValidating) {
    return <div>loading</div>
  }
  console.log('data', data)
  return <div>Feed</div>
}

export default FeedTab
