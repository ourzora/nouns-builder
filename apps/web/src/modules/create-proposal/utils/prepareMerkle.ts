import { createTree, getTree } from 'lanyard'
import { Address, encodeAbiParameters } from 'viem'

import { DaoMember } from 'src/data/subgraph/requests/memberSnapshot'

export const prepareMerkle = async (members: DaoMember[]): Promise<`0x${string}`> => {
  const leaves = members
    .map((member) => member.tokens.map((token) => encode(member.address, token)))
    .flat()

  const resp = await createTree({
    unhashedLeaves: leaves,
  })
  const root = resp.merkleRoot
  const tree = await getTree(root)

  console.log('root:', root)
  /* TESTS */
  console.log(
    'Does 0xd1d1d4e36117ab794ec5d4c78cbd3a8904e691d0 have token #10? Should be false',
    tree?.unhashedLeaves.includes(
      encode('0x53bcfaed43441c7bb6149563ec11f756739c9f6a', 10)
    )
  ) //false
  console.log(
    'Does 0xd1d1d4e36117ab794ec5d4c78cbd3a8904e691d0 have token #10? Should be true',
    tree?.unhashedLeaves.includes(
      encode('0xd1d1d4e36117ab794ec5d4c78cbd3a8904e691d0', 10)
    )
  ) // true
  console.log(
    'Does 0x53bcfaed43441c7bb6149563ec11f756739c9f6a have token #58? Should be true',
    tree?.unhashedLeaves.includes(
      encode('0x53bcfaed43441c7bb6149563ec11f756739c9f6a', 58)
    )
  ) // true

  return root as `0x${string}`
}

const encode = (owner: string, token: number): `0x${string}` => {
  return encodeAbiParameters(
    [
      { name: 'owner', type: 'address' },
      { name: 'tokenId', type: 'uint' },
    ],
    [owner as Address, BigInt(token)]
  )
}
