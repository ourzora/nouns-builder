import React from 'react'
import Image from 'next/legacy/image'
import useSWR from 'swr'
import { useBalance } from 'wagmi'
import HtmlReactParser from 'html-react-parser'
import { Box, Flex, Text } from '@zoralabs/zord'
import { Avatar } from 'src/components/Avatar/Avatar'
import { useMetadataContract } from 'src/modules/dao/hooks'
import useTokenContract from 'src/hooks/useTokenContract'
import { useDaoStore } from 'src/modules/dao'
import { about, daoDescription, daoName, daoInfo } from 'src/styles/About.css'
import { formatCryptoVal } from 'src/utils/numbers'
import SWR_KEYS from 'src/constants/swrKeys'
import { getFetchableUrl } from 'ipfs-service'
import { sdk } from 'src/data/graphql/client'
import { CHAIN } from 'src/constants/network'
import type { AddressType } from 'src/typings'
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
