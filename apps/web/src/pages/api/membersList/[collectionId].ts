import { NextApiRequest, NextApiResponse } from 'next'

import { membersListRequest } from 'src/data/subgraph/requests/daoMembersList'
import { CHAIN_ID } from 'src/typings'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionId, chainId } = req.query
  try {
    const membersList = await membersListRequest(
      Number(chainId) as CHAIN_ID,
      collectionId as string
    )
    res.status(200).json({ membersList })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
export default handler
