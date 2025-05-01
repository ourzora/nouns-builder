import { Box, Stack } from '@zoralabs/zord'
import { isBlocked } from 'blocklist'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { useAccount } from 'wagmi'

import { Skull } from 'src/components/Skull'
import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import { useLayoutStore } from 'src/stores'
import { useChainStore } from 'src/stores/useChainStore'

import { DefaultLayout } from './DefaultLayout'

export function LayoutWrapper({ children }: { children: ReactNode }) {
  const { setIsMobile } = useLayoutStore()
  const { setChain } = useChainStore()
  const { query } = useRouter()
  const { address } = useAccount()

  const handleResize = React.useCallback(() => {
    setIsMobile(window.innerWidth <= 768)
  }, [setIsMobile])

  // add mobile flag to layout store
  React.useEffect(() => {
    if (!!window) {
      window.addEventListener('resize', handleResize)
      handleResize()
    }
  }, [handleResize])

  React.useEffect(() => {
    if (!query?.network) return
    const routeChain = PUBLIC_DEFAULT_CHAINS.find((x) => x.slug === query.network)
    if (routeChain) setChain(routeChain)
  }, [query.network, setChain])

  // Fix for dev: network must be reset when env network type changes
  const isDev =
    !process.env.NEXT_PUBLIC_VERCEL_ENV ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'

  React.useEffect(() => {
    if (isDev && !query?.network) setChain(PUBLIC_DEFAULT_CHAINS[0])
  }, [isDev, query.network, setChain])

  if (isBlocked(address))
    return (
      <DefaultLayout>
        <Stack align={'center'} py={'x32'}>
          <Skull />
          <Box>Access Denied</Box>
        </Stack>
      </DefaultLayout>
    )

  return <>{children}</>
}
