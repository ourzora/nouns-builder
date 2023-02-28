import { Box, BoxProps } from '@zoralabs/zord'

import { uploadingSpinner } from './Spinner.css'

interface SpinnerProps extends BoxProps {}

export const Spinner = ({ ...rest }: SpinnerProps) => (
  <Box className={uploadingSpinner} {...rest} />
)
