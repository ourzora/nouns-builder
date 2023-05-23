import { NextApiRequest, NextApiResponse } from 'next'

import { CACHE_TIMES } from 'src/constants/cacheTimes'
import getToken from 'src/data/contract/requests/getToken'
import { AddressType } from 'src/typings'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token, tokenId } = req.query
  const tokenRes = await getToken(token as AddressType, tokenId as string)

  const { maxAge, swr } = CACHE_TIMES.TOKEN_INFO
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
  )

  res.status(200).json(tokenRes)
}

export default handler
