import * as React from 'react'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import 'src/components/Fields/styles.css'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { ReactElement } from 'react'
import { FormikProps } from 'formik'
import { Box, Flex, Stack } from '@zoralabs/zord'
import {
  defaultHelperTextStyle,
  defaultInputLabelStyle,
} from 'src/components/Fields/styles.css'
import { Error } from 'src/components/Fields/Error'

interface MarkdownEditorProps {
  formik: FormikProps<any>
  id: string
  value: string
  inputLabel: string | ReactElement
  disabled?: boolean
  errorMessage?: string
  helperText?: string
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  formik,
  id,
  value,
  inputLabel,
  disabled,
  errorMessage,
  helperText,
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
