import React from 'react'
import Form from 'src/components/Fields/Form'
import { founderFields, validateFounder } from 'src/components/Fields/fields/founder'
import { useLayoutStore } from 'src/stores'
import { useFormStore } from 'src/stores/useFormStore'
import shallow from 'zustand/shallow'

interface FounderProps {
  title: string
}

const Allocation: React.FC<FounderProps> = ({ title }) => {
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

  const initialValues = {
    founderAllocation: founderAllocation || [],
    contributionAllocation: contributionAllocation || [],
  }

  const handleSubmitCallback = (values: any) => {
    setFounderAllocation(values.founderAllocation)
    setContributionAllocation(values.contributionAllocation)
  }

  return (
    <>
      <Form
        fields={founderFields}
        initialValues={initialValues}
        validationSchema={
          signerAddress ? validateFounder(signerAddress, provider) : undefined
        }
        buttonText={'Continue'}
        createSectionTitle={title}
        submitCallback={handleSubmitCallback}
      />
    </>
  )
}

export default Allocation
