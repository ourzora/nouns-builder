import { Box, Heading } from '@zoralabs/zord'
import axios from 'axios'
import { omit } from 'lodash'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useMemo } from 'react'
import useSWR from 'swr'
import { isAddressEqual } from 'viem'
import { useAccount } from 'wagmi'

import { Icon } from 'src/components/Icon'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import SWR_KEYS from 'src/constants/swrKeys'
import { MerkleMintFragment } from 'src/data/subgraph/sdk.generated'
import { AllowListItem } from 'src/pages/api/allowList/[root]'

export const ClaimModal = ({ merkleMint }: { merkleMint: MerkleMintFragment }) => {
  const router = useRouter()
  const { address } = useAccount()
  const { claim } = router.query

  const { data: allowList } = useSWR<AllowListItem[]>(
    [SWR_KEYS.ALLOWLIST, merkleMint.merkleRoot],
    (_, merkleRoot) => axios.get(`/api/allowList/${merkleRoot}`).then((x) => x.data)
  )

  const userClaims = useMemo(
    () =>
      address && allowList && allowList.length > 0
        ? allowList.filter((item) => isAddressEqual(item.claimant, address))
        : null,
    [address, allowList]
  )

  console.log('userClaims', allowList, userClaims)

  const handleClick = () => {
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
      <Fragment>
        <Box
          onClick={handleClick}
          cursor={'pointer'}
          position={'absolute'}
          top="x0"
          right="x3"
        >
          <Icon id="cross" fill="text3" />
        </Box>
        <Heading size="xs" fontWeight="display">
          Claim tokens
        </Heading>
      </Fragment>
    </AnimatedModal>
  )
}
