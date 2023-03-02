import { Flex } from '@zoralabs/zord'
import { ethers } from 'ethers'
import React from 'react'

import { useCustomTransactionStore } from 'src/modules/create-proposal/index'
import { useLayoutStore } from 'src/stores'
import { AddressType } from 'src/typings'

import { CustomTransactionForm } from '../CustomTransactionForm'
import { fields, validateABI } from './fields'

export const ABI = () => {
  const { customTransaction, composeCustomTransaction } = useCustomTransactionStore()
  const { provider } = useLayoutStore()
  const initialValues = {
    transactionCustomABI: customTransaction?.customABI || '',
  }

  const { signer } = useLayoutStore()

  const submitCallback = React.useCallback(
    (values: { transactionCustomABI: string }) => {
      try {
        if (!!signer && !!customTransaction.address && !!values.transactionCustomABI) {
          const contract = new ethers.Contract(
            customTransaction.address,
            values.transactionCustomABI || '[]',
            signer
          )
          composeCustomTransaction({
            ...customTransaction,
            address: customTransaction.address,
            customABI: values?.transactionCustomABI,
            contract: {
              address: contract.address as AddressType,
              abi: customTransaction.customABI!,
              fragments: contract.interface.fragments,
              functions: contract.interface.functions,
            },
          })
        } else {
          composeCustomTransaction({
            ...customTransaction,
            address: customTransaction.address,
            customABI: undefined,
            contract: undefined,
          })
        }
      } catch (err) {
        console.error('err', err)
      }
    },
    [customTransaction, composeCustomTransaction]
  )

  return (
    <Flex direction={'column'}>
      <CustomTransactionForm
        initialValues={initialValues}
        fields={fields}
        validationSchema={validateABI(provider)}
        submitCallback={(values) => submitCallback(values)}
      />
    </Flex>
  )
}
