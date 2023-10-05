import { Box, Flex, Text } from '@zoralabs/zord'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { formatEther } from 'viem'
import { useContractEvent } from 'wagmi'

import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'
import { auctionAbi } from 'src/data/contract/abis'
import { useCountdown, useIsMounted } from 'src/hooks'
import { AddressType } from 'src/typings'

import { AuctionPaused } from './AuctionPaused'
import { BidActionButton } from './BidActionButton'
import { DashboardDaoProps } from './Dashboard'
import {
  auctionCardBrand,
  bidBox,
  daoAvatar,
  daoAvatarBox,
  daoTokenName,
  outerAuctionCard,
  stats,
  statsBox,
} from './dashboard.css'

type DaoAuctionCardProps = DashboardDaoProps & {
  userAddress: AddressType
  handleMutate: () => void
}

export const DaoAuctionCard = (props: DaoAuctionCardProps) => {
  const { currentAuction, chainId, auctionAddress, handleMutate, tokenAddress } = props
  const { name: chainName, icon: chainIcon } =
    PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId) ?? {}
  const router = useRouter()
  const { endTime } = currentAuction ?? {}

  const [isEnded, setIsEnded] = useState(false)

  const isOver = !!endTime ? dayjs.unix(Date.now() / 1000) >= dayjs.unix(endTime) : true
  const onEnd = () => {
    setIsEnded(true)
  }

  useContractEvent({
    address: auctionAddress,
    abi: auctionAbi,
    eventName: 'AuctionCreated',
    chainId,
    listener: async () => {
      setTimeout(() => {
        handleMutate()
      }, 3000)
    },
  })
  useContractEvent({
    address: auctionAddress,
    abi: auctionAbi,
    eventName: 'AuctionBid',
    chainId,
    listener: async () => {
      setTimeout(() => {
        handleMutate()
      }, 3000)
    },
  })
  const handleSelectAuction = () => {
    router.push(`/dao/${currentChainSlug}/${tokenAddress}`)
  }
  const currentChainSlug = PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId)?.slug

  if (!currentAuction) {
    return (
      <AuctionPaused
        {...props}
        currentChainSlug={currentChainSlug}
        tokenAddress={tokenAddress}
        chainName={chainName}
        chainIcon={chainIcon}
      />
    )
  }

  const bidText = currentAuction.highestBid?.amount
    ? formatEther(BigInt(currentAuction.highestBid.amount))
    : 'N/A'

  return (
    <Flex className={outerAuctionCard}>
      <Flex className={auctionCardBrand} onClick={handleSelectAuction}>
        <Box className={daoAvatarBox}>
          <Image
            className={daoAvatar}
            src={currentAuction?.token?.image}
            layout="fixed"
            alt=""
          />
        </Box>
        <Box>
          <Flex mb="x1" align="center">
            {chainIcon && (
              <Image
                src={chainIcon}
                layout="fixed"
                objectFit="contain"
                style={{ borderRadius: '12px', maxHeight: '22px' }}
                alt=""
                height={22}
                width={22}
              />
            )}
            <Text fontSize={16} color="text3" ml={'x1'}>
              {chainName}
            </Text>
          </Flex>
          <Text className={daoTokenName}>{currentAuction.token.name}</Text>
        </Box>
      </Flex>
      <Flex className={statsBox}>
        <Box className={stats}>
          <Text fontSize={16} color="text3" mb={'x1'}>
            Current Bid
          </Text>
          <Text fontSize={18} fontWeight="label">
            {bidText}
          </Text>
        </Box>
        <Box className={stats}>
          <Text fontSize={16} color="text3" mb={'x1'}>
            Ends In
          </Text>
          <DashCountdown endTime={endTime} onEnd={onEnd} isOver={isOver} />
        </Box>
      </Flex>
      <Flex className={bidBox}>
        <BidActionButton {...props} isOver={isOver} isEnded={isEnded} />
      </Flex>
    </Flex>
  )
}

const DashCountdown = ({
  endTime,
  onEnd,
  isOver,
}: {
  endTime: string | null
  onEnd: () => void
  isOver: boolean
}) => {
  const { countdownString } = useCountdown(Number(endTime), onEnd)
  const isMounted = useIsMounted()
  const countdownText = !endTime || isOver ? 'N/A' : countdownString
  if (!isMounted) return null
  return (
    <Text fontSize={18} fontWeight="label">
      {countdownText}
    </Text>
  )
}
