import { Box, Flex } from '@zoralabs/zord'
import { ethers } from 'ethers'
import { isAddress } from 'ethers/lib/utils.js'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import useSWR, { unstable_serialize } from 'swr'
import { isAddressEqual } from 'viem'
import { useBalance } from 'wagmi'

import { Icon } from 'src/components/Icon'
import { Meta } from 'src/components/Meta'
import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import SWR_KEYS from 'src/constants/swrKeys'
import { getProposalState } from 'src/data/contract/requests/getProposalState'
import { SDK } from 'src/data/subgraph/client'
import {
  formatAndFetchState,
  getProposal,
} from 'src/data/subgraph/requests/proposalQuery'
import { Proposal_Filter } from 'src/data/subgraph/sdk.generated'
import { getDaoLayout } from 'src/layouts/DaoLayout'
import { DaoContractAddresses, SectionHandler, useDaoStore } from 'src/modules/dao'
import {
  ProposalActions,
  ProposalDescription,
  ProposalDetailsGrid,
  ProposalHeader,
  isProposalOpen,
} from 'src/modules/proposal'
import { ProposalVotes } from 'src/modules/proposal/components/ProposalVotes'
import { NextPageWithLayout } from 'src/pages/_app'
import { ProposalOgMetadata } from 'src/pages/api/og/proposal'
import { useChainStore } from 'src/stores/useChainStore'
import { propPageWrapper } from 'src/styles/Proposals.css'
import { AddressType } from 'src/typings'

export interface VotePageProps {
  proposalId: string
  daoName: string
  ogImageURL: string
}

const BAD_ACTORS = [
  '0xfd637806e0D22Ca8158AB8bb5826e6fEDa82c15f',
  '0xb8fa1f523976008e9db686fcfdb5e57f1ca43f50',
]

const checkDrain = (values: string[], treasuryBalance: bigint) => {
  const proposalValue = values.reduce((acc, numStr) => acc + BigInt(numStr), BigInt(0))
  const thresholdAmt = (treasuryBalance * BigInt(90)) / BigInt(100)

  return proposalValue >= thresholdAmt
}

const VotePage: NextPageWithLayout<VotePageProps> = ({
  proposalId,
  daoName,
  ogImageURL,
}) => {
  const { query } = useRouter()
  const chain = useChainStore((x) => x.chain)
  const { addresses } = useDaoStore()

  const { data: balance } = useBalance({
    address: addresses?.treasury as `0x${string}`,
    chainId: chain.id,
  })

  const { data } = useSWR(
    [SWR_KEYS.PROPOSAL, chain.id, proposalId, addresses.governor],
    async (_, id) => {
      try {
        const proposal = await getProposal(chain.id, proposalId)
        const state = await getProposalState(
          chain.id,
          addresses.governor as AddressType,
          proposalId as AddressType
        )
        return { proposal, proposalState: state }
      } catch (error) {
        throw new Error('Proposal Data not found')
      }
    }
  )

  const { proposal, proposalState } = data || {}

  const sections = React.useMemo(() => {
    if (!proposal) return []
    return [
      {
        title: 'Details',
        component: [
          <ProposalDescription proposal={proposal} collection={query?.token as string} />,
        ],
      },
      {
        title: 'Votes',
        component: [<ProposalVotes proposal={proposal} />],
      },
    ]
  }, [proposal])

  if (!proposal) {
    return null
  }

  const displayActions = isProposalOpen(proposal.state)
  const isBadActor = BAD_ACTORS.some((baddie) =>
    isAddressEqual(proposal.proposer, baddie as AddressType)
  )
  const isActive = proposalState ? isProposalOpen(proposalState) : false
  const isPossibleDrain = balance?.value
    ? checkDrain(proposal.values, balance?.value)
    : false
  const warn = isActive && (isBadActor || isPossibleDrain)

  return (
    <Fragment>
      <Meta
        title={`Prop ${proposal.proposalNumber} - ${proposal.title}`}
        slug={'/vote/'}
        image={ogImageURL}
        description={`View this proposal from ${daoName}`}
      />

      <Flex position="relative" direction="column">
        <Flex className={propPageWrapper} gap={{ '@initial': 'x2', '@768': 'x4' }}>
          <ProposalHeader proposal={proposal} />
          <>
            {warn && (
              <Flex
                w="100%"
                backgroundColor="negative"
                color="onNegative"
                p="x4"
                borderRadius="curved"
                align="center"
                justify="center"
              >
                <Icon fill="onNegative" id="warning" mr="x2" />
                <Box fontWeight={'heading'}>
                  This proposal may be malicious. Please review and vote accordingly.
                </Box>
              </Flex>
            )}

            {displayActions && <ProposalActions daoName={daoName} proposal={proposal} />}
          </>

          <ProposalDetailsGrid proposal={proposal} />
        </Flex>
      </Flex>

      <Box mt="x12" pb="x30">
        <SectionHandler
          sections={sections}
          activeTab={query?.tab ? (query.tab as string) : 'Details'}
          basePath={`/dao/${chain.slug}/${query?.token}/vote/${query?.id}`}
        />
      </Box>
    </Fragment>
  )
}

