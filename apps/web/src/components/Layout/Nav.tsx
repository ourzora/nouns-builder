import NavMenu from './NavMenu'
import NogglesLogo from './assets/builder-framed.svg'
import TestnetLogo from './assets/testnet.svg'
import { NavContainer, NavWrapper, navMenuItem } from './styles.css'
import { Box, Flex, Label, atoms } from '@zoralabs/zord'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { NetworkController } from 'src/components/NetworkController'
import { useIsMounted } from 'src/hooks/useIsMounted'

const Nav = () => {
  const { pathname } = useRouter()
  const isCreatePage = pathname === '/create'
  const isMounted = useIsMounted()

  if (!isMounted) return null

  return (
    <Box className={NavContainer} data-create-page={isCreatePage}>
      <Flex
        align={'center'}
        className={NavWrapper}
        justify={'space-between'}
        data-create-page={isCreatePage}
      >
        <Flex align={'center'}>
          <Link href={'/'} passHref>
            <Flex direction={'row'} align="center">
              <NetworkController.Mainnet>
                <NogglesLogo
                  fill={isCreatePage ? 'white' : 'black'}
                  className={atoms({ width: 'x23', cursor: 'pointer' })}
                />
              </NetworkController.Mainnet>

              <NetworkController.Testnet>
                <NogglesLogo
                  fill={isCreatePage ? 'white' : 'black'}
                  className={atoms({ width: 'x23', cursor: 'pointer' })}
                />
              </NetworkController.Testnet>

              <Box ml={'x3'} display={{ '@initial': 'none', '@768': 'block' }}>
                <Label color={isCreatePage ? 'onAccent' : 'accent'}>Builder</Label>

                <NetworkController.Testnet>
                  <TestnetLogo />
                </NetworkController.Testnet>
              </Box>
            </Flex>
          </Link>
        </Flex>

        <Flex align="center">
          <Flex direction={'row'} align={'center'} gap={'x4'}>
            {!isCreatePage && (
              <Flex display={{ '@initial': 'none', '@768': 'flex' }} gap={'x4'}>
                <Link href={'/explore'}>
                  <Label className={navMenuItem}>Explore</Label>
                </Link>
                <Link href={'/about'}>
                  <Label className={navMenuItem}>About</Label>
                </Link>
              </Flex>
            )}
            <NavMenu />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Nav
