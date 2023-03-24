import { Box, Flex, Text } from '@zoralabs/zord'

import { Avatar } from 'src/components/Avatar'
import { Icon } from 'src/components/Icon'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { useEnsData } from 'src/hooks'
import { AddressType } from 'src/typings'

interface FounderProps {
  wallet: AddressType
  ownershipPct: number
  vestExpiry: number
}

export const Founder: React.FC<FounderProps> = ({ wallet, ownershipPct, vestExpiry }) => {
  const { displayName, ensAvatar } = useEnsData(wallet as string)
  const vestDate = new Date(vestExpiry * 1000).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  return (
    <Flex
      direction={'row'}
      align={'center'}
      justify={'space-between'}
      w={'100%'}
      borderStyle="solid"
      borderColor="border"
      borderWidth="normal"
      borderRadius="curved"
      p="x4"
      px="x6"
    >
      <Flex direction={'row'} align={'center'}>
        <Avatar address={wallet} src={ensAvatar} size={'40'} />
        <Flex direction={'column'} ml={'x2'}>
          <Text
            as="a"
            target="_blank"
            rel="noreferrer noopener"
            href={`${ETHERSCAN_BASE_URL}/address/${wallet}`}
            fontWeight={'display'}
          >
            {displayName}
          </Text>
        </Flex>
      </Flex>
      <Flex align={'center'} justify="center">
        <Text fontWeight={'display'} mr="x2">
          {ownershipPct}%
        </Text>
        <Box title={`In effect until ${vestDate}`} cursor="pointer">
          <Icon id="info-16" size="sm" />
        </Box>
      </Flex>
    </Flex>
  )
}
