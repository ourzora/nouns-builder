import { Flex, Stack } from '@zoralabs/zord'
import { BigNumber,ethers } from 'ethers'
import {Formik, FormikValues } from 'formik'
import React, {BaseSyntheticEvent} from 'react'
import isEqual from 'lodash/isEqual'

import { useAuctionContract } from 'src/hooks'
import { compareAndReturn, fromSeconds, toSeconds } from 'src/utils/helpers'
import { sectionWrapperStyle } from 'src/styles/dao.css'
import { NUMBER } from 'src/components/Fields/types'
import StickySave from 'src/components/Fields/StickySave'
import DaysHoursMinsSecs from 'src/components/Fields/DaysHoursMinsSecs'
import SmartInput from 'src/components/Fields/SmartInput'

import { PreAuctionFormValues, preAuctionValidationSchema } from './PreAuctionForm.schema'

interface PreAuctionFormSettingsProps {
  title?: string
}

export const PreAuctionForm: React.FC<PreAuctionFormSettingsProps> = () => {
  const { auctionDuration, auctionReservePrice, setDuration, setReservePrice } =
    useAuctionContract()

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
    formik.setSubmitting(true)

    try {
      const newDuration = values.auctionDuration
      if (!isEqual(newDuration, initialValues['auctionDuration'])) {
        await setDuration(BigNumber.from(toSeconds(newDuration)))
      }

      const newReservePrice = values.auctionReservePrice
      if (!isEqual(newReservePrice, initialValues['auctionReservePrice'])) {
        await setReservePrice(ethers.utils.parseEther(newReservePrice.toString()))
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
                    helperText={
                      'The starting price of an auction. Must be greater than 0.0001 ETH.'
                    }
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
