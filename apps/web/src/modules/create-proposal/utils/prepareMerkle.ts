/*import { DaoMember } from "src/data/subgraph/requests/daoMembersList"

export const prepaerMerkle = (
  members: DaoMember[]
): ProposalTransactions => {
  const flattenedTransactions = transactions.flatMap((txn) => txn.transactions)

  const calldata = flattenedTransactions.map((txn) => txn.calldata)
  const targets = flattenedTransactions.map((txn) => txn.target)
  const values = flattenedTransactions.map((txn) => {
    const value = !txn.value ? '0' : txn.value

    return parseEther(value.toString())
  })

  return { calldata, targets, values }
}*/
