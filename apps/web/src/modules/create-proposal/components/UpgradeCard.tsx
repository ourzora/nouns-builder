import { Box, Button, Flex, Label, Paragraph, Text, atoms } from '@zoralabs/zord'
import dayjs from 'dayjs'
import Image from 'next/image'
import React, { ReactElement } from 'react'
import useSWR from 'swr'

import { PUBLIC_BUILDER_TOKEN } from 'src/constants/addresses'
import SWR_KEYS from 'src/constants/swrKeys'
import { sdk } from 'src/data/graphql/client'
import { Chain, SortDirection, TokenSortKey } from 'src/data/graphql/sdk.generated'

import { btn, card, content, image } from './UpgradeCard.css'

interface UpgradeCardProps {
  hasThreshold: boolean
  onUpgrade: () => void
  totalContractUpgrades?: number
  version?: string
  date?: string
  description?: string
  alert?: ReactElement
}

export const UpgradeCard = ({
  version,
  hasThreshold,
  totalContractUpgrades,
  date,
  description,
  onUpgrade,
  alert,
}: UpgradeCardProps) => {
  const { data, error } = useSWR(
    [SWR_KEYS.TOKEN_IMAGE, PUBLIC_BUILDER_TOKEN, date],
    (_, token, date) =>
      sdk.tokens({
        chain: Chain.Mainnet,
        sort: { sortKey: TokenSortKey.Minted, sortDirection: SortDirection.Desc },
        where: { collectionAddresses: [token] },
        filter: { timeFilter: { endDate: date } },
        pagination: { limit: 1 },
      })
  )

  const imgurl =
    data?.tokens?.nodes[0]?.token?.image?.mediaEncoding?.__typename ===
    'ImageEncodingTypes'
      ? data?.tokens?.nodes[0]?.token?.image?.mediaEncoding?.thumbnail
      : null

  const imgName = data?.tokens?.nodes[0]?.token?.name

  return (
    <Flex
      my={'x2'}
      data-testid="upgrade-card"
      direction={'column'}
      borderStyle={'dashed'}
      borderRadius={'curved'}
      borderWidth={'normal'}
      cursor={'pointer'}
      p={{ '@initial': 'x4', '@768': 'x6' }}
      className={card}
    >
      {alert && alert}
      <Flex
        direction={alert ? 'column' : 'row'}
        justify={{ '@initial': 'space-between' }}
        wrap="wrap"
      >
        <Flex
          direction="row"
          justify={{ '@initial': 'space-between' }}
          wrap="wrap"
          mb={alert ? 'x6' : 'x0'}
        >
          <Box
            width={'x16'}
            height={'x16'}
            mr={'x4'}
            backgroundColor="background2"
            borderRadius={'small'}
            className={image}
          >
            {!!imgurl && !error && (
              <Image
                src={imgurl}
                alt={imgName || ''}
                width={64}
                height={64}
                className={atoms({ borderRadius: 'small' })}
              />
            )}
          </Box>
          <Box
            width={{ '@initial': '100%', '@768': 'auto' }}
            mr="auto"
            mt={{ '@initial': 'x2', '@768': 'x0' }}
            className={content}
          >
            <Label size="lg">{`Nouns Builder Upgrade ${version}`}</Label>
            <Paragraph color="tertiary">
              {dayjs(date).format('MMM DD, YYYY')}, {totalContractUpgrades} contract
              upgrades
            </Paragraph>
          </Box>
        </Flex>

        <Button
          mt={{ '@initial': 'x3', '@768': 'x2' }}
          data-testid="upgrade-btn"
          borderRadius="curved"
          size="sm"
          disabled={!hasThreshold}
          className={btn}
          onClick={onUpgrade}
        >
          Upgrade
        </Button>
      </Flex>

      {description && <Text mt={{ '@initial': 'x2', '@768': 'x4' }}>{description}</Text>}
    </Flex>
  )
}
