import { Stack } from '@zoralabs/zord'
import axios from 'axios'
import useSWR from 'swr'
import { useBalance, useContractRead } from 'wagmi'

import SWR_KEYS from 'src/constants/swrKeys'
import { auctionAbi } from 'src/data/contract/abis'
import { useDaoStore } from 'src/modules/dao/stores/useDaoStore'
import { L2MigratedResponse } from 'src/pages/api/migrated'
import { useChainStore } from 'src/stores/useChainStore'
import { AddressType } from 'src/typings'

import { BridgeTreasuryForm } from './BirdgeTreasuryForm'
import { MigrateDAOForm } from './MigrateDAOForm'
import { MigrationTracker } from './MigrationTracker'
import { PauseAuctionsForm } from './PauseAuctionsForm'

export enum DAOMigrationProgress {
  DEFAULT = 0,
  PAUSED = 1,
  DEPLOYED = 2,
  FINALIZED = 3,
}

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

  const { data: migratedRes } = useSWR(
    treasury ? [SWR_KEYS.DAO_MIGRATED, treasury] : null,
    (_, treasury) =>
      axios
        .get<L2MigratedResponse>(`/api/migrated?l1Treasury=${treasury}`)
        .then((x) => x.data)
  )

  const deployed = !!migratedRes?.migrated
  const treasuryMigrated = treasuryBalance && treasuryBalance.value < 1000000000000000

  let daoProgress = DAOMigrationProgress.FINALIZED
  if (!paused) daoProgress = DAOMigrationProgress.DEFAULT
  else if (!deployed) daoProgress = DAOMigrationProgress.PAUSED
  else if (!treasuryMigrated) daoProgress = DAOMigrationProgress.DEPLOYED

  const formComponents = [
    <PauseAuctionsForm />,
    <MigrateDAOForm />,
    <BridgeTreasuryForm migratedToChainId={migratedRes?.migrated?.chainId} />,
  ]

  return (
    <Stack>
      <MigrationTracker checkpoint={daoProgress} />
      {formComponents[daoProgress]}
    </Stack>
  )
}
