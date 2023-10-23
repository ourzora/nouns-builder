import { Stack } from '@zoralabs/zord'
import axios from 'axios'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import useSWR from 'swr'
import { encodeFunctionData } from 'viem'
import { useBalance, useContractRead } from 'wagmi'
import { prepareWriteContract, waitForTransaction, writeContract } from 'wagmi/actions'

import {
  L1_MESSENGERS,
  L2_DEPLOYMENT_ADDRESSES,
  PUBLIC_MANAGER_ADDRESS,
} from 'src/constants/addresses'
import { auctionAbi, managerAbi, tokenAbi } from 'src/data/contract/abis'
import { messengerABI } from 'src/data/contract/abis/L1CrossDomainMessenger'
import { DaoMember } from 'src/data/subgraph/requests/memberSnapshot'
import { TransactionType } from 'src/modules/create-proposal/constants/transactionType'
import { useProposalStore } from 'src/modules/create-proposal/stores'
import { prepareMerkle } from 'src/modules/create-proposal/utils/prepareMerkle'
import { useDaoStore } from 'src/modules/dao/stores/useDaoStore'
import { useChainStore } from 'src/stores/useChainStore'
import { AddressType, CHAIN_ID } from 'src/typings'
import { getEnsAddress } from 'src/utils/ens'

import { MigrationFormC1 } from './MigrationFormC1'
import { MigrationFormC2 } from './MigrationFormC2'
import { MigrationFormC2Values } from './MigrationFormC2.schema'
import { MigrationTracker } from './MigrationTracker'
import { prepareMigrationDeploy } from './prepareMigrationDeploy'

type MembersQuery = {
  membersList: DaoMember[]
}

export enum DAOMigrationProgress {
  DEFAULT = 0,
  PAUSED = 1,
  DEPLOYED = 2,
  FINALIZED = 3,
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
  const treasuryMigrated = treasuryBalance && treasuryBalance.value < 1000000000000000

  let x: number = DAOMigrationProgress.DEFAULT

  let daoProgress = DAOMigrationProgress.FINALIZED
  if (!paused) daoProgress = DAOMigrationProgress.DEFAULT
  else if (!deployed) daoProgress = DAOMigrationProgress.PAUSED
  else if (!treasuryMigrated) daoProgress = DAOMigrationProgress.DEPLOYED

  daoProgress = DAOMigrationProgress.PAUSED

  const handleC2Submit = async (
    values: MigrationFormC2Values,
    actions: FormikHelpers<MigrationFormC2Values>
  ) => {
    if (!chain) return
    const { L2: targetChainID, starter: starterRaw } = values
    console.log('here')
    const starter = await getEnsAddress(starterRaw)

    const zeroFounder = {
      wallet: starter as AddressType,
      ownershipPct: BigInt(0),
      vestExpiry: BigInt(Math.floor(new Date('2040-01-01').getTime() / 1000)),
    }

    const res = await prepareMigrationDeploy(
      targetChainID,
      thisChain,
      thisDao,
      zeroFounder,
      merkleRoot
    )

    const L1_MESSENGER = L1_MESSENGERS[targetChainID]
    const v1goerliManager = PUBLIC_MANAGER_ADDRESS[CHAIN_ID.BASE_GOERLI]
    console.log('here')
    console.log(res._implData)
    try {
      const config = await prepareWriteContract({
        abi: messengerABI,
        address: L1_MESSENGER,
        functionName: 'sendMessage',
        args: [
          v1goerliManager,
          encodeFunctionData({
            abi: managerAbi,
            functionName: 'deploy',
            args: [
              res._implData.founder,
              res._implData.token,
              res._implData.auction,
              res._implData.gov,
            ],
          }),
          6000000,
        ],
        value: 0n,
      })

      // test sending eth to self

      console.log(config)
      const tx = await writeContract(config)
      if (tx.hash) console.log(await waitForTransaction({ hash: tx.hash }))
    } catch (e) {
      console.log('e', e)
      return
    }
    const migrationTxn = {
      functionSignature: 'sendMessage',
      target: L1_MESSENGER,
      value: '',
      calldata: encodeFunctionData({
        abi: messengerABI,
        functionName: 'sendMessage',
        args: [
          L2_DEPLOYMENT_ADDRESSES[targetChainID].MANAGER,
          encodeFunctionData({
            abi: managerAbi,
            functionName: 'deploy',
            args: [
              res._founderParams,
              res._implData.token,
              res._implData.auction,
              res._implData.gov,
            ],
          }),
          0, // not sure what to put here
        ],
      }),
    }

    //    address _target,
    //   bytes memory _message,
    //   uint32 _gasLimit
    addTransaction({
      type: TransactionType.MIGRATION,
      summary: 'Migrate to L2',
      transactions: [migrationTxn],
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
