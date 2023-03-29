import * as Sentry from '@sentry/nextjs'
import { Flex } from '@zoralabs/zord'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useSWR, { unstable_serialize } from 'swr'

import { Meta } from 'src/components/Meta'
import SWR_KEYS from 'src/constants/swrKeys'
import { exploreDaosRequest } from 'src/data/graphql/requests/exploreQueries'
import { MarketSortKey } from 'src/data/graphql/sdk.generated'
import { getDefaultLayout } from 'src/layouts/DefaultLayout'
import { Explore } from 'src/modules/dao'
import { encodePageNumToEndCursor } from 'src/utils/encodePageNumToEndCursor'

import { NextPageWithLayout } from './_app'

const ExplorePage: NextPageWithLayout = () => {
  const {
    query: { page, sortKey },
  } = useRouter()

  const { data } = useSWR([SWR_KEYS.EXPLORE, page, sortKey], async () => {
    const endCursor = encodePageNumToEndCursor(30, page as string)
    return await exploreDaosRequest(endCursor as string, [], sortKey as MarketSortKey)
  })

  if (!data) return null

  const { daos, pageInfo } = data

  return (
    <Flex direction={'column'} align={'center'} mt={'x5'}>
      <Meta title={'Explore'} type={'website'} slug={'/explore'} />
      <Explore daos={daos} pageInfo={pageInfo} />
    </Flex>
  )
}

ExplorePage.getLayout = getDefaultLayout

export default ExplorePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const endCursor = encodePageNumToEndCursor(30, context.query?.page as string)
    const res = await exploreDaosRequest(
      endCursor as string,
      [],
      context.query?.sortKey as MarketSortKey
    )

    if (!res) throw new Error('Explore data not found.')

    return {
      props: {
        fallback: {
          [unstable_serialize([
            SWR_KEYS.EXPLORE,
            context.query?.page,
            context.query?.sortKey,
          ])]: res,
        },
      },
    }
  } catch (e) {
    console.error(e)
    Sentry.captureException(e)
    await Sentry.flush(2000)

    // attempt to refetch on client
    return { props: {} }
  }
}
