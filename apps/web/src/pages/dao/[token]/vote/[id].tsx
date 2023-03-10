import { readContract, readContracts } from '@wagmi/core'
import { Flex } from '@zoralabs/zord'
import { ethers } from 'ethers'
import { isAddress } from 'ethers/lib/utils.js'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import useSWR, { unstable_serialize } from 'swr'

import { Meta } from 'src/components/Meta'
import { PUBLIC_MANAGER_ADDRESS } from 'src/constants/addresses'
import { CACHE_TIMES } from 'src/constants/cacheTimes'
import SWR_KEYS from 'src/constants/swrKeys'
import { auctionAbi, managerAbi, tokenAbi } from 'src/data/contract/abis'
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
import { propPageWrapper } from 'src/styles/Proposals.css'

export interface VotePageProps {
  proposalId: string
  daoName?: string
  token?: TokenWithWinner
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
      readContract({
        abi: managerAbi,
        address: PUBLIC_MANAGER_ADDRESS,
        functionName: 'getAddresses',
        args: [token],
      }),
      getProposal(id),
    ])

    const hasMissingAddresses = Object.values(daoContractAddresses).includes(
      ethers.constants.AddressZero
    )
    // 404 page if no proposal is found or any of the dao addresses are missing
    if (!proposal || hasMissingAddresses) {
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

    const [auction, daoName] = await readContracts({
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