VotePage.getLayout = getDaoLayout

export default VotePage

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  const collection = params?.token as AddressType
  const proposalIdOrNumber = params?.id as `0x${string}`
  const network = params?.network as string

  const chain = PUBLIC_DEFAULT_CHAINS.find((x) => x.slug === network)

  if (!chain || !isAddress(collection)) {
    return {
      notFound: true,
    }
  }

  const env = process.env.VERCEL_ENV || 'development'
  const protocol = env === 'development' ? 'http' : 'https'

  let where: Proposal_Filter

  where = proposalIdOrNumber.startsWith('0x')
    ? {
        proposalId: proposalIdOrNumber,
      }
    : { proposalNumber: parseInt(proposalIdOrNumber), dao: collection.toLowerCase() }

  const data = await SDK.connect(chain.id)
    .proposalOGMetadata({
      where,
      first: 1,
    })
    .then((x) => (x.proposals.length > 0 ? x.proposals[0] : undefined))

  if (!data) {
    return {
      notFound: true,
    }
  }

  const proposal = await formatAndFetchState(chain.id, data)

  if (!proposal) {
    return {
      notFound: true,
    }
  }

  if (
    ethers.utils.getAddress(proposal.dao.tokenAddress) !==
    ethers.utils.getAddress(collection)
  ) {
    return {
      notFound: true,
    }
  }

  const {
    name,
    contractImage,
    tokenAddress,
    metadataAddress,
    governorAddress,
    treasuryAddress,
    auctionAddress,
  } = data.dao

  const ogMetadata: ProposalOgMetadata = {
    proposal: {
      proposalNumber: proposal.proposalNumber,
      title: proposal.title,
      forVotes: proposal.forVotes,
      againstVotes: proposal.againstVotes,
      abstainVotes: proposal.abstainVotes,
      state: proposal.state,
    },
    daoName: name,
    daoImage: contractImage,
  }

  const addresses: DaoContractAddresses = {
    token: tokenAddress,
    metadata: metadataAddress,
    governor: governorAddress,
    treasury: treasuryAddress,
    auction: auctionAddress,
  }

  const ogImageURL = `${protocol}://${
    req.headers.host
  }/api/og/proposal?data=${encodeURIComponent(JSON.stringify(ogMetadata))}`

  const { maxAge, swr } = isProposalOpen(proposal.state)
    ? CACHE_TIMES.IN_PROGRESS_PROPOSAL
    : CACHE_TIMES.SETTLED_PROPOSAL

  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
  )

  return {
    props: {
      fallback: {
        [unstable_serialize([SWR_KEYS.PROPOSAL, chain.id, proposal.proposalId])]:
          proposal,
      },
      daoName: name,
      ogImageURL,
      proposalId: proposal.proposalId,
      addresses,
    },
  }
}
