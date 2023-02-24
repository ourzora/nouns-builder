import React, { useState } from 'react'
import { usePrepareContractWrite, useContractWrite, useSigner } from 'wagmi'
import { Button, Flex } from '@zoralabs/zord'
import { ContractButton } from 'src/components/ContractButton'
import { useDaoStore } from 'src/modules/dao'
import { auctionActionButtonVariants } from '../Auction.css'
import { auctionAbi } from 'src/data/contract/abis'

interface SettleProps {
  isEnding: boolean
  collectionAddress?: string
}

export const Settle = ({ isEnding }: SettleProps) => {
  const { data: signer } = useSigner()
  const addresses = useDaoStore((state) => state.addresses)

  const { config, error } = usePrepareContractWrite({
    enabled: !!addresses?.auction,
    address: addresses?.auction,
    abi: auctionAbi,
    functionName: 'settleCurrentAndCreateNewAuction',
  })

  const { writeAsync } = useContractWrite(config)

  const [settling, setSettling] = useState(false)

  const handleSettle = async () => {
    if (!signer) return

    if (!!error) return

    setSettling(true)
    try {
      const txn = await writeAsync?.()
      await txn?.wait()
      setSettling(false)
    } catch (error) {
      setSettling(false)
    }
  }

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
