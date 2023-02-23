import React, { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box } from '@zoralabs/zord'
import { useFormStore } from 'src/stores/useFormStore'
import { AddTransactionSection } from 'src/typings'
import { useCustomTransactionStore } from '../../../../stores'

interface FormHandler {
  forms: ReactElement[]
  title: string
  heading?: string | string[]
  subHeading?: string | string[]
  sections: AddTransactionSection[]
}

export const FormHandler: React.FC<FormHandler> = ({ forms, title }) => {
  const { setActiveSectionCurrentIndex, activeSectionCurrentIndex } = useFormStore()
  const { active: activeCustomTransactionSection } = useCustomTransactionStore()

  /*  initialize first form in forms array */
  React.useEffect(() => {
    setActiveSectionCurrentIndex(0)
  }, [])

  return (
    <Box>
      <AnimatePresence exitBeforeEnter={true}>
        <motion.div
          key={activeCustomTransactionSection}
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
          {!!forms[activeSectionCurrentIndex] && (
            <>{React.cloneElement(forms[activeSectionCurrentIndex], { title })}</>
          )}
        </motion.div>
      </AnimatePresence>
    </Box>
  )
}
