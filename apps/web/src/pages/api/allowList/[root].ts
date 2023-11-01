import { getProof, getTree } from 'lanyard'
import { NextApiRequest, NextApiResponse } from 'next'
import { decodeAbiParameters, parseAbiParameters } from 'viem'

import { AddressType, BytesType } from 'src/typings'

export interface AllowListItem {
  claimant: AddressType
  tokenId: string
  leaf: string
  proof?: string[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { root } = req.query
    if (!root) throw new Error('Invalid merkle root')

    const leaves = await getTree(root as string).then((x) => x?.unhashedLeaves)

    if (!leaves) return res.status(200).send(null)

    const parsedLeaves: AllowListItem[] = await Promise.all(
      leaves.map(async (x) => {
        const [claimant, tokenId] = decodeAbiParameters(
          parseAbiParameters('address claimant, uint256 tokenId'),
          x as BytesType
        )
        const proof = await getProof({ merkleRoot: root as string, unhashedLeaf: x })

        return { claimant, tokenId: tokenId.toString(), leaf: x, proof: proof?.proof }
      })
    )

    res.status(200).send(parsedLeaves)
  } catch (error) {
    console.log('data', error)
    res.status(500).json({ error })
  }
}

export default handler
