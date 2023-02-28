import { Flex, Stack, Text } from '@zoralabs/zord'
import { useRouter } from 'next/router'
import React from 'react'
import { useContract } from 'wagmi'

import { Icon } from 'src/components/Icon'
import { auctionAbi } from 'src/data/contract/abis'
import { useLayoutStore } from 'src/stores'
import { useDaoStore } from "../../../dao/stores";

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
        <Text variant="label-lg" mb={'x1'}>
          Configure DAO Settings
        </Text>
        <Text variant="paragraph-md" color={'text3'}>
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
