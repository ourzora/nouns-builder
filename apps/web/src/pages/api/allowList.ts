import { getTree } from 'lanyard'
import { NextApiRequest, NextApiResponse } from 'next'
import { decodeAbiParameters, parseAbiParameters } from 'viem'

import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { AddressType, BytesType } from 'src/typings'

export interface AllowListItem {
  claimant: AddressType
  tokenId: string
  leaf: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { root, user } = req.query
    if (!root || !user) return res.status(400).end()

    const { maxAge, swr } = CACHE_TIMES.ALLOWLIST
    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
    )

    const leaves = await getTree(root as string).then((x) => x?.unhashedLeaves)

    if (!leaves) return res.status(200).send(null)

    const allItems: AllowListItem[] = await Promise.all(
      leaves.map(async (x) => {
        const [claimant, tokenId] = decodeAbiParameters(
          parseAbiParameters('address claimant, uint256 tokenId'),
          x as BytesType
        )

        return { claimant, tokenId: tokenId.toString(), leaf: x }
      })
    )

    const userItems = allItems.filter((x) => x.claimant === user)

    res.status(200).send(userItems)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default handler
