import { Flex } from '@zoralabs/zord'
import React from 'react'
import Form from 'src/components/Fields/Form'
import { useCustomTransactionStore } from 'src/modules/create-proposal'

import { transactionFunctionFields, validateTransactionFunction } from './fields'

interface FunctionProps {
  title: string
}

export const Function: React.FC<FunctionProps> = ({ title }) => {
  const { customTransaction, composeCustomTransaction } = useCustomTransactionStore()

  const initialValues = {
    transactionFunction: customTransaction?.function || [],
  }

  const submitCallback = React.useCallback(
    (values: typeof initialValues) => {
      composeCustomTransaction({
        ...customTransaction,
        function: values.transactionFunction,
      })
    },
    [customTransaction]
  )

  const options = React.useMemo(() => {
    if (!customTransaction?.contract) return []

    return [
      {
        name: 'transactionFunction',
        options: customTransaction.contract.fragments.filter((fragment) =>
          // finds all nonpayable and payable action functions skipping views
          fragment.stateMutability?.includes('payable')
        ),
      },
    ]
  }, [customTransaction.contract])

  return (
    <Flex direction={'column'}>
      <Form
        initialValues={initialValues}
        fields={transactionFunctionFields}
        validationSchema={validateTransactionFunction}
        submitCallback={(values) => submitCallback(values)}
        transactionSectionTitle={title}
        isSubForm={true}
        options={options}
        buttonText={'Next'}
      />
    </Flex>
  )
}
