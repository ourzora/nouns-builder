import { Box, Stack } from '@zoralabs/zord'
import { isBlocked } from 'blocklist'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { useSigner } from 'wagmi'

import { Skull } from 'src/components/Skull'
import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import { useDaoStore } from 'src/modules/dao'
import { useLayoutStore } from 'src/stores'
import { useChainStore } from 'src/stores/useChainStore'
import { getProvider } from 'src/utils/provider'

import { DefaultLayout } from './DefaultLayout'

export function LayoutWrapper({ children }: { children: ReactNode }) {
  const { data: signer, status } = useSigner()
  const { setSigner, setProvider, setSignerAddress } = useLayoutStore()
  const { setIsMobile } = useLayoutStore()
  const { addresses } = useDaoStore()
  const { chain, setChain } = useChainStore()
  const { query } = useRouter()

  // store signer, signerAddress and provider in store
  React.useEffect(() => {
    if (status === 'success') {
      setProvider(signer?.provider ?? getProvider(chain.id))
      setSigner(signer)
      //@ts-ignore
      setSignerAddress(signer?._address)
    }
  }, [status, chain, signer, setProvider, addresses, setSigner, setSignerAddress])

  // add mobile flag to layout store
  React.useEffect(() => {
    if (!!window) {
      window.addEventListener('resize', handleResize)
      setIsMobile(window.innerWidth <= 768)
    }
  }, [])

  React.useEffect(() => {
    if (!query?.network) return
    const routeChain = PUBLIC_DEFAULT_CHAINS.find((x) => x.slug === query.network)
    if (routeChain) setChain(routeChain)
  }, [query.network])

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  //@ts-ignore
  if (isBlocked(signer?._address))
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
