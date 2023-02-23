import { Flex } from '@zoralabs/zord'
import { Contract, ethers } from 'ethers'
import { Formik, FormikValues } from 'formik'
import React from 'react'
import {
  adminProposalFields,
  validateAdmin,
} from 'src/components/Fields/fields/adminForm'
import { NULL_ADDRESS } from 'src/constants/addresses'
import useAuctionContract from 'src/hooks/useAuctionContract'
import useGovernorContract from 'src/hooks/useGovernorContract'
import { useMetadataContract } from 'src/modules/dao/hooks'
import { useDaoStore, useLayoutStore } from 'src/stores'
import { getEnsAddress } from 'src/utils/ens'
import { compareAndReturn, fromSeconds } from 'src/utils/helpers'
import { useRouter } from 'next/router'
import { sectionWrapperStyle } from 'src/styles/dao.css'
import {
  useProposalStore,
  BuilderTransaction,
} from 'src/modules/transaction-builder/stores/useProposalStore'
import { TransactionType } from 'src/modules/transaction-builder/constants/transactionTypes'
import type { AddressType, DaoContracts } from 'src/typings'
import { generalInfoProps, auctionSettingsProps, votingSettingsProps } from 'src/typings'
import { formValuesToTransactionMap } from 'src/modules/dao/utils/adminFormFieldToTransaction'
import { Stack } from '@mantine/core'
import FieldSwitch from 'src/components/Fields/FieldSwitch'
import StickySave from 'src/components/Fields/StickySave'
import isEqual from 'lodash/isEqual'

interface AdminFormProps {
  title?: string
}

export interface AdminFormValues
  extends Omit<generalInfoProps, 'daoName' | 'daoSymbol'>,
    auctionSettingsProps,
    votingSettingsProps {
  projectDescription: string
  rendererBase: string
  votingPeriod: {
    days: number
    hours: number
    minutes: number
    seconds: number
  }
  votingDelay: {
    days: number
    hours: number
    minutes: number
    seconds: number
  }
  vetoPower: 1 | 0
  vetoer: string
}

