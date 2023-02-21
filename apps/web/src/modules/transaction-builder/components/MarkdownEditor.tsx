import * as React from 'react'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import '../../../components/Fields/styles.css'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { ChangeEventHandler, ReactElement } from 'react'
import { FormikProps } from 'formik'
import { Box, Flex, Stack } from '@zoralabs/zord'
import { defaultHelperTextStyle, defaultInputLabelStyle } from '../../../components/Fields/styles.css'
import { Error } from '../../../components/Fields/Error'

interface MarkdownEditorProps {
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

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  id,
  value,
  inputLabel,
  disabled,
  errorMessage,
  helperText,
  formik,
  placeholder,
}) => {
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>('write')

  return (
    <Stack pb={'x5'}>
      <Flex justify={'space-between'}>
        <label className={defaultInputLabelStyle}>{inputLabel}</label>
      </Flex>
      <ReactMde
        readOnly={disabled}
        value={value}
        onChange={(v) => formik?.setFieldValue(id, v)}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
        }
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
      />
      {!!errorMessage && <Error message={errorMessage} />}

      {!!helperText && helperText?.length > 0 ? (
        <Box className={defaultHelperTextStyle}>{helperText}</Box>
      ) : null}
    </Stack>
  )
}

export default MarkdownEditor
