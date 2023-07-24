import { Stack } from '@zoralabs/zord'
import React from 'react'

import Everything from 'src/components/Home/Everything'
import FAQ from 'src/components/Home/FAQ'
import GetStarted from 'src/components/Home/GetStarted'
import Marquee from 'src/components/Home/Marquee'
import Twitter from 'src/components/Home/Twitter'
import VisitAlternate from 'src/components/Home/VisitAlternate'
import { Meta } from 'src/components/Meta'
import { AuctionFragment } from 'src/data/subgraph/sdk.generated'
import { getHomeLayout } from 'src/layouts/HomeLayout'
import { DaoFeed } from 'src/modules/dao'

import { NextPageWithLayout } from './_app'

export type DaoProps = AuctionFragment['dao']

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Meta title={'Nouns your ideas'} type={'website'} slug={'/'} />
      <Stack align={'center'}>
        <Marquee />
        <GetStarted />
        <VisitAlternate />
        <DaoFeed />
        <Everything />
        <FAQ />
        <Twitter />
      </Stack>
    </>
  )
}

HomePage.getLayout = getHomeLayout

export default HomePage
