import axios from 'axios'
import { Address } from 'viem'

import { AllowListItem } from 'src/pages/api/allowList'
import { BytesType, CHAIN_ID } from 'src/typings'

import { SDK } from '../client'

export const allowListRequest = async ({
  merkleRoot,
  tokenAddress,
  userAddress,
  chainId,
}: {
  merkleRoot: BytesType
  tokenAddress: Address
  userAddress: Address
  chainId: CHAIN_ID
}) => {
  const allowList = await axios
    .get<AllowListItem[]>(`/api/allowList?root=${merkleRoot}&user=${userAddress}`)
    .then((x) => x.data)

  const allUserClaims = allowList.filter((x) => (x.claimant = userAddress))
  const tokenIds = allUserClaims.map((x) => x.tokenId)

  const claimedTokens = await SDK.connect(chainId)
    .tokens({
      where: { tokenId_in: tokenIds, dao: tokenAddress.toLowerCase() },
    })
    .then((x) => x.tokens)

  const tokensToFilter = claimedTokens.map((x) => x.tokenId)
  return allUserClaims.filter((x) => !tokensToFilter.find((y) => y == x.tokenId))
}
