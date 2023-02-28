import { Box, Flex, Grid, Text, vars } from '@zoralabs/zord'
import React from 'react'

import CopyButton from 'src/components/CopyButton/CopyButton'
import { Icon } from 'src/components/Icon'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { useLayoutStore } from 'src/stores'
import { about } from 'src/styles/About.css'
import { walletSnippet } from 'src/utils/helpers'
import { useDaoStore } from "../stores";

const ContractLink = ({ title, address }: { title: string; address?: string }) => {
  const { isMobile } = useLayoutStore()

  return (
    <Grid columns={isMobile ? 1 : '1fr 3fr'} align={'center'}>
      <Text fontWeight={'display'} py={{ '@initial': 'x2', '@768': 'x0' }}>
        {title}
      </Text>
      <Flex
        py={{ '@initial': 'x4', '@768': 'x5' }}
        px={{ '@initial': 'x4', '@768': 'x6' }}
        justify={'space-between'}
        align={'center'}
        borderRadius={'curved'}
        borderColor={'border'}
        borderStyle={'solid'}
        borderWidth={'normal'}
        style={{ backgroundColor: '#fafafa' }}
      >
        <Text fontSize={16}>
          {isMobile ? walletSnippet(address as string, 8) : address}
        </Text>
        <Flex
          justify={'center'}
          align={'center'}
          gap={{ '@initial': 'x2', '@768': 'x4' }}
        >
          <a
            href={`${ETHERSCAN_BASE_URL}/address/${address}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon id="arrowTopRight" fill="text4" />
          </a>

          <CopyButton text={address} variant={'icon'} />
        </Flex>
      </Flex>
    </Grid>
  )
}

export const SmartContracts = () => {
  const { addresses } = useDaoStore()

  return (
    <Box className={about}>
      <Flex direction={'column'}>
        <Box mb={{ '@initial': 'x4', '@768': 'x8' }}>
          <Text
            mb={{ '@initial': 'x4', '@768': 'x6' }}
            fontSize={28}
            fontWeight={'display'}
          >
            Smart Contracts
          </Text>
          <Text>
            You can find the latest information on the Nouns Builder protocol on{' '}
            <Text
              as={'a'}
              href="https://github.com/ourzora/nouns-protocol"
              target="_blank"
              rel="noreferrer"
              style={{ fontWeight: vars.fontWeight.display, textDecoration: 'underline' }}
            >
              Github
            </Text>
            . Upgrades to these smart contract can be completed by submitting a proposal
            to the DAO, and requires a successful vote to execute.
          </Text>
        </Box>
        <Flex direction={'column'} gap={'x4'}>
          <ContractLink title="NFT" address={addresses.token} />
          <ContractLink title="Auction House" address={addresses.auction} />
          <ContractLink title="Governor" address={addresses.governor} />
          <ContractLink title="Treasury" address={addresses.treasury} />
          <ContractLink title="Metadata" address={addresses.metadata} />
        </Flex>
      </Flex>
    </Box>
  )
}
