import React from 'react'
import { DaoCard } from 'src/modules/dao'
import { DaoProps } from 'src/pages'

import { useDaoFeedCard } from '../../hooks'

interface DaoCardProps {
  dao: DaoProps
}

export const DaoFeedCard: React.FC<DaoCardProps> = ({ dao }) => {
  const { highestBid, tokenUri, endTime } = useDaoFeedCard({
    collectionAddress: dao.collectionAddress,
    auctionAddress: dao.auctionAddress,
  })

  if (!tokenUri?.image || !tokenUri?.name) {
    return null
  }

  return (
    <DaoCard
      tokenName={tokenUri?.name}
      tokenImage={tokenUri?.image}
      collectionName={dao?.name}
      collectionAddress={dao.collectionAddress}
      bid={highestBid}
      endTime={endTime as number}
    />
  )
}
