import { Box } from '@zoralabs/zord'
import React, { ReactElement, ReactNode } from 'react'

import { BridgeModal } from 'src/components/BridgeModal/BridgeModal'

import { LayoutWrapper } from '../LayoutWrapper'
import { Footer } from './Footer'
import { Nav } from './Nav'

export function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Nav />
      <BridgeModal />
      <Box px={'x4'} pt={{ '@initial': 'x20', '@480': 'x16' }}>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export function getDefaultLayout(page: ReactElement) {
  return (
    <LayoutWrapper>
      <DefaultLayout>{page}</DefaultLayout>
    </LayoutWrapper>
  )
}
