import React, { ReactNode } from 'react'

import { TransactionType } from 'src/modules/create-proposal/constants'

import { Airdrop, CustomTransaction, SendEth } from './forms'

type TransactionFormType = {
  [key in TransactionType]: ReactNode
}

interface TransactionFormProps {
  type: TransactionType
}

export const TRANSACTION_FORM_OPTIONS = [
  TransactionType.SEND_ETH,
  TransactionType.AIRDROP,
  TransactionType.CUSTOM,
]

export const TransactionForm = ({ type }: TransactionFormProps) => {
  const FORMS: TransactionFormType = {
    [TransactionType.CUSTOM]: <CustomTransaction />,
    [TransactionType.AIRDROP]: <Airdrop />,
    [TransactionType.SEND_ETH]: <SendEth />,
    [TransactionType.UPGRADE]: null,
  }

  return <>{FORMS[type]}</>
}
