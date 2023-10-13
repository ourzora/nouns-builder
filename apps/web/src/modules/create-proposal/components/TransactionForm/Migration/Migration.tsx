import { Stack } from '@zoralabs/zord'
import axios from 'axios'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import useSWR from 'swr'
import { useBalance, useContractRead } from 'wagmi'

import { auctionAbi, tokenAbi } from 'src/data/contract/abis'
import { DaoMember } from 'src/data/subgraph/requests/memberSnapshot'
import { TransactionType } from 'src/modules/create-proposal/constants/transactionType'
import { useProposalStore } from 'src/modules/create-proposal/stores'
import { prepareMerkle } from 'src/modules/create-proposal/utils/prepareMerkle'
import { useDaoStore } from 'src/modules/dao/stores/useDaoStore'
import { useChainStore } from 'src/stores/useChainStore'
import { AddressType, CHAIN_ID } from 'src/typings'

import { MigrationFormC1 } from './MigrationFormC1'
import { MigrationFormC2 } from './MigrationFormC2'
import { MigrationFormC2Values } from './MigrationFormC2.schema'
import { MigrationTracker } from './MigrationTracker'
import { prepareMigrationDeploy } from './prepareMigrationDeploy'

type MembersQuery = {
  membersList: DaoMember[]
}

export const Migration: React.FC = () => {
  const chain = useChainStore((x) => x.chain)
  const thisDao = useDaoStore()
  const thisChain = useChainStore()
  const { treasury, auction, token } = useDaoStore((x) => x.addresses)
  const addTransaction = useProposalStore((state) => state.addTransaction)
  const { isReady } = useRouter()

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

  const { data: existingFounders } = useContractRead({
    abi: tokenAbi,
    address: token,
    functionName: 'getFounders',
    chainId: chain.id,
  })

  let merkleRoot: `0x${string}`

  const {
    data: members,
    error,
    isValidating,
  } = useSWR(isReady ? [token, chain.id] : undefined, () =>
    axios
      .get<MembersQuery>(
        `/api/memberSnapshot/${token}?chainId=${
          chain.id
        }&page=${undefined}&limit=${10000}`
      )
      .then(async (x) => {
        x.data.membersList
        merkleRoot = await prepareMerkle(x.data.membersList)
      })
  )

  const deployed = false

  let daoProgress = 0
  if (paused) {
    if (deployed) {
      if (treasuryBalance && treasuryBalance.value < 1000000000000000) {
        // 0.001 ETH
        daoProgress = 3 // ALL DONE
      } else {
        daoProgress = 2
      }
    } else {
      daoProgress = 1
    }
  }
  daoProgress = 1

  const handleC2Submit = async (
    values: MigrationFormC2Values,
    actions: FormikHelpers<MigrationFormC2Values>
  ) => {
    if (!chain) return
    const { L2, starter } = values
    console.log('here')
    const chainStringToObj: { [key in string]: CHAIN_ID } = {
      ['BASE']: CHAIN_ID.BASE,
      ['ZORA']: CHAIN_ID.ZORA,
      ['OP']: CHAIN_ID.OPTIMISM,
    }

    const zeroFounder = {
      wallet: starter as AddressType,
      ownershipPct: BigInt(0),
      vestExpiry: BigInt(Math.floor(new Date('2040-01-01').getTime() / 1000)),
    }

    const res = await prepareMigrationDeploy(
      CHAIN_ID.BASE_GOERLI,
      thisChain,
      thisDao,
      zeroFounder,
      merkleRoot
    )

    addTransaction({
      type: TransactionType.MIGRATION,
      summary: 'Migrate to L2',
      transactions: [
        /*migrationTxn*/
      ],
    })

    actions.resetForm()
  }

  const formComponents: { [key in number]: ReactNode } = {
    0: <MigrationFormC1 />,
    1: <MigrationFormC2 onSubmit={handleC2Submit} />,
    //2: <MigrationFormC2 />,
    3: <></>,
  }

  return (
    <Stack>
      <MigrationTracker checkpoint={daoProgress} />
      {formComponents[daoProgress]}
    </Stack>
  )
}
