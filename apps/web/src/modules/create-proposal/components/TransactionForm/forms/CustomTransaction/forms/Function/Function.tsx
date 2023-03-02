import { Flex } from '@zoralabs/zord'
import React from 'react'

import { useCustomTransactionStore } from 'src/modules/create-proposal'

import { CustomTransactionForm } from '../CustomTransactionForm'
import { transactionFunctionFields, validateTransactionFunction } from './fields'

export const Function = () => {
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
      <CustomTransactionForm
        initialValues={initialValues}
        fields={transactionFunctionFields}
        validationSchema={validateTransactionFunction}
        submitCallback={(values) => submitCallback(values)}
        options={options}
      />
    </Flex>
  )
}
