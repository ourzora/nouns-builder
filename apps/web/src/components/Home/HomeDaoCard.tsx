import useDaoCard from './useDaoCard'
import React from 'react'
import { DaoProps } from 'src/pages'
import { DaoCard } from 'src/modules/dao/components/DaoCard/DaoCard'

interface DaoCardProps {
  dao: DaoProps
}

const HomeDaoCard: React.FC<DaoCardProps> = ({ dao }) => {
  const { highestBid, tokenUri, endTime } = useDaoCard({
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

export default HomeDaoCard
