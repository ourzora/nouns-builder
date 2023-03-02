import { Box, Stack } from '@zoralabs/zord'
import { isBlocked } from 'blocklist'
import React, { ReactNode } from 'react'
import { useSigner } from 'wagmi'

import { Skull } from 'src/components/Skull'
import { useDaoStore } from 'src/modules/dao'
import { useLayoutStore } from 'src/stores'
import { getProvider } from 'src/utils/provider'

import { DefaultLayout } from './DefaultLayout'

export function LayoutWrapper({ children }: { children: ReactNode }) {
  const { data: signer, status } = useSigner()
  const { setSigner, setProvider, setSignerAddress } = useLayoutStore()
  const { setIsMobile } = useLayoutStore()
  const { addresses } = useDaoStore()

  // store signer, signerAddress and provider in store
  React.useEffect(() => {
    if (status === 'success') {
      setProvider(signer?.provider ?? getProvider())
      setSigner(signer)
      //@ts-ignore
      setSignerAddress(signer?._address)
    }
  }, [status, signer, setProvider, addresses, setSigner, setSignerAddress])

  // add mobile flag to layout store
  React.useEffect(() => {
    if (!!window) {
      window.addEventListener('resize', handleResize)
      setIsMobile(window.innerWidth <= 768)
    }
  }, [])

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
