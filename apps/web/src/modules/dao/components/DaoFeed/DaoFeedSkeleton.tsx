import { Box } from '@zoralabs/zord'

import { exploreSkeleton } from '../Explore/Explore.css'
import { GridContainer } from './DaoFeed'

export const DaoFeedSkeleton = () => {
  return (
    <GridContainer>
      {[...Array(3)].map((_, idx) => (
        <Box
          key={idx}
          borderRadius="curved"
          backgroundColor="background2"
          width={'100%'}
          aspectRatio={1 / 1}
          position="relative"
          className={exploreSkeleton}
        />
      ))}
    </GridContainer>
  )
}
