import React, { Fragment } from 'react'
import { Flex } from '@zoralabs/zord'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { readContract, readContracts } from '@wagmi/core'
import { isAddress } from 'ethers/lib/utils.js'
import { ethers } from 'ethers'
import useSWR, { unstable_serialize } from 'swr'

import getToken from 'src/utils/getToken'
import SWR_KEYS from 'src/constants/swrKeys'
import Meta from 'src/components/Layout/Meta'
import { TokenWithWinner } from 'src/typings'
import { Description, Header, Actions, DetailsGrid } from 'src/modules/proposals'
import { propPageWrapper } from 'src/styles/Proposals.css'
import { isProposalOpen } from 'src/modules/proposals/utils'
import { getProposal } from 'src/query/proposalQuery'
import { getDaoLayout } from 'src/layouts/DaoLayout/DaoLayout'
import { NextPageWithLayout } from 'src/pages/_app'
import { auctionAbi, managerAbi, tokenAbi } from 'src/constants/abis'
import { PUBLIC_MANAGER_ADDRESS } from 'src/constants/addresses'

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
          <Header proposal={proposal} />

          {displayActions && <Actions daoName={daoName} proposal={proposal} />}

          <DetailsGrid proposal={proposal} />

          <Description proposal={proposal} collection={query?.token as string} />
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
