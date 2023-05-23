import { NextApiRequest, NextApiResponse } from 'next'

import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { exploreDaosRequest } from 'src/data/graphql/requests/exploreQueries'
import { MarketSortKey } from 'src/data/graphql/sdk.generated'
import { encodePageNumToEndCursor } from 'src/utils/encodePageNumToEndCursor'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, sortKey } = req.query
  const endCursor = encodePageNumToEndCursor(30, page as string)
  const exploreRes = await exploreDaosRequest(
    endCursor as string,
    [],
    sortKey as MarketSortKey
  )

  const { maxAge, swr } = CACHE_TIMES.EXPLORE
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
  )

  res.status(200).send(exploreRes)
}

export default handler
