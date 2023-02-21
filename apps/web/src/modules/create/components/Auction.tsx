import React from 'react'
import Form from 'src/components/Fields/Form'
import {
  auctionSettingsFields,
  validateAuctionSettings,
} from 'src/components/Fields/fields/auction'
import { votingSettingsFields } from 'src/components/Fields/fields/voting'
import { useFormStore } from 'src/stores/useFormStore'

interface AuctionSettingsProps {
  title: string
}

const Auction: React.FC<AuctionSettingsProps> = ({ title }) => {
  const { setAuctionSettings, auctionSettings } = useFormStore()
  const initialValues = {
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

  return (
    <Form
      fields={auctionSettingsFields}
      initialValues={initialValues}
      validationSchema={validateAuctionSettings}
      buttonText={'Continue'}
      createSectionTitle={title}
      submitCallback={setAuctionSettings}
      advancedFields={votingSettingsFields}
      advancedValues={advancedValues}
      enableReinitialize
    />
  )
}

export default Auction
