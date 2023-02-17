import React from 'react'
import { flowWrapper } from 'src/styles/styles.css'
import { Box, Flex } from '@zoralabs/zord'
import FlowSection from './FlowSection'
import { CREATE_FORM_ORDER } from 'src/modules/create/constants'

const Flow = () => {
  return (
    <Flex direction={'column'} width={'100%'}>
      <Box className={flowWrapper}>
        {CREATE_FORM_ORDER.map((section) => (
          <FlowSection section={section} key={section} />
        ))}
      </Box>
    </Flex>
  )
}

export default Flow
