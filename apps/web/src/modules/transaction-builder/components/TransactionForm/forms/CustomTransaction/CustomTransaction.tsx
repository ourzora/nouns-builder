import React from 'react'
import { Flex } from '@zoralabs/zord'
import { motion } from 'framer-motion'
import { AddressType } from 'src/typings'
import {
  useProposalStore,
  useCustomTransactionStore,
  TransactionType,
  AddTransactionSection,
} from 'src/modules/transaction-builder'
import { customTransactionWrapper, transactionFormWrapper } from './styles.css'
import { ABI, Address, Arguments, Function, Summary, Value } from './forms'
import { FormHandler } from './FormHandler'
import { FormHeading } from './FormHeading'

export const CustomTransaction: React.FC = () => {
  const { addTransaction } = useProposalStore()

  const {
    active: activeCustomTransactionSection,
    customTransaction,
    reset,
  } = useCustomTransactionStore()

  /*

  Initialize Form Sections
    - order of returned array defines order of sections
    - multiple forms per section supported
*/

  const sections: AddTransactionSection[] = React.useMemo(() => {
    const address: AddTransactionSection = {
      title: 'Address',
      forms: [<Address key={'address'} title={''} />],
    }

    const abi: AddTransactionSection = {
      title: 'ABI Interface',
      forms: [<ABI key={'abi'} title={''} />],
    }

    const fn: AddTransactionSection = {
      title: 'Function',
      forms: [<Function key={'function'} title={''} />],
    }

    const args: AddTransactionSection = {
      title: 'Arguments',
      forms: [<Arguments key={'arguments'} title={''} />],
    }

    const value: AddTransactionSection = {
      title: 'Value',
      forms: [<Value key={'arguments'} title={''} />],
    }

    const summary: AddTransactionSection = {
      title: 'Summary',
      forms: [<Summary key={'summary'} title={''} />],
    }

    return [address, abi, fn, args, value, summary]
  }, [])

  const currentTransaction = React.useMemo(() => {
    if (!customTransaction?.calldata) return

    if (customTransaction?.function?.name === 'sendEth(address)') {
      return {
        type: TransactionType.SEND_ETH,
        transactions: [
          {
            functionSignature: 'sendEth(address)',
            target: customTransaction?.address as AddressType,
            calldata: customTransaction?.calldata,
            value: customTransaction?.value,
          },
        ],
      }
    }

    if (customTransaction?.function?.name === 'call(address,calldata)') {
      return {
        type: TransactionType.CUSTOM,
        transactions: [
          {
            functionSignature: 'call(address,calldata)',
            target: customTransaction?.address as AddressType,
            calldata: customTransaction?.calldata,
            value: customTransaction?.value,
          },
        ],
      }
    }

    if (customTransaction?.contract) {
      const fns: [string, any][] = Object.entries(customTransaction?.contract?.functions)
      const signature = fns.filter(
        (fn) => fn[1].name === customTransaction.function.name
      )?.[0]?.[0]
      return {
        type: TransactionType.CUSTOM,
        transactions: [
          {
            functionSignature: signature,
            target: customTransaction?.address as AddressType,
            calldata: customTransaction?.calldata,
            value: customTransaction?.value,
          },
        ],
      }
    }
  }, [customTransaction])

  React.useEffect(() => {
    if (!currentTransaction) return

    addTransaction(currentTransaction)
    reset()
  }, [currentTransaction, customTransaction])

  return (
    <Flex
      pb={'x6'}
      direction={'column'}
      borderWidth={'normal'}
      borderStyle={'solid'}
      borderColor={'ghostHover'}
      style={{ borderRadius: '12px' }}
    >
      <Flex
        position={'relative'}
        direction={'column'}
        width={'100%'}
        p={'x16'}
        className={customTransactionWrapper}
      >
        <FormHeading sections={sections} />
        <Flex direction={'column'} className={transactionFormWrapper}>
          <motion.div
            key={sections[activeCustomTransactionSection].title}
            variants={{
              closed: {
                y: 10,
                opacity: 0,
              },
              open: {
                y: 0,
                opacity: 1,
              },
            }}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <FormHandler
              forms={sections[activeCustomTransactionSection].forms}
              title={sections[activeCustomTransactionSection].title}
              heading={sections[activeCustomTransactionSection]?.heading}
              subHeading={sections[activeCustomTransactionSection]?.subHeading}
              sections={sections}
            />
          </motion.div>
        </Flex>
      </Flex>
    </Flex>
  )
}
