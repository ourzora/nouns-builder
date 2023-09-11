import { Box, Flex, Text } from '@zoralabs/zord'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { formatEther } from 'viem'
import { useContractEvent } from 'wagmi'

import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'
import { auctionAbi } from 'src/data/contract/abis'
import { useCountdown, useIsMounted } from 'src/hooks'
import { AddressType } from 'src/typings'

import { BidActionButton } from './BidActionButton'
import { DashboardDao } from './Dashboard'

export const DaoAuctionCard = (
  props: DashboardDao & { userAddress: AddressType; handleMutate: () => void }
) => {
  const { currentAuction, chainId, auctionAddress, handleMutate, tokenAddress } = props
  const { name: chainName, icon: chainIcon } =
    PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId) ?? {}
  const router = useRouter()
  const { endTime } = currentAuction

  const [isEnded, setIsEnded] = useState(false)

  const bidText = currentAuction.highestBid?.amount
    ? formatEther(BigInt(currentAuction.highestBid.amount))
    : 'N/A'

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
      console.log('AuctionCreated')
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

  return (
    <Link
      href={`/dao/${
        PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId)?.slug
      }/${tokenAddress}`}
      passHref
    >
      <Flex
        mb={'x4'}
        w={'100%'}
        borderColor={'border'}
        borderStyle={'solid'}
        borderRadius={'curved'}
        borderWidth={'normal'}
        cursor={'pointer'}
        py={{ '@initial': 'x2', '@768': 'x3' }}
        px={{ '@initial': 'x2', '@768': 'x6' }}
        align={'center'}
      >
        <Box mr="x6">
          <Image
            src={currentAuction.token.image}
            layout="fixed"
            objectFit="contain"
            style={{ borderRadius: '12px' }}
            alt=""
            height={64}
            width={64}
          />
        </Box>
        <Flex
          direction={'column'}
          style={{
            width: '30%',
          }}
        >
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
          <Text fontSize={20} fontWeight="label">
            {currentAuction.token.name}
          </Text>
        </Flex>
        <Flex
          direction={'column'}
          style={{
            width: '15%',
          }}
        >
          <Text fontSize={16} color="text3" mb={'x1'}>
            Current Bid
          </Text>
          <Text fontSize={18} fontWeight="label">
            {bidText}
          </Text>
        </Flex>
        <Flex
          direction={'column'}
          style={{
            width: '15%',
          }}
        >
          <Text fontSize={16} color="text3" mb={'x1'}>
            Ends In
          </Text>
          <DashCountdown endTime={endTime} onEnd={onEnd} isOver={isOver} />
        </Flex>
        <BidActionButton {...props} isOver={isOver} isEnded={isEnded} />
      </Flex>
    </Link>
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
