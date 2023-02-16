import React, { ReactNode } from 'react'
import { TransactionType } from '../constants/transactionTypes'
import Transaction from './Transaction/Transaction'
import { Airdrop } from './Airdrop/Airdrop'

type TransactionFormType = {
  [key in TransactionType]: ReactNode
}

interface SelectedTransactionFormProps {
  type: TransactionType
}

export const SelectedTransactionForm = ({ type }: SelectedTransactionFormProps) => {
  const FORMS: TransactionFormType = {
    [TransactionType.CUSTOM]: (
      <Transaction
        helperText={`Add one or more transactions and describe your proposal for the community. 
            The proposal cannot modified after submission, so please verify all information before submitting.`}
      />
    ),
    [TransactionType.AIRDROP]: <Airdrop />,
    [TransactionType.SEND_ETH]: null,
    [TransactionType.UPGRADE]: null,
  }

  return <>{FORMS[type]}</>
}
