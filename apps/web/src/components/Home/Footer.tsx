import { Box, Flex, Stack } from '@zoralabs/zord'
import Link from 'next/link'
import React from 'react'

import MadeWithZoraFooter from 'src/components/Layout/MadeWithZoraFooter'

import {
  footerHeading,
  footerLeftWrapper,
  footerRightWrapper,
  getStartedButton,
  homeFooterInnerWrapper,
  homeFooterLinks,
} from 'src/styles/home.css'

const Footer = () => {
  return (
    <Stack mt={'x13'} w={'100vw'} backgroundColor={'onNeutral'} pt={'x6'}>
      <Flex
        w={'100%'}
        style={{ maxWidth: 1144 + 64 }}
        mx={'auto'}
        justify={'space-between'}
        className={homeFooterInnerWrapper}
      >
        <Stack className={footerLeftWrapper}>
          <Flex
            as={'p'}
            fontWeight={'label'}
            fontSize={50}
            color={'onAccent'}
            className={footerHeading}
          >
            Start with a vision. Start a DAO. All onchain.
          </Flex>
          <Link href={'/create'} legacyBehavior>
            <Flex
              alignSelf={'flex-start'}
              py={'x6'}
              px={'x13'}
              color={'onAccent'}
              borderRadius={'curved'}
              mt={'x4'}
              className={getStartedButton}
            >
              Get Started
            </Flex>
          </Link>
        </Stack>
        <Stack gap={'x4'} className={footerRightWrapper}>
          <a
            href={'https://docs.zora.co/docs/smart-contracts/nouns-builder/intro'}
            target="_blank"
            rel="noreferrer"
          >
            <Box color={'onAccent'} fontSize={16} className={homeFooterLinks}>
              Documentation
            </Box>
          </a>

          <Link href={'/about'} className={homeFooterLinks} legacyBehavior>
            <Box color={'onAccent'} fontSize={16} className={homeFooterLinks}>
              About Builder
            </Box>
          </Link>
          <Link href={'/legal'} className={homeFooterLinks} legacyBehavior>
            <Box color={'onAccent'} fontSize={16} className={homeFooterLinks}>
              Terms of Service
            </Box>
          </Link>
        </Stack>
      </Flex>
      <MadeWithZoraFooter
        backgroundColor={'primary'}
        color={'onAccent'}
        mb={{ '@initial': 'x4', '@768': 'x8' }}
      />
    </Stack>
  )
}

export default Footer
