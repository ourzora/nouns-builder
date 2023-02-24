import { BigNumber, utils } from 'ethers'
import { BuilderTransaction } from '../stores/useProposalStore'
import { AddressType } from 'src/typings'

interface ProposalTransactions {
  calldata: string[]
  targets: AddressType[]
  values: BigNumber[]
}

export const prepareProposalTransactions = (
  transactions: BuilderTransaction[]
): ProposalTransactions => {
  const flattenedTransactions = transactions.flatMap((txn) => txn.transactions)

  const calldata = flattenedTransactions.map((txn) => txn.calldata)
  const targets = flattenedTransactions.map((txn) => txn.target)
  const values = flattenedTransactions.map((txn) => {
    const value = !txn.value ? '0' : txn.value

    return utils.parseEther(value.toString())
  })

  return { calldata, targets, values }
}
