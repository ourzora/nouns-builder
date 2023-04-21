import { Flex } from '@zoralabs/zord'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR, { unstable_serialize } from 'swr'
import { useAccount } from 'wagmi'

import { Meta } from 'src/components/Meta'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { SuccessModalContent } from 'src/components/Modal/SuccessModalContent'
import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { SUCCESS_MESSAGES } from 'src/constants/messages'
import SWR_KEYS from 'src/constants/swrKeys'
import getDAOAddresses from 'src/data/contract/requests/getDAOAddresses'
import getDaoOgMetadata from 'src/data/contract/requests/getDaoOgMetadata'
import getToken from 'src/data/contract/requests/getToken'
import { useVotes } from 'src/hooks'
import { getDaoLayout } from 'src/layouts/DaoLayout'
import { Auction } from 'src/modules/auction'
import {
  About,
  Activity,
  AdminForm,
  DaoContractAddresses,
  SectionHandler,
  SmartContracts,
} from 'src/modules/dao'
import { NextPageWithLayout } from 'src/pages/_app'
import { AddressType } from 'src/typings'

interface TokenPageProps {
  url: string
  collection: AddressType
  collectionName: string
  tokenId: string
  addresses: DaoContractAddresses
  ogImageURL: string
}

const TokenPage: NextPageWithLayout<TokenPageProps> = ({
  url,
  collection,
  collectionName,
  tokenId,
  addresses,
  ogImageURL,
}) => {
  const { query, replace, pathname } = useRouter()
  const { address } = useAccount()

  const { data: token } = useSWR([SWR_KEYS.TOKEN, collection, tokenId], (_, id) =>
    getToken(collection, tokenId)
  )

  const { hasThreshold } = useVotes({
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

  if (!token || !addresses.auction) {
    return null
  }

  const description = token.description ?? ''
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
      <Auction auctionAddress={addresses.auction} collection={collection} token={token} />
      <SectionHandler
        sections={sections}
        activeTab={activeTab}
        basePath={`/dao/${collection}/${tokenId}`}
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
  req,
  res,
  resolvedUrl,
}) => {
  const { maxAge, swr } = CACHE_TIMES.TOKEN_INFO
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
  )

  const collection = params?.token as AddressType
  const tokenId = params?.tokenId as string

  try {
    const [token, addresses] = await Promise.all([
      getToken(collection, tokenId),
      getDAOAddresses(collection),
    ])

    const daoOgMetadata = await getDaoOgMetadata(
      collection,
      addresses?.metadata as string,
      addresses?.treasury as string
    )

    if (!(addresses && token)) {
      return {
        notFound: true,
      }
    }

    const protocol = process.env.VERCEL_ENV === 'development' ? 'http' : 'https'
    const ogImageURL = `${protocol}://${
      req.headers.host
    }/api/og/dao?data=${encodeURIComponent(JSON.stringify(daoOgMetadata))}`

    return {
      props: {
        fallback: {
          [unstable_serialize([SWR_KEYS.TOKEN, collection, tokenId])]: token,
        },
        url: resolvedUrl,
        collection,
        collectionName: daoOgMetadata.name,
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
