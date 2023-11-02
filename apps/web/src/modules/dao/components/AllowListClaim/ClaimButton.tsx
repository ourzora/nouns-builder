import { Box, Button, Flex, Text } from '@zoralabs/zord'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import useSWR from 'swr'
import { useAccount } from 'wagmi'

import { Icon } from 'src/components/Icon'
import SWR_KEYS from 'src/constants/swrKeys'
import { allowListRequest } from 'src/data/subgraph/requests/allowList'
import { MerkleMintFragment } from 'src/data/subgraph/sdk.generated'
import { AllowListItem } from 'src/pages/api/allowList'
import { useChainStore } from 'src/stores/useChainStore'

import { useDaoStore } from '../../stores'
import { ClaimModal } from './ClaimModal'

export const ClaimButton = ({ merkleMint }: { merkleMint: MerkleMintFragment }) => {
  const { token } = useDaoStore((x) => x.addresses)
  const { id: chainId } = useChainStore((x) => x.chain)
  const { address } = useAccount()
  const router = useRouter()

  const { data: userClaims } = useSWR<AllowListItem[]>(
    token && address
      ? [SWR_KEYS.ALLOWLIST, merkleMint.merkleRoot, token, address, chainId]
      : undefined,
    (_, merkleRoot, tokenAddress, userAddress, chainId) =>
      allowListRequest({ merkleRoot, tokenAddress, userAddress, chainId })
  )

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

  const hasClaims = userClaims && userClaims.length > 0
  if (!merkleMint || !hasClaims || !token) return null

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
      <ClaimModal
        chainId={chainId}
        token={token}
        merkleMint={merkleMint}
        userClaims={userClaims}
      />
    </Fragment>
  )
}
