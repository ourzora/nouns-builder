import { Flex } from '@zoralabs/zord'
import axios from 'axios'
import { isAddress } from 'ethers/lib/utils'
import React, { useEffect } from 'react'

import {
  initCustomTransaction,
  useCustomTransactionStore,
} from 'src/modules/create-proposal'
import { useLayoutStore } from 'src/stores'
import { useChainStore } from 'src/stores/useChainStore'

import { CustomTransactionForm } from '../CustomTransactionForm'
import { contractAddressFields, validateContractAddress } from './fields'

export const Address = () => {
  const { customTransaction, composeCustomTransaction } = useCustomTransactionStore()
  const { provider } = useLayoutStore()
  const chain = useChainStore((x) => x.chain)
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
        const response = await axios(
          `/api/abi?chainid=${chain.id}&address=${transactionContractAddress}`
        )
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
    [customTransaction, composeCustomTransaction, chain.id]
  )

  return (
    <Flex direction={'column'}>
      <CustomTransactionForm
        initialValues={initialValues}
        fields={contractAddressFields}
        validationSchema={validateContractAddress(provider)}
        submitCallback={(values) => submitCallback(values)}
      />
    </Flex>
  )
}
