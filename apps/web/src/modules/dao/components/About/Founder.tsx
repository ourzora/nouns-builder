import { Flex, Text } from '@zoralabs/zord'

import { Avatar } from 'src/components/Avatar'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { useEnsData } from 'src/hooks'
import { AddressType } from 'src/typings'

interface FounderProps {
  wallet: AddressType
  ownershipPct: number
}

export const Founder: React.FC<FounderProps> = ({ wallet, ownershipPct }) => {
  const { displayName, ensAvatar } = useEnsData(wallet as string)
  return (
    <Flex
      as="a"
      target="_blank"
      rel="noreferrer noopener"
      href={`${ETHERSCAN_BASE_URL}/address/${wallet}`}
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
      <Flex direction={'row'} align={'center'} cursor={'pointer'}>
        <Avatar address={wallet} src={ensAvatar} size={'40'} />
        <Flex direction={'column'} ml={'x2'}>
          <Text fontWeight={'display'}>{displayName}</Text>
        </Flex>
      </Flex>
      <Text fontWeight={'display'}>{ownershipPct}%</Text>
    </Flex>
  )
}
