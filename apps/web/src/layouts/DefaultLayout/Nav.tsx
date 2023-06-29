import { Box, Flex, Label, atoms } from '@zoralabs/zord'
import Link from 'next/link'
import React from 'react'

import { NetworkController } from 'src/components/NetworkController'

import NogglesLogo from '../assets/builder-framed.svg'
import TestnetLogo from '../assets/testnet.svg'
import { NavContainer, NavWrapper, navMenuItem } from './Nav.styles.css'
import { NavMenu } from './NavMenu'

export const Nav = () => {
  return (
    <Box className={NavContainer}>
      <Flex align={'center'} className={NavWrapper} justify={'space-between'}>
        <Flex align={'center'}>
          <Link href={'/'} passHref>
            <Flex direction={'row'} align="center">
              <NetworkController.Mainnet>
                <NogglesLogo
                  fill={'black'}
                  className={atoms({ width: 'x23', cursor: 'pointer' })}
                />
              </NetworkController.Mainnet>

              <NetworkController.Testnet>
                <NogglesLogo
                  fill={'black'}
                  className={atoms({ width: 'x23', cursor: 'pointer' })}
                />
              </NetworkController.Testnet>

              <Box ml={'x3'} display={{ '@initial': 'none', '@768': 'block' }}>
                <Label color={'accent'}>Builder</Label>

                <NetworkController.Testnet>
                  <TestnetLogo />
                </NetworkController.Testnet>
              </Box>
            </Flex>
          </Link>
          <Flex display={{ '@initial': 'none', '@768': 'flex' }} ml="x12" gap={'x4'}>
            <Link href={'/about'}>
              <Label className={navMenuItem}>About</Label>
            </Link>
            <Link href={'/explore'}>
              <Label className={navMenuItem}>Explore</Label>
            </Link>
            <a
              href="https://docs.zora.co/docs/smart-contracts/nouns-builder/intro"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Label className={navMenuItem}>Docs</Label>
            </a>
          </Flex>
        </Flex>

        <NavMenu />
      </Flex>
    </Box>
  )
}
