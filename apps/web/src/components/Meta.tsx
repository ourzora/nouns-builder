import Head from 'next/head'
import React from 'react'

import { PUBLIC_IS_TESTNET } from 'src/constants/defaultChains'
import { AddressType, Chain } from 'src/typings'

interface MetaProps {
  title: string
  slug: string
  type?: string
  image?: string
  description?: string
  farcaster?: {
    name: string
    contractAddress: AddressType
    chain: Chain
    image: string
  }
}

export const Meta: React.FC<MetaProps> = ({ title, type, slug, image, description, farcaster }) => {
  // @ts-ignore
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

      {/* Warpcast-specific NFT meta tags: https://warpcast.notion.site/NFT-extended-Open-Graph-Spec-4e350bd8e4c34e3b86e77d58bf1f5575 */}
      {farcaster && (
        <>
          <meta name="eth:nft:collection" content={farcaster.name} />
          <meta name="eth:nft:contract_address" content={farcaster.contractAddress} />
          {/* Is there a better address we can use for the creator? */}
          <meta name="eth:nft:creator_address" content={farcaster.contractAddress} />
          <meta name="eth:nft:schema" content="erc721" />
          <meta name="eth:nft:chain" content={farcaster.chain.slug} />
          <meta name="eth:nft:media_url" content={farcaster.image} />
        </>
      )}
    </Head>
  )
}
