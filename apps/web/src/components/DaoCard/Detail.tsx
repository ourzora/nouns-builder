import { Box, Text, Flex, Paragraph } from '@zoralabs/zord'
import React from 'react'
import { detail } from './index.css'

export const Detail = ({ title, content }: { title: string; content: string }) => (
  <Flex direction={'column'} p={'x4'} className={detail}>
    <Paragraph color={'text3'}>{title}</Paragraph>
    <Text variant="paragraph-md" color={'primary'} fontWeight={'display'}>
      {content}
    </Text>
  </Flex>
)
