import React from 'react'
import Form from 'src/components/Fields/Form'
import { founderFields, validateFounder } from 'src/components/Fields/fields/founder'
import { useLayoutStore } from 'src/stores'
import { useFormStore } from 'src/stores/useFormStore'
import shallow from 'zustand/shallow'
import { CreateLayout } from 'src/modules/create/layouts'
import { allocationProps } from 'src/typings'
import { useRouter } from 'next/router'
import { CREATE_SECTIONS } from 'src/modules/create/constants'

interface allocationFormProps {
  founderAllocation: allocationProps[]
  contributionAllocation: allocationProps[]
}

const Allocation = () => {
  const router = useRouter()
  const {
    founderAllocation,
    setFounderAllocation,
    contributionAllocation,
    setContributionAllocation,
  } = useFormStore(
    (state) => ({
      founderAllocation: state.founderAllocation,
      setFounderAllocation: state.setFounderAllocation,
      contributionAllocation: state.contributionAllocation,
      setContributionAllocation: state.setContributionAllocation,
    }),
    shallow
  )

  const { signerAddress, provider } = useLayoutStore(
    (state) => ({
      signerAddress: state.signerAddress,
      provider: state.provider,
    }),
    shallow
  )

  const initialValues: allocationFormProps = {
    founderAllocation: founderAllocation || [],
    contributionAllocation: contributionAllocation || [],
  }

  const handleSubmitCallback = (values: allocationFormProps) => {
    setFounderAllocation(values.founderAllocation)
    setContributionAllocation(values.contributionAllocation)
    router.push({
      pathname: '/create/artwork',
    })
  }

  return (
    <CreateLayout section={CREATE_SECTIONS.ALLOCATION}>
      <Form
        fields={founderFields}
        initialValues={initialValues}
        validationSchema={
          signerAddress ? validateFounder(signerAddress, provider) : undefined
        }
        buttonText={'Continue'}
        createSectionTitle={''}
        submitCallback={handleSubmitCallback}
      />
    </CreateLayout>
  )
}

export default Allocation
