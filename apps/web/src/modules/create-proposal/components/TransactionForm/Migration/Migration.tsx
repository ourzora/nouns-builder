import { Stack } from '@zoralabs/zord'
import axios from 'axios'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import useSWR from 'swr'
import { encodeFunctionData } from 'viem'
import { useBalance, useContractRead } from 'wagmi'
import { prepareWriteContract, waitForTransaction, writeContract } from 'wagmi/actions'

import { L1_MESSENGERS, L2_DEPLOYMENT_ADDRESSES } from 'src/constants/addresses'
import { auctionAbi, managerAbi } from 'src/data/contract/abis'
import { messengerABI } from 'src/data/contract/abis/L1CrossDomainMessenger'
import { L2DeployerABI } from 'src/data/contract/abis/L2MigrationDeployer'
import { DaoMember } from 'src/data/subgraph/requests/memberSnapshot'
import { TransactionType } from 'src/modules/create-proposal/constants/transactionType'
import { useProposalStore } from 'src/modules/create-proposal/stores'
import { prepareMerkle } from 'src/modules/create-proposal/utils/prepareMerkle'
import { useDaoStore } from 'src/modules/dao/stores/useDaoStore'
import { useChainStore } from 'src/stores/useChainStore'
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

  const { data: merkleRoot } = useSWR(isReady ? [token, chain.id] : undefined, () =>
    axios
      .get<MembersQuery>(
        `/api/memberSnapshot/${token}?chainId=${
          chain.id
        }&page=${undefined}&limit=${10000}`
      )
      .then(async (x) => {
        console.log('swr ended')
        return await prepareMerkle(x.data.membersList)
      })
  )

  const deployed = false
  const treasuryMigrated = treasuryBalance && treasuryBalance.value < 1000000000000000

  let daoProgress = DAOMigrationProgress.FINALIZED
  if (!paused) daoProgress = DAOMigrationProgress.DEFAULT
  else if (!deployed) daoProgress = DAOMigrationProgress.PAUSED
  else if (!treasuryMigrated) daoProgress = DAOMigrationProgress.DEPLOYED

  daoProgress = DAOMigrationProgress.PAUSED

  const handleC2Submit = async (
    values: MigrationFormC2Values,
    actions: FormikHelpers<MigrationFormC2Values>
  ) => {
    console.log('in handleC2Submit')
    if (!chain) return
    const { L2: targetChainID, starter: starterRaw } = values
    const starter = await getEnsAddress(starterRaw)
    console.log(merkleRoot)

    const res = await prepareMigrationDeploy(
      targetChainID,
      thisChain,
      thisDao,
      merkleRoot!
    )

    const L1_MESSENGER = L1_MESSENGERS[targetChainID]
    try {
      const deployHelper = '0x01e2d618d5752f99047ba611ad35d9f8a9cc85bf'
      console.log(res)
      const testDeployConfig = await prepareWriteContract({
        abi: messengerABI,
        address: L1_MESSENGER,
        functionName: 'sendMessage',
        args: [
          deployHelper,
          encodeFunctionData({
            abi: L2DeployerABI,
            functionName: 'deploy',
            args: [
              res.implData.founder,
              res.implData.token,
              res.implData.auction,
              res.implData.gov,
              res.merkleMinterSettingsHex,
            ],
          }),
          6000000,
        ],
        value: 0n,
      })

      console.log(testDeployConfig)
      const tx = await writeContract(testDeployConfig)
      if (tx.hash) console.log(await waitForTransaction({ hash: tx.hash }))
    } catch (e) {
      console.log('error in deploy', e)
      return
    }

    // OLD
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
              res.founderParams,
              res.implData.token,
              res.implData.auction,
              res.implData.gov,
            ],
          }),
          0, // not sure what to put here
        ],
      }),
    }
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
