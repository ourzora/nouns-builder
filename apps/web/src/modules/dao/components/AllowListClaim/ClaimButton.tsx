import { Box, Button, Flex, Text } from '@zoralabs/zord'
import { Fragment } from 'react'

import { Icon } from 'src/components/Icon'
import { MerkleMintFragment } from 'src/data/subgraph/sdk.generated'

import { ClaimModal } from './ClaimModal'

export const ClaimButton = ({ merkleMint }: { merkleMint: MerkleMintFragment }) => {
  return (
    <Fragment>
      <Box position={'fixed'} bottom={'x2'} right={'x2'} style={{ zIndex: '10' }}>
        <Button borderRadius="round">
          <Flex align={'center'}>
            <Text mr="x2">Claim</Text>
            <Icon id="airdrop" fill="transparent" />
          </Flex>
        </Button>
      </Box>
      <ClaimModal />
    </Fragment>
  )
}
