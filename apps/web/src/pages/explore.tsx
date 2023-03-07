import { Flex } from '@zoralabs/zord'
import { GetServerSideProps } from 'next'

import { Meta } from 'src/components/Meta'
import {
  ExploreDaosResponse,
  exploreDaosRequest,
} from 'src/data/graphql/requests/exploreQueries'
import { MarketSortKey } from 'src/data/graphql/sdk.generated'
import { getDefaultLayout } from 'src/layouts/DefaultLayout'
import { Explore } from 'src/modules/dao'
import { encodePageNumToEndCursor } from 'src/utils/encodePageNumToEndCursor'

import { NextPageWithLayout } from './_app'

interface ExplorePageProps extends ExploreDaosResponse {}

const ExplorePage: NextPageWithLayout<ExplorePageProps> = ({ daos, pageInfo }) => {
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
  const endCursor = encodePageNumToEndCursor(30, context.query?.page as string)
  const res = await exploreDaosRequest(
    endCursor as string,
    [],
    context.query?.sortKey as MarketSortKey
  )

  if (!res) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      daos: res?.daos,
      pageInfo: res?.pageInfo,
    },
  }
}
