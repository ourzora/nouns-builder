import { Box, Grid } from '@zoralabs/zord'

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
              aspectRatio={1 / 1}
              position="relative"
              className={exploreSkeleton}
            />
          </Box>
        ))}
    </Grid>
  )
}
