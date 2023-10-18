import { Button, Flex } from '@zoralabs/zord'
import axios from 'axios'
import React from 'react'

const TestNotifs = () => {
  const fireNotification = async () => {
    const res = await axios.get('api/webhook/test')
  }

  return (
    <Flex height="100%" width={'100%'} justify="center" align={'center'}>
      <Button size="lg" onClick={fireNotification}>
        Fire Notification
      </Button>
    </Flex>
  )
}

export default TestNotifs
