import { Box, Stack, atoms } from '@zoralabs/zord'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import useSWR from 'swr'
import { useContract, useContractRead } from 'wagmi'

import { Icon } from 'src/components/Icon'
import SWR_KEYS from 'src/constants/swrKeys'
import { auctionAbi } from 'src/data/contract/abis'
import { ProposalsResponse, getProposals } from 'src/data/graphql/requests/proposalsQuery'
import { NounsProposalStatus } from 'src/data/graphql/sdk.generated'
import { useDaoStore } from 'src/modules/dao'

export const AuctionPaused = () => {
  const { query, isReady } = useRouter()
  const LIMIT = 20

  const { auction } = useDaoStore((x) => x.addresses)
  const auctionContract = useContract({ abi: auctionAbi, address: auction })
  const { data: paused } = useContractRead({
    abi: auctionAbi,
    address: auction,
    functionName: 'paused',
  })

  const { data } = useSWR<ProposalsResponse>(
    paused && isReady ? [SWR_KEYS.PROPOSALS, query.token, query.page] : null,
    (_, token, page) => getProposals([token], LIMIT, Number(page))
  )

  const pausedProposal = useMemo(() => {
    if (!(paused && auctionContract)) return undefined

    const pauseCalldata = auctionContract.interface.encodeFunctionData('pause')
    const unpauseCalldata = auctionContract.interface.encodeFunctionData('unpause')

    return data?.proposals.find((proposal) => {
      if (proposal.status !== NounsProposalStatus.Executed) return false

      const pauseIndex = proposal.calldatas.findIndex(
        (calldata) => calldata === pauseCalldata
      )
      const unpauseIndex = proposal.calldatas.findIndex(
        (calldata) => calldata === unpauseCalldata
      )

      const isPausing = pauseIndex >= 0 ? proposal.targets[pauseIndex] !== auction : false
      const isUnpausing =
        unpauseIndex >= 0 ? proposal.targets[unpauseIndex] === auction : false

      if (isPausing && !isUnpausing) return proposal
    })
  }, [paused, data?.proposals, auctionContract])

  if (!paused) return null

  return (
    <Stack align={'center'} w="100%" mt="x7">
      <Box color="text3" fontSize={18}>
        Auctions have been paused.
      </Box>
      <Link
        shallow={!pausedProposal?.proposalId}
        href={
          pausedProposal?.proposalId
            ? `/dao/${query.token}/vote/${pausedProposal?.proposalId}`
            : `/dao/${query.token}?tab=activity`
        }
      >
        <Box
          display={'inline-flex'}
          color="text3"
          mt="x1"
          fontSize={18}
          className={atoms({ textDecoration: 'underline' })}
        >
          {pausedProposal?.proposalId ? 'See proposal here' : 'See activity tab'}
          {pausedProposal?.proposalId ? (
            <Icon align="center" fill="text4" id="external-16" size="sm" />
          ) : (
            <></>
          )}
        </Box>
      </Link>
    </Stack>
  )
}
