import SectionHandler from './SectionNavigation/SectionHandler'
import Proposals from './sections/Proposals'
import { Auction__factory } from 'src/constants/typechain'
import { Flex, Text, atoms, theme } from '@zoralabs/zord'
import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'
import PreAuction from 'src/components/PreAuction'
import Meta from 'src/components/Layout/Meta'
import NogglesLogo from '../../../components/Layout/assets/builder-framed.svg'
import { useAuctionStore, useDaoStore, useLayoutStore } from 'src/stores'
import { getDaoContractAddresses } from 'src/utils/getDaoContractAddresses'
import { getProvider } from 'src/utils/provider'
import { readAuctionContract } from 'src/utils/readAuctionContract'
import SmartContracts from './sections/SmartContracts'
import PreAuctionForm from './sections/Admin/forms/PreAuctionForm'
import { ethers } from 'ethers'
import { getDaoLayout } from 'src/layouts/DaoLayout/DaoLayout'
import { useContractRead } from 'wagmi'
import { auctionAbi } from 'src/constants/abis'
import { NextPageWithLayout } from 'src/pages/_app'

const DaoPage: NextPageWithLayout = () => {
  const addresses = useDaoStore((state) => state.addresses)
  const auction = addresses?.auction || ''
  const { signer, signerAddress } = useLayoutStore()

  const { data: owner } = useContractRead({
    abi: auctionAbi,
    address: auction,
    functionName: 'owner',
  })

  const setAuctionContract = useAuctionStore((state) => state.setAuctionContract)

  useEffect(() => {
    if (signer) {
      setAuctionContract(new Auction__factory(signer).attach(auction))
      return
    }

    setAuctionContract(Auction__factory.connect(auction, getProvider()))
  }, [signer, setAuctionContract, auction])

  const sections = [
    {
      title: 'Activity',
      component: [<Proposals key={'proposals'} />],
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

  const isOwner = owner ? owner === signerAddress : false

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

  const addresses = await getDaoContractAddresses(daoAddress)
  const hasMissingAddresses = Object.values(addresses).includes(
    ethers.constants.AddressZero
  )
  if (!addresses.auction || hasMissingAddresses) {
    return {
      notFound: true,
    }
  }

  const { initialized, tokenId } = await readAuctionContract(
    addresses.auction,
    addresses.treasury
  )
  if (!initialized) {
    return {
      props: {
        addresses,
      },
    }
  }

  return {
    redirect: {
      destination: `/dao/${daoAddress}/${tokenId}`,
      permanent: false,
    },
  }
}
