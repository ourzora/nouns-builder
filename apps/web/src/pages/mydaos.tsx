import { Flex } from '@zoralabs/zord'
import { NextPage } from 'next'

import { Meta } from 'src/components/Meta'
import { ExploreMyDaos } from 'src/modules/dao'

const MyDaosPage: NextPage<{}> = () => {
  return (
    <Flex direction={'column'} align={'center'} mt={'x5'}>
      <Meta title={'My Daos'} type={'website'} slug={'/mydaos'} />
      <ExploreMyDaos />
    </Flex>
  )
}

export default MyDaosPage
