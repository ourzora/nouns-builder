import { Stack } from '@zoralabs/zord'
import { useBalance, useContractRead } from 'wagmi'

import { auctionAbi } from 'src/data/contract/abis'
import { useDaoStore } from 'src/modules/dao/stores/useDaoStore'
import { useChainStore } from 'src/stores/useChainStore'
import { AddressType } from 'src/typings'

import { MigrateDAOForm } from './MigrateDAOForm'
import { MigrationTracker } from './MigrationTracker'
import { PauseAuctionsForm } from './PauseAuctionsForm'

export enum DAOMigrationProgress {
  DEFAULT = 0,
  PAUSED = 1,
  DEPLOYED = 2,
  FINALIZED = 3,
}

const formComponents = [<PauseAuctionsForm />, <MigrateDAOForm />]

export const Migration: React.FC = () => {
  const chain = useChainStore((x) => x.chain)
  const {
    addresses: { treasury, auction },
  } = useDaoStore()

  const { data: treasuryBalance } = useBalance({
    address: treasury as `0x${string}`,
    chainId: chain.id,
  })

  const { data: paused } = useContractRead({
    abi: auctionAbi,
    address: auction as AddressType,
    functionName: 'paused',
    chainId: chain.id,
  })

  const deployed = false
  const treasuryMigrated = treasuryBalance && treasuryBalance.value < 1000000000000000

  let daoProgress = DAOMigrationProgress.FINALIZED
  if (!paused) daoProgress = DAOMigrationProgress.DEFAULT
  else if (!deployed) daoProgress = DAOMigrationProgress.PAUSED
  else if (!treasuryMigrated) daoProgress = DAOMigrationProgress.DEPLOYED

  return (
    <Stack>
      <MigrationTracker checkpoint={daoProgress} />
      {formComponents[daoProgress]}
    </Stack>
  )
}
