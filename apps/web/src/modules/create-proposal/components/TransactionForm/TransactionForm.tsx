import React, { ReactNode } from 'react'

import { TransactionType } from 'src/modules/create-proposal/constants'

import { Airdrop } from './Airdrop'
import { CustomTransaction } from './CustomTransaction'
import { PauseAuctions } from './PauseAuctions'
import { SendEth } from './SendEth'

interface TransactionFormProps {
  type: TransactionFormType
}

export type TransactionFormType = typeof TRANSACTION_FORM_OPTIONS[number]

export const TRANSACTION_FORM_OPTIONS = [
  TransactionType.SEND_ETH,
  TransactionType.AIRDROP,
  TransactionType.PAUSE_AUCTIONS,
  TransactionType.CUSTOM,
] as const

export const TransactionForm = ({ type }: TransactionFormProps) => {
  const FORMS: { [key in TransactionFormType]: ReactNode } = {
    [TransactionType.CUSTOM]: <CustomTransaction />,
    [TransactionType.AIRDROP]: <Airdrop />,
    [TransactionType.SEND_ETH]: <SendEth />,
    [TransactionType.PAUSE_AUCTIONS]: <PauseAuctions />,
  }

  return <>{FORMS[type]}</>
}
