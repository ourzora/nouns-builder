import '../styles/globals.css'
import '../styles/styles.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/londrina-solid'
import '@zoralabs/zord/index.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  err: Error
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps, err }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const fallback = pageProps?.fallback ?? {}

  return getLayout(<Component {...pageProps} err={err} />)
}
