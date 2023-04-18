import {
  useChainModal,
  useConnectModal,
} from '@rainbow-me/rainbowkit'
import { Button } from '@zoralabs/zord'
import React from 'react'
import { useAccount, useNetwork } from 'wagmi'

import { auctionActionButtonVariants } from '../Auction.css'

export const ConnectButton = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { openChainModal } = useChainModal()
  const { openConnectModal } = useConnectModal()

  if (chain?.unsupported) {
    return (
      <Button
        variant="destructive"
        onClick={openChainModal}
        className={auctionActionButtonVariants['wrongNetwork']}
        mt={{ '@initial': 'x2', '@768': 'x0' }}
      >
        Wrong Network
      </Button>
    )
  }

  if (address || chain) {
    return null
  }

  return (
    <Button
      onClick={openConnectModal}
      className={auctionActionButtonVariants['connect']}
      mt={{ '@initial': 'x2', '@768': 'x0' }}
    >
      Connect Wallet
    </Button>
  )
}
