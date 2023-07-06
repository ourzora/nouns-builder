import Head from 'next/head'
import React from 'react'

import { PUBLIC_IS_TESTNET } from 'src/constants/defaultChains'

interface MetaProps {
  title: string
  slug: string
  type?: string
  image?: string
  description?: string
}

export const Meta: React.FC<MetaProps> = ({ title, type, slug, image, description }) => {
  return (
    <Head>
      <title>{`Nouns Builder | ${title}`}</title>
      <meta property="og:title" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={`https://nouns.build${slug}`} />
      <meta
        property="og:image"
        content={image || 'https://nouns.build/social-preview.jpg'}
      />
      <meta
        property="og:description"
        content={
          description ||
          'Unlock the possibilities of collective creation. Start with a vision. Start a DAO. All onchain.'
        }
      />
      {PUBLIC_IS_TESTNET && <meta name="robots" content="noindex" />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nounsbuilder" />
      <meta name="twitter:creator" content="@nounsbuilder" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={`https://nouns.build${slug}`} />
      <meta
        name="twitter:description"
        content={
          description ||
          'Unlock the possibilities of collective creation. Start with a vision. Start a DAO. All onchain.'
        }
      />
      <meta
        name="twitter:image"
        content={image || 'https://nouns.build/social-preview.jpg'}
      />
    </Head>
  )
}
