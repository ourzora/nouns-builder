import { Flex } from '@zoralabs/zord'
import React from 'react'
import Form from 'src/components/Fields/Form'
import { vetoFields } from 'src/components/Fields/fields/veto'
import { useFormStore } from 'src/stores/useFormStore'
import { CreateLayout } from 'src/modules/create/layouts'
import { useRouter } from 'next/router'

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

  const handlePrev = () => {
    router.push({
      pathname: '/create/auction',
    })
  }

  return (
    <CreateLayout
      title={'Veto'}
      subTitle={
        'Veto power is useful for addressing security concerns in the early days of your DAO, though as your membership grows, consider revisiting this functionality through a decentralized community vote.'
      }
    >
      <Flex direction={'column'} w={'100%'}>
        <Form
          fields={vetoFields}
          initialValues={initialValues}
          buttonText={'Continue'}
          submitCallback={handleSubmitCallback}
          options={options}
          handlePrev={handlePrev}
        />
      </Flex>
    </CreateLayout>
  )
}

export default Veto
