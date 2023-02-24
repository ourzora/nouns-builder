import React, { memo } from 'react'
import { Box, Flex } from '@zoralabs/zord'
import { motion } from 'framer-motion'
import { transactionFlowHeading, transactionFlowWrapper } from './CustomTransaction.css'
import { useCustomTransactionStore } from '../../../../stores'

export const FormHeading: React.FC<{
  sections: any[]
}> = memo(({ sections }) => {
  const [isOpen] = React.useState(false)
  const { active: activeCustomTransactionSection } = useCustomTransactionStore()

  return (
    <Flex direction={'column'} width={'100%'}>
      <motion.div
        className={transactionFlowWrapper}
        initial="initial"
        animate={isOpen ? 'animate' : 'initial'}
      >
        <Flex direction={'column'}>
          <Box className={transactionFlowHeading}>Add Transaction</Box>
          <Box>
            Step {activeCustomTransactionSection + 1} of 6:{' '}
            {sections[activeCustomTransactionSection].title}
          </Box>
        </Flex>
      </motion.div>
    </Flex>
  )
})
