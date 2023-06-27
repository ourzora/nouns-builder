import { Box, Flex, Label, Text } from '@zoralabs/zord'
import { useRouter } from 'next/router'

import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { Proposal } from 'src/data/subgraph/requests/proposalQuery'
import { useEnsData } from 'src/hooks/useEnsData'

import { ProposalNavigation } from './ProposalNavigation'
import { ProposalStatus } from './ProposalStatus'

interface ProposalHeaderProps {
  proposal: Proposal
}

export const ProposalHeader: React.FC<ProposalHeaderProps> = ({ proposal }) => {
  const router = useRouter()
  const { title, voteStart, voteEnd, proposer, expiresAt, proposalNumber } = proposal

  const { displayName: proposerDisplayName } = useEnsData(proposer)

  return (
    <Flex direction={'column'} gap={{ '@initial': 'x4', '@768': 'x7' }} mb={'x2'}>
      <ProposalNavigation
        handleBack={() => {
          router.push({
            pathname: `/dao/[network]/[token]`,
            query: {
              network: router.query.network,
              token: proposal.dao.tokenAddress,
              tab: 'activity',
            },
          })
        }}
      />
      <Flex gap={'x2'} direction={'column'}>
        <Flex align={'center'}>
          <Label fontSize={20} color={'text3'} mr={'x2'}>
            Proposal {proposalNumber}
          </Label>
          <ProposalStatus
            state={proposal.state}
            voteEnd={voteEnd}
            voteStart={voteStart}
            expiresAt={expiresAt}
          />
        </Flex>
        <Flex
          direction={{ '@initial': 'column', '@768': 'row' }}
          justify={'space-between'}
          width={'auto'}
          align={{ '@initial': 'flex-start', '@768': 'center' }}
        >
          <Text fontSize={28} fontWeight={'display'}>
            {title}
          </Text>
        </Flex>
        <Flex direction={'row'} align={'center'} justify={'space-between'}>
          <Flex direction={'row'} align={'flex-end'} gap={'x1'}>
            <Text color={'text3'}>By</Text>
            <Box fontWeight={'display'}>
              <a
                href={`${ETHERSCAN_BASE_URL}/address/${proposer}`}
                rel="noreferrer"
                target="_blank"
              >
                {proposerDisplayName}
              </a>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
