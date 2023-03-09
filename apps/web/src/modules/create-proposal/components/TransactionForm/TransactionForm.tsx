import React, { ReactNode } from 'react'

import { TransactionType } from 'src/modules/create-proposal/constants'

import { Airdrop } from './Airdrop'
import { CustomTransaction } from './CustomTransaction'
import { SendEth } from './SendEth'

export type TransactionFormType = typeof TRANSACTION_FORM_OPTIONS[number]

interface TransactionFormProps {
  type: TransactionFormType
}

export const TRANSACTION_FORM_OPTIONS = [
  TransactionType.SEND_ETH,
  TransactionType.AIRDROP,
  TransactionType.CUSTOM,
] as const

export const TransactionForm = ({ type }: TransactionFormProps) => {
  const FORMS: { [key in TransactionFormType]: ReactNode } = {
    [TransactionType.CUSTOM]: <CustomTransaction />,
    [TransactionType.AIRDROP]: <Airdrop />,
    [TransactionType.SEND_ETH]: <SendEth />,
  }

  return <>{FORMS[type]}</>
}
