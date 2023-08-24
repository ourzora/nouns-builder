import React from 'react'

import { DaoCard } from 'src/modules/dao'
import { DaoProps } from 'src/pages'
import { useChainStore } from 'src/stores/useChainStore'

import { useDaoFeedCard } from '../../hooks'
import { DaoFeedCardSkeleton } from './DaoFeedSkeleton'

interface DaoCardProps {
  dao: DaoProps
}

export const DaoFeedCard: React.FC<DaoCardProps> = ({ dao }) => {
  const chain = useChainStore((x) => x.chain)
  const { highestBid, tokenId, tokenUri, endTime } = useDaoFeedCard({
    collectionAddress: dao.tokenAddress,
    auctionAddress: dao.auctionAddress,
    chainId: chain.id,
  })

  if (!tokenUri?.image || !tokenUri?.name) {
    return <DaoFeedCardSkeleton />
  }

  return (
    <DaoCard
      tokenName={tokenUri?.name}
      tokenImage={tokenUri?.image}
      tokenId={tokenId?.toString()}
      collectionName={dao?.name}
      collectionAddress={dao.tokenAddress}
      bid={highestBid}
      endTime={endTime as number}
    />
  )
}
