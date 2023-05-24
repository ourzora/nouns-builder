import { Box } from '@zoralabs/zord'
import React, { ReactElement, ReactNode } from 'react'

import { Nav } from '../DefaultLayout/Nav'
import { LayoutWrapper } from '../LayoutWrapper'

export function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Nav />
      <Box px={'x4'}>{children}</Box>
    </Box>
  )
}

export function getProfileLayout(page: ReactElement) {
  return (
    <LayoutWrapper>
      <ProfileLayout>{page}</ProfileLayout>
    </LayoutWrapper>
  )
}
