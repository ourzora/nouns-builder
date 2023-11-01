import { Flex } from '@zoralabs/zord'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useAccount } from 'wagmi'

import { Meta } from 'src/components/Meta'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { SuccessModalContent } from 'src/components/Modal/SuccessModalContent'
import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import { CAST_ENABLED } from 'src/constants/farcasterEnabled'
import { SUCCESS_MESSAGES } from 'src/constants/messages'
import { SDK } from 'src/data/subgraph/client'
import { TokenWithDaoQuery } from 'src/data/subgraph/sdk.generated'
import { useVotes } from 'src/hooks'
import { getDaoLayout } from 'src/layouts/DaoLayout'
import {
  About,
  Activity,
  AdminForm,
  DaoContractAddresses,
  SectionHandler,
  SmartContracts,
} from 'src/modules/dao'
import { DaoTopSection } from 'src/modules/dao/components/DaoTopSection'
import FeedTab from 'src/modules/dao/components/Feed/Feed'
import { NextPageWithLayout } from 'src/pages/_app'
import { DaoOgMetadata } from 'src/pages/api/og/dao'
import { AddressType, Chain } from 'src/typings'
import { isPossibleMarkdown } from 'src/utils/helpers'

export type TokenWithDao = NonNullable<TokenWithDaoQuery['token']>

interface TokenPageProps {
  url: string
  chain: Chain
  collection: AddressType
  token: TokenWithDao
  name: string
  description: string
  tokenId: string
  addresses: DaoContractAddresses
  ogImageURL: string
}

const TokenPage: NextPageWithLayout<TokenPageProps> = ({
  url,
  chain,
  collection,
  token,
  description,
  name,
  addresses,
  ogImageURL,
}) => {
  const { query, replace, pathname } = useRouter()
  const { address } = useAccount()

  const { hasThreshold } = useVotes({
    chainId: chain.id,
    signerAddress: address,
    collectionAddress: collection,
    governorAddress: addresses?.governor,
  })

  const handleCloseSuccessModal = () => {
    replace(
      {
        pathname,
        query: { token: collection, network: chain.slug, tokenId: token.tokenId },
      },
      undefined,
      {
        shallow: true,
      }
    )
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
      title: 'Contracts',
      component: [<SmartContracts key={'smart_contracts'} />],
    }
    const daoFeed = {
      title: 'Feed',
      component: [<FeedTab key="feed" collectionAddress={collection} />],
    }

    const publicSections = [aboutSection, proposalsSection, smartContractsSection]

    const baseSections = hasThreshold ? [...publicSections, adminSection] : publicSections
    return CAST_ENABLED.includes(collection)
      ? [...baseSections.slice(0, 1), daoFeed, ...baseSections.slice(1)]
      : baseSections
  }, [hasThreshold, collection])

  const ogDescription = useMemo(() => {
    if (!description) return ''
    const isMarkdown = isPossibleMarkdown(description)

    // DAO descriptions are full of MD syntax and do not provide a pleasant
    // reading experience for social embeds. For this, we'll check if the
    // description is markdown and if so, we'll provide a generic description
    if (isMarkdown) {
      return `${
        name || 'This DAO'
      } was created on Nouns Builder. Please click the link to see more.`
    }
    // remove line breaks and formatting from og description
    const cleanDesc = description.replace(/(\r\n|\n|\r|\t|\v|\f|\\n)/gm, '')
    return cleanDesc.length > 111 ? `${cleanDesc.slice(0, 111)}...` : cleanDesc
  }, [description, name])

  const activeTab = query?.tab ? (query.tab as string) : 'About'

  return (
    <Flex direction="column" pb="x30">
      <Meta
        title={name || ''}
        type={`${name}:nft`}
        image={ogImageURL}
        slug={url}
        description={ogDescription}
        farcaster={{
          name,
          contractAddress: collection,
          chain,
          image: token.image,
        }}
      />

      <DaoTopSection
        chain={chain}
        collection={collection}
        auctionAddress={addresses.auction!}
        token={token}
      />
      <SectionHandler
        sections={sections}
        activeTab={activeTab}
        basePath={`/dao/${query.network}/${collection}/${token.tokenId}`}
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
  req,
  resolvedUrl,
}) => {
  const collection = params?.token as AddressType
  const tokenId = params?.tokenId as string
  const network = params?.network

  try {
    const chain = PUBLIC_DEFAULT_CHAINS.find((x) => x.slug === network)
    if (!chain) throw new Error('Invalid network')

    const env = process.env.VERCEL_ENV || 'development'
    const protocol = env === 'development' ? 'http' : 'https'

    const token = await SDK.connect(chain.id)
      .tokenWithDao({
        id: `${collection.toLowerCase()}:${tokenId}`,
      })
      .then((x) => x.token)

    if (!token) throw new Error('Token not found')

    const {
      name,
      description,
      contractImage,
      totalSupply,
      ownerCount,
      proposalCount,
      metadataAddress,
      treasuryAddress,
      governorAddress,
      auctionAddress,
    } = token.dao

    const addresses: DaoContractAddresses = {
      token: collection,
      metadata: metadataAddress,
      treasury: treasuryAddress,
      governor: governorAddress,
      auction: auctionAddress,
    }

    const daoOgMetadata: DaoOgMetadata = {
      name,
      contractImage,
      totalSupply,
      ownerCount,
      proposalCount,
      chainId: chain.id,
      treasuryAddress,
    }

    const ogImageURL = `${protocol}://${
      req.headers.host
    }/api/og/dao?data=${encodeURIComponent(JSON.stringify(daoOgMetadata))}`

    const { maxAge, swr } = CACHE_TIMES.TOKEN_INFO
    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
    )

    const props: TokenPageProps = {
      url: resolvedUrl,
      chain,
      collection,
      name,
      token,
      description: description || '',
      tokenId,
      addresses,
      ogImageURL,
    }

    return {
      props,
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}
