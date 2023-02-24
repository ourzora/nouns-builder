import React from 'react'
import { Flex } from '@zoralabs/zord'
import { allocationToggle, allocationToggleButtonVariants } from '../styles.css'
import { Icon } from 'src/components/Icon'

export const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
  <Flex className={allocationToggle[on ? 'on' : 'off']} onClick={onToggle}>
    <Flex
      h={'x6'}
      w={'x6'}
      borderRadius={'round'}
      className={allocationToggleButtonVariants[on ? 'on' : 'off']}
      align={'center'}
      justify={'center'}
    >
      <Icon id={'handlebarCircle'} />
    </Flex>
  </Flex>
)
