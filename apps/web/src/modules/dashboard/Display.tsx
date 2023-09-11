import { BoxProps, Flex, Text } from '@zoralabs/zord'
import React from 'react'

export const DisplayPanel = ({
  title,
  description,
  height = 'x64',
}: {
  title: string
  description: string
  height?: BoxProps['height']
}) => {
  return (
    <Flex
      borderRadius={'phat'}
      borderStyle={'solid'}
      height={height}
      width={'100%'}
      borderWidth={'normal'}
      borderColor={'border'}
      direction={'column'}
      justify={'center'}
      align={'center'}
    >
      <Text fontSize={28} fontWeight={'display'} mb="x4" color={'text3'}>
        {title}
      </Text>
      <Text color={'text3'}>{description}</Text>
    </Flex>
  )
}
