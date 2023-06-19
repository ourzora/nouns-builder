import { NextApiRequest, NextApiResponse } from 'next'

import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { exploreDaosRequest } from 'src/data/subgraph/requests/exploreQueries'
import { Auction_OrderBy } from 'src/data/subgraph/sdk.generated'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const limit = 30
  const { page, orderBy } = req.query
  const pageInt = parseInt(page as string, 10)

  const exploreRes = await exploreDaosRequest(
    (pageInt + 1) * limit,
    orderBy as Auction_OrderBy
  )

  const { maxAge, swr } = CACHE_TIMES.EXPLORE
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
  )

  res.status(200).send(exploreRes)
}

export default handler
