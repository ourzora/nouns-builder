import React, { ReactNode } from 'react'

import { TransactionType } from 'src/modules/create-proposal/constants'

import { Airdrop } from './Airdrop'
import { CustomTransaction } from './CustomTransaction'
import { Droposal } from './Droposal'
import { PauseAuctions } from './PauseAuctions'
import { SendEth } from './SendEth'

type TransactionFormType = {
  [key in TransactionType]: ReactNode
}

interface TransactionFormProps {
  type: TransactionType
}

export const TRANSACTION_FORM_OPTIONS = [
  TransactionType.SEND_ETH,
  TransactionType.AIRDROP,
  TransactionType.DROPOSAL,
  TransactionType.PAUSE_AUCTIONS,
  TransactionType.CUSTOM,
]

export const TransactionForm = ({ type }: TransactionFormProps) => {
  const FORMS: TransactionFormType = {
    [TransactionType.CUSTOM]: <CustomTransaction />,
    [TransactionType.AIRDROP]: <Airdrop />,
    [TransactionType.DROPOSAL]: <Droposal />,
    [TransactionType.SEND_ETH]: <SendEth />,
    [TransactionType.PAUSE_AUCTIONS]: <PauseAuctions />,
    [TransactionType.UPGRADE]: null,
  }

  return <>{FORMS[type]}</>
}
