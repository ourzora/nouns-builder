import React from 'react'
import { atoms, Flex, Grid, Stack, Text } from '@zoralabs/zord'
import { ReviewCard } from '../ReviewCard'
import { useProposalStore } from '../../stores/useProposalStore'
import ConfirmRemove from 'src/modules/transaction-builder/components/Transaction/ConfirmRemove'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Queue = () => {
  const transactions = useProposalStore((state) => state.transactions)
  const removeTransaction = useProposalStore((state) => state.removeTransaction)

  const { query } = useRouter()

  /*

  handle remove transaction

 */

  const [openConfirm, setOpenConfirm] = React.useState<boolean>(false)
  const [removeIndex, setRemoveIndex] = React.useState<number | null>(null)
  const confirmRemoveTransaction = React.useCallback((index: number) => {
    setOpenConfirm(true)
    setRemoveIndex(index)
  }, [])

  const handleRemoveTransaction = React.useCallback(() => {
    if (removeIndex === null) return

    if (transactions.length >= 1) {
      removeTransaction(removeIndex)
    }
    setOpenConfirm(false)
  }, [removeIndex, transactions, removeTransaction])

  return (
    <Stack
      style={{ maxWidth: 500, borderRadius: 16 }}
      borderWidth={'normal'}
      borderStyle={'solid'}
      borderColor={'ghostHover'}
      p={'x6'}
      pb={'x12'}
    >
      <Text fontWeight={'label'} fontSize={20} style={{ lineHeight: '32px' }} mb={'x6'}>
        Review Queue
      </Text>
      <Stack gap={'x4'}>
        {transactions &&
          transactions.map((transaction, i) => (
            <ReviewCard
              key={`${transaction.type}-${i}`}
              handleRemove={() => confirmRemoveTransaction(i)}
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
      <Grid
        rows={'1fr 1fr'}
        columns={'repeat(2, 1fr)'}
        justify={'space-between'}
        gap={'x5'}
      >
        {/*<Text className={atoms({ lineHeight: 24 })} fontWeight={'label'}>*/}
        {/*  Total Amount*/}
        {/*</Text>*/}
        {/*<Flex justifySelf={'flex-end'}>3 tokens</Flex>*/}
        {/*<Flex className={atoms({ lineHeight: 24 })} fontWeight={'label'}>*/}
        {/*  Total Supply*/}
        {/*</Flex>*/}
        {/*<Flex justifySelf={'flex-end'}>71 tokens</Flex>*/}
      </Grid>
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
          fontSize={18}
          fontWeight={'label'}
          className={atoms({ lineHeight: 24, borderRadius: 'curved' })}
          backgroundColor={'accent'}
          color={'onAccent'}
          borderWidth={'none'}
          cursor={'pointer'}
          w={'100%'}
        >
          Review Proposal
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
