import { Box, Grid } from '@zoralabs/zord'
import { FC, ReactNode } from 'react'

import { useLayoutStore } from 'src/stores'

interface CustomTransactionLayoutProps {
  leftColumn?: ReactNode
  rightColumn?: ReactNode
}

export const TwoColumnLayout: FC<CustomTransactionLayoutProps> = ({
  leftColumn,
  rightColumn,
}) => {
  const isMobile = useLayoutStore((state) => state.isMobile)

  return (
    <Box w={'100%'} mx={'auto'}>
      <Box>
        <Grid columns={`repeat(2, minmax(0, 1fr))`} justify={'space-between'} gap={'x16'}>
          {leftColumn && <Box w={'100%'}>{leftColumn}</Box>}
          {rightColumn && <Box w={'100%'}>{rightColumn}</Box>}
        </Grid>
      </Box>
    </Box>
  )
}
