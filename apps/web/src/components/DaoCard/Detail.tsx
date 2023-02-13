import { Box, Flex, Paragraph } from '@zoralabs/zord'
import React from 'react'
import { detail } from './index.css'

export const Detail = ({ title, content }: { title: string; content: string }) => (
  <Flex direction={'column'} p={'x4'} className={detail}>
    <Paragraph color={'text3'}>{title}</Paragraph>
    <Box
      fontSize={16}
      color={'primary'}
      fontWeight={'display'}
      style={{ lineHeight: '24px' }}
    >
      {content}
    </Box>
  </Flex>
)
