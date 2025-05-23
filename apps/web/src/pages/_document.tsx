import { ThemeProvider, lightTheme } from '@zoralabs/zord'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const baseUrl = 'https://testnet-nouns-builder-git-feat-mini-app-nouns-builder.vercel.app'
const metadata = {
  version: 'next',
  imageUrl: `${baseUrl}/noggles.png`,
  button: {
    title: 'Nouns Builder',
    action: {
      type: 'launch_frame',
      name: 'Open Nouns Builder',
      url: baseUrl,
      splashImageUrl: `${baseUrl}/noggles.png`,
      splashBackgroundColor: '#ffffff',
    },
  },
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/pt-root-ui_bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/pt-root-ui_medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/pt-root-ui_regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <meta name="fc:frame" content={`${JSON.stringify(metadata)}`} />
        </Head>
        <ThemeProvider as="body" theme={lightTheme} m="x0">
          <Main />
          <NextScript />
        </ThemeProvider>
      </Html>
    )
  }
}
