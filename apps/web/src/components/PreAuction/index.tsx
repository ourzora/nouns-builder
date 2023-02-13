import {
  wrapper,
  preAuctionButtonVariants,
  preAuctionHelperText,
  preAuctionWrapper,
} from './index.css'
import { Box, Button, Flex } from '@zoralabs/zord'
import { useRouter } from 'next/router'
import React from 'react'
import { useLayoutStore } from 'src/stores'
import { useAuctionStore } from 'src/stores'
import Link from 'next/link'

const PreAuction = () => {
  const router = useRouter()
  const { query } = router
  const { signer } = useLayoutStore()

  const auctionContract = useAuctionStore((state) => state.auctionContract)

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

        <Link
          href={{
            pathname: router.pathname,
            query: { ...query, tab: 'admin' },
          }}
          shallow={true}
        >
          <Button className={preAuctionButtonVariants['edit']}>Edit Settings</Button>
        </Link>

        <Box className={preAuctionHelperText} mt={'x4'}>
          You can change settings before you start the auction
        </Box>
      </Flex>
    </Flex>
  )
}

export default PreAuction
