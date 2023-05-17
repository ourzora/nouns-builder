import { Stack } from '@zoralabs/zord'
import { ethers } from 'ethers'
import React, { useEffect, useMemo } from 'react'
import useSWR from 'swr'

import SWR_KEYS from 'src/constants/swrKeys'
import { metadataAbi } from 'src/data/contract/abis'
import { getPropertyItemsCount } from 'src/data/contract/requests/getPropertyItemsCount'
import { transformFileProperties } from 'src/modules/create-dao'
import { TransactionType } from 'src/modules/create-proposal/constants'
import { useProposalStore } from 'src/modules/create-proposal/stores'
import { useArtworkStore } from 'src/modules/create-proposal/stores/useArtworkStore'
import { useDaoStore } from 'src/modules/dao'
import { AddressType } from 'src/typings'

import { AddArtworkForm } from './AddArtworkForm'

export const AddArtwork = () => {
  const { orderedLayers, ipfsUpload, isUploadingToIPFS, resetForm } = useArtworkStore()
  const addresses = useDaoStore((x) => x.addresses)
  const addTransaction = useProposalStore((state) => state.addTransaction)

  const contractOrderedLayers = [...orderedLayers].reverse() // traits in the contract are reversed

  const { data } = useSWR(
    addresses.metadata ? SWR_KEYS.ARTWORK_PROPERTY_ITEMS_COUNT : undefined,
    () => {
      if (!addresses.metadata) return
      return getPropertyItemsCount(addresses?.metadata)
    }
  )

  useEffect(() => {
    resetForm()
  }, [])

  const { propertiesCount, propertyItemsCount } = data || {}

  const isPropertyCountValid = useMemo(() => {
    if (!propertiesCount) return false
    return orderedLayers.length >= propertiesCount
  }, [propertiesCount, orderedLayers])

  const invalidPropertyIndex = useMemo(() => {
    if (!propertyItemsCount || propertyItemsCount.length < 1) return -1
    return contractOrderedLayers.findIndex((x, i) => {
      console.log(x.properties.length, propertyItemsCount[i])
      return x.properties.length < propertyItemsCount[i]
    })
  }, [orderedLayers, propertyItemsCount])

  const isValid =
    isPropertyCountValid &&
    invalidPropertyIndex < 0 &&
    !isUploadingToIPFS &&
    ipfsUpload.length !== 0

  const transactions = React.useMemo(() => {
    if (!orderedLayers || !ipfsUpload) return

    return transformFileProperties(orderedLayers, ipfsUpload, 500)
  }, [orderedLayers, ipfsUpload])

  const handleReplaceArtworkTransaction = () => {
    if (!transactions || !isValid) return
    const metadataInterface = new ethers.utils.Interface(metadataAbi)

    const formattedTransactions = transactions.map((transaction) => {
      const functionSignature =
        'addProperties(string[], (uint256,string,bool)[], (string,string))'

      return {
        functionSignature,
        target: addresses?.metadata as AddressType,
        value: '',
        calldata: metadataInterface.encodeFunctionData(functionSignature, [
          transaction.names,
          transaction.items,
          transaction.data,
        ]),
      }
    })

    addTransaction({
      type: TransactionType.ADD_ARTWORK,
      summary: 'Add artwork',
      transactions: formattedTransactions,
    })

    resetForm()
  }

  return (
    <Stack>
      <AddArtworkForm
        disabled={!isValid}
        isPropertyCountValid={isPropertyCountValid}
        propertiesCount={propertiesCount || 0}
        handleSubmit={handleReplaceArtworkTransaction}
      />
    </Stack>
  )
}
