import { Flex } from '@zoralabs/zord'
import { GetServerSideProps, NextPage } from 'next'
import React, { Fragment, useEffect } from 'react'
import { readAuctionContract } from 'src/utils/readAuctionContract'
import { getToken } from 'src/utils/readTokenContract'
import { DaoContractAddresses, Proposal } from 'src/typings'
import { getDaoContractAddresses } from 'src/utils/getDaoContractAddresses'
import useSWR, { unstable_serialize } from 'swr'
import SWR_KEYS from 'src/constants/swrKeys'
import Meta from 'src/components/Layout/Meta'
import { TokenDataProps } from 'src/typings'
import { getProvider } from 'src/utils/provider'
import { Token__factory } from 'src/constants/typechain'
import {
  ProposalData,
  ProposalDescription,
  ProposalHeader,
  ProposalSucceededActions,
  ProposalVoteActions,
  ProposalVotes,
} from 'src/modules/proposals'
import { propPageWrapper } from 'src/styles/Proposals.css'
import { isProposalOpen, isProposalSuccessful } from 'src/modules/proposals/utils'
import { useRouter } from 'next/router'
import { getProposal } from 'src/query/proposalQuery'
import { getDaoLayout } from 'src/layouts/DaoLayout/DaoLayout'
import { NextPageWithLayout } from 'src/pages/_app'

export interface VotePageProps {
  proposalId: string
  daoName?: string
  token?: TokenDataProps
}

const VotePage: NextPageWithLayout<VotePageProps> = ({ proposalId, token, daoName }) => {
  const { query } = useRouter()

  const { data: proposal } = useSWR([SWR_KEYS.PROPOSAL, proposalId], (_, id) =>
    getProposal(id)
  )

  if (!proposal) {
    return null
  }

  const displayActions = isProposalOpen(proposal.status)
  const displaySucceededActions = isProposalSuccessful(proposal.status)
  return (
    <Fragment>
      <Meta
        title={proposal.title}
        slug={'/vote/'}
        image={token?.media?.original || (token?.image as string)}
        description={`Check out this proposal from ${daoName}`}
      />

      <Flex position="relative" direction="column" pb="x30">
        <Flex className={propPageWrapper} gap={{ '@initial': 'x2', '@768': 'x4' }}>
          <ProposalHeader proposal={proposal} />

          {displaySucceededActions && <ProposalSucceededActions proposal={proposal} />}

          {displayActions && (
            <ProposalVoteActions daoName={daoName} proposal={proposal} />
          )}

          <ProposalVotes proposal={proposal} />

          <ProposalData proposal={proposal} />

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

  try {
    // zora api queries
    const [daoContractAddresses, proposal] = await Promise.all([
      getDaoContractAddresses(token),
      getProposal(id),
    ])

    // 404 page if no proposal is found
    if (!proposal) {
      return {
        notFound: true,
      }
    }

    const provider = getProvider()

    const tokenContract = Token__factory.connect(token, provider)

    const [{ tokenId }, daoName] = await Promise.all([
      readAuctionContract(daoContractAddresses?.auction, daoContractAddresses?.treasury),
      tokenContract.name(),
    ])

    const tokenData = await getToken(token, Number(tokenId))

    return {
      props: {
        fallback: {
          [unstable_serialize([SWR_KEYS.PROPOSAL, proposal?.proposalId])]: proposal,
        },
        proposalId: id,
        token: tokenData,
        daoName,
      },
    }
  } catch (error: any) {
    return {
      notFound: true,
    }
  }
}
