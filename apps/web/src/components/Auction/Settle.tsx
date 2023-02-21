import React, { useState } from 'react'
import { useSigner } from 'wagmi'
import { Button, Flex } from '@zoralabs/zord'

import { ContractButton } from 'src/components/ContractButton'
import useAuctionContract from 'src/hooks/useAuctionContract'

import { auctionActionButtonVariants } from './Auction.css'

interface SettleProps {
  isEnding: boolean
  collectionAddress?: string
}

export const Settle = ({ isEnding }: SettleProps) => {
  const { data: signer } = useSigner()
  const { contract: auctionContract } = useAuctionContract()
  const [settling, setSettling] = useState(false)

  const handleSettle = React.useCallback(async () => {
    if (!auctionContract || !signer) return

    setSettling(true)
    try {
      const { wait } = await auctionContract.settleCurrentAndCreateNewAuction()
      await wait()
      setSettling(false)
    } catch (error) {
      setSettling(false)
    }
  }, [auctionContract, signer])

  if (isEnding && !settling) {
    return (
      <Flex direction="column" align="center" width={'100%'}>
        <Button disabled className={auctionActionButtonVariants['settling']}>
          Auction ending
        </Button>
      </Flex>
    )
  }

  if (settling) {
    return (
      <Flex direction="column" align="center" width={'100%'}>
        <Button disabled className={auctionActionButtonVariants['settling']}>
          Settling
        </Button>
      </Flex>
    )
  }

  return (
    <Flex direction="column" align="center" width={'100%'}>
      <ContractButton
        handleClick={handleSettle}
        className={auctionActionButtonVariants['settle']}
      >
        Settle Auction
      </ContractButton>
    </Flex>
  )
}
