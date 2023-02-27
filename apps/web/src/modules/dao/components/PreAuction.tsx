import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { atoms, Box, Button, Flex } from '@zoralabs/zord'

import { useLayoutStore } from 'src/stores'
import { useAuctionContract } from 'src/hooks'

import {
  wrapper,
  preAuctionButtonVariants,
  preAuctionHelperText,
  preAuctionWrapper,
} from './PreAuction.css'

export const PreAuction = () => {
  const router = useRouter()
  const { query } = router
  const { signer } = useLayoutStore()
  const { contract: auctionContract } = useAuctionContract()

  /* handle start of auction  */
  const handleStartAuction = React.useCallback(async () => {
    if (!auctionContract || !signer) return

    try {
      const { wait } = await auctionContract.unpause()
      await wait()
    } catch (e) {
      console.error(e)
    }

    const auction = await auctionContract.auction()
    const tokenId: number = auction?.tokenId?.toNumber()
    router.push(`/dao/${router.query?.token}/${tokenId}`)
  }, [auctionContract, signer, router])

  return (
    <Flex className={wrapper}>
      <Flex direction={'column'} justify={'center'} className={preAuctionWrapper}>
        <Button
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
