import { Box, Button, Heading, Text } from '@zoralabs/zord'
import { getProof } from 'lanyard'
import { omit } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { waitForTransaction, writeContract } from 'wagmi/actions'

import { Icon } from 'src/components/Icon'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { MERKLE_RESERVE_MINTER } from 'src/constants/addresses'
import { MerkleReserveMinter } from 'src/data/contract/abis/MerkleReserveMinter'
import { MerkleMintFragment } from 'src/data/subgraph/sdk.generated'
import { AllowListItem } from 'src/pages/api/allowList'
import { AddressType, BytesType, CHAIN_ID } from 'src/typings'

export const ClaimModal = ({
  merkleMint,
  userClaims,
  chainId,
  token,
}: {
  chainId: CHAIN_ID
  token: AddressType
  merkleMint: MerkleMintFragment
  userClaims: AllowListItem[]
}) => {
  const router = useRouter()
  const { claim } = router.query

  const [loading, setLoading] = useState(false)

  const handleClaim = async () => {
    try {
      setLoading(true)

      const merkleClaims = await Promise.all(
        userClaims.map(async (x) => {
          const res = await getProof({
            merkleRoot: merkleMint.merkleRoot,
            unhashedLeaf: x.leaf,
          })

          if (!res?.proof) throw new Error('No proof found')

          return {
            mintTo: x.claimant,
            tokenId: BigInt(x.tokenId),
            merkleProof: res.proof as BytesType[],
          }
        })
      )

      const { hash } = await writeContract({
        abi: MerkleReserveMinter,
        functionName: 'mintFromReserve',
        address: MERKLE_RESERVE_MINTER[chainId],
        args: [token, merkleClaims],
        value: 0n,
      })
      await waitForTransaction({ hash })
    } catch (error) {
      console.log('err', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    router.push(
      {
        pathname: router.pathname,
        query: omit(router.query, 'claim'),
      },
      undefined,
      { shallow: true }
    )
  }

  useEffect(() => {
    document.body.style.overflow = !!claim ? 'hidden' : 'unset'
  }, [claim])

  return (
    <AnimatedModal open={!!claim}>
      <Box>
        <Box
          onClick={handleClose}
          cursor={'pointer'}
          position={'absolute'}
          top="x3"
          right="x3"
        >
          <Icon id="cross" fill="text3" />
        </Box>
        <Heading size="xs" fontWeight="display">
          Claim tokens
        </Heading>
        <Text color="text3">You have {userClaims.length} tokens availible to claim</Text>
        <Button onClick={handleClaim} disabled={loading} w="100%" mt="x3">
          {loading
            ? `Claiming ${userClaims.length} tokens ...`
            : `Claim ${userClaims.length} tokens`}
        </Button>
      </Box>
    </AnimatedModal>
  )
}
