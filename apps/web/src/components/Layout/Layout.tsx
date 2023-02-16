import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@zoralabs/zord'
import { useSigner } from 'wagmi'

import { useDaoStore } from 'src/stores'
import { useLayoutStore } from 'src/stores/useLayoutStore'
import { getProvider } from 'src/utils/provider'

import Footer from './Footer'
import Nav from './Nav'
import Uploading from './Uploading'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { data: signer, status } = useSigner()
  const { setSigner, setProvider, setSignerAddress } = useLayoutStore()
  const { setIsMobile } = useLayoutStore()
  const { addresses } = useDaoStore()
  const router = useRouter()
  const pathname = router.pathname
  const noFooter = pathname.includes('create') || pathname === '/'

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
      <Box px={router.pathname.includes('create') ? 'x0' : 'x4'}>{children}</Box>
      <Uploading />
      {!noFooter && <Footer />}
    </Box>
  )
}

export default Layout
