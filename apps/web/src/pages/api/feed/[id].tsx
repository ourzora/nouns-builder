import { NextApiRequest, NextApiResponse } from 'next'

import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { getDAOfeed } from 'src/data/farcaster/queries/daoDiscussion'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionId, chainId } = req.query

  const feedRes = await getDAOfeed(collectionId as string, chainId as string)

  const { maxAge, swr } = CACHE_TIMES.DAO_FEED
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
  )

  res.status(200).json(feedRes)
}

export default handler
