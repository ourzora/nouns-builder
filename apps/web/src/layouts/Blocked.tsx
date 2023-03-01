import { Box, Stack } from '@zoralabs/zord'
import React from 'react'

import { Skull } from 'src/components/Skull'

import { DefaultLayout } from './DefaultLayout'

export const Blocked = () => {
  return (
    <DefaultLayout>
      <Stack align={'center'} py={'x32'}>
        <Skull />
        <Box>Access Denied</Box>
      </Stack>
    </DefaultLayout>
  )
}
