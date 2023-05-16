import { Flex } from '@zoralabs/zord'
import axios from 'axios'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { Meta } from 'src/components/Meta'
import SWR_KEYS from 'src/constants/swrKeys'
import { ExploreDaosResponse } from 'src/data/graphql/requests/exploreQueries'
import { getDefaultLayout } from 'src/layouts/DefaultLayout'
import { Explore } from 'src/modules/dao'

import { NextPageWithLayout } from './_app'

const ExplorePage: NextPageWithLayout = () => {
  const {
    query: { page, sortKey },
    isReady,
  } = useRouter()

  const { data, error } = useSWR(
    isReady ? [SWR_KEYS.EXPLORE, page, sortKey] : undefined,
    async () => {
      const params: any = {}
      if (page) params['page'] = page
      if (sortKey) params['sortKey'] = sortKey

      return await axios
        .get<ExploreDaosResponse>('/api/explore', { params })
        .then((x) => x.data)
    }
  )

  const { daos, pageInfo } = data || {}

  return (
    <Flex direction={'column'} align={'center'} mt={'x5'} minH={'100vh'}>
      <Meta title={'Explore'} type={'website'} slug={'/explore'} />
      <Explore daos={daos} pageInfo={pageInfo} isLoading={!data && !error} />
    </Flex>
  )
}

ExplorePage.getLayout = getDefaultLayout

export default ExplorePage
