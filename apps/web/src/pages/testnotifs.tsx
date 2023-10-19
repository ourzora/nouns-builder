import { Button, Flex } from '@zoralabs/zord'
import React from 'react'
import { useAccount } from 'wagmi'

import { getEventUsers } from 'src/data/notifsHasura/actions/getEventUsers'

const TestNotifs = () => {
  const { address } = useAccount()

  const fireNotification = async () => {
    if (!address) return
    const res = await getEventUsers(
      'auction:5:0xcdd6bf3ce0e31937864d9c83cbf4455202e8d9c6'
    )
    console.log('res', res)
  }

  return (
    <Flex height="100%" width={'100%'} justify="center" align={'center'}>
      <Button size="lg" onClick={fireNotification}>
        Test
      </Button>
    </Flex>
  )
}

export default TestNotifs
