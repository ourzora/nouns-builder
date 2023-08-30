import { Box, Button, Flex, atoms } from '@zoralabs/zord'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { readContract } from 'wagmi/actions'
import { waitForTransaction } from 'wagmi/actions'

import { auctionAbi } from 'src/data/contract/abis'
import { Chain } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'

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
  const { address } = useAccount()
  const { addresses } = useDaoStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { config, isError } = usePrepareContractWrite({
    enabled: !!addresses.auction,
    abi: auctionAbi,
    address: addresses.auction,
    functionName: 'unpause',
    chainId: chain.id,
  })

  const { writeAsync } = useContractWrite(config)

  /* handle start of auction  */
  const handleStartAuction = async () => {
    setIsLoading(true)
    try {
      const tx = await writeAsync?.()
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })
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

    const [tokenId] = unpackOptionalArray(auction, 6)
    router.push(`/dao/${router.query.network}/${collectionAddress}/${tokenId}`)
  }

  return (
    <Flex className={wrapper}>
      <Flex direction={'column'} justify={'center'} className={preAuctionWrapper}>
        <Button
          disabled={isLoading || !address || !writeAsync || isError}
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
