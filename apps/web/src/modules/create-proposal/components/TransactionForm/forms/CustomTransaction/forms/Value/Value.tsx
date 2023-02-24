import { transactionValueFields, validateTransactionValue } from './fields'
import { Flex } from '@zoralabs/zord'
import React from 'react'
import Form from 'src/components/Fields/Form'
import { useCustomTransactionStore } from 'src/modules/create-proposal'

interface ValueProps {
  title: string
}

export const Value: React.FC<ValueProps> = ({ title }) => {
  const { customTransaction, composeCustomTransaction } = useCustomTransactionStore()
  const initialValues = {
    transactionValue: customTransaction?.value || '',
  }

  const submitCallback = React.useCallback(
    (values: { transactionValue: string }) => {
      composeCustomTransaction({
        ...customTransaction,
        value: values.transactionValue,
      })
    },
    [customTransaction, composeCustomTransaction]
  )

  return (
    <Flex direction={'column'}>
      <Form
        initialValues={initialValues}
        fields={transactionValueFields}
        validationSchema={validateTransactionValue}
        submitCallback={(values) => submitCallback(values)}
        transactionSectionTitle={title}
        isSubForm={true}
        buttonText={'Next'}
      />
    </Flex>
  )
}
