import { Flex, Text } from '@zoralabs/zord'

import { ProposalFragment } from 'src/data/subgraph/sdk.generated'

export const DaoProposalCard = ({ title, proposalNumber }: ProposalFragment) => {
  return (
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
  )
}
