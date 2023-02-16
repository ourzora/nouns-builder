import React from 'react'
import { Flex, Stack } from '@zoralabs/zord'
import { CreateLayout } from 'src/modules/create/layouts'
import Form from 'src/components/Fields/Form'
import {
  generalInfoFields,
  validateGeneralInfo,
} from 'src/components/Fields/fields/general'
import { useFormStore } from 'src/stores'
import { useRouter } from 'next/router'
import { generalInfoProps } from 'src/typings'
import { CREATE_SECTIONS } from 'src/modules/create/constants'

const General = () => {
  const router = useRouter()
  const { setGeneralInfo, generalInfo } = useFormStore()
  const initialValues: generalInfoProps = {
    daoAvatar: generalInfo?.daoAvatar || '',
    daoName: generalInfo?.daoName || '',
    daoSymbol: generalInfo?.daoSymbol || '',
    daoWebsite: generalInfo?.daoWebsite || '',
  }

  const handleSubmitCallback = (values: generalInfoProps) => {
    setGeneralInfo(values)
    router.push({
      pathname: '/create/auction',
    })
  }

  return (
    <CreateLayout section={CREATE_SECTIONS.GENERAL}>
      <Flex direction={'column'} w={'100%'}>
        <Form
          fields={generalInfoFields}
          initialValues={initialValues}
          validationSchema={validateGeneralInfo}
          buttonText={'Continue'}
          createSectionTitle={'General Settings'}
          submitCallback={handleSubmitCallback}
        />
      </Flex>
    </CreateLayout>
  )
}

export default General
