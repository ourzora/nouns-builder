import { Flex } from '@zoralabs/zord'
import { ethers } from 'ethers'
import { FormikValues } from 'formik'
import React from 'react'
import Form from 'src/components/Fields/Form'
import { useAuctionContract } from 'src/modules/dao'
import { fromSeconds, toSeconds } from 'src/utils/helpers'
import { sectionWrapperStyle } from 'src/styles/dao.css'
import {
  auctionSettingsFields,
  validateAuctionSettings,
} from 'src/components/Fields/fields/auction'

interface PreAuctionFormSettingsProps {
  title?: string
}

export const PreAuctionForm: React.FC<PreAuctionFormSettingsProps> = () => {
  const {
    auctionDuration: _auctionDuration,
    auctionReservePrice,
    setDuration,
    setReservePrice,
  } = useAuctionContract()

  const auctionDuration = React.useMemo(() => {
    if (!_auctionDuration) return

    return fromSeconds(Number(_auctionDuration))
  }, [_auctionDuration])

  const reservePrice = React.useMemo(() => {
    if (!auctionReservePrice) return
    return parseFloat(ethers.utils.formatUnits(auctionReservePrice))
  }, [auctionReservePrice])

  const updateMethods: any = {
    auctionDuration: { callback: setDuration, name: 'setDuration' },
    auctionReservePrice: { callback: setReservePrice, name: 'setReservePrice' },
  }

  const handleUpdateSettings = async (
    values: { field: string; value: any }[],
    setHasConfirmed: (hasConfirmed: {
      state: boolean | null
      values: {}[] | null
    }) => void,
    formik: FormikValues | undefined
  ) => {
    for (const _value of values) {
      const field = _value?.field
      const callback = updateMethods[field]?.callback
      let value = _value?.value

      if (field === 'auctionDuration') {
        await callback(toSeconds(value))
      } else if (field === 'auctionReservePrice') {
        await callback(ethers.utils.parseEther(value.toString()))
      }
    }

    setHasConfirmed({ state: false, values: null })
    formik?.setSubmitting(true)
  }

  return (
    <Flex direction={'column'} className={sectionWrapperStyle['admin']} mx={'auto'}>
      <Flex direction={'column'} w={'100%'}>
        <Form
          enableReinitialize
          fields={auctionSettingsFields}
          initialValues={{
            auctionDuration: {
              minutes: auctionDuration?.minutes || 0,
              days: auctionDuration?.days || 0,
              hours: auctionDuration?.hours || 0,
              seconds: auctionDuration?.seconds || 0,
            },
            auctionReservePrice: reservePrice || 0,
          }}
          validationSchema={validateAuctionSettings}
          buttonText={'Continue'}
          submitCallback={(values, setHasConfirmed, formik) =>
            handleUpdateSettings(values, setHasConfirmed, formik)
          }
          stickySave={true}
          compareReturn={true}
          auctioningHasStarted={false}
        />
      </Flex>
    </Flex>
  )
}
