import React from 'react'
import Form from 'src/components/Fields/Form'
import { customTransactionFields, validateCustomTransaction } from './fields'
import useGovernorContract from 'src/hooks/useGovernorContract'

const CustomTransaction = () => {
  const { votingDelay, votingPeriod } = useGovernorContract()
  const initialValues = {
    transaction: '',
  }
  const submitCallback = (values: any) => {
    console.log('v', values)
  }

  return (
    <Form
      initialValues={initialValues}
      buttonText={'Submit Proposal'}
      fields={customTransactionFields({ votingDelay, votingPeriod })}
      validationSchema={validateCustomTransaction}
      submitCallback={(values) => submitCallback(values)}
    />
  )
}

export default CustomTransaction
