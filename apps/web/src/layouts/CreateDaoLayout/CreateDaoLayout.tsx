import { Box } from '@zoralabs/zord'
import React, { ReactElement, ReactNode } from 'react'

import { LayoutWrapper } from '../LayoutWrapper'
import { Nav } from './Nav'
import { Uploading } from './Uploading'

function CreateDaoLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Nav />
      <Box px={'x0'}>{children}</Box>
      <Uploading />
    </Box>
  )
}

export function getCreateDaoLayout(page: ReactElement) {
  return (
    <LayoutWrapper>
      <CreateDaoLayout>{page}</CreateDaoLayout>
    </LayoutWrapper>
  )
}
