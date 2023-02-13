import React from 'react'
import { Flex, Box, Text, Label, Paragraph, Button, atoms } from '@zoralabs/zord'
import { Upgrade } from 'src/modules/transaction-builder/hooks/useAvailableUpgrade'
import { btn, content, image, card } from './index.css'
import useSWR from 'swr'
import { sdk } from 'src/graphql/client'
import Image from 'next/image'
import dayjs from 'dayjs'
import SWR_KEYS from 'src/constants/swrKeys'
import { PUBLIC_BUILDER_TOKEN } from 'src/constants/addresses'
import { Chain, SortDirection, TokenSortKey } from 'src/graphql/sdk'
import { useRouter } from 'next/router'
import {
  BuilderTransaction,
  useProposalStore,
} from 'src/modules/transaction-builder/stores/useProposalStore'
import { TransactionType } from '../../constants/transactionTypes'

interface UpgradeCardProps {
  collection: string
  upgrades: Upgrade[]
  hasThreshold: boolean
  totalContractUpgrades?: number
  latest?: string
  date?: string
  description?: string
  title?: string
  summary?: string
}

export const UpgradeCard = ({
  collection,
  latest,
  upgrades,
  hasThreshold,
  totalContractUpgrades,
  date,
  description,
  title,
  summary,
}: UpgradeCardProps) => {
  const router = useRouter()
  const { createProposal } = useProposalStore()

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

  const handleUpgrade = () => {
    const transactions: BuilderTransaction[] = upgrades?.map(
      ({ address, name, calldata }) => ({
        type: TransactionType.CUSTOM,
        transactions: [
          {
            functionSignature: name,
            target: address,
            calldata: calldata || '',
            value: '',
          },
        ],
      })
    )

    const upgrade: BuilderTransaction[] = [
      {
        type: TransactionType.UPGRADE,
        summary: `Upgrade contracts to Nouns Builder ${latest}`,
        transactions: upgrades.map(({ address, name, calldata }) => ({
          functionSignature: name,
          target: address,
          calldata: calldata || '',
          value: '',
        })),
      },
    ]

    createProposal({
      transactions: upgrade,
      disabled: true,
      title: title || '',
      summary: summary || '',
    })

    router.push({
      pathname: '/dao/[token]/proposal/review',
      query: { token: collection },
    })
  }

  const imgurl =
    data?.tokens?.nodes[0]?.token?.image?.mediaEncoding?.__typename ===
    'ImageEncodingTypes'
      ? data?.tokens?.nodes[0]?.token?.image?.mediaEncoding?.thumbnail
      : null

  const imgName = data?.tokens?.nodes[0]?.token?.name

  return (
    <Flex
      my={'x2'}
      direction={'column'}
      borderStyle={'dashed'}
      borderRadius={'curved'}
      borderWidth={'normal'}
      cursor={'pointer'}
      p={{ '@initial': 'x4', '@768': 'x6' }}
      className={card}
    >
      <Flex direction="row" justify={{ '@initial': 'space-between' }} wrap="wrap">
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
          <Label size="lg">{`Nouns Builder Upgrade ${latest}`}</Label>
          <Paragraph color="tertiary">
            {dayjs(date).format('MMM DD, YYYY')}, {totalContractUpgrades} contract
            upgrades
          </Paragraph>
        </Box>

        <Button
          mt={{ '@initial': 'x3', '@768': 'x2' }}
          borderRadius="curved"
          size="sm"
          disabled={!hasThreshold}
          className={btn}
          onClick={handleUpgrade}
        >
          Upgrade
        </Button>
      </Flex>

      <Text mt={{ '@initial': 'x2', '@768': 'x4' }}>{description}</Text>
    </Flex>
  )
}
