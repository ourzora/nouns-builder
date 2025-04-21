import axios from 'axios'
import useSWR from 'swr'
import { formatEther } from 'viem'

import SWR_KEYS from 'src/constants/swrKeys'
import { useChainStore } from 'src/stores/useChainStore'
import { CHAIN_ID } from 'src/typings'

type Argument = { name: string; value: string; type: string }

export type DecodedTransactionData = {
  functionName: string
  args: { [key: string]: Argument }
  decoded?: string[] | undefined
}

type DecodedTransactionSuccess = {
  target: string
  transaction: DecodedTransactionData
  isNotDecoded: false
}

type DecodedTransactionFailure = {
  target: string
  transaction: string
  isNotDecoded: true
}

export type DecodedTransaction = DecodedTransactionSuccess | DecodedTransactionFailure

export const useDecodedTransactions = (
  targets: string[],
  calldatas: string[],
  values: string[]
): DecodedTransaction[] | undefined => {
  const chain = useChainStore((x) => x.chain)

  /* format in shape defined in ethers actor */
  const formatSendEth = (value: string) => {
    const amount = formatEther(BigInt(value))
    return {
      functionName: 'Transfer',
      args: {
        ['Transfer']: { name: `value`, value: `${amount} ETH`, type: `uint256` },
      },
    }
  }

  const decodeTransaction = async (
    chainId: CHAIN_ID,
    target: string,
    calldata: string,
    value: string
  ): Promise<DecodedTransactionData | string> => {
    /* if calldata is '0x' */
    const isTransfer = calldata === '0x'

    if (isTransfer) {
      return formatSendEth(value)
    }

    try {
      const decoded = await axios.post('/api/decode', {
        calldata: calldata,
        contract: target,
        chain: chainId,
      })

      if (decoded?.data?.statusCode) throw new Error('Decode failed')

      return decoded.data
    } catch (err) {
      console.log('err', err)

      // if this tx has value display it as a send eth tx
      if (value.length && parseInt(value)) return formatSendEth(value)

      // if no value return original calldata
      return calldata
    }
  }

  const { data: decodedTransactions } = useSWR(
    targets && calldatas && values
      ? [SWR_KEYS.PROPOSALS_TRANSACTIONS, targets, calldatas, values]
      : null,
    async (_, targets, calldatas, values) => {
      return await Promise.all(
        targets.map(async (target, i) => {
          const transaction = await decodeTransaction(
            chain.id,
            target,
            calldatas[i],
            values[i]
          )

          if (typeof transaction === 'string')
            return {
              target,
              transaction,
              isNotDecoded: true,
            } as DecodedTransactionFailure
          return { target, transaction, isNotDecoded: false } as DecodedTransactionSuccess
        })
      )
    },
    { revalidateOnFocus: false }
  )

  return decodedTransactions
}
