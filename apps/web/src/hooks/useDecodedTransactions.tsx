import axios from 'axios'
import useSWR from 'swr'
import { formatEther } from 'viem'

import SWR_KEYS from 'src/constants/swrKeys'
import { Proposal } from 'src/data/subgraph/requests/proposalQuery'
import { useChainStore } from 'src/stores/useChainStore'
import { CHAIN_ID, DecodedTransactionData } from 'src/typings'

export type DecodedTransactionSuccess = {
  target: string
  transaction: DecodedTransactionData
  isNotDecoded: false
}

export type DecodedTransactionFailure = {
  target: string
  transaction: string
  isNotDecoded: true
}

export type DecodedTransaction = DecodedTransactionSuccess | DecodedTransactionFailure

/* format in shape defined in ethers actor */
export const formatSendEth = (value: string) => {
  const amount = formatEther(BigInt(value))
  return {
    functionName: 'Transfer',
    args: {
      ['Transfer']: { name: `value`, value: `${amount} ETH`, type: `uint256` },
    },
    functionSig: '',
  }
}

type DecodeFunc = (
  chainId: CHAIN_ID,
  target: string,
  calldata: string
) => Promise<DecodedTransactionData | string>

const apiDecodeTx: DecodeFunc = async (
  chainId: CHAIN_ID,
  target: string,
  calldata: string
): Promise<DecodedTransactionData | string> => {
  const decoded = await axios.post('/api/decode', {
    calldata: calldata,
    contract: target,
    chain: chainId,
  })

  if (decoded?.data?.statusCode) throw new Error('Decode failed')

  return decoded.data
}

const decodeTx = async (
  chainId: CHAIN_ID,
  target: string,
  calldata: string,
  value: string,
  decodeFunc: DecodeFunc = apiDecodeTx
): Promise<DecodedTransactionData | string> => {
  /* if calldata is '0x' */
  const isTransfer = calldata === '0x'

  if (isTransfer) {
    return formatSendEth(value)
  }

  try {
    const decoded = await decodeFunc(chainId, target, calldata)
    return decoded
  } catch (err) {
    console.error('Error decoding transaction:', err)

    // if this tx has value display it as a send eth tx
    if (value.length && parseInt(value)) return formatSendEth(value)

    // if no value return original calldata
    return calldata
  }
}

export const decodeTransactions = async (
  chainId: CHAIN_ID,
  targets: string[],
  calldatas: string[],
  values: string[],
  decodeFunc: DecodeFunc = apiDecodeTx
): Promise<DecodedTransaction[]> => {
  return Promise.all(
    targets.map(async (target, i) => {
      const transaction = await decodeTx(
        chainId,
        target,
        calldatas[i],
        values[i],
        decodeFunc
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
}

export const useDecodedTransactions = (
  proposal: Proposal
): DecodedTransaction[] | undefined => {
  const chain = useChainStore((x) => x.chain)

  const { targets, calldatas, values } = proposal

  const { data: decodedTransactions } = useSWR(
    targets && calldatas && values
      ? [SWR_KEYS.PROPOSALS_TRANSACTIONS, chain.id, targets, calldatas, values]
      : null,
    async (_, chainId, targets, calldatas, values) =>
      decodeTransactions(chainId, targets, calldatas, values),
    { revalidateOnFocus: false }
  )

  return decodedTransactions
}
