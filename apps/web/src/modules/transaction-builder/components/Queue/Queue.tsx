import React from 'react'
import { atoms, Button, Flex, Stack, Text } from '@zoralabs/zord'
import { TransactionCard } from 'src/modules/transaction-builder/components/TransactionCard'
import { useProposalStore } from 'src/modules/transaction-builder/stores/useProposalStore'
import { ConfirmRemove } from './ConfirmRemove'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { TransactionType } from '../../constants'

export const Queue = () => {
  const transactions = useProposalStore((state) => state.transactions)
  const removeTransaction = useProposalStore((state) => state.removeTransaction)
  const removeAllTransactions = useProposalStore((state) => state.removeAllTransactions)

  const { query } = useRouter()

  const [openConfirm, setOpenConfirm] = React.useState<boolean>(false)
  const [removeIndex, setRemoveIndex] = React.useState<number | null>(null)

  const confirmRemoveTransaction = (index: number) => {
    setOpenConfirm(true)
    setRemoveIndex(index)
  }

  const handleRemoveTransaction = () => {
    if (removeIndex === null) return

    if (transactions.length >= 1) {
      removeTransaction(removeIndex)
    }
    setOpenConfirm(false)
  }

  const handleClearAll = () => {
    removeAllTransactions()
  }

  return (
    <Stack
      style={{ maxWidth: 500, borderRadius: 16 }}
      borderWidth={'normal'}
      borderStyle={'solid'}
      borderColor={'ghostHover'}
      p={'x6'}
      pb={'x12'}
    >
      <Flex justify={'space-between'}>
        <Text fontWeight={'label'} fontSize={20} style={{ lineHeight: '32px' }} mb={'x6'}>
          Review Queue
        </Text>
        <Button variant="ghost" size="sm" onClick={handleClearAll}>
          Clear All
        </Button>
      </Flex>

      <Stack gap={'x4'}>
        {transactions &&
          transactions.map((transaction, i) => (
            <TransactionCard
              key={`${transaction.type}-${i}`}
              handleRemove={() => confirmRemoveTransaction(i)}
              disabled={transaction.type === TransactionType.UPGRADE}
              transaction={transaction}
            />
          ))}
      </Stack>
      <Stack
        borderWidth={'thin'}
        borderStyle={'solid'}
        borderColor={'ghostHover'}
        mt={'x6'}
        mb={'x8'}
      />

      <Link
        href={{
          pathname: `/dao/${query.token}/proposal/review`,
        }}
      >
        <Flex
          as={'button'}
          py={'x4'}
          px={'x6'}
          mt={'x10'}
          align={'center'}
          justify={'center'}
          disabled={transactions.length === 0}
          borderRadius={'curved'}
          backgroundColor={'accent'}
          color={'onAccent'}
          borderWidth={'none'}
          cursor={'pointer'}
          w={'100%'}
        >
          <Text variant={'label-lg'}>Review Proposal</Text>
        </Flex>
      </Link>
      <AnimatedModal close={() => setOpenConfirm(false)} open={openConfirm}>
        <ConfirmRemove
          handleRemoveTransaction={handleRemoveTransaction}
          setOpenConfirm={setOpenConfirm}
        />
      </AnimatedModal>
    </Stack>
  )
}
