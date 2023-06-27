import { NextApiRequest, NextApiResponse } from 'next'

import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import getToken from 'src/data/contract/requests/getToken'
import { AddressType } from 'src/typings'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { network, token, tokenId } = req.query
  const chain = PUBLIC_DEFAULT_CHAINS.find((x) => x.slug == network)

  if (!chain) {
    return res.status(404).end()
  }

  const tokenRes = await getToken(chain, token as AddressType, tokenId as string)

  const { maxAge, swr } = CACHE_TIMES.TOKEN_INFO
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
  )

  res.status(200).json(tokenRes)
}

export default handler
