import { getAddress } from 'ethers/lib/utils.js'
import { NextApiRequest, NextApiResponse } from 'next'

import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import { myDaosRequest } from 'src/data/subgraph/requests/daoQuery'
import { NotFoundError } from 'src/services/errors'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, network } = req.query

  const chain = PUBLIC_DEFAULT_CHAINS.find((x) => x.slug === network)

  if (!chain) return res.status(400).json({ error: 'bad network input' })

  let address: string

  try {
    address = getAddress(user as string)
  } catch (e) {
    return res.status(400).json({ error: 'bad address input' })
  }
  try {
    const daos = await myDaosRequest(chain.id, address)

    res.status(200).json(daos)
  } catch (e) {
    if (e instanceof NotFoundError) {
      return res.status(404).json({ error: 'daos not found' })
    }

    return res.status(500).json({ error: 'backend failed' })
  }
}

export default handler
