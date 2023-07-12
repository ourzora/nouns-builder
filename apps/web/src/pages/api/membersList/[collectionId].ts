import { NextApiRequest, NextApiResponse } from 'next'

import { membersListRequest } from 'src/data/subgraph/requests/daoMembersList'
import { CHAIN_ID } from 'src/typings'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionId, chainId } = req.query

  try {
    if (!collectionId || !chainId) {
      throw new Error('Invalid query')
    }
    const membersList = await membersListRequest(
      Number(chainId) as CHAIN_ID,
      (collectionId as string).toLowerCase()
    )
    res.status(200).json({ membersList })
  } catch (error) {
    res.status(500).json({ error })
  }
}
export default handler
