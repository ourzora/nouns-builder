import { readContract } from '@wagmi/core'
import { Box, Button, Flex, atoms } from '@zoralabs/zord'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi'

import { auctionAbi } from 'src/data/contract/abis'
import { Chain } from 'src/typings'

import { useDaoStore } from '../stores'
import {
  preAuctionButtonVariants,
  preAuctionHelperText,
  preAuctionWrapper,
  wrapper,
} from './PreAuction.css'

interface PreAuctionProps {
  chain: Chain
  collectionAddress: string
}

export const PreAuction: React.FC<PreAuctionProps> = ({ chain, collectionAddress }) => {
  const router = useRouter()
  const { data: signer } = useSigner()
  const { addresses } = useDaoStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { config, isError } = usePrepareContractWrite({
    enabled: !!addresses.auction,
    abi: auctionAbi,
    address: addresses.auction,
    functionName: 'unpause',
    signer: signer,
    chainId: chain.id,
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
      chainId: chain.id,
    })

    const tokenId = auction?.tokenId?.toString()
    router.push(`/dao/${router.query.network}/${collectionAddress}/${tokenId}`)
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
              query: {
                network: router.query.network,
                token: collectionAddress,
                tab: 'admin',
              },
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
