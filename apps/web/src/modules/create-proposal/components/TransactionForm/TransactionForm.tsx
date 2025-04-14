import React, { ReactNode } from 'react'

import { TransactionType } from 'src/modules/create-proposal/constants'

import { Airdrop } from './Airdrop'
import { CustomTransaction } from './CustomTransaction'
import { Droposal } from './Droposal'
import { Migration } from './Migration'
import { PauseAuctions } from './PauseAuctions'
import { FixRendererBase } from './FixRendererBase'
import { ReplaceArtwork } from './ReplaceArtwork'
import { ResumeAuctions } from './ResumeAuctions/ResumeAuctions'
import { SendEth } from './SendEth'

interface TransactionFormProps {
  type: TransactionFormType
}

export type TransactionFormType = typeof TRANSACTION_FORM_OPTIONS[number]

export const TRANSACTION_FORM_OPTIONS = [
  TransactionType.SEND_ETH,
  TransactionType.AIRDROP,
  TransactionType.PAUSE_AUCTIONS,
  TransactionType.FIX_RENDERER_BASE,
  TransactionType.RESUME_AUCTIONS,
  TransactionType.REPLACE_ARTWORK,
  TransactionType.DROPOSAL,
  TransactionType.MIGRATION,
  TransactionType.CUSTOM,
] as const

export const TransactionForm = ({ type }: TransactionFormProps) => {
  const FORMS: { [key in TransactionFormType]: ReactNode } = {
    [TransactionType.CUSTOM]: <CustomTransaction />,
    [TransactionType.AIRDROP]: <Airdrop />,
    [TransactionType.DROPOSAL]: <Droposal />,
    [TransactionType.SEND_ETH]: <SendEth />,
    [TransactionType.PAUSE_AUCTIONS]: <PauseAuctions />,
    [TransactionType.FIX_RENDERER_BASE]: <FixRendererBase />,
    [TransactionType.RESUME_AUCTIONS]: <ResumeAuctions />,
    [TransactionType.REPLACE_ARTWORK]: <ReplaceArtwork />,
    [TransactionType.MIGRATION]: <Migration />,
  }

  return <>{FORMS[type]}</>
}
