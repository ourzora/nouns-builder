import { Button, Flex, Text } from '@zoralabs/zord'
import { Grid } from '@zoralabs/zord'
import { useRouter } from 'next/router'
import React, { Fragment, ReactNode } from 'react'
import { DaoProps } from 'src/pages'

import { daoFeedGrid, emptyTile } from './DaoFeed.css'
import { DaoFeedCard } from './DaoFeedCard'

export const GridContainer = ({ children }: { children: ReactNode }) => (
  <Flex direction={'row'} justify={'center'} mt={'x3'}>
    <Grid className={daoFeedGrid}>{children}</Grid>
  </Flex>
)

export const EmptyTile = ({ displayContent }: { displayContent: boolean }) => {
  const router = useRouter()

  const onClick = () => router.reload()

  return (
    <Flex
      backgroundColor="border"
      direction="column"
      justify="center"
      align="center"
      className={emptyTile}
    >
      {displayContent && (
        <Fragment>
          <Text fontWeight="display" mb="x1">
            Error loading DAOs
          </Text>
          <Text mb="x2">Please reload the page</Text>
          <Button onClick={onClick} variant="secondary" size="sm">
            Reload
          </Button>
        </Fragment>
      )}
    </Flex>
  )
}

export const DaoFeed = ({
  featuredDaos,
  error,
}: {
  featuredDaos: Array<DaoProps>
  error: number
}) => {
  if (error >= 500) {
    return (
      <GridContainer>
        {[...Array(3)].map((_, idx) => (
          <EmptyTile key={idx} displayContent={idx === 1} />
        ))}
      </GridContainer>
    )
  }

  return (
    <GridContainer>
      {featuredDaos?.map((dao, index) => (
        <DaoFeedCard key={index} dao={dao} />
      ))}
    </GridContainer>
  )
}
