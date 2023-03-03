import { Box, Heading, Text } from '@zoralabs/zord'
import { motion } from 'framer-motion'
import React from 'react'

import { CreateFormSection } from '../types'

interface FormHandlerProps extends CreateFormSection {}

export const FormHandler = ({ form, title, heading, subHeading }: FormHandlerProps) => {
  return (
    <Box>
      <Text variant={'eyebrow'}>Create A dao</Text>
      <Heading as={'h3'} mt={'x0'} mb={'x8'} fontSize={40}>
        {!heading ? title : heading}
      </Heading>
      {subHeading && (
        <Box mb={'x7'} color={'text2'}>
          {subHeading}
        </Box>
      )}
      <motion.div
        key={title}
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
        {form}
      </motion.div>
    </Box>
  )
}
