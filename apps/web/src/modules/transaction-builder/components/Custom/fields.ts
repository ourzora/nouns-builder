import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import { BigNumber } from 'ethers'
import { ReactElement } from 'react'
import { TEXT, TRANSACTION } from 'src/components/Fields/types'
import { fromSeconds } from 'src/utils/helpers'
import * as Yup from 'yup'

type FieldProps = {
  name: string
  inputLabel: string | ReactElement
  type: string
  placeholder?: string
  helperText?: string
}

type CustomTransactionFieldParams = { votingDelay: BigNumber; votingPeriod: BigNumber }

const formatTimePeriod = (period?: string | BigNumber): string => {
  dayjs.extend(duration)
  dayjs.extend(relativeTime)

  return dayjs
    .duration(fromSeconds(Number(period)))
    .format('D[d] H[h] m[m] s[s]')
    .replace(/\b0+[a-z]+\s*/gi, '')
    .trim()
}

export const customTransactionFields = ({
  votingDelay,
  votingPeriod,
}: CustomTransactionFieldParams): Array<FieldProps> => {
  return [
    {
      name: 'transaction',
      inputLabel: 'Transactions',
      type: TRANSACTION,
      helperText: `Add one or more transactions and describe your proposal for the community. The proposal cannot modified after submission, so please verify all information before submitting. The voting period will begin after ${formatTimePeriod(
        votingDelay
      )} and last for ${formatTimePeriod(votingPeriod)}.`,
    },
  ]
}

export const validateCustomTransaction = Yup.object().shape({
  transaction: Yup.array().of(Yup.string()).min(1, 'transaction required'),
  addresses: Yup.array().required('*').min(1, 'required'),
  values: Yup.array().required('*').min(1, 'required'),
})
