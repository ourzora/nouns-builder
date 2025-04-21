import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button } from '@zoralabs/zord'
import { useRouter } from 'next/router'
import React from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'

import { useChainStore } from 'src/stores/useChainStore'
import { marqueeButton } from 'src/styles/home.css'

const GetStarted = () => {
  const { address } = useAccount()
  const { chain: wagmiChain } = useNetwork()
  const chain = useChainStore((x) => x.chain)

  const { openConnectModal } = useConnectModal()
  const { switchNetwork } = useSwitchNetwork()

  const handleSwitchNetwork = () => switchNetwork?.(chain.id)

  const { push } = useRouter()

  const handleClick = (): void => {
    push('/create')
  }

  return (
    <Button
      onClick={
        !address
          ? openConnectModal
          : wagmiChain?.id != chain.id
            ? handleSwitchNetwork
            : handleClick
      }
      h="x16"
      fontWeight={'display'}
      borderRadius={'curved'}
      fontSize={28}
      px={'x8'}
      py={'x4'}
      mt={'x8'}
      className={marqueeButton}
      backgroundColor={'onNeutral'}
      cursor={'pointer'}
      color={'onAccent'}
      width={'unset'}
      align={'center'}
      justify={'center'}
    >
      Create your DAO
    </Button>
  )
}

export default GetStarted
