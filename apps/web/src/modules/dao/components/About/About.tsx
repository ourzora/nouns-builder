import { Box, Flex, Text } from '@zoralabs/zord'
import HtmlReactParser from 'html-react-parser'
import { getFetchableUrl } from 'ipfs-service'
import Image from 'next/legacy/image'
import React from 'react'
import { useMetadataContract, useTokenContract } from 'src/hooks'
import { useDaoStore } from 'src/stores'
import type { AddressType } from 'src/typings'
import useSWR from 'swr'
import { useBalance } from 'wagmi'

import { sdk } from 'src/data/graphql/client'

import { CHAIN } from 'src/constants/network'
import SWR_KEYS from 'src/constants/swrKeys'

import { formatCryptoVal } from 'src/utils/numbers'

import { Avatar } from 'src/components/Avatar/Avatar'

import { about, daoDescription, daoInfo, daoName } from 'src/styles/About.css'

import { ExternalLinks } from './ExternalLinks'
import { Statistic } from './Statistic'

export const About: React.FC = () => {
  const {
    addresses: { token, treasury, metadata },
  } = useDaoStore()
  const { name, totalSupply } = useTokenContract()
  const { daoImage, description, contractURI } = useMetadataContract(
    metadata as AddressType
  )
  const { data: balance } = useBalance({ address: treasury as `0x${string}` })

  const { data } = useSWR(token ? [SWR_KEYS.DAO_INFO, token] : null, async (_, token) => {
    const res = await sdk.daoInfo({
      collectionAddress: token,
      chain: CHAIN,
    })

    return {
      ownerCount: res?.aggregateStat?.ownerCount,
    }
  })

  const treasuryBalance = React.useMemo(() => {
    return balance?.formatted ? formatCryptoVal(balance?.formatted) : null
  }, [balance])

  const daoImageSrc = React.useMemo(() => {
    return daoImage ? getFetchableUrl(daoImage) : null
  }, [daoImage])

  return (
    <Box className={about}>
      <Flex
        direction={{ '@initial': 'column', '@768': 'row' }}
        align="center"
        justify={{ '@initial': 'flex-start', '@768': 'space-between' }}
      >
        <Flex align="center" justify="flex-start" w="100%">
          {daoImageSrc ? (
            <Box mr="x4">
              <Image
                src={daoImageSrc}
                layout="fixed"
                objectFit="contain"
                style={{ borderRadius: '100%' }}
                alt=""
                height={52}
                width={52}
              />
            </Box>
          ) : (
            <Box mr="x4" borderRadius="phat">
              <Avatar address={token ?? undefined} size="52" />
            </Box>
          )}
          <Text className={daoName}>{name}</Text>
        </Flex>

        <Box display={{ '@initial': 'none', '@768': 'block' }}>
          <ExternalLinks links={{ website: contractURI?.external_url }} />
        </Box>
      </Flex>

      <Flex
        mt={{ '@initial': 'x4', '@768': 'x6' }}
        gap={{ '@initial': 'x2', '@768': 'x4' }}
        overflowX="scroll"
        className={daoInfo}
      >
        <Statistic
          title="Treasury"
          content={`${treasuryBalance} ETH`}
          address={treasury}
        />
        <Statistic title="Owners" content={data?.ownerCount} />
        <Statistic title="Total supply" content={totalSupply} />
      </Flex>

      {typeof description !== 'undefined' && description !== null ? (
        <Box mt={{ '@initial': 'x4', '@768': 'x6' }}>
          <Text className={daoDescription}>
            {HtmlReactParser(description.replace(/\\n/g, '<br />'))}
          </Text>
        </Box>
      ) : null}

      <Box
        mt={{ '@initial': 'x4', '@768': 'x6' }}
        display={{ '@initial': 'block', '@768': 'none' }}
      >
        <ExternalLinks links={{ website: contractURI?.external_url }} />
      </Box>
    </Box>
  )
}
