import React from 'react'
import ExploreToolbar from './ExploreToolbar'
import { useLayoutStore } from 'src/stores'
import useSWR from 'swr'
import { userDaosFilter } from 'src/query/exploreQueries'
import { Grid } from '@zoralabs/zord'
import { DaoCard } from 'src/components/DaoCard'
import ExploreNoDaos from './ExploreNoDaos'
import { exploreGrid } from './Explore.css'
import SWR_KEYS from 'src/constants/swrKeys'

const ExploreMyDaos = () => {
  const signerAddress = useLayoutStore((state) => state.signerAddress)

  const { data } = useSWR(
    signerAddress ? SWR_KEYS.DYNAMIC.MY_DAOS_PAGE(signerAddress as string) : null,
    () => userDaosFilter('', signerAddress as string),
    { revalidateOnFocus: false }
  )

  return (
    <>
      <ExploreToolbar />
      {data?.daos?.length ? (
        <Grid className={exploreGrid} mb={'x16'}>
          {data.daos.map((dao) => (
            <DaoCard
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

export default ExploreMyDaos
