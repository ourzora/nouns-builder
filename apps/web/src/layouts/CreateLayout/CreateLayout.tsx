import { Box } from '@zoralabs/zord'
import React, { ReactElement, ReactNode } from 'react'

import { PageLayout } from '../PageLayout'
import { Nav } from './Nav'
import { Uploading } from './Uploading'

function CreateLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Nav />
      <Box px={'x0'}>{children}</Box>
      <Uploading />
    </Box>
  )
}

export function getCreateLayout(page: ReactElement) {
  return (
    <PageLayout>
      <CreateLayout>{page}</CreateLayout>
    </PageLayout>
  )
}
