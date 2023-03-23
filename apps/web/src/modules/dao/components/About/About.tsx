import { Box, Flex, Grid, Text } from '@zoralabs/zord'
import HtmlReactParser from 'html-react-parser'
import { getFetchableUrl } from 'ipfs-service'
import Image from 'next/legacy/image'
import React from 'react'
import useSWR from 'swr'
import { Address, useBalance, useContractReads } from 'wagmi'

import { Avatar } from 'src/components/Avatar/Avatar'
import { CHAIN } from 'src/constants/network'
import SWR_KEYS from 'src/constants/swrKeys'
import { metadataAbi, tokenAbi } from 'src/data/contract/abis'
import { sdk } from 'src/data/graphql/client'
import { useLayoutStore } from 'src/stores'
import { about, daoDescription, daoInfo, daoName } from 'src/styles/About.css'
import { unpackOptionalArray } from 'src/utils/helpers'
import { formatCryptoVal } from 'src/utils/numbers'

import { useDaoStore } from '../../stores'
import { parseContractURI } from '../../utils'
import { ExternalLinks } from './ExternalLinks'
import { Founder } from './Founder'
import { Statistic } from './Statistic'

export const About: React.FC = () => {
  const {
    addresses: { token, treasury, metadata },
  } = useDaoStore()
  const { isMobile } = useLayoutStore()

  const tokenContractParams = {
    abi: tokenAbi,
    address: token as Address,
  }
  const metadataContractParams = {
    abi: metadataAbi,
    address: metadata as Address,
  }

  const { data: contractData } = useContractReads({
    contracts: [
      { ...tokenContractParams, functionName: 'name' },
      { ...tokenContractParams, functionName: 'totalSupply' },
      { ...tokenContractParams, functionName: 'getFounders' },
      { ...metadataContractParams, functionName: 'contractImage' },
      { ...metadataContractParams, functionName: 'description' },
      { ...metadataContractParams, functionName: 'contractURI' },
    ],
  })

  const [name, totalSupply, founders, daoImage, description, contractURI] =
    unpackOptionalArray(contractData, 6)
  const parsedContractURI = parseContractURI(contractURI)

  const { data: balance } = useBalance({ address: treasury as Address })

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
          <ExternalLinks links={{ website: parsedContractURI?.external_url }} />
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
        <Statistic title="Total supply" content={totalSupply?.toNumber()} />
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
        <ExternalLinks links={{ website: parsedContractURI?.external_url }} />
      </Box>

      {typeof founders !== 'undefined' && founders.length > 0 ? (
        <>
          <Text variant="heading-xs" mt="x16" style={{ fontWeight: 800 }}>
            Founders
          </Text>
          <Grid columns={isMobile ? 1 : 2} mt="x6" gap="x4">
            {founders.map((founder) => (
              <Founder {...founder} />
            ))}
          </Grid>
        </>
      ) : null}
    </Box>
  )
}
