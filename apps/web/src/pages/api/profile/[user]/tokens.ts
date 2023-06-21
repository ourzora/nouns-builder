import axios from 'axios'
import { getAddress } from 'ethers/lib/utils.js'
import { NextApiRequest, NextApiResponse } from 'next'

import { MyDaosResponse } from 'src/data/subgraph/requests/daoQuery'
import { TokensQueryResponse, tokensQuery } from 'src/data/subgraph/requests/tokensQuery'
import { NotFoundError } from 'src/services/errors'
import { getBaseUrl } from 'src/utils/baseUrl'

export interface UserTokensResponse {
  tokens?: TokensQueryResponse
  daos: MyDaosResponse
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, page } = req.query
  const baseUrl = getBaseUrl()

  let address: string

  try {
    address = getAddress(user as string)
  } catch (e) {
    return res.status(400).json({ error: 'bad address input' })
  }

  try {
    const [daos, tokens] = await Promise.all([
      axios
        .get<MyDaosResponse>(`${baseUrl}/api/profile/${address}/daos`)
        .then((x) => x.data),
      tokensQuery(address, page ? parseInt(page as string) : undefined),
    ])

    if (daos.length < 1)
      return res.status(200).json({
        daos: [],
      })

    res.status(200).json({ tokens, daos } as UserTokensResponse)
  } catch (e) {
    if (e instanceof NotFoundError) {
      return res.status(404).json({ error: 'tokens not found' })
    }

    return res.status(500).json({ error: 'backend failed' })
  }
}

export default handler
