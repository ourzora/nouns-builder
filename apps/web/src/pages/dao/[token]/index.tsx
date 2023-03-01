import { readContract, readContracts } from '@wagmi/core'
import { Flex, Text, atoms, theme } from '@zoralabs/zord'
import { ethers } from 'ethers'
import { isAddress } from 'ethers/lib/utils.js'
import { GetServerSideProps } from 'next'
import React from 'react'
import { useAccount } from 'wagmi'

import { Meta } from 'src/components/Meta'
import { PUBLIC_MANAGER_ADDRESS } from 'src/constants/addresses'
import { auctionAbi, managerAbi } from 'src/data/contract/abis'
import { useAuctionContract } from 'src/hooks'
import { getDaoLayout } from 'src/layouts/DaoLayout'
import NogglesLogo from 'src/layouts/assets/builder-framed.svg'
import {
  Activity,
  PreAuction,
  PreAuctionForm,
  SectionHandler,
  SmartContracts,
} from 'src/modules/dao'
import { NextPageWithLayout } from 'src/pages/_app'

const DaoPage: NextPageWithLayout = () => {
  const { address: signerAddress } = useAccount()
  const { owner } = useAuctionContract()

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

  return (
    <Flex direction="column" pb="x30">
      <Meta title={'dao page'} slug={'/'} />

      <PreAuction />

      <SectionHandler sections={sections} />
    </Flex>
  )
}

DaoPage.getLayout = getDaoLayout

export default DaoPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const daoAddress = context?.params?.token as string

  if (!isAddress(daoAddress)) {
    return {
      notFound: true,
    }
  }

  try {
    const addresses = await readContract({
      abi: managerAbi,
      address: PUBLIC_MANAGER_ADDRESS,
      functionName: 'getAddresses',
      args: [daoAddress],
    })
    const hasMissingAddresses = Object.values(addresses).includes(
      ethers.constants.AddressZero
    )
    if (hasMissingAddresses) {
      return {
        notFound: true,
      }
    }

    const [auction, owner] = await readContracts({
      contracts: [
        {
          abi: auctionAbi,
          address: addresses.auction,
          functionName: 'auction',
        },
        {
          abi: auctionAbi,
          address: addresses.auction,
          functionName: 'owner',
        },
      ],
    })

    const initialized: boolean =
      auction?.endTime !== 0 && auction?.startTime !== 0 && owner === addresses.treasury

    if (!initialized) {
      return {
        props: {
          addresses,
        },
      }
    }

    return {
      redirect: {
        destination: `/dao/${daoAddress}/${auction.tokenId}`,
        permanent: false,
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}
