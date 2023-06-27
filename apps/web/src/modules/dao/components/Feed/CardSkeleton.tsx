import { Box } from '@zoralabs/zord'

import { cardSkeleton } from './Feed.css'

export const CardSkeleton = () => (
  <Box
    className={cardSkeleton}
    borderRadius="normal"
    backgroundColor="background2"
    style={{ height: '8rem', minHeight: '8rem' }}
    mb="x3"
  />
)
