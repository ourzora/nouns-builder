import { Box, Flex, Spinner, Text } from '@zoralabs/zord'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { formatEther } from 'viem'
import { useAccount, useContractEvent } from 'wagmi'

import { Icon } from 'src/components/Icon'
import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'
import { auctionAbi } from 'src/data/contract/abis'
import { subscribeToNotif } from 'src/data/notifsHasura/actions/subscribeToNotif'
import { unsubscribeToNotif } from 'src/data/notifsHasura/actions/unsubscribeToNotif'
import { useCountdown, useIsMounted } from 'src/hooks'
import { AddressType } from 'src/typings'
import { NotificationType, UserNotification } from 'src/typings/pushWebhookTypes'

import { overflowEllipsis } from '../auction/components/Auction.css'
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
  handleNotifChange: () => void
  userNotifications?: UserNotification[]
}

export const DaoAuctionCard = (props: DaoAuctionCardProps) => {
  const {
    currentAuction,
    chainId,
    auctionAddress,
    handleMutate,
    tokenAddress,
    userNotifications,
    handleNotifChange,
  } = props
  const { name: chainName, icon: chainIcon } =
    PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId) ?? {}
  const router = useRouter()
  const { endTime } = currentAuction ?? {}
  const { address } = useAccount()
  const [isEnded, setIsEnded] = useState(false)
  const [isLoadingSub, setIsLoadingSub] = useState(false)

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
  const userSubscription = useMemo(() => {
    if (!userNotifications) return

    return userNotifications.find((notif) => notif.daoAddress === tokenAddress)
  }, [userNotifications, tokenAddress])

  const toggleSubscribe = () => {
    if (!address) return
    try {
      if (!userSubscription) {
        setIsLoadingSub(true)
        subscribeToNotif(address, tokenAddress, chainId, NotificationType.Auction).then(
          () => {
            setIsLoadingSub(false)
            handleNotifChange()
          }
        )
      } else {
        setIsLoadingSub(true)
        unsubscribeToNotif(address, tokenAddress, chainId, NotificationType.Auction).then(
          () => {
            setIsLoadingSub(false)
            handleNotifChange()
          }
        )
      }
    } catch (error) {
      console.error(error)
      setIsLoadingSub(false)
    }
  }
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
    ? `${formatEther(BigInt(currentAuction.highestBid.amount))} ETH`
    : 'N/A'

  return (
    <Flex className={outerAuctionCard}>
      <Box
        position="absolute"
        top="x1"
        cursor="pointer"
        onClick={toggleSubscribe}
        style={{
          top: '43%',
          right: -4,
        }}
      >
        {isLoadingSub ? (
          <Spinner mr="x2" />
        ) : (
          <Icon id="bell-16" fill={userSubscription ? 'positive' : 'text4'} />
        )}
      </Box>
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
          <Text fontSize={18} fontWeight="label" className={overflowEllipsis}>
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
