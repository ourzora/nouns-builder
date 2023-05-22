import { NextApiRequest, NextApiResponse } from 'next'

import { myDaosRequest } from 'src/data/graphql/requests/daoQuery'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.query
  const daos = await myDaosRequest([user as string])
  res.status(200).json(daos)
}

export default handler
