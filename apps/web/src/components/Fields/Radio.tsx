import { radioStyles } from './styles.css'
import { Flex, Stack } from '@zoralabs/zord'
import { FormikErrors, FormikProps } from 'formik'
import React, { ReactElement } from 'react'

interface RadioProps {
  inputLabel: string | ReactElement
  formik: FormikProps<any>
  id: string
  errorMessage: string | FormikErrors<any> | string[] | undefined | FormikErrors<any>[]
  placeholder?: string
  autoSubmit?: boolean
  submitCallback?: (values: any) => void
  options?: any
  value: any
}

const Radio: React.FC<RadioProps> = ({ inputLabel, formik, id, options, value }) => {
  const handleSelection = (key: number) => {
    formik.setFieldValue(id, key)
  }

  return (
    <Stack mb={'x8'}>
      {options &&
        options?.[id].map((option: string, key: number) => (
          <Flex
            key={key}
            align={'center'}
            justify={'center'}
            borderColor={'secondary'}
            borderRadius={'curved'}
            borderStyle={'solid'}
            width={'100%'}
            height={'x16'}
            m={'x2'}
            className={radioStyles[value === key ? 'active' : 'default']}
            onClick={() => handleSelection(key)}
          >
            {option}
          </Flex>
        ))}
    </Stack>
  )
}

export default Radio
