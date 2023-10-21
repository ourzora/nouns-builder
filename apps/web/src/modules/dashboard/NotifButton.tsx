import { Box, Spinner } from '@zoralabs/zord'
import React, { useMemo, useState } from 'react'

import { Icon } from 'src/components/Icon'
import { subscribeToNotif } from 'src/data/notifsHasura/actions/subscribeToNotif'
import { unsubscribeToNotif } from 'src/data/notifsHasura/actions/unsubscribeToNotif'
import { AddressType, CHAIN_ID } from 'src/typings'
import { NotificationType, UserNotification } from 'src/typings/pushWebhookTypes'

type NotifButtonProps = {
  userNotifications?: UserNotification[]
  tokenAddress: AddressType
  chainId: CHAIN_ID
  handleNotifChange: () => void
  userAddress?: AddressType
  eventType: NotificationType
}

export const NotifButton = ({
  userNotifications,
  tokenAddress,
  chainId,
  handleNotifChange,
  userAddress,
  eventType,
}: NotifButtonProps) => {
  const [isLoadingSub, setIsLoadingSub] = useState(false)
  const userSubscription = useMemo(() => {
    if (!userNotifications) return

    return userNotifications.find((notif) => notif.daoAddress === tokenAddress)
  }, [userNotifications, tokenAddress])

  const toggleSubscribe = async () => {
    if (!userAddress || isLoadingSub) return
    try {
      if (!userSubscription) {
        setIsLoadingSub(true)
        await subscribeToNotif(userAddress, tokenAddress, chainId, eventType)
        setIsLoadingSub(false)
        handleNotifChange()
      } else {
        setIsLoadingSub(true)
        await unsubscribeToNotif(userAddress, tokenAddress, chainId, eventType)
        setIsLoadingSub(false)
        handleNotifChange()
      }
    } catch (error) {
      console.error(error)
      setIsLoadingSub(false)
    }
  }

  return (
    <Box
      position="absolute"
      top="x1"
      cursor="pointer"
      onClick={toggleSubscribe}
      style={{
        top: '43%',
        right: -4,
      }}
    >
      {isLoadingSub ? (
        <Spinner mr="x2" />
      ) : (
        <Icon id="bell-16" fill={userSubscription ? 'positive' : 'text4'} />
      )}
    </Box>
  )
}
