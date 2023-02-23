import React from 'react'
import { Stack, Text } from '@zoralabs/zord'

export const Alert = () => {
  return (
    <Stack>
      <Text
        textTransform={'uppercase'}
        fontSize={16}
        style={{ lineHeight: '24px' }}
        color={'text3'}
        fontWeight={'label'}
        mb={'x1'}
      >
        Action required
      </Text>
      <Text fontSize={20} fontWeight={'label'} style={{ lineHeight: '24px' }} mb={'x5'}>
        Upgrade Contracts to Unlock Airdrop Feature
      </Text>
    </Stack>
  )
}
