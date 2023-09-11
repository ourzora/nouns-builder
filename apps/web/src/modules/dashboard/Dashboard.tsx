import { Box, Button, Flex, Text } from '@zoralabs/zord'
import axios from 'axios'
import dayjs from 'dayjs'
import { getFetchableUrl } from 'ipfs-service'
import Image from 'next/image'
import React, { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { Address, formatEther, parseEther } from 'viem'
import { useAccount, useBalance, useContractEvent, useNetwork } from 'wagmi'
import { prepareWriteContract, waitForTransaction, writeContract } from 'wagmi/actions'

import { Avatar } from 'src/components/Avatar'
import { ContractButton } from 'src/components/ContractButton'
import { Meta } from 'src/components/Meta'
import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'
import SWR_KEYS from 'src/constants/swrKeys'
import { auctionAbi } from 'src/data/contract/abis'
import {
  ProposalState,
  getProposalState,
} from 'src/data/contract/requests/getProposalState'
import {
  CurrentAuctionFragment,
  DaoFragment,
  ProposalFragment,
} from 'src/data/subgraph/sdk.generated'
import { useCountdown, useIsMounted } from 'src/hooks'
import { AddressType, CHAIN_ID } from 'src/typings'

import { useMinBidIncrement } from '../auction'
import { Settle } from '../auction/components/CurrentAuction/Settle'
import { bidInput } from './dashboard.css'

function maxChar(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str
  }
  return str.slice(0, maxLength) + '...'
}

const ACTIVE_PROPOSAL_STATES = [
  ProposalState.Active,
  ProposalState.Pending,
  ProposalState.Queued,
]

type DashboardDao = DaoFragment & {
  chainId: CHAIN_ID
  daoImage: string
  auctionConfig: {
    minimumBidIncrement: string
    reservePrice: string
  }
  proposals: ProposalFragment[]
  currentAuction: CurrentAuctionFragment
}

const fetchDaoProposalState = async (dao: DashboardDao) => {
  const proposals = await Promise.all(
    dao.proposals.map(async (proposal) => {
      const proposalState = await getProposalState(
        dao.chainId,
        proposal.dao.governorAddress,
        proposal.proposalId
      )
      return { ...proposal, proposalState }
    })
  )
  return {
    ...dao,
    proposals: proposals.filter((proposal) =>
      ACTIVE_PROPOSAL_STATES.includes(proposal.proposalState)
    ),
  }
}

const fetchDashboardData = async (address: string) => {
  const userDaos = await axios
    .get<DashboardDao[]>(`/api/dashboard/${address}`)
    .then((x) => x.data)

  const resolved = await Promise.all(userDaos.map(fetchDaoProposalState))
  return resolved
}

const Dashboard = () => {
  const { address } = useAccount()

  const { data, error, isValidating } = useSWR(
    [`${SWR_KEYS.DASHBOARD}:${address}`],
    address ? () => fetchDashboardData(address) : null,
    { revalidateOnFocus: false }
  )

  const [mutating, setMutating] = useState(false)

  if (error) {
    return <div>error</div>
  }
  if (isValidating && !mutating) {
    return <div>loading</div>
  }
  if (!address) {
    return <div>no address</div>
  }
  if (!data) {
    return <div>no data</div>
  }

  const handleMutate = async () => {
    setMutating(true)
    await mutate([`${SWR_KEYS.DASHBOARD}:${address}`], () => fetchDashboardData(address))
    setMutating(false)
  }

  return (
    <Flex
      minH={'100vh'}
      pt={{ '@initial': 'x20', '@768': 'x32' }}
      w={'100%'}
      justify="center"
    >
      <Meta title={'Dashboard'} type={'website'} slug={'/'} />
      <Box w="100%" style={{ maxWidth: 912 }}>
        <Text fontSize={35} fontWeight={'display'} mb={'x10'}>
          Dashboard
        </Text>
        <Box mb={'x8'}>
          <Text fontSize={28} fontWeight={'display'} mb={'x6'}>
            DAOs
          </Text>
          {data?.map((dao) => (
            <DaoAuctionCard
              key={`${dao.tokenAddress}:${dao.currentAuction.token.tokenId}`}
              {...dao}
              userAddress={address}
              handleMutate={handleMutate}
            />
          ))}
        </Box>
        <Box>
          <Text fontSize={28} fontWeight={'display'} mb={'x6'}>
            Proposals
          </Text>
          {data
            .filter((dao) => dao.proposals.length)
            .map((dao) => (
              <DaoProposals key={dao.tokenAddress} {...dao} />
            ))}
        </Box>
      </Box>
    </Flex>
  )
}

export default Dashboard

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

const DaoAuctionCard = (
  props: DashboardDao & { userAddress: AddressType; handleMutate: () => void }
) => {
  const {
    currentAuction,
    chainId,
    auctionAddress,
    userAddress,
    auctionConfig,
    handleMutate,
    tokenAddress,
  } = props
  const { name: chainName, icon: chainIcon } =
    PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId) ?? {}

  // const { data: auction } = useSWR(
  //   [SWR_KEYS.AUCTION, chainId, auctionAddress],
  //   (_, chainId, auctionAddress) =>
  //     readContract({
  //       abi: auctionAbi,
  //       address: auctionAddress as AddressType,
  //       functionName: 'auction',
  //       chainId,
  //     }),
  //   { revalidateOnFocus: true }
  // )

  // const [liveTokenId, liveHighestBid, liveHighestBidder, _, liveEndTime, liveSettled] =
  //   unpackOptionalArray(auction, 6)

  // const { data: token } = useSWR(
  //   [
  //     `${SWR_KEYS.TOKEN}:${tokenAddress}:${liveTokenId}`,
  //     chainId,
  //     tokenAddress,
  //     liveTokenId,
  //   ],
  //   (_, id) =>
  //     axios
  //       .get<TokenWithWinner>(`/api/dao/${chainId}/${tokenAddress}/${liveTokenId}`)
  //       .then((x) => x.data)
  // )

  const { endTime } = currentAuction

  const [isEnded, setIsEnded] = useState(false)

  const bidText = currentAuction.highestBid?.amount
    ? formatEther(BigInt(currentAuction.highestBid.amount))
    : 'N/A'

  const isOver = !!endTime ? dayjs.unix(Date.now() / 1000) >= dayjs.unix(endTime) : true
  const onEnd = () => {
    setIsEnded(true)
  }

  // const isTokenActiveAuction =
  //   !liveSettled &&
  //   !!liveTokenId &&
  //   liveTokenId.toString() == currentAuction.token.tokenId

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
  )
}

