import { Box } from '@zoralabs/zord'
import React, { ReactElement, ReactNode } from 'react'
import { useSigner } from 'wagmi'

import { useDaoStore, useLayoutStore } from 'src/stores'
import { getProvider } from 'src/utils/provider'

import { Nav } from './Nav'
import { Uploading } from './Uploading'

function CreateLayout({ children }: { children: ReactNode }) {
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

  return (
    <Box>
      <Nav />
      <Box px={'x0'}>{children}</Box>
      <Uploading />
    </Box>
  )
}

export function getCreateLayout(page: ReactElement) {
  return <CreateLayout>{page}</CreateLayout>
}
