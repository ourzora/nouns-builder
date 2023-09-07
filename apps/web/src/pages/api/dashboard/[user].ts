import { getAddress } from 'ethers/lib/utils.js'
import { NextApiRequest, NextApiResponse } from 'next'

import { dashboardRequest } from 'src/data/subgraph/requests/dashboardQuery'
import { NotFoundError } from 'src/services/errors'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.query

  let address: string

  try {
    address = getAddress(user as string)
  } catch (e) {
    return res.status(400).json({ error: 'bad address input' })
  }
  try {
    const daos = await dashboardRequest(address)

    res.status(200).json(daos)
  } catch (e) {
    if (e instanceof NotFoundError) {
      return res.status(404).json({ error: 'daos not found' })
    }

    return res.status(500).json({ error: 'backend failed' })
  }
}

export default handler
