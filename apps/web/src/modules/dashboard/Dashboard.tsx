import { Flex } from '@zoralabs/zord'
import axios from 'axios'
import React from 'react'
import useSWR from 'swr'
import { useAccount } from 'wagmi'

import { Meta } from 'src/components/Meta'
import {
  ProposalState,
  getProposalState,
} from 'src/data/contract/requests/getProposalState'
import {
  CurrentAuctionFragment,
  DaoFragment,
  ProposalFragment,
} from 'src/data/subgraph/sdk.generated'
import { CHAIN_ID } from 'src/typings'

const ACTIVE_PROPOSAL_STATES = [
  ProposalState.Active,
  ProposalState.Pending,
  ProposalState.Queued,
]

type DashboardDao = DaoFragment & {
  chainId: CHAIN_ID
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
    [`dashboard:${address}`],
    address ? () => fetchDashboardData(address) : null,
    { revalidateOnFocus: false }
  )

  if (error) {
    return <div>error</div>
  }
  if (isValidating) {
    return <div>loading</div>
  }
  if (!data) {
    return <div>no data</div>
  }

  return (
    <Flex direction={'column'} mt={'x5'} minH={'100vh'}>
      <Meta title={'Dashboard'} type={'website'} slug={'/'} />
      <h1 style={{ marginBottom: '20px' }}>Dashboard</h1>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ marginBottom: '12px' }}>DAOs</h2>
        <div>
          {data?.map((dao) => (
            <div> {dao.name}</div>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ marginBottom: '12px' }}>Proposals</h2>
        <div>
          {data?.map((dao) => (
            <>
              <h4 style={{ marginBottom: '8px' }}> {dao.name}</h4>
              {dao.proposals.map((proposal) => (
                <div>{proposal.title}</div>
              ))}
            </>
          ))}
        </div>
      </div>
    </Flex>
  )
}

export default Dashboard
