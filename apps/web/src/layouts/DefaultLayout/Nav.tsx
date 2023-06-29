import { Box, Flex, Label, atoms } from '@zoralabs/zord'
import Link from 'next/link'
import React from 'react'


import NogglesLogo from '../assets/builder-framed.svg'
import { NavContainer, NavWrapper, navMenuItem } from './Nav.styles.css'
import { NavMenu } from './NavMenu'

export const Nav = () => {
  return (
    <Box className={NavContainer}>
      <Flex align={'center'} className={NavWrapper} justify={'space-between'}>
        <Flex align={'center'}>
          <Link href={'/'} passHref>
            <Flex direction={'row'} align="center">
              <NogglesLogo
                fill={'black'}
                className={atoms({ width: 'x23', cursor: 'pointer' })}
              />
            </Flex>
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
