import { Box } from '@zoralabs/zord'
import React, { ReactElement, ReactNode } from 'react'

import { PageLayout } from '../PageLayout'
import { Footer } from './Footer'
import { Nav } from './Nav'

export function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Nav />
      <Box px={'x4'}>{children}</Box>
      <Footer />
    </Box>
  )
}

export function getDefaultLayout(page: ReactElement) {
  return (
    <PageLayout>
      <DefaultLayout>{page}</DefaultLayout>
    </PageLayout>
  )
}
