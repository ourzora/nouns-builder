import { Button, Flex } from '@zoralabs/zord'
import React from 'react'
import { useAccount } from 'wagmi'

import { addEventUser } from 'src/data/notifsHasura/actions/addEventUser'

const TestNotifs = () => {
  const { address } = useAccount()
  const daoAddress = '0x7e44c762db83c0f2f2d9a9ed8b5e6b640148fcce'
  const eventType = 'auction'
  const eventId = `${eventType}:5:${daoAddress}`
  const fireNotification = async () => {
    if (!address) return
    const res = await addEventUser(address, eventId)

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
