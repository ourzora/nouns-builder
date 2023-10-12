import { AddressType, CHAIN_ID } from 'src/typings'

import { SDK } from '../client'

export const getProposalVotes = async (proposalId: string, chainId: CHAIN_ID) => {
  try {
    const res = await SDK.connect(chainId).proposalVotes({ proposalId })

    return res?.proposal?.votes
  } catch (error: any) {
    throw new Error((error?.message as string) || 'Error fetching proposal votes')
  }
}

export const hasUserVoted = async (
  proposalId: string,
  userAddress: AddressType,
  chainId: CHAIN_ID
) => {
  try {
    const votes = await getProposalVotes(proposalId, chainId)

    return votes?.some?.((vote) => vote.voter === userAddress.toLowerCase())
  } catch (error: any) {
    throw new Error((error?.message as string) || 'Error fetching proposal votes')
  }
}
