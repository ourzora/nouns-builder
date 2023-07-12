import { prepareWriteContract, writeContract } from '@wagmi/core'
import { Flex, Stack } from '@zoralabs/zord'
import { BigNumber, ethers } from 'ethers'
import { Formik, FormikValues } from 'formik'
import isEqual from 'lodash/isEqual'
import React, { BaseSyntheticEvent } from 'react'
import { useContractReads, useSigner } from 'wagmi'

import DaysHoursMinsSecs from 'src/components/Fields/DaysHoursMinsSecs'
import SmartInput from 'src/components/Fields/SmartInput'
import StickySave from 'src/components/Fields/StickySave'
import { NUMBER } from 'src/components/Fields/types'
import { auctionAbi } from 'src/data/contract/abis'
import { useChainStore } from 'src/stores/useChainStore'
import { sectionWrapperStyle } from 'src/styles/dao.css'
import {
  compareAndReturn,
  fromSeconds,
  toSeconds,
  unpackOptionalArray,
} from 'src/utils/helpers'

import { useDaoStore } from '../stores'
import { PreAuctionFormValues, preAuctionValidationSchema } from './PreAuctionForm.schema'

interface PreAuctionFormSettingsProps {
  title?: string
}

export const PreAuctionForm: React.FC<PreAuctionFormSettingsProps> = () => {
  const { addresses } = useDaoStore()
  const { data: signer } = useSigner()
  const chain = useChainStore((x) => x.chain)

  const auctionContractParams = {
    abi: auctionAbi,
    address: addresses.auction,
    chainId: chain.id,
  }

  const { data } = useContractReads({
    contracts: [
      { ...auctionContractParams, functionName: 'duration' },
      { ...auctionContractParams, functionName: 'reservePrice' },
    ] as const,
  })

  const [auctionDuration, auctionReservePrice] = unpackOptionalArray(data, 2)

  const initialValues: PreAuctionFormValues = {
    auctionDuration: fromSeconds(auctionDuration),
    auctionReservePrice: auctionReservePrice
      ? parseFloat(ethers.utils.formatUnits(auctionReservePrice))
      : 0,
  }

  const handleUpdateSettings = async (
    values: PreAuctionFormValues,
    formik: FormikValues
  ) => {
    if (!auctionContractParams.address) return
    formik.setSubmitting(true)

    try {
      const newDuration = values.auctionDuration
      if (!isEqual(newDuration, initialValues['auctionDuration'])) {
        const config = await prepareWriteContract({
          ...auctionContractParams,
          address: auctionContractParams.address,
          functionName: 'setDuration',
          args: [BigNumber.from(toSeconds(newDuration))],
        })
        const durationTxn = await writeContract(config)
        await durationTxn?.wait()
      }

      const newReservePrice = values.auctionReservePrice
      if (!isEqual(newReservePrice, initialValues['auctionReservePrice'])) {
        const config = await prepareWriteContract({
          ...auctionContractParams,
          address: auctionContractParams.address,
          functionName: 'setReservePrice',
          args: [ethers.utils.parseEther(newReservePrice.toString())],
        })
        const reservePriceTxn = await writeContract(config)
        await reservePriceTxn?.wait()
      }
    } finally {
      formik.setSubmitting(false)
    }
  }

  return (
    <Flex direction={'column'} className={sectionWrapperStyle['admin']} mx={'auto'}>
      <Flex direction={'column'} w={'100%'}>
        <Formik
          initialValues={initialValues}
          validationSchema={preAuctionValidationSchema}
          onSubmit={handleUpdateSettings}
          enableReinitialize
          validateOnMount
        >
          {(formik) => {
            const changes = compareAndReturn(formik.initialValues, formik.values).length

            return (
              <Flex direction={'column'} w={'100%'}>
                <Stack>
                  <DaysHoursMinsSecs
                    {...formik.getFieldProps('auctionDuration')}
                    inputLabel={'Auction Duration'}
                    formik={formik}
                    id={'auctionDuration'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorMessage={
                      formik.touched['auctionDuration'] &&
                      formik.errors['auctionDuration']
                        ? formik.errors['auctionDuration']
                        : undefined
                    }
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
                    helperText={'The starting price of an auction.'}
                    errorMessage={
                      formik.touched['auctionReservePrice'] &&
                      formik.errors['auctionReservePrice']
                        ? formik.errors['auctionReservePrice']
                        : undefined
                    }
                    perma={'ETH'}
                  />
                </Stack>

                <StickySave
                  confirmText={`I confirm that I want to change ${changes} ${
                    !!changes && changes > 1 ? 'parameters' : 'parameter'
                  }, and understand that there will be ${changes} ${
                    !!changes && changes > 1 ? 'transactions' : 'transaction'
                  } I need to sign and pay gas for.`}
                  disabled={!formik.dirty || changes === 0}
                  isSubmitting={formik.isSubmitting}
                  saveButtonText={'Save Changes'}
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
