import Script from 'next/script'

export interface GoogleAnalyticsProps {
  id: string
}

export function GoogleAnalytics({ id }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${id}');
          `}
      </Script>
    </>
  )
}
