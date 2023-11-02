import { Box, Button, Flex, Text } from '@zoralabs/zord'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useAccount } from 'wagmi'

import { Icon } from 'src/components/Icon'
import { MerkleMintFragment } from 'src/data/subgraph/sdk.generated'

import { ClaimModal } from './ClaimModal'

export const ClaimButton = ({ merkleMint }: { merkleMint: MerkleMintFragment }) => {
  const { address } = useAccount()
  const router = useRouter()

  const handleClick = () => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          claim: true,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  if (!merkleMint || !address) return null

  return (
    <Fragment>
      <Box position={'fixed'} bottom={'x2'} right={'x2'} style={{ zIndex: '10' }}>
        <Button onClick={handleClick} borderRadius="round">
          <Flex align={'center'}>
            <Text mr="x2">Claim</Text>
            <Icon id="airdrop" fill="transparent" />
          </Flex>
        </Button>
      </Box>
      <ClaimModal merkleMint={merkleMint} />
    </Fragment>
  )
}
