import { Flex } from '@zoralabs/zord'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import { useAccount } from 'wagmi'

import { Meta } from 'src/components/Meta'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { SuccessModalContent } from 'src/components/Modal/SuccessModalContent'
import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import { SUCCESS_MESSAGES } from 'src/constants/messages'
import SWR_KEYS from 'src/constants/swrKeys'
import { TokenWithWinner } from 'src/data/contract/requests/getToken'
import { useVotes } from 'src/hooks'
import { getDaoLayout } from 'src/layouts/DaoLayout'
import { Auction } from 'src/modules/auction'
import { AuctionSkeleton } from 'src/modules/auction/components/AuctionSkeleton'
import {
  About,
  Activity,
  AdminForm,
  DaoContractAddresses,
  SectionHandler,
  SmartContracts,
} from 'src/modules/dao'
import { NextPageWithLayout } from 'src/pages/_app'
import { DaoResponse } from 'src/pages/api/dao/[network]/[token]'
import { AddressType, Chain } from 'src/typings'

interface TokenPageProps {
  url: string
  chain: Chain
  collection: AddressType
  collectionName: string
  tokenId: string
  addresses: DaoContractAddresses
  ogImageURL: string
}

const TokenPage: NextPageWithLayout<TokenPageProps> = ({
  url,
  chain,
  collection,
  collectionName,
  tokenId,
  addresses,
  ogImageURL,
}) => {
  const { query, replace, pathname } = useRouter()
  const { address } = useAccount()

  const { data: token } = useSWR([SWR_KEYS.TOKEN, chain, collection, tokenId], (_, id) =>
    axios
      .get<TokenWithWinner>(`/api/dao/${query.network}/${collection}/${tokenId}`)
      .then((x) => x.data)
  )

  const { hasThreshold } = useVotes({
    chain,
    signerAddress: address,
    collectionAddress: collection,
    governorAddress: addresses?.governor,
  })

  const handleCloseSuccessModal = () => {
    replace({ pathname, query: { token: collection, tokenId } }, undefined, {
      shallow: true,
    })
  }

  const sections = React.useMemo(() => {
    const aboutSection = {
      title: 'About',
      component: [<About key={'about'} />],
    }

    const proposalsSection = {
      title: 'Activity',
      component: [<Activity key={'proposals'} />],
    }

    const adminSection = {
      title: 'Admin',
      component: [<AdminForm key={'admin'} collectionAddress={collection} />],
    }
    const smartContractsSection = {
      title: 'Smart Contracts',
      component: [<SmartContracts key={'smart_contracts'} />],
    }

    const publicSections = [aboutSection, proposalsSection, smartContractsSection]

    return hasThreshold ? [...publicSections, adminSection] : publicSections
  }, [hasThreshold, collection])

  const description = token?.description ?? ''
  const ogDescription =
    description.length > 111 ? `${description.slice(0, 111)}...` : description

  const activeTab = query?.tab ? (query.tab as string) : 'About'

  return (
    <Flex direction="column" pb="x30">
      <Meta
        title={collectionName || ''}
        type={`${collectionName}:nft`}
        image={ogImageURL}
        slug={url}
        description={ogDescription}
      />
      {token && addresses?.auction ? (
        <Auction
          chain={chain}
          auctionAddress={addresses.auction}
          collection={collection}
          token={token}
        />
      ) : (
        <AuctionSkeleton />
      )}
      <SectionHandler
        sections={sections}
        activeTab={activeTab}
        basePath={`/dao/${query.network}/${collection}/${tokenId}`}
      />

      <AnimatedModal
        open={query?.message === SUCCESS_MESSAGES.PROPOSAL_SUBMISSION_SUCCESS}
        close={handleCloseSuccessModal}
      >
        <SuccessModalContent
          title={`Proposal submitted`}
          subtitle={`Your Proposal has been successfully submitted. It might take a few minutes for it to appear.`}
          success
        />
      </AnimatedModal>
    </Flex>
  )
}

TokenPage.getLayout = getDaoLayout

export default TokenPage

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
  resolvedUrl,
}) => {
  const collection = params?.token as AddressType
  const tokenId = params?.tokenId as string
  const network = params?.network

  const chain = PUBLIC_DEFAULT_CHAINS.find((x) => x.slug === network)

  try {
    const env = process.env.VERCEL_ENV || 'development'
    const protocol = env === 'development' ? 'http' : 'https'
    const baseUrl = process.env.VERCEL_URL || 'localhost:3000'

    const { collectionName, addresses, ogImageURL } = await axios
      .get<DaoResponse>(`${protocol}://${baseUrl}/api/dao/${network}/${collection}`)
      .then((x) => x.data)

    const { maxAge, swr } = CACHE_TIMES.TOKEN_INFO
    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
    )

    return {
      props: {
        url: resolvedUrl,
        chain,
        collection,
        collectionName,
        tokenId,
        addresses,
        ogImageURL,
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}
