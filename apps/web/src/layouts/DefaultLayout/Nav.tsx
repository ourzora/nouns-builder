import { Box, Flex, Label, Stack, atoms } from '@zoralabs/zord'
import Link from 'next/link'
import React from 'react'

import { PUBLIC_IS_TESTNET } from 'src/constants/defaultChains'
import { useScrollDirection } from 'src/hooks/useScrollDirection'

import NogglesLogo from '../assets/builder-framed.svg'
import TestnetLogo from '../assets/testnet.svg'
import { NavContainer, NavWrapper, navMenuItem } from './Nav.styles.css'
import { NavMenu } from './NavMenu'

export const Nav = () => {
  const scrollDirection = useScrollDirection()

  return (
    <Box
      style={{
        top: scrollDirection === 'down' ? -80 : 0,
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
      }}
      className={NavContainer}
    >
      <Flex align={'center'} className={NavWrapper} justify={'space-between'}>
        <Flex align={'center'}>
          <Link href={'/'} passHref>
            <Stack>
              <NogglesLogo
                fill={'black'}
                className={atoms({ width: 'x23', cursor: 'pointer' })}
              />
              {PUBLIC_IS_TESTNET && (
                <TestnetLogo
                  className={atoms({
                    width: 'x23',
                    cursor: 'pointer',
                    mt: 'x1',
                  })}
                />
              )}
            </Stack>
          </Link>
          <Flex display={{ '@initial': 'none', '@768': 'flex' }} ml="x10" gap={'x4'}>
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
