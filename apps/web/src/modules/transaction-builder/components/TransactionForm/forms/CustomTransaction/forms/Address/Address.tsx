import { contractAddressFields, validateContractAddress } from './fields'
import { Flex } from '@zoralabs/zord'
import React, { useEffect } from 'react'
import Form from 'src/components/Fields/Form'
import { useLayoutStore } from 'src/stores'
import { isAddress } from 'ethers/lib/utils'
import axios from 'axios'
import {
  initCustomTransaction,
  useCustomTransactionStore,
} from 'src/modules/transaction-builder/stores/useCustomTransactionStore'

interface AddressProps {
  title: string
}

export const Address: React.FC<AddressProps> = ({ title }) => {
  const { customTransaction, composeCustomTransaction } = useCustomTransactionStore()
  const { provider } = useLayoutStore()
  const initialValues = {
    transactionContractAddress: customTransaction?.address || '',
    transactionCustomABI: customTransaction?.customABI || '',
  }

  useEffect(() => {
    if (isAddress(customTransaction.address)) {
    }
  }, [customTransaction])

  const submitCallback = React.useCallback(
    async ({ transactionContractAddress }: { transactionContractAddress: string }) => {
      let customABI
      try {
        const response = await axios(`/api/abi?address=${transactionContractAddress}`)
        customABI = response.data?.abi
      } catch (e) {
        console.error(e)
      }

      const isSame = transactionContractAddress == customTransaction.address

      composeCustomTransaction({
        ...(isSame ? customTransaction : initCustomTransaction),
        address: transactionContractAddress,
        customABI,
      })
    },
    [customTransaction, composeCustomTransaction]
  )

  return (
    <Flex direction={'column'}>
      <Form
        initialValues={initialValues}
        fields={contractAddressFields}
        validationSchema={validateContractAddress(provider)}
        submitCallback={(values) => submitCallback(values)}
        transactionSectionTitle={title}
        isSubForm={true}
        buttonText={'Next'}
      />
    </Flex>
  )
}
