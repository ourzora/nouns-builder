import React from 'react'
import { Flex } from '@zoralabs/zord'
import { CreateLayout } from 'src/modules/create/layouts'
import Form from 'src/components/Fields/Form'
import { useFormStore } from 'src/stores'
import { useRouter } from 'next/router'
import {
  auctionSettingsFields,
  validateAuctionSettings,
} from 'src/components/Fields/fields/auction'
import { votingSettingsFields } from 'src/components/Fields/fields/voting'
import { auctionSettingsProps } from 'src/typings'
import { CREATE_SECTION } from 'src/modules/create/constants'

const Auction = () => {
  const router = useRouter()
  const { setAuctionSettings, auctionSettings, setFulfilledSections } = useFormStore()
  const initialValues: Partial<auctionSettingsProps> = {
    auctionDuration: {
      seconds: auctionSettings?.auctionDuration?.seconds,
      minutes: auctionSettings?.auctionDuration?.minutes,
      days: auctionSettings?.auctionDuration?.days,
      hours: auctionSettings?.auctionDuration?.hours,
    },
    auctionReservePrice: auctionSettings?.auctionReservePrice,
  }

  const advancedValues = {
    proposalThreshold:
      auctionSettings?.proposalThreshold === 0
        ? 0
        : auctionSettings?.proposalThreshold || 0.5,
    quorumThreshold:
      auctionSettings?.quorumThreshold === 0 ? 0 : auctionSettings?.quorumThreshold || 10,
  }

  const handleSubmitCallback = (values: auctionSettingsProps) => {
    setAuctionSettings(values)
    router.push({
      pathname: '/create/veto',
    })
  }

  return (
    <CreateLayout section={CREATE_SECTION.AUCTION}>
      <Flex direction={'column'} w={'100%'}>
        <Form
          fields={auctionSettingsFields}
          initialValues={initialValues}
          validationSchema={validateAuctionSettings}
          buttonText={'Continue'}
          createSectionTitle={''}
          submitCallback={handleSubmitCallback}
          advancedFields={votingSettingsFields}
          advancedValues={advancedValues}
          enableReinitialize
        />
      </Flex>
    </CreateLayout>
  )
}

export default Auction