const AdminForm: React.FC<AdminFormProps> = () => {
  const {
    query: { token },
    push,
  } = useRouter()

  const createProposal = useProposalStore((state) => state.createProposal)
  const addresses = useDaoStore((state) => state.addresses)
  const provider = useLayoutStore((state) => state.provider)

  const {
    contract: auctionContract,
    auctionDuration,
    auctionReservePrice,
  } = useAuctionContract()

  const {
    contract: governorContract,
    vetoer,
    votingPeriod,
    votingDelay,
    quorumVotesBps,
    proposalThresholdBps,
  } = useGovernorContract()

  const {
    contract: metadataContract,
    daoImage,
    daoWebsite,
    rendererBase,
    description,
  } = useMetadataContract(addresses?.metadata as AddressType)

  const contracts: DaoContracts = {
    auctionContract,
    governorContract,
    metadataContract,
  }

  const initialValues: AdminFormValues = {
    /* artwork */
    projectDescription: description?.replace(/\\n/g, String.fromCharCode(13, 10)) || '',
    // artwork: []

    /* metadata */
    daoAvatar: daoImage || '',
    rendererBase: rendererBase || '',
    daoWebsite: daoWebsite || '',

    /* governor */
    proposalThreshold: Number(proposalThresholdBps) / 100 || 0,
    quorumThreshold: Number(quorumVotesBps) / 100 || 0,
    votingPeriod: fromSeconds(votingPeriod && Number(votingPeriod)),
    votingDelay: fromSeconds(votingDelay && Number(votingDelay)),
    vetoPower: vetoer === NULL_ADDRESS ? 1 : 0,
    vetoer: vetoer || '',

    /* auction */
    auctionDuration: fromSeconds(auctionDuration && Number(auctionDuration)),
    auctionReservePrice: auctionReservePrice
      ? parseFloat(ethers.utils.formatUnits(auctionReservePrice))
      : 0,
  }

  const withPauseUnpause = (
    transactions: BuilderTransaction[],
    auctionAddress: AddressType,
    auctionContract?: Contract
  ) => {
    const targetAddresses = transactions
      .flatMap((txn) => txn.transactions)
      .map((txn) => txn.target)

    if (!targetAddresses.includes(auctionAddress)) {
      return transactions
    }

    const pause = {
      type: TransactionType.CUSTOM,
      transactions: [
        {
          functionSignature: 'pause()',
          target: auctionAddress,
          calldata: auctionContract?.interface.encodeFunctionData('pause') || '',
          value: '',
        },
      ],
    }

    const unpause = {
      type: TransactionType.CUSTOM,
      transactions: [
        {
          functionSignature: 'unpause()',
          target: auctionAddress,
          calldata: auctionContract?.interface.encodeFunctionData('unpause') || '',
          value: '',
        },
      ],
    }

    return [pause, ...transactions, unpause]
  }

  const handleUpdateSettings = async (
    values: AdminFormValues,
    formik: FormikValues | undefined
  ) => {
    let transactions: BuilderTransaction[] = []

    let field: keyof AdminFormValues
    for (field in values) {
      let value = values[field]

      if (isEqual(value, initialValues[field])) {
        continue
      }

      if (field === 'vetoer') {
        value = await getEnsAddress(value as string, provider)
      }

      const transactionProperties = formValuesToTransactionMap[field]
      // @ts-ignore
      const calldata = transactionProperties.constructCalldata(contracts, value)
      const target = transactionProperties.getTarget(addresses)

      if (target)
        transactions.push({
          type: TransactionType.CUSTOM,
          transactions: [
            {
              functionSignature: transactionProperties.functionSignature,
              target,
              calldata: calldata || '',
              value: '',
            },
          ],
        })

      // removes burnVetoer from the list of transactions if updateVetoer is present
      if (field === 'vetoer') {
        transactions = transactions.filter(
          (tx: BuilderTransaction) =>
            tx.transactions[0].functionSignature !== 'burnVetoer'
        )
      }
      if (field === 'vetoPower') {
        transactions = transactions.filter(
          (tx: BuilderTransaction) =>
            tx.transactions[0].functionSignature !== 'updateVetoer'
        )
      }
    }

    formik?.setSubmitting(true)

    const transactionsWithPauseUnpause = withPauseUnpause(
      transactions,
      addresses?.auction as AddressType,
      auctionContract
    )

    createProposal({
      disabled: false,
      title: undefined,
      summary: undefined,
      transactions: transactionsWithPauseUnpause,
    })

    push(`/dao/${token}/proposal/review`)
  }

  return (
    <Flex direction={'column'} className={sectionWrapperStyle['admin']} mx={'auto'}>
      <Flex direction={'column'} w={'100%'}>
        <Formik
          initialValues={initialValues}
          validationSchema={validateAdmin(provider)}
          onSubmit={(values, formik: FormikValues) =>
            handleUpdateSettings(values, formik)
          }
          enableReinitialize
          validateOnMount
        >
          {(formik) => {
            const changes = compareAndReturn(formik.initialValues, formik.values).length

            return (
              <Flex direction={'column'} w={'100%'}>
                <Stack>
                  {adminProposalFields.map((f, i) => (
                    <FieldSwitch key={i} formik={formik} field={f} autoSubmit={false} />
                  ))}
                </Stack>

                <StickySave
                  confirmText={`Create proposal for ${changes} ${
                    !!changes && changes > 1 ? 'changes' : 'change'
                  } to the contract parameters.`}
                  disabled={!formik.dirty || changes === 0}
                  saveButtonText={'Create Proposal'}
                  onSave={formik.handleSubmit}
                />
              </Flex>
            )
          }}
        </Formik>
      </Flex>
    </Flex>
  )
}

export default AdminForm
