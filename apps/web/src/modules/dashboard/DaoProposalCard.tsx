import { Flex, Text } from '@zoralabs/zord'
import Link from 'next/link'
import { useContractReads } from 'wagmi'

import { governorAbi } from 'src/data/contract/abis'
import { ProposalState } from 'src/data/contract/requests/getProposalState'
import { ProposalFragment } from 'src/data/subgraph/sdk.generated'
import { AddressType, CHAIN_ID } from 'src/typings'

import { ProposalStatus } from '../proposal/components/ProposalStatus'

type DaoProposalCardProps = ProposalFragment & {
  chainId: CHAIN_ID
  tokenAddress: AddressType
  proposalState: ProposalState
  currentChainSlug?: string
  userAddress?: AddressType
}

export const DaoProposalCard = ({
  title,
  proposalNumber,
  tokenAddress,
  proposalState,
  voteEnd,
  voteStart,
  expiresAt,
  currentChainSlug,
  userAddress,
  chainId,
  timeCreated,
  dao,
  ...rest
}: DaoProposalCardProps) => {
  return (
    <Link
      href={`/dao/${currentChainSlug}/${tokenAddress}/vote/${proposalNumber}`}
      passHref
    >
      <Flex
        mb={'x4'}
        direction={{ '@initial': 'column-reverse', '@768': 'row' }}
        w={'100%'}
        align={{ '@initial': 'flex-start', '@768': 'center' }}
        borderColor={'border'}
        borderStyle={'solid'}
        borderRadius={'curved'}
        borderWidth={'normal'}
        cursor={'pointer'}
        py={{ '@initial': 'x3', '@768': 'x6' }}
        px={{ '@initial': 'x6', '@768': 'x3' }}
      >
        <Text
          fontSize={18}
          fontWeight="label"
          color={'text4'}
          mr={'x4'}
          display={{ '@initial': 'none', '@768': 'flex' }}
        >
          {proposalNumber}
        </Text>

        <Text
          fontSize={18}
          fontWeight="label"
          mr={'auto'}
          mb={{ '@initial': 'x2', '@768': 'x0' }}
        >
          {title}
        </Text>
        <Flex
          justify={'space-between'}
          width={{ '@initial': '100%', '@768': 'unset' }}
          align={'center'}
          mb={{ '@initial': 'x3', '@768': 'x0' }}
        >
          <ProposalStatus
            state={proposalState}
            voteEnd={voteEnd}
            voteStart={voteStart}
            expiresAt={expiresAt}
            flipped
            showTime
          />
          <Flex display={{ '@initial': 'flex', '@768': 'none' }}>
            <Text fontSize={18} fontWeight="label" color={'text4'}>
              {proposalNumber}
            </Text>
          </Flex>
          {userAddress && (
            <NeedsVote
              userAddress={userAddress}
              chainId={chainId}
              governorAddress={dao.governorAddress}
              timeCreated={timeCreated}
            />
          )}
        </Flex>
      </Flex>
    </Link>
  )
}

type NeedsVoteProps = {
  userAddress: AddressType
  chainId: CHAIN_ID
  timeCreated: string
  governorAddress: AddressType
}
const NeedsVote = ({
  userAddress,
  chainId,
  timeCreated,
  governorAddress,
}: NeedsVoteProps) => {
  const { data } = useContractReads({
    enabled: !!userAddress,
    allowFailure: false,
    contracts: [
      {
        abi: governorAbi,
        address: governorAddress,
        chainId,
        functionName: 'getVotes',
        args: [userAddress as AddressType, BigInt(timeCreated)],
      },
    ],
  })

  console.log('data', data)

  return null
}
