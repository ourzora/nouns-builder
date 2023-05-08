import { Grid } from '@zoralabs/zord'
import React from 'react'
import useSWR from 'swr'

import SWR_KEYS from 'src/constants/swrKeys'
import { userDaosFilter } from 'src/data/graphql/requests/exploreQueries'
import { useLayoutStore } from 'src/stores'

import { DaoCard } from '../DaoCard'
import { exploreGrid } from './Explore.css'
import ExploreNoDaos from './ExploreNoDaos'
import { ExploreSkeleton } from './ExploreSkeleton'
import ExploreToolbar from './ExploreToolbar'

export const ExploreMyDaos = () => {
  const signerAddress = useLayoutStore((state) => state.signerAddress)

  const { data, error } = useSWR(
    signerAddress ? SWR_KEYS.DYNAMIC.MY_DAOS_PAGE(signerAddress as string) : null,
    () => userDaosFilter(null, signerAddress as string),
    { revalidateOnFocus: false }
  )

  const isLoading = !data && !error

  return (
    <>
      <ExploreToolbar title={'My DAOs'} />
      {isLoading ? (
        <ExploreSkeleton />
      ) : data?.daos?.length ? (
        <Grid className={exploreGrid} mb={'x16'}>
          {data.daos.map((dao) => (
            <DaoCard
              tokenId={dao.tokenId ?? undefined}
              key={dao.collectionAddress}
              tokenImage={dao.image ?? undefined}
              tokenName={dao.name ?? undefined}
              collectionAddress={dao.collectionAddress as string}
              collectionName={dao.collectionName ?? undefined}
              bid={dao.highestBidPrice ?? undefined}
              endTime={dao.endTime ?? undefined}
            />
          ))}
        </Grid>
      ) : (
        <ExploreNoDaos />
      )}
    </>
  )
}
