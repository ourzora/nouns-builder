import React, { ReactElement } from 'react'
import { motion } from 'framer-motion'
import { Box, Flex, Heading } from '@zoralabs/zord'
import { CreateFormSection } from 'src/typings'
import { useFormStore } from 'src/stores/useFormStore'
import { headingStyle, preHeadingStyle, subHeadingStyle } from '../../styles/styles.css'

interface FormHandler {
  forms: ReactElement[]
  title: string
  heading?: string | string[]
  subHeading?: string | string[]
  sections: CreateFormSection[]
}

const FormHandler: React.FC<FormHandler> = ({ forms, title, heading, subHeading }) => {
  const { activeSectionCurrentIndex, setActiveSectionCurrentIndex } = useFormStore()

  /*  initialize first form in forms array */
  React.useEffect(() => {
    setActiveSectionCurrentIndex(0)
  }, [])

  return (
    <Box>
      <Flex className={preHeadingStyle}>Create A dao</Flex>
      <Heading as={'h3'} mt={'x0'} mb={'x8'} className={headingStyle}>
        {!heading
          ? title
          : Array.isArray(heading)
          ? heading[activeSectionCurrentIndex]
          : heading}
      </Heading>
      {subHeading && (
        <Box mb={'x7'} className={subHeadingStyle}>
          {Array.isArray(subHeading) ? subHeading[activeSectionCurrentIndex] : subHeading}
        </Box>
      )}
      <motion.div
        key={activeSectionCurrentIndex}
        variants={{
          exit: {
            y: 10,
            opacity: 0,
          },
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
        exit="exit"
      >
        {!!forms?.[activeSectionCurrentIndex] && (
          <>{React.cloneElement(forms[activeSectionCurrentIndex], { title })}</>
        )}
      </motion.div>
    </Box>
  )
}

export default FormHandler
