import { Box, Flex, Label, Text } from '@zoralabs/zord'
import ProposalNavigation from '../ProposalNavigation'
import ProposalStatus from '../ProposalStatus'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { useEnsData } from 'src/hooks/useEnsData'
import { Proposal } from 'src/typings'

interface ProposalHeaderProps {
  proposal: Proposal
}

const ProposalHeader: React.FC<ProposalHeaderProps> = ({ proposal }) => {
  const { title, voteStart, voteEnd, proposer, status, expiresAt, proposalNumber } =
    proposal

  const { displayName: proposerDisplayName } = useEnsData(proposer)

  return (
    <Flex direction={'column'} gap={{ '@initial': 'x4', '@768': 'x7' }} mb={'x2'}>
      <ProposalNavigation />
      <Flex gap={'x2'} direction={'column'}>
        <Flex align={'center'}>
          <Label fontSize={20} color={'text3'} mr={'x2'}>
            Proposal {proposalNumber}
          </Label>
          <ProposalStatus
            state={status}
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

export default ProposalHeader
