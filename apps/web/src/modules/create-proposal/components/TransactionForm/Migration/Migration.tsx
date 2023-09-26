import { Stack } from '@zoralabs/zord'
import { ReactNode } from 'react'
import { useBalance, useContractRead } from 'wagmi'

import { auctionAbi } from 'src/data/contract/abis'
import { useDaoStore } from 'src/modules/dao/stores/useDaoStore'
import { useChainStore } from 'src/stores/useChainStore'

import { MigrationFormC0 } from './MigrationFormC0'
import { MigrationTracker } from './MigrationTracker'

const UINT_64_MAX = BigInt('18446744073709551615')
const UINT_32_MAX = BigInt('4294967295')
const HASH_ZERO =
  '0x0000000000000000000000000000000000000000000000000000000000000000' as `0x${string}`

export const Migration: React.FC = () => {
  const chain = useChainStore((x) => x.chain)
  // GET STATE DATA HERE THEN PASS IT TO FORM
  const { treasury, auction } = useDaoStore((x) => x.addresses)

  const { data: treasuryBalance } = useBalance({
    address: treasury as `0x${string}`,
    chainId: chain.id,
  })

  const { data: paused } = useContractRead({
    abi: auctionAbi,
    address: auction,
    functionName: 'paused',
    chainId: chain.id,
  })

  const deployed = false

  let checkpoint = 0
  if (paused) {
    if (deployed) {
      if (treasuryBalance && treasuryBalance.value < 1000000000000000) {
        // 0.001 ETH
        checkpoint = 3 // ALL DONE
      } else {
        checkpoint = 2
      }
    } else {
      checkpoint = 1
    }
  }

  const forms: { [key in number]: ReactNode } = {
    0: <MigrationFormC0 />,
    // 1: <MigrationFormC1 />,
    //2: <MigrationFormC2 />,
    3: <></>,
  }

  return (
    <Stack>
      <MigrationTracker checkpoint={checkpoint} />
      {forms[checkpoint]}
    </Stack>
  )
}
