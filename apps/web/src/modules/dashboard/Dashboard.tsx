import { Box, Button, Flex, Text } from '@zoralabs/zord'
import axios from 'axios'
import { getFetchableUrl } from 'ipfs-service'
import Image from 'next/image'
import React from 'react'
import useSWR from 'swr'
import { useAccount } from 'wagmi'

import { Avatar } from 'src/components/Avatar'
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
  daoImage: string
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
            <DaoAuctionCard {...dao} />
          ))}
        </Box>
        <Box>
          <Text fontSize={28} fontWeight={'display'} mb={'x6'}>
            Proposals
          </Text>
          {data
            .filter((dao) => dao.proposals.length)
            .map((dao) => (
              <DaoProposals {...dao} />
            ))}

          {/* <div>
            {data?.map((dao) => (
              <>
                <h4 style={{ marginBottom: '8px' }}> {dao.name}</h4>
                {dao.proposals.map((proposal) => (
                  <div>{proposal.title}</div>
                ))}
              </>
            ))}
          </div> */}
        </Box>
      </Box>
    </Flex>
  )
}

export default Dashboard

const DaoAuctionCard = ({ daoImage, tokenAddress }: DashboardDao) => {
  const daoImageSrc = React.useMemo(() => {
    return daoImage ? getFetchableUrl(daoImage) : null
  }, [daoImage])
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
    >
      {daoImageSrc ? (
        <Box mr="x4">
          <Image
            src={daoImageSrc}
            layout="fixed"
            objectFit="contain"
            style={{ borderRadius: '12px' }}
            alt=""
            height={64}
            width={64}
          />
        </Box>
      ) : (
        <Box mr="x4" borderRadius="phat">
          <Avatar address={tokenAddress ?? undefined} size="52" />
        </Box>
      )}
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
        <DaoProposalCard {...proposal} />
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
