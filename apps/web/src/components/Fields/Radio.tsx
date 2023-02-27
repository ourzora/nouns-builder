import { radioStyles } from './styles.css'
import { Flex, Stack } from '@zoralabs/zord'
import { FormikProps } from 'formik'
import React from 'react'

interface RadioProps<T> {
  formik: FormikProps<any>
  id: string
  options: { value: T; label: string }[]
  value?: T
}

export function Radio<T extends React.Key | boolean>({
  formik,
  id,
  options,
  value,
}: React.PropsWithChildren<RadioProps<T>>) {
  const handleSelection = (val: T) => {
    formik.setFieldValue(id, val)
  }

  return (
    <Stack mb={'x8'}>
      {options.map((option) => (
        <Flex
          key={option.value.toString()}
          align={'center'}
          justify={'center'}
          borderColor={'secondary'}
          borderRadius={'curved'}
          borderStyle={'solid'}
          width={'100%'}
          height={'x16'}
          m={'x2'}
          className={
            radioStyles[
              value !== undefined && option.value === value ? 'active' : 'default'
            ]
          }
          onClick={() => handleSelection(option.value)}
        >
          {option.label}
        </Flex>
      ))}
    </Stack>
  )
}

export default Radio
