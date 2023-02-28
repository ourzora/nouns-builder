import { Box } from '@zoralabs/zord'
import React, { ReactElement, ReactNode } from 'react'

import { Nav } from '../DefaultLayout/Nav'
import { LayoutWrapper } from '../LayoutWrapper'
import { Footer } from './Footer'

export function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Nav />
      <Box px={'x4'}>{children}</Box>
      <Footer />
    </Box>
  )
}

export function getHomeLayout(page: ReactElement) {
  return (
    <LayoutWrapper>
      <HomeLayout>{page}</HomeLayout>
    </LayoutWrapper>
  )
}
