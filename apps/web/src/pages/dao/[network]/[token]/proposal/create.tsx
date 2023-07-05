import { Flex, Stack } from '@zoralabs/zord'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import getDAOAddresses from 'src/data/contract/requests/getDAOAddresses'
import { useVotes } from 'src/hooks'
import { getDaoLayout } from 'src/layouts/DaoLayout'
import {
  CreateProposalHeading,
  DropdownSelect,
  SelectTransactionType,
  TRANSACTION_FORM_OPTIONS,
  TRANSACTION_TYPES,
  TransactionForm,
  TransactionFormType,
  TransactionTypeIcon,
  TwoColumnLayout,
  useProposalStore,
} from 'src/modules/create-proposal'
import { useDaoStore } from 'src/modules/dao'
import { NextPageWithLayout } from 'src/pages/_app'
import { useChainStore } from 'src/stores/useChainStore'
import { notFoundWrap } from 'src/styles/404.css'
import { AddressType } from 'src/typings'

const CreateProposalPage: NextPageWithLayout = () => {
  const router = useRouter()
  const chain = useChainStore((x) => x.chain)
  const { query } = router
  const [transactionType, setTransactionType] = useState<
    TransactionFormType | undefined
  >()
  const transactions = useProposalStore((state) => state.transactions)

  useEffect(() => {
    if (transactions.length && !transactionType) {
      setTransactionType(transactions[0].type as TransactionFormType)
    }
  }, [transactions, transactionType, setTransactionType])

  const { addresses } = useDaoStore()
  const { address } = useAccount()

  const { isLoading, hasThreshold } = useVotes({
    chain,
    governorAddress: addresses?.governor,
    signerAddress: address,
    collectionAddress: query?.token as AddressType,
  })

  const createSelectOption = (type: TransactionFormType) => ({
    value: type,
    label: TRANSACTION_TYPES[type].title,
    icon: <TransactionTypeIcon transactionType={type} />,
  })

  const options = TRANSACTION_FORM_OPTIONS.map(createSelectOption)

  const handleDropdownOnChange = (value: TransactionFormType) => {
    setTransactionType(value)
  }

  if (isLoading) return null

  if (!hasThreshold) {
    return <Flex className={notFoundWrap}>403 - Access Denied</Flex>
  }

  return (
    <Stack
      mt={'x24'}
      mb={'x20'}
      w={'100%'}
      px={'x3'}
      style={{ maxWidth: 1060 }}
      mx="auto"
    >
      <CreateProposalHeading
        title={'Create Proposal'}
        transactionType={transactionType}
      />
      {transactionType ? (
        <TwoColumnLayout
          leftColumn={
            <Stack>
              <DropdownSelect
                value={transactionType}
                options={options}
                onChange={(value) => handleDropdownOnChange(value)}
              />
              <TransactionForm type={transactionType} />
            </Stack>
          }
        />
      ) : (
        <TwoColumnLayout
          leftColumn={
            <SelectTransactionType
              transactionTypes={TRANSACTION_FORM_OPTIONS}
              onSelect={setTransactionType}
            />
          }
        />
      )}
    </Stack>
  )
}

CreateProposalPage.getLayout = getDaoLayout

export default CreateProposalPage

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
  const { maxAge, swr } = CACHE_TIMES.DAO_PROPOSAL
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
  )

  const collection = params?.token as AddressType
  const network = params?.network as string

  const chain = PUBLIC_DEFAULT_CHAINS.find((x) => x.slug === network)

  if (!chain)
    return {
      notFound: true,
    }

  const addresses = await getDAOAddresses(chain.id, collection)

  if (!addresses)
    return {
      notFound: true,
    }

  return {
    props: {
      addresses,
    },
  }
}
