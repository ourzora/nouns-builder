import { useEnsData } from 'src/hooks/useEnsData'
import { AuctionDetail } from './AuctionDetail'
import { NULL_ADDRESS } from 'src/constants/addresses'
import { Box, Flex } from '@zoralabs/zord'
import { Avatar } from 'src/components/Avatar'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { Icon } from 'src/components/Icon/Icon'

export const WinningBidder = ({ owner }: { owner?: string }) => {
  const { displayName, ensAvatar } = useEnsData(owner)

  return (
    <AuctionDetail title="Held by">
      {!owner || owner === NULL_ADDRESS ? (
        'n/a'
      ) : (
        <Flex direction={'row'} align={'center'}>
          <Avatar address={owner} src={ensAvatar} size={'24'} />
          <Box
            as="a"
            href={`${ETHERSCAN_BASE_URL}/address/${owner}`}
            rel={'noopener noreferrer'}
            target="_blank"
            ml={'x2'}
          >
            {displayName}
          </Box>
          <Icon ml="x1" fill="text4" id="arrowTopRight" />
        </Flex>
      )}
    </AuctionDetail>
  )
}
