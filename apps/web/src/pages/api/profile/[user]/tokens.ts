import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

import { MyDaosResponse } from 'src/data/graphql/requests/daoQuery'
import { TokensQueryResponse, tokensQuery } from 'src/data/graphql/requests/tokensQuery'
import { getBaseUrl } from 'src/utils/baseUrl'

export interface UserTokensResponse {
  tokens?: TokensQueryResponse
  daos: MyDaosResponse
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, page } = req.query
  const baseUrl = getBaseUrl()

  const { data: daos } = await axios.get<MyDaosResponse>(
    `${baseUrl}/api/profile/${user}/daos`
  )

  if (daos.length < 1)
    res.status(200).json({
      daos: [],
    })

  const collections = daos?.map((dao) => dao.collectionAddress)

  const tokens = await tokensQuery(
    [user as string],
    collections,
    page ? parseInt(page as string) : undefined
  )
  res.status(200).json({ tokens, daos } as UserTokensResponse)
}

export default handler
