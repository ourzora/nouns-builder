import { Stack } from '@zoralabs/zord'
import React from 'react'
import useSWR from 'swr'

import Everything from 'src/components/Home/Everything'
import FAQ from 'src/components/Home/FAQ'
import GetStarted from 'src/components/Home/GetStarted'
import Marquee from 'src/components/Home/Marquee'
import RecentlyCreated from 'src/components/Home/RecentlyCreated'
import Twitter from 'src/components/Home/Twitter'
import VisitAlternate from 'src/components/Home/VisitAlternate'
import { Meta } from 'src/components/Meta'
import { PUBLIC_FEATURED_DAOS, TestnetChain } from 'src/constants/featuredDaos'
import SWR_KEYS from 'src/constants/swrKeys'
import { highestBidsRequest } from 'src/data/subgraph/requests/homepageQuery'
import { AuctionFragment } from 'src/data/subgraph/sdk.generated'
import { getHomeLayout } from 'src/layouts/HomeLayout'
import { DaoFeed } from 'src/modules/dao'
import { useChainStore } from 'src/stores/useChainStore'

import { NextPageWithLayout } from './_app'

export type DaoProps = AuctionFragment['dao']

const HomePage: NextPageWithLayout = () => {
  const chain = useChainStore((x) => x.chain)
  const { data: featuredDaos } = useSWR([SWR_KEYS.FEATURED, chain], async () => {
    return process.env.NEXT_PUBLIC_NETWORK_TYPE === 'mainnet'
      ? await highestBidsRequest(chain)
      : { data: PUBLIC_FEATURED_DAOS[chain.id as TestnetChain], statusCode: 200 }
  })

  return (
    <>
      <Meta title={'Nouns your ideas'} type={'website'} slug={'/'} />

      <Stack align={'center'}>
        <Marquee />
        <GetStarted />
        <VisitAlternate />
        {featuredDaos && (
          <RecentlyCreated>
            <DaoFeed featuredDaos={featuredDaos.data} error={featuredDaos.statusCode} />
          </RecentlyCreated>
        )}
        <Everything />
        <FAQ />
        <Twitter />
      </Stack>
    </>
  )
}

HomePage.getLayout = getHomeLayout

export default HomePage
