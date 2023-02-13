import Footer from './Footer'
import Nav from './Nav'
import Uploading from './Uploading'
import { Box } from '@zoralabs/zord'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { useAuctionStore, useDaoStore } from 'src/stores'
import { useLayoutStore } from 'src/stores/useLayoutStore'
import { useContractRead, useSigner } from 'wagmi'
import { getProvider } from 'src/utils/provider'
import { auctionAbi } from 'src/constants/abis'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { data: signer, status } = useSigner()
  const { setSigner, setProvider, setSignerAddress } = useLayoutStore()
  const { setIsMobile } = useLayoutStore()
  const { addresses } = useDaoStore()
  const { setAuctioningHasStarted } = useAuctionStore()
  const router = useRouter()
  const pathname = router.pathname
  const noFooter = pathname === '/create' || pathname === '/'

  const { data: owner } = useContractRead({
    abi: auctionAbi,
    address: addresses?.auction,
    functionName: 'owner',
  })

  /*

    store signer, signerAddress and provider is store

   */

  React.useEffect(() => {
    if (status === 'success') {
      setProvider(signer?.provider ?? getProvider())
      setSigner(signer)
      //@ts-ignore
      setSignerAddress(signer?._address)
    }
  }, [status, signer, setProvider, addresses, setSigner, setSignerAddress])

  /*

     add mobile flag to layout store

   */
  React.useEffect(() => {
    if (!!window) {
      window.addEventListener('resize', handleResize)
      setIsMobile(window.innerWidth <= 768)
    }
  }, [])
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  /*

    Determine if the first auction has started

  */
  //TODO:: this can probably be removed from this file into a hook at somepoint
  React.useMemo(async () => {
    if (!addresses || !owner) return

    setAuctioningHasStarted((await addresses?.treasury) === owner)
    return (await addresses?.treasury) === owner
  }, [addresses, owner, setAuctioningHasStarted])

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
