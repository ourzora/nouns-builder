import { ethers } from 'ethers'
import React, { useMemo } from 'react'
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

import { ReplaceArtworkForm } from './ReplaceArtworkForm'

export const ReplaceArtwork = () => {
  const { orderedLayers, ipfsUpload } = useArtworkStore()
  const addresses = useDaoStore((x) => x.addresses)
  const addTransaction = useProposalStore((state) => state.addTransaction)

  const { data } = useSWR(
    addresses.metadata ? SWR_KEYS.ARTWORK_PROPERTY_ITEMS_COUNT : undefined,
    () => {
      if (!addresses.metadata) return
      return getPropertyItemsCount(addresses?.metadata)
    }
  )

  const { propertiesCount, propertyItemsCount } = data || {}

  const isPropertyCountValid = useMemo(() => {
    if (!propertiesCount) return false
    return orderedLayers.length >= propertiesCount
  }, [propertiesCount, orderedLayers])

  const isPropertiesItemsCountValid = useMemo(() => {
    return orderedLayers.reverse().some((x, i) => {
      return propertyItemsCount ? x.properties.length >= propertyItemsCount[i] : false
    })
  }, [orderedLayers])

  const isValid = isPropertyCountValid && isPropertiesItemsCountValid

  const transactions = React.useMemo(() => {
    if (!orderedLayers || !ipfsUpload) return

    return transformFileProperties(orderedLayers, ipfsUpload, 500)
  }, [orderedLayers, ipfsUpload])

  const handleReplaceArtworkTransaction = () => {
    if (!transactions || !isValid) return
    const metadataInterface = new ethers.utils.Interface(metadataAbi)

    const formattedTransactions = transactions.map((transaction, i) => {
      const functionSignature = `${
        i > 1 ? 'addProperties' : 'deleteAndRecreateProperties'
      }(string[], (uint256,string,bool)[], (string,string))`

      return {
        functionSignature: 'updateMinters',
        target: addresses?.token as AddressType,
        value: '',
        calldata: metadataInterface.encodeFunctionData(functionSignature, [
          transaction.names,
          transaction.items,
          transaction.data,
        ]),
      }
    })

    addTransaction({
      type: TransactionType.REPLACE_ARTWORK,
      summary: 'Replace artwork',
      transactions: formattedTransactions,
    })
  }

  return <ReplaceArtworkForm handleSubmit={handleReplaceArtworkTransaction} />
}
