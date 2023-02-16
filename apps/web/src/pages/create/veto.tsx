import { Flex } from '@zoralabs/zord'
import React from 'react'
import Form from 'src/components/Fields/Form'
import { vetoFields } from 'src/components/Fields/fields/veto'
import { useFormStore } from 'src/stores/useFormStore'
import { CreateLayout } from 'src/modules/create/layouts'
import { useRouter } from 'next/router'
import { CREATE_SECTIONS } from 'src/modules/create/constants'

interface VetoPowerProps {
  vetoPower: number | undefined
}

const options = {
  vetoPower: [`Yes`, `No`],
}

const Veto = () => {
  const router = useRouter()
  const { vetoPower, setVetoPower } = useFormStore()
  const initialValues: VetoPowerProps = {
    vetoPower: vetoPower || vetoPower === 0 ? vetoPower : undefined,
  }

  const handleSubmitCallback = (values: VetoPowerProps) => {
    const vetoPower = values.vetoPower
    if (!vetoPower && vetoPower !== 0) return

    setVetoPower(vetoPower)
    router.push({
      pathname: '/create/allocation',
    })
  }

  return (
    <CreateLayout section={CREATE_SECTIONS.VETO}>
      <Flex direction={'column'} w={'100%'}>
        <Form
          fields={vetoFields}
          initialValues={initialValues}
          buttonText={'Continue'}
          createSectionTitle={''}
          submitCallback={handleSubmitCallback}
          options={options}
        />
      </Flex>
    </CreateLayout>
  )
}

export default Veto
