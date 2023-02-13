import { auctionDateNavButton, auctionTextVariants } from './Auction.css'
import { Box, Flex } from '@zoralabs/zord'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Icon } from 'src/components/Icon'

interface AuctionTokenPickerProps {
  mintDate?: string
  name?: string
  currentAuction?: number
}

const AuctionTokenPicker = ({
  mintDate,
  name,
  currentAuction,
}: AuctionTokenPickerProps) => {
  const { isReady, query } = useRouter()

  return (
    <Flex direction={'column'}>
      <Flex align="center" direction={'row'} gap={'x2'}>
        {Number(query?.tokenId) === 0 ? (
          <Flex align={'center'} justify={'center'} className={auctionDateNavButton}>
            <Icon id="arrowLeft" style={{ opacity: 0.2 }} />
          </Flex>
        ) : (
          <Link
            href={`/dao/${query?.token}/${Number(query?.tokenId) - 1}`}
            passHref
            legacyBehavior
          >
            <Flex
              as={'a'}
              align={'center'}
              justify={'center'}
              className={auctionDateNavButton}
            >
              <Icon id="arrowLeft" />
            </Flex>
          </Link>
        )}

        {isReady && Number(query.tokenId) < (currentAuction || 0) ? (
          <Link
            href={`/dao/${query?.token}/${Number(query?.tokenId) + 1}`}
            passHref
            legacyBehavior
          >
            <Flex
              as={'a'}
              align={'center'}
              justify={'center'}
              className={auctionDateNavButton}
            >
              <Icon id="arrowRight" />
            </Flex>
          </Link>
        ) : (
          <Flex align={'center'} justify={'center'} className={auctionDateNavButton}>
            <Icon id="arrowRight" style={{ opacity: 0.2 }} />
          </Flex>
        )}

        <Box className={auctionTextVariants['tertiary']} ml={'x2'}>
          {!!mintDate && dayjs(mintDate).format('MMMM DD, YYYY')}
        </Box>
      </Flex>
      {!!name && (
        <Flex
          align={'center'}
          justify={'flex-start'}
          className={auctionTextVariants['primary']}
          mt={{ '@initial': 'x4', '@768': 'x2' }}
          mb={{ '@initial': 'x4', '@768': 'x6' }}
        >
          {name}
        </Flex>
      )}
    </Flex>
  )
}

export default AuctionTokenPicker
