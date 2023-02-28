import { ConnectButton as RKConnectButton, useChainModal } from '@rainbow-me/rainbowkit'
import { Flex, Text } from '@zoralabs/zord'
import React from 'react'
import { useAccount, useNetwork } from 'wagmi'

import { connectButtonWrapper } from './Nav.styles.css'

export const ConnectButton = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { openChainModal } = useChainModal()

  if (chain?.unsupported) {
    return (
      <Flex
        as={'button'}
        w={'100%'}
        alignSelf={'center'}
        align={'center'}
        justify={'center'}
        onClick={openChainModal}
        py={'x2'}
        style={{
          backgroundColor: '#F5E2E2',
          color: '#F03232',
          borderRadius: 8,
          border: 0,
        }}
        cursor={'pointer'}
      >
        <Text variant={'paragraph-md'}>Wrong Network</Text>
      </Flex>
    )
  }

  if (address || chain) {
    return null
  }

  return (
    <Flex
      direction="row"
      align="center"
      className={connectButtonWrapper}
      id="connect-button-wrapper"
      w={'100%'}
      justify="center"
      cursor={'pointer'}
    >
      <RKConnectButton
        showBalance={false}
        label={'Connect Wallet'}
        chainStatus={'none'}
        accountStatus={'address'}
      />
    </Flex>
  )
}
