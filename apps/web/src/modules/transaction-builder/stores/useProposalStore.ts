import create from 'zustand'
import { TransactionType } from 'src/modules/transaction-builder/constants/transactionTypes'
import { AddressType } from 'src/typings'

export type Transaction = {
  functionSignature: string
  target: AddressType
  value: string
  calldata: string
}

export type BuilderTransaction = {
  type: TransactionType
  summary?: string
  transactions: Transaction[]
}

interface State {
  transactions: BuilderTransaction[]
  disabled: boolean
  title?: string
  summary?: string
}

interface Actions {
  addTransaction: (builderTransaction: BuilderTransaction) => void
  addTransactions: (builderTransactions: BuilderTransaction[]) => void
  removeTransaction: (index: number) => void
  createProposal: ({
    title,
    summary,
    disabled,
    transactions,
  }: Pick<State, 'title' | 'summary' | 'transactions' | 'disabled'>) => void
  clearProposal: () => void
}

const initialState: State = {
  summary: undefined,
  title: undefined,
  disabled: false,
  transactions: [],
}

export const useProposalStore = create<State & Actions>((set) => ({
  ...initialState,
  addTransaction: (transaction: BuilderTransaction) => {
    set((state) => ({
      transactions: [...state.transactions, transaction],
    }))
  },
  addTransactions: (transaction: BuilderTransaction[]) => {
    set((state) => ({
      transactions: [...state.transactions, ...transaction],
    }))
  },
  removeTransaction: (index) => {
    set((state) => ({
      transactions: state.transactions.filter((_, i) => i !== index),
    }))
  },
  createProposal: ({ title, summary, disabled, transactions }) =>
    set({ title, summary, disabled, transactions }),
  clearProposal: () => set(() => ({ ...initialState })),
}))
