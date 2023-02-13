import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, Flex } from '@zoralabs/zord'

import { Icon } from '../Icon'

import {
  defaultFieldsetStyle,
  defaultInputLabelStyle,
  defaultDropdownSelectOptionStyle,
} from './styles.css'

interface SelectOption {
  value: string
  label: string
  icon?: ReactNode
}

interface DropdownSelectProps {
  value: string
  options: SelectOption[]
  inputLabel?: string | ReactElement
  onChange: (value: string) => void
  disabled?: boolean
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  value,
  onChange,
  options,
  inputLabel,
  disabled = false,
}) => {
  const [showOptions, setShowOptions] = useState(false)

  const handleOptionSelect = (option: SelectOption) => {
    onChange(option.value)
    setShowOptions(false)
  }

  useEffect(() => {
    if (!value) {
      handleOptionSelect(options[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedOption = options.find((option) => option.value == value)

  return (
    <Box as="fieldset" mb={'x8'} p={'x0'} className={defaultFieldsetStyle}>
      {inputLabel && <label className={defaultInputLabelStyle}>{inputLabel}</label>}
      <Flex
        direction={'column'}
        width={'100%'}
        borderStyle={'solid'}
        borderRadius={'curved'}
        borderWidth={'normal'}
        borderColor={'border'}
        backgroundColor={'background1'}
        cursor={disabled ? 'auto' : 'pointer'}
      >
        <Flex
          onClick={() => {
            if (!disabled) {
              setShowOptions(!showOptions)
            }
          }}
        >
          <Flex
            pl={'x4'}
            direction={'row'}
            align={'center'}
            height={'x18'}
            width={'100%'}
            fontSize={16}
            fontWeight={'display'}
          >
            {selectedOption?.icon && <Flex pr={'x4'}>{selectedOption.icon}</Flex>}
            {selectedOption?.label}
          </Flex>
          <Icon
            id={showOptions ? 'chevronUp' : 'chevronDown'}
            size={'md'}
            align={'center'}
            pr={'x4'}
          />
        </Flex>
        <AnimatePresence>
          <motion.div
            initial={'init'}
            animate={showOptions ? 'open' : 'init'}
            variants={{
              init: {
                height: 0,
                overflow: 'hidden',
                boxShadow: 'none',
                transition: {
                  animate: 'easeInOut',
                },
              },
              open: {
                height: 'auto',
                transition: {
                  animate: 'easeInOut',
                },
              },
            }}
          >
            <Flex backgroundColor="border" height="x1" />
            {options.map((option) => (
              <Flex
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className={defaultDropdownSelectOptionStyle}
                pl={'x4'}
                direction={'row'}
                align={'center'}
                height={'x18'}
                width={'100%'}
                fontSize={16}
                fontWeight={'display'}
              >
                {option.icon && <Flex pr={'x4'}>{option.icon}</Flex>}
                {option.label}
              </Flex>
            ))}
          </motion.div>
        </AnimatePresence>
      </Flex>
    </Box>
  )
}

export default DropdownSelect
