import { fields, validateABI } from './fields'
import { Flex } from '@zoralabs/zord'
import React from 'react'
import Form from 'src/components/Fields/Form'
import { useLayoutStore } from 'src/stores'
import { ethers } from 'ethers'
import { useCustomTransactionStore } from 'src/modules/create-proposal/stores/useCustomTransactionStore'
import { AddressType } from 'src/typings'

interface ABIProps {
  title: string
}

export const ABI: React.FC<ABIProps> = ({ title }) => {
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
      <Form
        initialValues={initialValues}
        fields={fields}
        validationSchema={validateABI(provider)}
        submitCallback={(values) => submitCallback(values)}
        transactionSectionTitle={title}
        isSubForm={true}
        buttonText={'Next'}
      />
    </Flex>
  )
}
