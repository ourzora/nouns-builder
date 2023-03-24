import { readContracts } from '@wagmi/core'
import { Flex } from '@zoralabs/zord'
import { ethers } from 'ethers'
import { isAddress } from 'ethers/lib/utils.js'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import useSWR, { unstable_serialize } from 'swr'

import { Meta } from 'src/components/Meta'
import { CACHE_TIMES } from 'src/constants/cacheTimes'
import SWR_KEYS from 'src/constants/swrKeys'
import { auctionAbi, metadataAbi, tokenAbi } from 'src/data/contract/abis'
import getDAOAddresses from 'src/data/contract/requests/getDAOAddresses'
import getToken, { TokenWithWinner } from 'src/data/contract/requests/getToken'
import { getProposal } from 'src/data/graphql/requests/proposalQuery'
import { getDaoLayout } from 'src/layouts/DaoLayout'
import {
  ProposalActions,
  ProposalDescription,
  ProposalDetailsGrid,
  ProposalHeader,
  isProposalOpen,
} from 'src/modules/proposal'
import { NextPageWithLayout } from 'src/pages/_app'
import { ProposalOgMetadata } from 'src/pages/api/og/proposal'
import { propPageWrapper } from 'src/styles/Proposals.css'

export interface VotePageProps {
  proposalId: string
  daoName?: string
  ogImageURL?: string
  token?: TokenWithWinner
}

const VotePage: NextPageWithLayout<VotePageProps> = ({
  proposalId,
  token,
  daoName,
  ogImageURL,
}) => {
  const { query } = useRouter()

  const { data: proposal } = useSWR([SWR_KEYS.PROPOSAL, proposalId], (_, id) =>
    getProposal(id)
  )

  if (!proposal) {
    return null
  }

  const displayActions = isProposalOpen(proposal.status)

  return (
    <Fragment>
      <Meta
        title={`Prop ${proposal.proposalNumber} - ${proposal.title}`}
        slug={'/vote/'}
        image={ogImageURL}
        description={`View this proposal from ${daoName}`}
      />

      <Flex position="relative" direction="column" pb="x30">
        <Flex className={propPageWrapper} gap={{ '@initial': 'x2', '@768': 'x4' }}>
          <ProposalHeader proposal={proposal} />

          {displayActions && <ProposalActions daoName={daoName} proposal={proposal} />}

          <ProposalDetailsGrid proposal={proposal} />

          <ProposalDescription proposal={proposal} collection={query?.token as string} />
        </Flex>
      </Flex>
    </Fragment>
  )
}

VotePage.getLayout = getDaoLayout

export default VotePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.params?.token as string
  const id = context?.params?.id as string

  if (!isAddress(token)) {
    return {
      notFound: true,
    }
  }

  try {
    const [daoContractAddresses, proposal] = await Promise.all([
      getDAOAddresses(token),
      getProposal(id),
    ])
    // 404 page if no proposal is found or any of the dao addresses are missing
    if (!(daoContractAddresses && proposal)) {
      return {
        notFound: true,
      }
    }

    const { maxAge, swr } = isProposalOpen(proposal.status)
      ? CACHE_TIMES.IN_PROGRESS_PROPOSAL
      : CACHE_TIMES.SETTLED_PROPOSAL

    context.res.setHeader(
      'Cache-Control',
      `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
    )

    const [auction, daoName, daoImage] = await readContracts({
      contracts: [
        {
          abi: auctionAbi,
          address: daoContractAddresses.auction,
          functionName: 'auction',
        },
        {
          abi: tokenAbi,
          address: token,
          functionName: 'name',
        },
        {
          abi: metadataAbi,
          address: daoContractAddresses.metadata,
          functionName: 'contractImage',
        },
      ],
    })

    const tokenData = await getToken(token, auction.tokenId.toString())

    if (
      ethers.utils.getAddress(proposal?.collectionAddress) !==
      ethers.utils.getAddress(token)
    ) {
      return {
        notFound: true,
      }
    }

    const ogMetadata: ProposalOgMetadata = {
      proposal: {
        proposalNumber: proposal.proposalNumber,
        title: proposal.title,
        status: proposal.status,
        forVotes: proposal.forVotes,
        againstVotes: proposal.againstVotes,
        abstainVotes: proposal.abstainVotes,
      },
      daoName,
      daoImage,
    }

    const protocol = process.env.VERCEL_ENV === 'development' ? 'http' : 'https'
    const ogImageURL = `${protocol}://${
      context.req.headers.host
    }/api/og/proposal?data=${encodeURIComponent(JSON.stringify(ogMetadata))}`

    return {
      props: {
        fallback: {
          [unstable_serialize([SWR_KEYS.PROPOSAL, proposal?.proposalId])]: proposal,
        },
        proposalId: id,
        token: tokenData,
        addresses: daoContractAddresses,
        daoName,
        ogImageURL,
      },
    }
  } catch (error: any) {
    return {
      notFound: true,
    }
  }
}
