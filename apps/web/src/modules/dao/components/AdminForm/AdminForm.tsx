import { Flex, Stack, Text } from '@zoralabs/zord'
import { BigNumber, Contract, ethers } from 'ethers'
import { FieldArray, Formik, FormikValues } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import isEqual from 'lodash/isEqual'
import { useRouter } from 'next/router'
import React, { BaseSyntheticEvent } from 'react'
import { Address, useContract, useContractReads } from 'wagmi'

import DaysHoursMinsSecs from 'src/components/Fields/DaysHoursMinsSecs'
import Radio from 'src/components/Fields/Radio'
import SmartInput from 'src/components/Fields/SmartInput'
import StickySave from 'src/components/Fields/StickySave'
import TextArea from 'src/components/Fields/TextArea'
import { NUMBER, TEXT } from 'src/components/Fields/types'
import SingleImageUpload from 'src/components/SingleImageUpload/SingleImageUpload'
import { NULL_ADDRESS } from 'src/constants/addresses'
import { auctionAbi, governorAbi, metadataAbi, tokenAbi } from 'src/data/contract/abis'
import { TokenAllocation } from 'src/modules/create-dao'
import {
  BuilderTransaction,
  TransactionType,
  useProposalStore,
} from 'src/modules/create-proposal'
import { formValuesToTransactionMap } from 'src/modules/dao/utils/adminFormFieldToTransaction'
import { useLayoutStore } from 'src/stores'
import { sectionWrapperStyle } from 'src/styles/dao.css'
import { AddressType } from 'src/typings'
import { getEnsAddress } from 'src/utils/ens'
import { compareAndReturn, fromSeconds, unpackOptionalArray } from 'src/utils/helpers'

import { DaoContracts, useDaoStore } from '../../stores'
import { AdminFormValues, adminValidationSchema } from './AdminForm.schema'
import { AdminFounderAllocationFields } from './AdminFounderAllocationFields'
import { Section } from './Section'

interface AdminFormProps {
  collectionAddress: string
}

const vetoerAnimation = {
  init: {
    height: 0,
    overflow: 'hidden',
  },
  open: {
    height: 'auto',
  },
}

