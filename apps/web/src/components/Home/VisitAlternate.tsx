import { Flex, Text, atoms } from '@zoralabs/zord'

import { useLayoutStore } from 'src/stores'

import { Icon } from '../Icon'

const VisitAlternate = () => {
  const { isMobile } = useLayoutStore()
  const isTestnet = process.env.NEXT_PUBLIC_CHAIN_ID === '5' ? true : false

  return (
    <a
      href={isTestnet ? 'https://nouns.build/' : 'https://testnet.nouns.build/'}
      target="_blank"
      rel="noreferrer noopener"
    >
      <Flex align={'center'} mt={isMobile ? 'x3' : 'x6'} color="text1">
        <Text
          fontSize={isMobile ? 14 : 18}
          fontWeight={'paragraph'}
          className={atoms({ textDecoration: 'underline' })}
        >
          {isTestnet ? 'Visit Mainnet' : 'Visit Testnet'}
        </Text>
        <Icon fill="text1" size="sm" ml="x1" id="external-16" />
      </Flex>
    </a>
  )
}

export default VisitAlternate
