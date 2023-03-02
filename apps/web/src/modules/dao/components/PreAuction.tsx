import { readContract } from '@wagmi/core'
import { Box, Button, Flex, atoms } from '@zoralabs/zord'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

import { auctionAbi } from 'src/data/contract/abis'
import { useLayoutStore } from 'src/stores'

import { useDaoStore } from '../stores'
import {
  preAuctionButtonVariants,
  preAuctionHelperText,
  preAuctionWrapper,
  wrapper,
} from './PreAuction.css'

export const PreAuction = () => {
  const router = useRouter()
  const { query } = router
  const { signer } = useLayoutStore()
  const { addresses } = useDaoStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { config, isError } = usePrepareContractWrite({
    enabled: !!addresses.auction,
    abi: auctionAbi,
    address: addresses.auction,
    functionName: 'unpause',
    signer: signer,
  })

  const { writeAsync } = useContractWrite(config)

  /* handle start of auction  */
  const handleStartAuction = async () => {
    setIsLoading(true)
    try {
      const txn = await writeAsync?.()
      await txn?.wait()
      setIsLoading(false)
    } catch (e) {
      console.error(e)
      setIsLoading(false)
      return
    }

    const auction = await readContract({
      address: addresses.auction!,
      abi: auctionAbi,
      functionName: 'auction',
    })

    const tokenId = auction?.tokenId?.toString()
    router.push(`/dao/${router.query?.token}/${tokenId}`)
  }

  return (
    <Flex className={wrapper}>
      <Flex direction={'column'} justify={'center'} className={preAuctionWrapper}>
        <Button
          disabled={isLoading || !signer || !writeAsync || isError}
          loading={isLoading}
          onClick={handleStartAuction}
          className={preAuctionButtonVariants['start']}
        >
          Start Auction
        </Button>

        <Button className={preAuctionButtonVariants['edit']}>
          <Link
            href={{
              pathname: router.pathname,
              query: { ...query, tab: 'admin' },
            }}
            shallow={true}
            className={atoms({
              display: 'flex',
              w: '100%',
              h: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            })}
          >
            Edit Settings
          </Link>
        </Button>

        <Box className={preAuctionHelperText} mt={'x4'}>
          You can change settings before you start the auction
        </Box>
      </Flex>
    </Flex>
  )
}
