import { Flex } from '@zoralabs/zord'
import { NextPage } from 'next'
import ExploreMyDaos from 'src/components/Explore/ExploreMyDaos'
import Meta from 'src/components/Layout/Meta'

const MyDaos: NextPage<{}> = () => {
  return (
    <Flex direction={'column'} align={'center'} mt={'x5'}>
      <Meta title={'My Daos'} type={'website'} slug={'/mydaos'} />
      <ExploreMyDaos />
    </Flex>
  )
}

export default MyDaos
