import React from 'react'
import { Flex, Stack, Text } from '@zoralabs/zord'
import { Icon } from 'src/components/Icon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDaoStore, useLayoutStore } from 'src/stores'
import shallow from 'zustand/shallow'
import useSWR from 'swr'
import { readAuctionContract } from 'src/utils/readAuctionContract'
import { useContract, useContractRead } from 'wagmi'
import { AddressType } from '../../../../typings'
import { auctionAbi } from '../../../../constants/abis'
import { SUCCESS_MESSAGES } from '../../../../constants/messages'

const AdminNav = () => {
  const router = useRouter()
  const addresses = useDaoStore((state) => state.addresses)
  const signer = useLayoutStore((state) => state.signer)

  const auctionContract = useContract({
    abi: auctionAbi,
    address: addresses?.auction,
    signerOrProvider: signer,
  })

  const handleNavigation = async () => {
    const auction = await auctionContract?.auction()
    await router.push({
      pathname: `/dao/[token]/[tokenId]`,
      query: {
        token: router.query?.token,
        tokenId: auction?.tokenId?.toNumber(),
        tab: 'admin',
      },
    })
  }

  return (
    <Flex
      w={'100%'}
      justify={'flex-start'}
      p={'x6'}
      borderWidth={'normal'}
      borderStyle={'solid'}
      borderColor={'ghostHover'}
      mt={'x3'}
      style={{ borderRadius: 12 }}
      gap={'x2'}
      cursor={'pointer'}
      onClick={() => handleNavigation()}
    >
      <Stack>
        <Text
          fontSize={18}
          fontWeight={'label'}
          style={{ marginBottom: '2px', lineHeight: '24px' }}
        >
          Configure DAO Settings
        </Text>
        <Text
          color={'text3'}
          fontSize={16}
          lineHeight={24}
          style={{ lineHeight: '24px' }}
        >
          Change all the main DAO settings in the Admin Tab
        </Text>
      </Stack>
      <Icon
        id={'external-16'}
        fill={'text4'}
        size={'sm'}
        alignSelf={'center'}
        ml={'auto'}
      />
    </Flex>
  )
}

export default AdminNav
