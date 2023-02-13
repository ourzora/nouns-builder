import { Flex } from '@zoralabs/zord'
import React from 'react'
import Form from 'src/components/Fields/Form'
import {
  validateVotingSettings,
  votingSettingsFields,
} from 'src/components/Fields/fields/voting'
import { useFormStore } from 'src/stores/useFormStore'

interface VotingSettingsProps {
  title: string
}

const Voting: React.FC<VotingSettingsProps> = ({ title }) => {
  const { setVotingSettings, votingSettings } = useFormStore()
  const initialValues = {
    proposalThreshold:
      votingSettings?.proposalThreshold === 0
        ? 0
        : votingSettings?.proposalThreshold || '',
    quorumThreshold:
      votingSettings?.quorumThreshold === 0 ? 0 : votingSettings?.quorumThreshold || '',
  }

  return (
    <Flex direction={'column'} w={'100%'}>
      <Form
        fields={votingSettingsFields}
        initialValues={initialValues}
        validationSchema={validateVotingSettings}
        buttonText={'Continue'}
        createSectionTitle={title}
        submitCallback={setVotingSettings}
      />
    </Flex>
  )
}

export default Voting
