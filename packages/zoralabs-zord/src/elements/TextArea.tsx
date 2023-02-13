import { Box, BoxComponentProps, Flex, Text } from './'
import { FieldAnnotation } from './FieldAnnotation'
import { textAreaField, textAreaFieldBaseInput, textAreaFieldLabel } from './TextArea.css'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export interface TextAreaProps extends BoxComponentProps<'textarea'> {
  value?: string
  name: string
  placeholder?: string
  label?: string
  className?: string
  initialHeight?: number
  disabled?: boolean
  indentFields?: boolean
  error?: string
  description?: string
  style?: { [key: string]: number | string }
}

const TEXTAREA_HEIGHT = 100

export function TextArea({
  value,
  label,
  name,
  description,
  error,
  className,
  style,
  placeholder = '',
  disabled = false,
  indentFields = true,
  initialHeight = TEXTAREA_HEIGHT,
  ...props
}: TextAreaProps) {
  const textRef = useRef<HTMLTextAreaElement>(null)
  const [textAreaHeight, setTextAreaHeight] = useState<string>(`${initialHeight}px`)

  useEffect(() => {
    // Expand + contract height of <textarea> based on contents
    if (textRef?.current) {
      const taHeight = Math.max(textRef.current.scrollHeight, initialHeight)
      setTextAreaHeight(`${taHeight}px`)
    }
  }, [initialHeight, value])

  return (
    <Flex direction="column" className={['zord-textarea', textAreaField, className]}>
      {label && (
        <Text
          as="label"
          variant="label-sm"
          htmlFor={name}
          className={textAreaFieldLabel({
            disabled: !!disabled,
            indentFields: indentFields,
          })}
        >
          {label}
        </Text>
      )}
      <Box
        as="textarea"
        ref={textRef}
        className={textAreaFieldBaseInput({ error: !!error })}
        value={value}
        placeholder={placeholder}
        name={name}
        disabled={!!disabled}
        cols={40}
        {...props}
        style={{ height: textAreaHeight, ...style }}
      />
      {(error || description) && (
        <FieldAnnotation
          description={description}
          indentFields={indentFields}
          error={error}
          className={className}
        />
      )}
    </Flex>
  )
}
