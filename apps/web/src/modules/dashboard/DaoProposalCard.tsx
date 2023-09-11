import { Flex, Text } from '@zoralabs/zord'
import Link from 'next/link'

import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'
import { ProposalFragment } from 'src/data/subgraph/sdk.generated'
import { AddressType, CHAIN_ID } from 'src/typings'

export const DaoProposalCard = ({
  title,
  proposalNumber,
  tokenAddress,
  chainId,
}: ProposalFragment & { chainId: CHAIN_ID; tokenAddress: AddressType }) => {
  const currentChainSlug = PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId)?.slug
  return (
    <Link
      href={`/dao/${currentChainSlug}/${tokenAddress}/vote/${proposalNumber}`}
      passHref
    >
      <Flex
        mb={'x4'}
        w={'100%'}
        borderColor={'border'}
        borderStyle={'solid'}
        borderRadius={'curved'}
        borderWidth={'normal'}
        cursor={'pointer'}
        py={{ '@initial': 'x2', '@768': 'x6' }}
        px={{ '@initial': 'x2', '@768': 'x3' }}
      >
        <Flex>
          <Text fontSize={18} fontWeight="label" color={'text4'} mr={'x4'}>
            {proposalNumber}
          </Text>
          <Text fontSize={18} fontWeight="label">
            {title}
          </Text>
        </Flex>
      </Flex>
    </Link>
  )
}
