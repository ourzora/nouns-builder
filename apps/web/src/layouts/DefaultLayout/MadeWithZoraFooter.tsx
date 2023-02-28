import { Box, Eyebrow, Flex } from '@zoralabs/zord'
import { Atoms } from '@zoralabs/zord'

import Noggles from '../assets/noggles.svg'
import Zorb from '../assets/zorb.svg'
import { footerLogo, footerLogoTextLeft, footerLogoTextRight } from './Nav.styles.css'

export type MadeWithZoraFooterProps = {
  backgroundColor: Atoms['backgroundColor']
  color: Atoms['color']
  mb?: Atoms['mb']
}

export const MadeWithZoraFooter = ({
  backgroundColor,
  color,
  mb = 'x4',
}: MadeWithZoraFooterProps) => {
  return (
    <Flex
      mt={{ '@initial': 'x16', '@768': 'x24' }}
      direction={'row'}
      w={'100%'}
      justify={'center'}
      align={'center'}
      mb={mb}
      backgroundColor={backgroundColor}
      gap={'x3'}
    >
      <Eyebrow color={color} className={footerLogoTextLeft}>
        Made With
      </Eyebrow>

      <Box position={'relative'}>
        <Box
          as="a"
          href={'https://zora.co'}
          target={'_blank'}
          position="absolute"
          mt={'x3'}
          className={footerLogo}
          rel="noopener noreferrer"
        >
          <Noggles />
        </Box>

        <Zorb />
      </Box>

      <Eyebrow color={color} className={footerLogoTextRight}>
        On Ethereum
      </Eyebrow>
    </Flex>
  )
}
