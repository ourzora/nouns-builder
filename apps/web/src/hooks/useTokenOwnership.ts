import { CHAIN } from '../constants/network'
import { sdk } from '../graphql/client'
import useSWR from 'swr'
import { readProposalThreshold } from 'src/utils/readGovernorContract'
import SWR_KEYS from 'src/constants/swrKeys'
import { useRouter } from 'next/router'
import { useSigner } from 'wagmi'

export const useTokenOwnership = ({
  collectionAddress,
  governorAddress,
  signerAddress,
}: {
  collectionAddress: string
  governorAddress?: string
  signerAddress: string | null
}) => {
  const { data: proposalThreshold } = useSWR(
    governorAddress ? [SWR_KEYS.PROPOSAL_THRESHOLD, collectionAddress] : null,
    () => readProposalThreshold(governorAddress || ''),
    {
      revalidateOnFocus: false,
    }
  )

  const { data: nftCount } = useSWR(
    signerAddress ? [SWR_KEYS.NFT_COUNT, collectionAddress, signerAddress] : null,
    async (_, collectionAddress, signer) => {
      const data = await sdk.nftCount({
        collectionAddress: collectionAddress,
        ownerAddress: signer,
        chain: CHAIN,
      })

      return data.aggregateStat.nftCount
    },
    {
      revalidateOnFocus: false,
    }
  )

  if (typeof nftCount === 'undefined' || typeof proposalThreshold === 'undefined') {
    return {
      isOwner: false,
      hasThreshold: false,
    }
  }

  return {
    isOwner: nftCount > proposalThreshold,
    hasThreshold: nftCount > 0,
  }
}
