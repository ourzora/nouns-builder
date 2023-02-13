import { auctionActionButtonVariants } from './Auction.css'
import { Auction, Auction__factory } from 'src/constants/typechain'
import { Button, Flex } from '@zoralabs/zord'
import { ethers } from 'ethers'
import React, { useState } from 'react'
import { ContractButton } from 'src/components/ContractButton'
import useManagerContract from 'src/hooks/useManagerContract'
import { useAuctionStore } from 'src/stores/useAuctionStore'
import shallow from 'zustand/shallow'
import { useSigner } from 'wagmi'

interface SettleProps {
  isEnding: boolean
  collectionAddress?: string
}

export const Settle = ({ collectionAddress, isEnding }: SettleProps) => {
  const { data: signer } = useSigner()
  const [settling, setSettling] = useState(false)

  const { contract: managerContract } = useManagerContract()

  const { auctionContract } = useAuctionStore(
    (state) => ({
      auctionContract: state.auctionContract,
    }),
    shallow
  )

  const getAuctionContract = React.useCallback(async () => {
    if (!managerContract || !collectionAddress || !signer) return

    const addresses = await managerContract?.getAddresses(
      ethers.utils.getAddress(collectionAddress as string)
    )
    const auctionAddress = addresses?.auction
    const contract =
      auctionAddress &&
      Auction__factory.connect(
        auctionAddress ? auctionAddress : addresses?.auction || '',
        signer
      )

    return contract
  }, [managerContract, collectionAddress, signer])

  const settleCurrentAndCreateNewAuction = React.useCallback(async () => {
    const _auctionContract = await getAuctionContract()
    const contract = (_auctionContract ?? auctionContract) as Auction

    const isWrongNetwork =
      (await signer?.provider?.getCode(contract?.address || '')) === '0x'

    if (!contract || !signer || isWrongNetwork) return

    setSettling(true)
    try {
      const { wait } = await contract.settleCurrentAndCreateNewAuction()
      await wait()
      setSettling(false)
    } catch (error) {
      setSettling(false)
    }
  }, [auctionContract, signer, getAuctionContract])

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
        handleClick={settleCurrentAndCreateNewAuction}
        className={auctionActionButtonVariants['settle']}
      >
        Settle Auction
      </ContractButton>
    </Flex>
  )
}
