import { Flex, Text, atoms, theme } from '@zoralabs/zord'
import { isAddress } from 'ethers/lib/utils.js'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { readContracts } from 'wagmi/actions'

import { Meta } from 'src/components/Meta'
import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import { auctionAbi } from 'src/data/contract/abis'
import getDAOAddresses from 'src/data/contract/requests/getDAOAddresses'
import { getDaoLayout } from 'src/layouts/DaoLayout'
import NogglesLogo from 'src/layouts/assets/builder-framed.svg'
import {
  Activity,
  DaoContractAddresses,
  PreAuction,
  PreAuctionForm,
  SectionHandler,
  SmartContracts,
  useDaoStore,
} from 'src/modules/dao'
import { NextPageWithLayout } from 'src/pages/_app'
import { AddressType, CHAIN_ID } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'

interface DaoPageProps {
  chainId: CHAIN_ID
  addresses: DaoContractAddresses
  collectionAddress: AddressType
}

const DaoPage: NextPageWithLayout<DaoPageProps> = ({ chainId, collectionAddress }) => {
  const { query } = useRouter()

  const { address: signerAddress } = useAccount()
  const { addresses } = useDaoStore()

  const { data: owner } = useContractRead({
    abi: auctionAbi,
    address: addresses.auction,
    functionName: 'owner',
    chainId,
  })

  const sections = [
    {
      title: 'Activity',
      component: [<Activity key={'proposals'} />],
    },
    {
      title: 'Admin',
      component: [<PreAuctionForm key={'admin'} />],
    },
    {
      title: 'Smart Contracts',
      component: [<SmartContracts key={'smart_contracts'} />],
    },
  ]

  if (!owner) {
    return null
  }

  const isOwner = owner === signerAddress

  if (!isOwner) {
    return (
      <Flex direction={'column'} align={'center'} width={'100%'} height={'100vh'}>
        <Flex mt={'x64'} direction="column" align={'center'}>
          <NogglesLogo
            fill={theme.colors.text4}
            className={atoms({ width: 'x23', cursor: 'pointer' })}
          />
          <Text mt={'x2'} color="text4">
            There’s nothing here yet
          </Text>
        </Flex>
      </Flex>
    )
  }

  const activeTab = query?.tab ? (query.tab as string) : 'Activity'
  const chain = PUBLIC_DEFAULT_CHAINS.find((x) => x.id === chainId)

  if (!chain) return null

  return (
    <Flex direction="column" pb="x30">
      <Meta title={'dao page'} slug={'/'} />

      <PreAuction chain={chain} collectionAddress={collectionAddress} />

      <SectionHandler
        sections={sections}
        activeTab={activeTab}
        basePath={`/dao/${query.network}/${collectionAddress}`}
      />
    </Flex>
  )
}

DaoPage.getLayout = getDaoLayout

export default DaoPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { maxAge, swr } = CACHE_TIMES.DAO_INFO
  context.res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
  )

  const collectionAddress = context?.params?.token as AddressType
  const network = context?.params?.network
  const tab = context?.query?.tab as string

  const chain = PUBLIC_DEFAULT_CHAINS.find((x) => x.slug === network)

  if (!isAddress(collectionAddress) || !chain) {
    return {
      notFound: true,
    }
  }

  try {
    const addresses = await getDAOAddresses(chain.id, collectionAddress)
    if (!addresses) {
      return {
        notFound: true,
      }
    }

    const [auction, owner] = await readContracts({
      allowFailure: false,
      contracts: [
        {
          abi: auctionAbi,
          address: addresses.auction as AddressType,
          functionName: 'auction',
          chainId: chain.id,
        },
        {
          abi: auctionAbi,
          address: addresses.auction as AddressType,
          functionName: 'owner',
          chainId: chain.id,
        },
      ],
    })

    const [tokenId, highestBid, highestBidder, startTime, endTime, settled] =
      unpackOptionalArray(auction, 6)

    const initialized: boolean =
      endTime !== 0 && startTime !== 0 && owner === addresses.treasury

    if (!initialized) {
      return {
        props: {
          chainId: chain.id,
          addresses,
          collectionAddress,
        },
      }
    }

    return {
      redirect: {
        destination: `/dao/${network}/${collectionAddress}/${tokenId}${
          tab ? `?tab=${tab}` : ''
        }`,
        permanent: false,
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}
