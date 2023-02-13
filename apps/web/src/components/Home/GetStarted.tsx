import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { Button } from '@zoralabs/zord'
import { useCallback } from 'react'
import { useRouter } from 'next/router'
import React from 'react'
import { marqueeButton } from 'src/styles/home.css'
import { useAccount, useNetwork } from 'wagmi'

const GetStarted = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()

  const { openConnectModal } = useConnectModal()
  const { openChainModal } = useChainModal()

  const { push } = useRouter()

  const handleClick = (): void => {
    push('/create')
  }

  return (
    <Button
      onClick={
        address == null
          ? openConnectModal
          : chain?.unsupported
          ? openChainModal
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
