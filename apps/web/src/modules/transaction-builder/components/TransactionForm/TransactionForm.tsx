import React, { ReactNode } from 'react'
import { TransactionType } from '../../constants/transactionType'
import { Airdrop, CustomTransaction } from './forms'

type TransactionFormType = {
  [key in TransactionType]: ReactNode
}

interface TransactionFormProps {
  type: TransactionType
}

export const TRANSACTION_FORM_OPTIONS = [TransactionType.AIRDROP, TransactionType.CUSTOM]

export const TransactionForm = ({ type }: TransactionFormProps) => {
  const FORMS: TransactionFormType = {
    [TransactionType.CUSTOM]: <CustomTransaction />,
    [TransactionType.AIRDROP]: <Airdrop />,
    [TransactionType.SEND_ETH]: null,
    [TransactionType.UPGRADE]: null,
  }

  return <>{FORMS[type]}</>
}
