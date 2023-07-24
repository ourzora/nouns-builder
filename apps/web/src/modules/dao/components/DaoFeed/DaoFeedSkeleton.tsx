import { Box } from '@zoralabs/zord'

import { exploreSkeleton } from '../Explore/Explore.css'
import { GridContainer } from './DaoFeed'

export const DaoFeedCardSkeleton = ({ key }: { key?: any }) => {
  return (
    <Box
      key={key}
      borderRadius="curved"
      backgroundColor="background2"
      width={'100%'}
      aspectRatio={1 / 1}
      position="relative"
      className={exploreSkeleton}
    />
  )
}

export const DaoFeedSkeleton = () => {
  return (
    <GridContainer>
      {[...Array(3)].map((_, idx) => (
        <DaoFeedCardSkeleton key={idx} />
      ))}
    </GridContainer>
  )
}
