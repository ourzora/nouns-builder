import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/londrina-solid'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import '@zoralabs/zord/index.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Disclaimer } from 'src/components/Disclaimer'
import Layout from 'src/components/Layout/Layout'
import 'src/styles/globals.css'
import 'src/styles/styles.css'
import { WagmiConfig } from 'wagmi'
import { client } from 'src/data/contract/client'
import { chains } from 'src/data/contract/chains'
import { VercelAnalytics } from 'analytics'
import { SWRConfig } from 'swr'
import { useIsMounted } from 'src/hooks/useIsMounted'
import { NetworkController } from 'src/components/NetworkController'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  err: Error
  Component: NextPageWithLayout
}

function App({ Component, pageProps, err }: AppPropsWithLayout) {
  const isMounted = useIsMounted()
  const getLayout = Component.getLayout ?? ((page) => page)
  const fallback = pageProps?.fallback ?? {}
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} appInfo={{ disclaimer: Disclaimer }}>
        <SWRConfig value={{ fallback }}>
          {isMounted && (
            <Layout>{getLayout(<Component {...pageProps} err={err} />)}</Layout>
          )}
        </SWRConfig>
        <NetworkController.Mainnet>
          <VercelAnalytics />
        </NetworkController.Mainnet>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
