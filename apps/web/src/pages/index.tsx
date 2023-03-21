import { Stack } from '@zoralabs/zord'
import { GetServerSideProps } from 'next'
import React from 'react'

import Everything from 'src/components/Home/Everything'
import FAQ from 'src/components/Home/FAQ'
import GetStarted from 'src/components/Home/GetStarted'
import Marquee from 'src/components/Home/Marquee'
import RecentlyCreated from 'src/components/Home/RecentlyCreated'
import Twitter from 'src/components/Home/Twitter'
import VisitAlternate from 'src/components/Home/VisitAlternate'
import { Meta } from 'src/components/Meta'
import { highestBidsRequest } from 'src/data/graphql/requests/homepageQuery'
import { AuctionFragment } from 'src/data/graphql/sdk.generated'
import { getHomeLayout } from 'src/layouts/HomeLayout'
import { DaoFeed } from 'src/modules/dao'

import { NextPageWithLayout } from './_app'

export type DaoProps = Pick<AuctionFragment, 'collectionAddress'> & {
  auctionAddress: string
  name?: string
}

const HomePage: NextPageWithLayout<{
  featuredDaos: DaoProps[]
  statusCode: number
}> = ({ featuredDaos, statusCode }) => {
  return (
    <>
      <Meta title={'Nouns your ideas'} type={'website'} slug={'/'} />

      <Stack align={'center'}>
        <Marquee />
        <GetStarted />
        <VisitAlternate />
        {featuredDaos && (
          <RecentlyCreated>
            <DaoFeed featuredDaos={featuredDaos} error={statusCode} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (process.env.NEXT_PUBLIC_CHAIN_ID === '1') {
    const res = await highestBidsRequest()
    return {
      props: { featuredDaos: res.data, statusCode: res.statusCode },
    }
  }

  if (process.env.NEXT_PUBLIC_CHAIN_ID === '5') {
    return {
      props: {
        featuredDaos: [
          {
            auctionAddress: '0x8F1B054500ED7a2B06619CD2E5D70415Bc9d6b8a',
            collectionAddress: '0x6e13ED8472fBBd384C260538323906fc1eCb0d7B',
            name: 'MuseumDAO',
          },
          {
            auctionAddress: '0x736EaF8C02dc093E392131068B7F17f34C4f7791',
            collectionAddress: '0x7F29a9dfBFf0e6DB6c8a449Fee282F9B5f5fc99f',
            name: 'RecordLabelDAO',
          },
          {
            auctionAddress: '0xC4E181443EE3696cF19EB21578A6310BB75aA117',
            collectionAddress: '0x579B2fF0F4bd719ad7628208606688a8Ac871644',
            name: 'StartupDAO',
          },
        ],
      },
    }
  }

  return {
    props: {
      featuredDaos: [],
    },
  }
}