export const AdminForm: React.FC<AdminFormProps> = ({ collectionAddress }) => {
  const { push } = useRouter()

  const createProposal = useProposalStore((state) => state.createProposal)
  const addresses = useDaoStore((state) => state.addresses)
  const provider = useLayoutStore((state) => state.provider)

  const auctionContractParams = {
    abi: auctionAbi,
    address: addresses.auction,
  }

  const governorContractParams = {
    abi: governorAbi,
    address: addresses?.governor as Address,
  }

  const metadataContractParams = {
    abi: metadataAbi,
    address: addresses?.metadata as Address,
  }

  const tokenContractParams = {
    abi: tokenAbi,
    address: addresses?.token as Address,
  }

  const auctionContract = useContract(auctionContractParams)
  const governorContract = useContract(governorContractParams)
  const metadataContract = useContract(metadataContractParams)
  const tokenContract = useContract(tokenContractParams)

  const { data } = useContractReads({
    contracts: [
      { ...auctionContractParams, functionName: 'duration' },
      { ...auctionContractParams, functionName: 'reservePrice' },
      { ...governorContractParams, functionName: 'vetoer' },
      { ...governorContractParams, functionName: 'votingPeriod' },
      { ...governorContractParams, functionName: 'votingDelay' },
      { ...governorContractParams, functionName: 'quorumThresholdBps' },
      { ...governorContractParams, functionName: 'proposalThresholdBps' },
      { ...metadataContractParams, functionName: 'contractImage' },
      { ...metadataContractParams, functionName: 'projectURI' },
      { ...metadataContractParams, functionName: 'rendererBase' },
      { ...metadataContractParams, functionName: 'description' },
      { ...tokenContractParams, functionName: 'getFounders' },
    ],
  })

  const [
    auctionDuration,
    auctionReservePrice,
    vetoer,
    votingPeriod,
    votingDelay,
    quorumVotesBps,
    proposalThresholdBps,
    daoImage,
    daoWebsite,
    rendererBase,
    description,
    founders,
  ] = unpackOptionalArray(data, 12)

  const contracts: DaoContracts = {
    auctionContract: auctionContract ?? undefined,
    governorContract: governorContract ?? undefined,
    metadataContract: metadataContract ?? undefined,
    tokenContract: tokenContract ?? undefined,
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
    founderAllocation:
      founders?.map((x) => ({
        founderAddress: x.wallet,
        allocationPercentage: x.ownershipPct,
        endDate: new Date(x.vestExpiry * 1000).toISOString(),
      })) || [],
    vetoPower: !!vetoer && vetoer !== NULL_ADDRESS,
    vetoer: vetoer || '',

    /* auction */
    auctionDuration: fromSeconds(auctionDuration && Number(auctionDuration)),
    auctionReservePrice: auctionReservePrice
      ? parseFloat(ethers.utils.formatUnits(auctionReservePrice))
      : 0,
  }

  const withPauseUnpause = (
    transactions: BuilderTransaction[],
    auctionAddress: Address,
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

      if (field === 'founderAllocation') {
        // @ts-ignore
        value = (value as TokenAllocation[]).map(
          ({ founderAddress, allocationPercentage, endDate }) => ({
            wallet: founderAddress as AddressType,
            ownershipPct: allocationPercentage
              ? BigNumber.from(allocationPercentage)
              : BigNumber.from(0),
            vestExpiry: BigNumber.from(Math.floor(new Date(endDate).getTime() / 1000)),
          })
        )
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
      addresses?.auction as Address,
      auctionContract ?? undefined
    )

    createProposal({
      disabled: false,
      title: undefined,
      summary: undefined,
      transactions: transactionsWithPauseUnpause,
    })

    push(`/dao/${collectionAddress}/proposal/review`)
  }

  return (
    <Flex direction={'column'} className={sectionWrapperStyle['admin']} mx={'auto'}>
      <Flex direction={'column'} w={'100%'}>
        <Formik
          initialValues={initialValues}
          validationSchema={adminValidationSchema(provider)}
          onSubmit={(values, formik: FormikValues) =>
            handleUpdateSettings(values, formik)
          }
          enableReinitialize
          validateOnMount
        >
          {(formik) => {
            const founderChanges = isEqual(
              formik.initialValues.founderAllocation,
              formik.values.founderAllocation
            )
              ? 0
              : 1
            const changes =
              compareAndReturn(formik.initialValues, formik.values).length +
              founderChanges
            return (
              <Flex direction={'column'} w={'100%'}>
                <Stack>
                  <Text variant="heading-sm">Admin</Text>
                  <Text color="text3" mt="x2">
                    Editing DAO settings will create a proposal.
                  </Text>

                  <Section title="General Settings">
                    <SingleImageUpload
                      {...formik.getFieldProps('daoAvatar')}
                      formik={formik}
                      id={'daoAvatar'}
                      inputLabel={'Dao avatar'}
                      helperText={'Upload'}
                    />

                    <TextArea
                      {...formik.getFieldProps('projectDescription')}
                      inputLabel={'Collection Description'}
                      formik={formik}
                      id={'projectDescription'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorMessage={formik.errors['projectDescription']}
                      placeholder={'Nouns is an experiment which combines...'}
                    />

                    <SmartInput
                      {...formik.getFieldProps('daoWebsite')}
                      inputLabel={'Dao Website'}
                      type={TEXT}
                      formik={formik}
                      id={'daoWebsite'}
                      onChange={({ target }: BaseSyntheticEvent) => {
                        formik.setFieldValue('daoWebsite', target.value)
                      }}
                      onBlur={formik.handleBlur}
                      errorMessage={formik.errors['daoWebsite']}
                      placeholder={'https://www.nouns.wtf'}
                    />

                    <SmartInput
                      {...formik.getFieldProps('rendererBase')}
                      inputLabel={'Renderer Base Url'}
                      type={TEXT}
                      formik={formik}
                      id={'rendererBase'}
                      onChange={({ target }: BaseSyntheticEvent) => {
                        formik.setFieldValue('rendererBase', target.value)
                      }}
                      onBlur={formik.handleBlur}
                      errorMessage={formik.errors['rendererBase']}
                      helperText={
                        'This is the base url of the image stacker used to stack the layers and compose an nft.'
                      }
                    />
                  </Section>

                  <Section title="Auction Settings">
                    <DaysHoursMinsSecs
                      {...formik.getFieldProps('auctionDuration')}
                      inputLabel={'Auction Duration'}
                      formik={formik}
                      id={'auctionDuration'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorMessage={formik.errors['auctionDuration']}
                      placeholder={['1', '0', '0', '0']}
                    />

                    <SmartInput
                      {...formik.getFieldProps('auctionReservePrice')}
                      inputLabel={'Auction Reserve Price'}
                      type={NUMBER}
                      formik={formik}
                      id={'auctionReservePrice'}
                      onChange={({ target }: BaseSyntheticEvent) => {
                        formik.setFieldValue(
                          'auctionReservePrice',
                          parseFloat(target.value)
                        )
                      }}
                      onBlur={formik.handleBlur}
                      errorMessage={formik.errors['auctionReservePrice']}
                      perma={'ETH'}
                    />
                  </Section>

                  <Section title="Governance Settings">
                    <SmartInput
                      {...formik.getFieldProps('proposalThreshold')}
                      inputLabel={'Proposal Threshold'}
                      type={NUMBER}
                      formik={formik}
                      id={'proposalThreshold'}
                      onChange={({ target }: BaseSyntheticEvent) => {
                        formik.setFieldValue(
                          'proposalThreshold',
                          parseFloat(target.value)
                        )
                      }}
                      onBlur={formik.handleBlur}
                      errorMessage={formik.errors['proposalThreshold']}
                      perma={'%'}
                      step={0.1}
                      helperText={
                        'This is the percentage of all existing tokens that must be owned by someone attempting to create a proposal. We recommend a starting value of 0.5% to encourage participation.'
                      }
                    />

                    <SmartInput
                      {...formik.getFieldProps('quorumThreshold')}
                      inputLabel={'Quorum Threshold'}
                      type={NUMBER}
                      formik={formik}
                      id={'quorumThreshold'}
                      onChange={({ target }: BaseSyntheticEvent) => {
                        formik.setFieldValue('quorumThreshold', parseFloat(target.value))
                      }}
                      onBlur={formik.handleBlur}
                      errorMessage={formik.errors['quorumThreshold']}
                      perma={'%'}
                      step={1}
                      helperText={
                        'This is the percentage of all existing tokens that must vote in a proposal in order for it to pass (as long as a majority of votes approve). We recommend a starting value of 10%.'
                      }
                    />

                    <DaysHoursMinsSecs
                      {...formik.getFieldProps('votingPeriod')}
                      inputLabel={'Voting Period'}
                      formik={formik}
                      id={'votingPeriod'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorMessage={formik.errors['votingPeriod']}
                    />

                    <DaysHoursMinsSecs
                      {...formik.getFieldProps('votingDelay')}
                      inputLabel={'Voting Delay'}
                      formik={formik}
                      id={'votingDelay'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorMessage={formik.errors['votingDelay']}
                    />
                  </Section>

                  <Section title="Veto Settings">
                    <Radio
                      {...formik.getFieldProps('vetoPower')}
                      formik={formik}
                      inputLabel={'Veto Power'}
                      id={'vetoPower'}
                      options={[
                        { value: true, label: 'Yes' },
                        { value: false, label: 'No' },
                      ]}
                      flexDirection={'row'}
                    />

                    {formik.values['vetoPower'] === true && (
                      <AnimatePresence>
                        <motion.div
                          initial={'init'}
                          animate={'open'}
                          exit={'init'}
                          variants={vetoerAnimation}
                          transition={{ duration: 0.2 }}
                        >
                          <SmartInput
                            {...formik.getFieldProps('vetoer')}
                            inputLabel="Vetoer"
                            type={TEXT}
                            id="vetoer"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            errorMessage={formik.errors['vetoer']}
                            isAddress={true}
                            helperText={
                              'This is the address that has veto power over any proposal.'
                            }
                          />
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </Section>

                  <Section title="Alloction Settings">
                    <FieldArray name="founderAllocation">
                      {({ remove, push }) => (
                        <AdminFounderAllocationFields
                          formik={formik}
                          auctionDuration={fromSeconds(auctionDuration)}
                          touched={formik.touched}
                          values={formik.values}
                          errors={formik.errors}
                          removeFounderAddress={remove}
                          addFounderAddress={() =>
                            push({ founderAddress: '', allocation: '', endDate: '' })
                          }
                        />
                      )}
                    </FieldArray>
                  </Section>
                </Stack>

                <StickySave
                  confirmText={`Create proposal for ${changes} ${
                    !!changes && changes > 1 ? 'changes' : 'change'
                  } to the contract parameters.`}
                  disabled={!formik.dirty || !formik.isValid || changes === 0}
                  saveButtonText={'Create Proposal'}
                  onSave={formik.handleSubmit}
                  isSubmitting={formik.isSubmitting}
                />
              </Flex>
            )
          }}
        </Formik>
      </Flex>
    </Flex>
  )
}
