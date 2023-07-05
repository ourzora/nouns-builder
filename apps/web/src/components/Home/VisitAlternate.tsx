import { Flex, Text, atoms } from '@zoralabs/zord'

import { PUBLIC_IS_TESTNET } from 'src/constants/defaultChains'
import { useLayoutStore } from 'src/stores'

import { Icon } from '../Icon'

const VisitAlternate = () => {
  const { isMobile } = useLayoutStore()

  return (
    <a
      href={PUBLIC_IS_TESTNET ? 'https://testnet.nouns.build/' : 'https://nouns.build/'}
      target="_blank"
      rel="noreferrer noopener"
    >
      <Flex align={'center'} mt={isMobile ? 'x3' : 'x6'} color="text1">
        <Text
          fontSize={isMobile ? 14 : 18}
          fontWeight={'paragraph'}
          className={atoms({ textDecoration: 'underline' })}
        >
          {PUBLIC_IS_TESTNET ? 'Visit Testnet' : 'Visit Mainnet'}
        </Text>
        <Icon fill="text1" size="sm" ml="x1" id="external-16" />
      </Flex>
    </a>
  )
}

export default VisitAlternate
