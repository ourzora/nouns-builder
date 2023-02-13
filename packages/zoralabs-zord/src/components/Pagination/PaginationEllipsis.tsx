import { Flex, FlexProps, Icon } from '../../elements'
import * as styles from './Pagination.css'
import React from 'react'

/**
 * Ellipsis indicator
 */

export function PaginationEllipsis(props: FlexProps) {
  return (
    <Flex className={styles.button} flex={1} justify="center" align="center" {...props}>
      <Icon id="Ellipsis" size="sm" color="text2" />
    </Flex>
  )
}
