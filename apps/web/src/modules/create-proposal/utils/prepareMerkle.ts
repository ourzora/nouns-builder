import { createTree, getTree } from 'lanyard'
import { Address, encodeAbiParameters } from 'viem'

import { DaoMember } from 'src/data/subgraph/requests/memberSnapshot'

export const prepareMerkle = async (members: DaoMember[]): Promise<string> => {
  const leaves = members
    .map((member) => member.tokens.map((token) => encode(member.address, token)))
    .flat()

  // LANYARD IS UNDEFINED ?
  const resp = await createTree({
    unhashedLeaves: leaves,
    // leafTypeDescriptor: ["address"] // optional, used for abi encoded types
    // packedEncoding: boolean // optional, default false
  })
  const root = resp.merkleRoot
  const tree = await getTree(resp.merkleRoot)

  /* TESTS */

  console.log(
    tree?.unhashedLeaves.includes(
      encode('0x53bcfaed43441c7bb6149563ec11f756739c9f6a', 10)
    )
  ) //false
  console.log(
    tree?.unhashedLeaves.includes(
      encode('0x53bcfaed43441c7bb6149563ec11f756739c9f6a', 58)
    )
  ) // true
  console.log(
    tree?.unhashedLeaves.includes(
      encode('0xd1d1d4e36117ab794ec5d4c78cbd3a8904e691d0', 10)
    )
  ) // true

  return resp.merkleRoot
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
