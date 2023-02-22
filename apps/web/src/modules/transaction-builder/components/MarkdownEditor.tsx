import * as React from 'react'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import 'src/components/Fields/styles.css'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { ReactElement } from 'react'
import { Flex, Stack } from '@zoralabs/zord'
import { defaultInputLabelStyle } from 'src/components/Fields/styles.css'
import { Error } from 'src/components/Fields/Error'
import remarkGfm from 'remark-gfm'

interface MarkdownEditorProps {
  onChange: (value: string) => void
  value: string
  inputLabel: string | ReactElement
  errorMessage?: string
  disabled?: boolean
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  onChange,
  value,
  inputLabel,
  errorMessage,
  disabled,
}) => {
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    disabled ? 'preview' : 'write'
  )

  return (
    <Stack pb={'x5'}>
      <Flex justify={'space-between'}>
        <label className={defaultInputLabelStyle}>{inputLabel}</label>
      </Flex>
      <ReactMde
        readOnly={disabled}
        value={value}
        onChange={onChange}
        selectedTab={!disabled ? selectedTab : 'preview'}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          )
        }
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
      />
      {!!errorMessage && <Error message={errorMessage} />}
    </Stack>
  )
}
