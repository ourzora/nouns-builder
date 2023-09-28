import { Box, Flex, Text } from '@zoralabs/zord'
import React, { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { useAccount } from 'wagmi'

import { DisplayPanel } from 'src/components/DisplayPanel'
import SWR_KEYS from 'src/constants/swrKeys'
import {
  ProposalState,
  getProposalState,
} from 'src/data/contract/requests/getProposalState'
import { dashboardRequest } from 'src/data/subgraph/requests/dashboardQuery'
import {
  CurrentAuctionFragment,
  DaoFragment,
  ProposalFragment,
} from 'src/data/subgraph/sdk.generated'
import { CHAIN_ID } from 'src/typings'

import { DaoFeed } from '../dao'
import { DaoAuctionCard } from './DaoAuctionCard'
import { DaoProposals } from './DaoProposals'
import { DashConnect } from './DashConnect'
import { DashPage, DashboardLayout } from './DashboardLayout'
import { AuctionCardSkeleton, DAOCardSkeleton, ProposalCardSkeleton } from './Skeletons'

const ACTIVE_PROPOSAL_STATES = [
  ProposalState.Active,
  ProposalState.Pending,
  ProposalState.Queued,
]

export type DashboardDao = DaoFragment & {
  chainId: CHAIN_ID
  daoImage: string
  auctionConfig: {
    minimumBidIncrement: string
    reservePrice: string
  }
  proposals: (ProposalFragment & { proposalState: ProposalState })[]
  currentAuction?: CurrentAuctionFragment | null
}

const fetchDaoProposalState = async (dao: DashboardDao) => {
  const proposals = await Promise.all(
    dao.proposals.map(async (proposal) => {
      const proposalState = await getProposalState(
        dao.chainId,
        proposal.dao.governorAddress,
        proposal.proposalId
      )
      return { ...proposal, proposalState: proposalState }
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
  try {
    const userDaos = (await dashboardRequest(address)) as unknown as DashboardDao[]
    if (!userDaos) throw new Error('Dashboard DAO query returned undefined')
    const resolved = await Promise.all(userDaos.map(fetchDaoProposalState))
    return resolved
  } catch (error) {
    throw new Error('Error fetching dashboard data')
  }
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
    return (
      <DashPage>
        <Text fontSize={18} mb={'x6'}>
          Something went wrong.
        </Text>
        <DisplayPanel
          title="Error"
          description={
            error?.message || 'Error fetching display data. Error message not found.'
          }
        />
      </DashPage>
    )
  }
  if (isValidating && !mutating) {
    return (
      <DashboardLayout
        auctionCards={Array.from({ length: 3 }).map((_, i) => (
          <AuctionCardSkeleton key={`auctionCardSkeleton:${i}`} />
        ))}
        daoProposals={
          <Box>
            <DAOCardSkeleton />
            {Array.from({ length: 2 }).map((_, i) => (
              <ProposalCardSkeleton key={`daoCardSkeleton:${i}`} />
            ))}
          </Box>
        }
      />
    )
  }
  if (!address) {
    return <DashConnect />
  }
  if (!data?.length) {
    return (
      <DashPage>
        <Text fontSize={18}>It looks like you haven’t joined any DAOs yet.</Text>
        <DaoFeed isDashboard />
      </DashPage>
    )
  }

  const handleMutate = async () => {
    setMutating(true)
    await mutate([`${SWR_KEYS.DASHBOARD}:${address}`], () => fetchDashboardData(address))
    setMutating(false)
  }

  const hasLiveProposals = data.some((dao) => dao.proposals.length)

  return (
    <DashboardLayout
      auctionCards={data.map((dao) => (
        <DaoAuctionCard
          key={`auctionCard:${dao.tokenAddress}`}
          {...dao}
          userAddress={address}
          handleMutate={handleMutate}
        />
      ))}
      daoProposals={
        hasLiveProposals ? (
          data
            .filter((dao) => dao.proposals.length)
            .map((dao) => <DaoProposals key={dao.tokenAddress} {...dao} />)
        ) : (
          <Flex
            borderRadius={'phat'}
            borderStyle={'solid'}
            height={'x32'}
            width={'100%'}
            borderWidth={'normal'}
            borderColor={'border'}
            direction={'column'}
            justify={'center'}
            align={'center'}
          >
            <Text fontSize={20} fontWeight={'display'} mb="x4" color={'text3'}>
              No Active Proposals
            </Text>
            <Text color={'text3'}>
              Currently, none of your DAOs have proposals that are in active, queue, or
              pending states. Check back later!
            </Text>
          </Flex>
        )
      }
    />
  )
}

export default Dashboard
