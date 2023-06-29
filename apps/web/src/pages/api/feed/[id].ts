import { bytesToHexString, fromFarcasterTime } from '@farcaster/hub-nodejs'
import { NextApiRequest, NextApiResponse } from 'next'

import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { getDAOfeed } from 'src/data/farcaster/queries/daoDiscussion'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const feedRes = await getDAOfeed(id as string)

  const { maxAge, swr } = CACHE_TIMES.DAO_FEED
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
  )
  if (feedRes.isErr()) {
    return res.status(500).json(feedRes.error)
  }

  // fromFarcasteTime does not work on the client. Running the function here.
  const withUnixTime = feedRes.value.data.map((cast) => ({
    ...cast,
    unixTime: fromFarcasterTime(cast.data.timestamp)._unsafeUnwrap(),
    hexHash: bytesToHexString(cast.hash)._unsafeUnwrap(),
  }))

  const nextPageToken = feedRes.value.nextPageToken
    ? bytesToHexString(feedRes.value.nextPageToken)._unsafeUnwrap()
    : undefined

  res.status(200).json({
    nextPageToken,
    value: withUnixTime,
  })
}

export default handler
