import { Box, Grid } from '@zoralabs/zord'

import { daoImage } from '../DaoCard/DaoCard.css'
import { exploreGrid, exploreSkeleton } from './Explore.css'

export const ExploreSkeleton = () => {
  return (
    <Grid className={exploreGrid} mb="x6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <Box key={i} borderRadius="curved" height={'100%'} overflow="hidden">
            <Box
              backgroundColor="background2"
              width={'100%'}
              height={'auto'}
              aspectRatio={1 / 1}
              position="relative"
              className={[daoImage, exploreSkeleton]}
            />
          </Box>
        ))}
    </Grid>
  )
}
