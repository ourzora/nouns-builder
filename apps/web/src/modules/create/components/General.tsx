import React from 'react'
import { Flex } from '@zoralabs/zord'
import Form from 'src/components/Fields/Form'
import {
  generalInfoFields,
  validateGeneralInfo,
} from 'src/components/Fields/fields/general'
import { useFormStore } from 'src/stores/useFormStore'

interface TokenSettingsProps {
  title: string
}

const General: React.FC<TokenSettingsProps> = ({ title }) => {
  const { setGeneralInfo, generalInfo } = useFormStore()
  const initialValues = {
    daoAvatar: generalInfo?.daoAvatar || '',
    daoName: generalInfo?.daoName || '',
    daoSymbol: generalInfo?.daoSymbol || '',
    daoWebsite: generalInfo?.daoWebsite || '',
  }

  return (
    <Flex direction={'column'} w={'100%'}>
      <Form
        fields={generalInfoFields}
        initialValues={initialValues}
        validationSchema={validateGeneralInfo}
        buttonText={'Continue'}
        createSectionTitle={title}
        submitCallback={setGeneralInfo}
      />
    </Flex>
  )
}

export default General
