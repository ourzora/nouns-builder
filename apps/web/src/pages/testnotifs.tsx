import { Button, Flex } from '@zoralabs/zord'
import React from 'react'
import { useAccount } from 'wagmi'

import { getUserEvents } from 'src/data/notifsHasura/actions/getUserEvents'

const TestNotifs = () => {
  const { address } = useAccount()

  const fireNotification = async () => {
    if (!address) return
    const res = await getUserEvents(address)
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
