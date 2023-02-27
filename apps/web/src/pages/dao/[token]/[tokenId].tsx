import { Flex } from '@zoralabs/zord'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Meta from 'src/components/Layout/Meta'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { SuccessModalContent } from 'src/components/Modal/SuccessModalContent'
import { SUCCESS_MESSAGES } from 'src/constants/messages'
import SWR_KEYS from 'src/constants/swrKeys'
import getToken from 'src/data/contract/requests/getToken'
import { useVotes } from 'src/hooks'
import { getDaoLayout } from 'src/layouts/DaoLayout/DaoLayout'
import { Auction } from 'src/modules/auction'
import {
  About,
  Activity,
  AdminForm,
  SectionHandler,
  SmartContracts,
} from 'src/modules/dao'
import { NextPageWithLayout } from 'src/pages/_app'
import { useDaoStore } from 'src/stores/useDaoStore'
import { AddressType } from 'src/typings'
import useSWR, { unstable_serialize } from 'swr'
import { useAccount } from 'wagmi'

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
      component: [<Activity key={'proposals'} />],
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
      <Auction
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
