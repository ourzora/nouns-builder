import { Flex, Stack } from '@zoralabs/zord'
import React from 'react'
import { Field } from 'formik'
import { BuilderTransaction } from '../../stores'
import { TransactionCard, SimulationError } from '../TransactionCard'
import { defaultInputLabelStyle } from 'src/components/Fields/styles.css'
import { Simulation } from 'src/services/simulationService'
import { intersection } from 'lodash'
import { useRouter } from 'next/router'

export const Transactions = ({
  transactions,
  disabled,
  simulations,
  simulationError,
}: {
  transactions: BuilderTransaction[]
  simulations: Simulation[]
  disabled?: boolean
  simulationError?: string
}) => {
  const router = useRouter()

  const createMap = (simulations: Simulation[]): Map<number, Simulation> => {
    const map = new Map()
    simulations.forEach((simulation) => {
      map.set(simulation.index, simulation)
    })
    return map
  }

  const createIndexedMatrix = (transactions: BuilderTransaction[]): number[][] => {
    let count = 0
    const matrixIndexs = transactions.map((txn, i) =>
      txn.transactions.map((_, j) => {
        if (i === 0 && j === 0) {
          return count
        }

        count = count + 1
        return count
      })
    )
    return matrixIndexs
  }

  const failedIndexes = simulations.map((result) => result.index)
  const matrix = createIndexedMatrix(transactions)
  const mapped = createMap(simulations)

  return (
    <Stack mb={'x10'}>
      <label className={defaultInputLabelStyle}>Transactions</label>
      {transactions.length > 0 && (
        <Stack gap={'x4'}>
          {transactions.map((transaction, i) => {
            const failedTransactionsInRow = intersection(matrix[i], failedIndexes)
            const hasTransactionFailed = failedTransactionsInRow.length > 0
            const urls = failedTransactionsInRow.map(
              (idx) => mapped.get(idx)?.simulationUrl
            )

            let error
            if (hasTransactionFailed || simulationError) {
              error = hasTransactionFailed
                ? SimulationError.TransactionFailed
                : SimulationError.SimulationFailed
            }

            return (
              <TransactionCard
                key={`${transaction.type}-${i}`}
                simulationError={error}
                disabled={disabled || transaction.type === 'upgrade'}
                transaction={transaction}
                handleEdit={() => router.back()}
                simulationUrls={urls}
              >
                <Field
                  name={`transactions[${i}]`}
                  type="hidden"
                  value={JSON.stringify(transaction.transactions)}
                />
              </TransactionCard>
            )
          })}
        </Stack>
      )}

      {!!simulationError && (
        <Flex mt={'x4'} color={'negative'} width={'100%'} wrap={'wrap'}>
          {simulationError}
        </Flex>
      )}
    </Stack>
  )
}
