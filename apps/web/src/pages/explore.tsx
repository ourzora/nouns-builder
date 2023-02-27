import { Flex } from '@zoralabs/zord'
import { GetServerSideProps, NextPage } from 'next'
import Meta from 'src/components/Layout/Meta'
import { exploreDaosRequest } from 'src/data/graphql/requests/exploreQueries'
import { Explore } from 'src/modules/dao'
import { ExplorePageData, MarketSortKey } from 'src/typings'
import { encodePageNumToEndCursor } from 'src/utils/encodePageNumToEndCursor'

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

interface ExplorePageProps {
  daos: ExplorePageData['daos']
  pageInfo: ExplorePageData['pageInfo']
}

const ExplorePage: NextPage<ExplorePageProps> = ({ daos, pageInfo }) => {
  return (
    <Flex direction={'column'} align={'center'} mt={'x5'}>
      <Meta title={'Explore'} type={'website'} slug={'/explore'} />
      <Explore daos={daos} pageInfo={pageInfo} />
    </Flex>
  )
}

export default ExplorePage
