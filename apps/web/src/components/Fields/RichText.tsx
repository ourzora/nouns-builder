import { defaultHelperTextStyle, defaultInputLabelStyle } from './styles.css'

import { RichTextEditor } from '@mantine/rte'
import { Flex, Box, Stack, Text, atoms } from '@zoralabs/zord'
import { FormikProps } from 'formik'
import { Error } from './Error'
import React, { ChangeEventHandler, ReactElement } from 'react'
import { style } from '@vanilla-extract/css'

interface RichTextProps {
  id: string
  value: string
  inputLabel: string | ReactElement
  onChange: ChangeEventHandler
  onBlur: ChangeEventHandler
  formik?: FormikProps<any>
  disabled?: boolean
  errorMessage?: string
  helperText?: string
  autoSubmit?: boolean
  placeholder?: string
}

const RichText: React.FC<RichTextProps> = ({
  id,
  value,
  inputLabel,
  disabled,
  errorMessage,
  helperText,
  formik,
  placeholder,
}) => {
  const [editorValue, setEditorValue] = React.useState(value)
  const handleChange = (e: any) => {
    setEditorValue(e)
  }

  const handleMouseLeave = () => {
    formik?.setFieldValue(id, editorValue)
  }

  React.useEffect(() => {
    setEditorValue(value)
  }, [value])

  return (
    <Stack pb={'x5'}>
      <Flex justify={'space-between'}>
        <label className={defaultInputLabelStyle}>{inputLabel}</label>
      </Flex>

      <RichTextEditor
        value={editorValue}
        readOnly={disabled}
        onChange={handleChange}
        onMouseLeave={() => handleMouseLeave()}
        style={{ minHeight: 250 }}
        className={atoms({
          backgroundColor: disabled ? 'border' : 'background1',
          borderColor: !!errorMessage ? 'negative' : 'border',
          borderWidth: 'normal',
        })}
        controls={[
          ['bold', 'italic', 'underline', 'link'],
          ['unorderedList', 'h1', 'h2', 'h3'],
        ]}
        placeholder={placeholder}
        sticky={false}
      />

      {!!errorMessage && <Error message={errorMessage} />}

      {!!helperText && helperText?.length > 0 ? (
        <Box className={defaultHelperTextStyle}>{helperText}</Box>
      ) : null}
    </Stack>
  )
}

export default RichText
