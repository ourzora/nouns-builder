import { ethers } from 'ethers'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'

import { SDK } from 'src/data/subgraph/client'
import { Chain } from 'src/typings'

export interface Token {
  id: string
  name?: string
  image?: string
  description?: string
  owner?: string
  mintDate?: string
}

export interface TokenWinner {
  highestBidder?: string
  price?: number
}

export const tokenQuery = async (
  chain: Chain,
  address: string,
  tokenId: string
): Promise<Token | undefined> => {
  if (!address) return

  const data = await SDK.connect(chain.id).token({
    id: `${address.toLowerCase()}:${tokenId}`,
  })

  const token = data?.token

  if (!token) {
    return undefined
  }

  return {
    id: token.tokenId,
    ...omitBy(
      {
        owner: token.owner,
        name: token.name,
        description: token.dao.description,
        image: token.image,
        mintDate: token.mintedAt ? token.mintedAt * 1000 : undefined,
      },
      isUndefined
    ),
  }
}

export const tokenWinnerQuery = async (
  chain: Chain,
  address: string,
  tokenId: string
): Promise<TokenWinner> => {
  const data = await SDK.connect(chain.id).tokenWinner({
    id: `${address.toLowerCase()}:${tokenId}`,
  })

  return omitBy(
    {
      highestBidder: data.auction?.winningBid?.bidder || undefined,
      price: data.auction?.winningBid?.amount
        ? ethers.utils.formatEther(data.auction.winningBid.amount)
        : undefined,
    },
    isUndefined
  )
}
