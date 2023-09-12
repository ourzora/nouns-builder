import { Flex, Text } from '@zoralabs/zord'
import Link from 'next/link'

import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'
import { ProposalState } from 'src/data/contract/requests/getProposalState'
import { ProposalFragment } from 'src/data/subgraph/sdk.generated'
import { AddressType, CHAIN_ID } from 'src/typings'

import { ProposalStatus } from '../proposal/components/ProposalStatus'

export const DaoProposalCard = ({
  title,
  proposalNumber,
  tokenAddress,
  chainId,
  proposalState,
  voteEnd,
  voteStart,
  expiresAt,
}: ProposalFragment & {
  chainId: CHAIN_ID
  tokenAddress: AddressType
  proposalState: ProposalState
}) => {
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
        <Flex align={'center'} w="100%">
          <Text fontSize={18} fontWeight="label" color={'text4'} mr={'x4'}>
            {proposalNumber}
          </Text>
          <Text fontSize={18} fontWeight="label" mr={'auto'}>
            {title}
          </Text>
          <ProposalStatus
            state={proposalState}
            voteEnd={voteEnd}
            voteStart={voteStart}
            expiresAt={expiresAt}
            flipped
            showTime
          />
        </Flex>
      </Flex>
    </Link>
  )
}
