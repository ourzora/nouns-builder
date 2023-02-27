import { Box, Flex, Text } from '@zoralabs/zord'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React from 'react'
import { useLayoutStore } from 'src/stores'

import { Icon } from 'src/components/Icon'
import { OptionalLink } from 'src/components/OptionalLink'

import { auctionDateNavButton, auctionTextVariants } from './Auction.css'

interface AuctionTokenPickerProps {
  collection: string
  tokenId: number
  mintDate?: string
  name?: string
  currentAuction?: number
}

export const AuctionTokenPicker: React.FC<AuctionTokenPickerProps> = ({
  collection,
  tokenId,
  mintDate,
  name,
  currentAuction,
}: AuctionTokenPickerProps) => {
  const { isReady } = useRouter()
  const { isMobile } = useLayoutStore()
  const disabledStyle = { opacity: 0.2 }

  const hasPreviousToken = tokenId !== 0
  const hasNextToken = isReady && tokenId < (currentAuction || 0)

  return (
    <Flex direction={'column'}>
      <Flex align="center" direction={'row'} gap={'x2'}>
        <OptionalLink
          enabled={hasPreviousToken}
          href={`/dao/${collection}/${tokenId - 1}`}
          passHref
          legacyBehavior
        >
          <Flex
            as={hasPreviousToken ? 'a' : undefined}
            align={'center'}
            justify={'center'}
            className={auctionDateNavButton}
          >
            <Icon id="arrowLeft" style={hasPreviousToken ? {} : disabledStyle} />
          </Flex>
        </OptionalLink>

        <OptionalLink
          enabled={hasNextToken}
          href={`/dao/${collection}/${tokenId + 1}`}
          passHref
          legacyBehavior
        >
          <Flex
            as={hasNextToken ? 'a' : undefined}
            align={'center'}
            justify={'center'}
            className={auctionDateNavButton}
          >
            <Icon id="arrowRight" style={hasNextToken ? {} : disabledStyle} />
          </Flex>
        </OptionalLink>

        <OptionalLink
          enabled={hasNextToken}
          href={`/dao/${collection}/${currentAuction}`}
          passHref
          legacyBehavior
        >
          <Flex
            as={hasNextToken ? 'a' : undefined}
            align={'center'}
            justify={'center'}
            className={auctionDateNavButton}
          >
            <Text
              mx={'x3'}
              style={hasNextToken ? {} : disabledStyle}
              fontWeight={'display'}
            >
              {isMobile ? 'Latest' : 'Latest Auction'}
            </Text>
          </Flex>
        </OptionalLink>

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
