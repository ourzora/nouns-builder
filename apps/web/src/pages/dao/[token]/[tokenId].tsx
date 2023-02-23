import { Flex } from '@zoralabs/zord'
import { GetServerSideProps } from 'next'
import React from 'react'
import Meta from 'src/components/Layout/Meta'
import { useVotes } from 'src/hooks/useVotes'
import { useDaoStore } from 'src/stores/useDaoStore'
import getToken from 'src/data/contract/requests/getToken'
import useSWR, { unstable_serialize } from 'swr'
import SWR_KEYS from 'src/constants/swrKeys'
import AuctionController from 'src/components/Auction/AuctionController'
import {
  AdminForm,
  SmartContracts,
  About,
  Proposals,
  SectionHandler,
} from 'src/modules/dao'
import { SuccessModalContent } from 'src/components/Modal/SuccessModalContent'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { SUCCESS_MESSAGES } from 'src/constants/messages'
import { useRouter } from 'next/router'
import { getDaoLayout } from 'src/layouts/DaoLayout/DaoLayout'
import { NextPageWithLayout } from 'src/pages/_app'
import { useAccount } from 'wagmi'
import { AddressType } from 'src/typings'

interface TokenPageProps {
  url: string
  collection: AddressType
  tokenId: string
}

const TokenPage: NextPageWithLayout<TokenPageProps> = ({ url, collection, tokenId }) => {
  const { query, replace, pathname } = useRouter()
  const addresses = useDaoStore((state) => state.addresses)
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
    replace(
      { pathname, query: { token: query.token, tokenId: query.tokenId } },
      undefined,
      { shallow: true }
    )
  }

  const sections = React.useMemo(() => {
    const aboutSection = {
      title: 'About',
      component: [<About key={'about'} />],
    }

    const proposalsSection = {
      title: 'Activity',
      component: [<Proposals key={'proposals'} />],
    }

    const adminSection = {
      title: 'Admin',
      component: [<AdminForm key={'admin'} />],
    }
    const smartContractsSection = {
      title: 'Smart Contracts',
      component: [<SmartContracts key={'smart_contracts'} />],
    }

    const publicSections = [aboutSection, proposalsSection, smartContractsSection]

    return hasThreshold ? [...publicSections, adminSection] : publicSections
  }, [hasThreshold])

  if (!token || !addresses.auction) {
    return null
  }

  return (
    <Flex direction="column" pb="x30">
      <Meta
        title={token.name || ''}
        type={`${token.name}:nft`}
        image={token.media?.thumbnail || token.image}
        slug={url}
        description={token.description ?? ''}
      />
      <AuctionController
        auctionAddress={addresses.auction}
        collection={query.token as string}
        token={token}
      />
      <SectionHandler sections={sections} />

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
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

  const collection = params?.token as AddressType
  const tokenId = params?.tokenId as string

  const token = await getToken(collection, tokenId)

  if (!token) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      fallback: {
        [unstable_serialize([SWR_KEYS.TOKEN, collection, tokenId])]: token,
      },
      url: resolvedUrl,
      collection,
      tokenId,
    },
  }
}
