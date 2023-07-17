import { Grid, Text } from '@zoralabs/zord'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'

import Pagination from 'src/components/Pagination'
import { ExploreDaosResponse } from 'src/data/subgraph/requests/exploreQueries'
import { useChainStore } from 'src/stores/useChainStore'

import { DaoCard } from '../DaoCard'
import { exploreGrid } from './Explore.css'
import ExploreNoDaos from './ExploreNoDaos'
import { ExploreSkeleton } from './ExploreSkeleton'
import ExploreToolbar from './ExploreToolbar'

interface ExploreProps extends Partial<ExploreDaosResponse> {
  isLoading: boolean
  hasNextPage: boolean
}

export const Explore: React.FC<ExploreProps> = ({ daos, hasNextPage, isLoading }) => {
  const router = useRouter()
  const { pathname } = router
  const chain = useChainStore((x) => x.chain)

  const page = router.query.page

  const handlePageBack = React.useCallback(() => {
    // user is on the first page
    if (!page)
      return {
        pathname,
        query: {
          ...router.query,
        },
      }

    // user is at least on the second page
    return Number(page) > 2
      ? {
          pathname,
          query: {
            ...router.query,
            page: Number(page) - 1,
          },
        }
      : {
          pathname,
        }
  }, [router, pathname])

  const handlePageForward = React.useCallback(() => {
    // there are no more results to be fetched
    if (!hasNextPage)
      return {
        pathname,
        query: {
          page,
        },
      }

    // user is on the first page
    if (!page)
      return {
        pathname,
        query: {
          ...router.query,
          page: 2,
        },
      }

    // user is at least on the second page
    return {
      pathname,
      query: {
        ...router.query,
        page: Number(page) + 1,
      },
    }
  }, [router, daos?.length, pathname])

  return (
    <Fragment>
      <ExploreToolbar title={`DAOs on ${chain.name}`} showSort />
      {daos?.length ? (
        <Fragment>
          <Grid className={exploreGrid}>
            {daos?.map((dao) => {
              const bid = dao.highestBid?.amount ?? undefined
              const bidInEth = bid ? ethers.utils.formatEther(bid) : undefined

              return (
                <DaoCard
                  tokenId={dao.token?.tokenId ?? undefined}
                  key={dao.dao.tokenAddress}
                  tokenImage={dao.token?.image ?? undefined}
                  tokenName={dao.token?.name ?? undefined}
                  collectionAddress={dao.dao.tokenAddress as string}
                  collectionName={dao.dao.name ?? undefined}
                  bid={bidInEth}
                  endTime={dao.endTime ?? undefined}
                />
              )
            })}
          </Grid>
          <Pagination
            onNext={handlePageForward}
            onPrev={handlePageBack}
            isLast={!hasNextPage}
            isFirst={!router.query.page}
          />
        </Fragment>
      ) : isLoading ? (
        <ExploreSkeleton />
      ) : !page ? (
        <ExploreNoDaos />
      ) : (
        <Fragment>
          <Text
            style={{ maxWidth: 912, minHeight: 250, padding: '150px 0px' }}
            variant={'paragraph-md'}
            color={'tertiary'}
          >
            There are no DAOs here
          </Text>

          <Pagination
            onNext={handlePageForward}
            onPrev={handlePageBack}
            isLast={!hasNextPage}
            isFirst={!router.query.page}
          />
        </Fragment>
      )}
    </Fragment>
  )
}
