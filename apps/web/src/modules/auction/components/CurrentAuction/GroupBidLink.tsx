import { Flex, Text } from '@zoralabs/zord'
import React from 'react'

import { Icon } from 'src/components/Icon'

interface GroupBidLinkProps {}

export const GroupBidLink: React.FC<GroupBidLinkProps> = () => {
  return (
    <a href="https://www.grouppurple.com/" target="_blank" rel="noreferrer">
      <Flex direction="row" justify="space-between" style={{ marginTop: '10px' }}>
        <Icon id="sparkles" />
        <Text>
          <u>Start group bid</u>
        </Text>
        <Icon id="arrowTopRight" />
      </Flex>
    </a>
  )
}
