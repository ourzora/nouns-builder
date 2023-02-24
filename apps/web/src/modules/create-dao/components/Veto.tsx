import { Flex } from '@zoralabs/zord'
import React from 'react'
import Form from 'src/components/Fields/Form'
import { vetoFields } from 'src/components/Fields/fields/veto'
import { useFormStore } from 'src/stores/useFormStore'

interface VetoSettingsProps {
  title: string
}

const options = {
  vetoPower: [`Yes`, `No`],
}

export const Veto: React.FC<VetoSettingsProps> = ({ title }) => {
  const { vetoPower, setVetoPower } = useFormStore()
  const initialValues = {
    vetoPower: vetoPower || vetoPower === 0 ? vetoPower : undefined,
  }

  const submitCallback = (values: any) => {
    const vetoPower = values.vetoPower
    setVetoPower(vetoPower)
  }

  return (
    <Flex direction={'column'} w={'100%'}>
      <Form
        fields={vetoFields}
        initialValues={initialValues}
        buttonText={'Continue'}
        createSectionTitle={title}
        submitCallback={submitCallback}
        options={options}
      />
    </Flex>
  )
}
