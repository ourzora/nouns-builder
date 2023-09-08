import { Stack } from '@zoralabs/zord'
import React from 'react'
import { useAccount } from 'wagmi'

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
import Dashboard from 'src/modules/dashboard/Dashboard'

import { NextPageWithLayout } from './_app'

export type DaoProps = AuctionFragment['dao']

const HomePage: NextPageWithLayout = () => {
  // const router = useRouter()
  const { address } = useAccount()

  // useEffect(() => {
  //   const wasRedirected = sessionStorage.getItem('wasRedirected')
  //   if (address && !wasRedirected) {
  //     sessionStorage.setItem('wasRedirected', 'true')
  //     router.push('/about')
  //   }
  // }, [address])

  if (address) {
    return <Dashboard />
  }
  return (
    <>
      <Meta title={'Nouns your ideas'} type={'website'} slug={'/'} />
      <Stack align={'center'}>
        {/* <Redirect /> */}
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