const DaoProposals = ({ daoImage, tokenAddress, name, proposals }: DashboardDao) => {
  const daoImageSrc = React.useMemo(() => {
    return daoImage ? getFetchableUrl(daoImage) : null
  }, [daoImage])
  return (
    <Box>
      <Flex justify={'space-between'} mb={'x6'}>
        <Flex align={'center'}>
          {daoImageSrc ? (
            <Box mr="x4">
              <Image
                src={daoImageSrc}
                layout="fixed"
                objectFit="contain"
                style={{ borderRadius: '12px' }}
                alt=""
                height={48}
                width={48}
              />
            </Box>
          ) : (
            <Box mr="x4" borderRadius="phat">
              <Avatar address={tokenAddress ?? undefined} size="52" />
            </Box>
          )}
          <Text fontSize={20} fontWeight="label">
            {name}
          </Text>
        </Flex>

        <Button variant="outline" borderRadius="curved">
          Submit Proposal
        </Button>
      </Flex>
      {proposals.map((proposal) => (
        <DaoProposalCard key={proposal.proposalNumber} {...proposal} />
      ))}
    </Box>
  )
}

const DaoProposalCard = ({ title, proposalNumber }: ProposalFragment) => {
  return (
    <Flex
      mb={'x4'}
      w={'100%'}
      borderColor={'border'}
      borderStyle={'solid'}
      borderRadius={'curved'}
      borderWidth={'normal'}
      cursor={'pointer'}
      py={{ '@initial': 'x2', '@768': 'x6' }}
      px={{ '@initial': 'x2', '@768': 'x3' }}
    >
      <Flex>
        <Text fontSize={18} fontWeight="label" color={'text4'} mr={'x4'}>
          {proposalNumber}
        </Text>
        <Text fontSize={18} fontWeight="label">
          {title}
        </Text>
      </Flex>
    </Flex>
  )
}

const BidActionButton = ({
  userAddress,
  chainId,
  auctionConfig,
  currentAuction,
  isEnded,
  auctionAddress,
  isOver,
}: DashboardDao & { userAddress: AddressType; isOver: boolean; isEnded: boolean }) => {
  const { data: balance } = useBalance({ address: userAddress, chainId })
  const { minimumBidIncrement, reservePrice } = auctionConfig
  const { highestBid } = currentAuction
  const { chain: wagmiChain } = useNetwork()
  const { minBidAmount } = useMinBidIncrement({
    highestBid: highestBid?.amount ? BigInt(highestBid?.amount) : undefined,
    reservePrice: BigInt(reservePrice),
    minBidIncrement: BigInt(minimumBidIncrement),
  })

  const [bidAmount, setBidAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isMinBid = Number(bidAmount) >= minBidAmount

  const isValidBid = bidAmount && isMinBid

  const isValidChain = wagmiChain?.id === chainId

  const handleCreateBid = async () => {
    if (!isMinBid || !bidAmount || isLoading) return

    try {
      setIsLoading(true)

      const config = await prepareWriteContract({
        abi: auctionAbi,
        address: auctionAddress as Address,
        functionName: 'createBid',
        args: [BigInt(currentAuction.token.tokenId)],
        value: parseEther(bidAmount.toString()),
      })
      const tx = await writeContract(config)
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })
      setBidAmount('')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isEnded || isOver) {
    return (
      <Box ml={'auto'}>
        <Settle
          isEnding={false}
          owner={highestBid?.bidder}
          externalAuctionAddress={auctionAddress}
        />
      </Box>
    )
  }

  // const handleCreateBid = async () => {

  //   if(!isMinBid)

  // }

  return (
    <>
      <form style={{ marginLeft: 'auto' }}>
        <Box position="relative" mr={{ '@initial': 'x0', '@768': 'x2' }}>
          <input
            className={bidInput}
            placeholder={maxChar(`${minBidAmount} ETH`, 12)}
            type={'number'}
            min={minBidAmount}
            max={balance?.formatted}
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
          <Flex
            position="absolute"
            style={{ top: 0, right: 0, bottom: 0 }}
            align={'center'}
            justify={'center'}
          >
            <Button
              height={'100%'}
              mr={'x4'}
              px={'x0'}
              fontWeight={'label'}
              size="sm"
              variant="ghost"
              style={{
                minWidth: 'fit-content',
                fontWeight: 500,
                paddingLeft: 0,
                paddingRight: 0,
              }}
              onClick={() => setBidAmount(minBidAmount.toString())}
              disabled={Number(bidAmount) >= minBidAmount}
            >
              Min
            </Button>
          </Flex>
        </Box>
      </form>
      <ContractButton
        borderRadius={'curved'}
        disabled={!isValidBid || !isValidChain}
        loading={isLoading}
        handleClick={() => handleCreateBid()}
      >
        Bid
      </ContractButton>
    </>
  )
}
