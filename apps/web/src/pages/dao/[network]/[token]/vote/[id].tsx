import { Box, Flex } from '@zoralabs/zord'
import axios from 'axios'
import { ethers } from 'ethers'
import { isAddress } from 'ethers/lib/utils.js'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import useSWR, { unstable_serialize } from 'swr'

import { Meta } from 'src/components/Meta'
import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import SWR_KEYS from 'src/constants/swrKeys'
import { getProposal } from 'src/data/subgraph/requests/proposalQuery'
import { getDaoLayout } from 'src/layouts/DaoLayout'
import { SectionHandler, useDaoStore } from 'src/modules/dao'
import {
  ProposalActions,
  ProposalDescription,
  ProposalDetailsGrid,
  ProposalHeader,
  isProposalOpen,
} from 'src/modules/proposal'
import { ProposalVotes } from 'src/modules/proposal/components/ProposalVotes'
import { NextPageWithLayout } from 'src/pages/_app'
import { DaoResponse } from 'src/pages/api/dao/[network]/[token]'
import { ProposalOgMetadata } from 'src/pages/api/og/proposal'
import { useChainStore } from 'src/stores/useChainStore'
import { propPageWrapper } from 'src/styles/Proposals.css'
import { AddressType } from 'src/typings'

export interface VotePageProps {
  proposalId: string
  daoName: string
  ogImageURL: string
}

const VotePage: NextPageWithLayout<VotePageProps> = ({
  proposalId,
  daoName,
  ogImageURL,
}) => {
  const { query } = useRouter()
  const { governor } = useDaoStore((x) => x.addresses)
  const chain = useChainStore((x) => x.chain)

  const { data: proposal } = useSWR([SWR_KEYS.PROPOSAL, chain, proposalId], (_, id) =>
    getProposal(chain, proposalId)
  )

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

          {displayActions && <ProposalActions daoName={daoName} proposal={proposal} />}

          <ProposalDetailsGrid proposal={proposal} />
        </Flex>
      </Flex>

      <Box mt="x12" pb="x30">
        <SectionHandler
          sections={sections}
          activeTab={query?.tab ? (query.tab as string) : 'Details'}
          basePath={`/dao/${query?.token}/vote/${query?.id}`}
        />
      </Box>
    </Fragment>
  )
}

VotePage.getLayout = getDaoLayout

export default VotePage

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  const collection = params?.token as AddressType
  const proposalId = params?.id as string
  const network = params?.network as string

  const chain = PUBLIC_DEFAULT_CHAINS.find((x) => x.slug === network)

  if (!chain || !isAddress(collection)) {
    return {
      notFound: true,
    }
  }

  const env = process.env.VERCEL_ENV || 'development'
  const protocol = env === 'development' ? 'http' : 'https'
  const baseUrl = process.env.VERCEL_URL || 'localhost:3000'

  const [{ collectionName, collectionImage, addresses }, proposal] = await Promise.all([
    axios
      .get<DaoResponse>(`${protocol}://${baseUrl}/api/dao/${collection}`)
      .then((x) => x.data),
    getProposal(chain, proposalId),
  ])

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

  const ogMetadata: ProposalOgMetadata = {
    proposal: {
      proposalNumber: proposal.proposalNumber,
      title: proposal.title,
      forVotes: proposal.forVotes,
      againstVotes: proposal.againstVotes,
      abstainVotes: proposal.abstainVotes,
      state: proposal.state,
    },
    daoName: collectionName,
    daoImage: collectionImage,
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
        [unstable_serialize([SWR_KEYS.PROPOSAL, proposal.proposalId])]: proposal,
      },
      daoName: collectionName,
      ogImageURL,
      proposalId,
      addresses,
    },
  }
}
