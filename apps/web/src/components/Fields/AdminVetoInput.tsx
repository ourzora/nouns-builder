import {
  defaultFieldsetStyle,
  defaultHelperTextStyle,
  defaultInputErrorMessageStyle,
  defaultInputErrorStyle,
  defaultInputLabelStyle,
  defaultInputStyle,
  inputCheckIcon,
  permaInputPlaceHolderStyle,
} from './styles.css'
import { Icon } from 'src/components/Icon'
import { Box, Flex } from '@zoralabs/zord'
import { FormikProps } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import React, { ChangeEventHandler, ReactElement, WheelEvent } from 'react'
import { isEmpty, walletSnippet } from 'src/utils/helpers'

interface SmartInputProps {
  id: string
  value: string | number
  type: string
  inputLabel?: string | ReactElement
  onChange: ChangeEventHandler
  onBlur: ChangeEventHandler
  formik?: FormikProps<any>
  errorMessage?: any
  helperText?: string
  autoSubmit?: boolean
  max?: number
  min?: number
  perma?: string
  placeholder?: string
  step?: number
  ensIsValid?: boolean
  submitCallback?: (values: any) => void
  disabled: boolean | undefined
  disableWheelEvent?: boolean
  isAddress?: boolean
}

const AdminVetoInput: React.FC<SmartInputProps> = ({
  id,
  value,
  type,
  inputLabel,
  onChange,
  autoSubmit,
  formik,
  errorMessage,
  helperText,
  max,
  perma,
  placeholder,
  step = 0.001,
  ensIsValid,
  submitCallback,
  disableWheelEvent = type === 'number',
}) => {
  /*
  
    add autocomplete to refs (autocomplete not supported ref in types)
  
    */
  const input = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    if (input.current !== null) {
      input.current.setAttribute('autocomplete', 'off')
    }
  }, [input])

  /*
  
      handlers: blur, focus
  
      */
  const [isFocus, setIsFocus] = React.useState<boolean>(false)
  const handleBlur = () => {
    setIsFocus(false)
    if (autoSubmit && formik) {
      formik.submitForm()

      if (submitCallback && isEmpty(formik.errors)) {
        submitCallback(formik.values)
      }
    }
  }

  const handleFocus = () => {
    setIsFocus(true)
  }

  const helperVariants = {
    init: {
      height: 0,
      overflow: 'hidden',
    },
    open: {
      height: 'auto',
    },
  }

  const hasNoVetoPower = formik?.values.vetoPower === 1
  if (hasNoVetoPower) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={'init'}
        animate={'open'}
        exit={'init'}
        variants={helperVariants}
        transition={{ duration: 0.2 }}
      >
        <Box as="fieldset" mb={'x8'} p={'x0'} className={defaultFieldsetStyle}>
          {inputLabel && <label className={defaultInputLabelStyle}>{inputLabel}</label>}
          {errorMessage && (
            <Box
              position={'absolute'}
              right={'x2'}
              top={'x8'}
              fontSize={12}
              className={defaultInputErrorMessageStyle}
            >
              {errorMessage}
            </Box>
          )}
          <input
            id={id}
            type={type}
            onChange={onChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            required
            value={
              ensIsValid
                ? walletSnippet(value)
                : typeof value === 'number' && isNaN(value)
                ? ''
                : value
            }
            className={!!errorMessage ? defaultInputErrorStyle : defaultInputStyle}
            min={0}
            max={max}
            step={step}
            placeholder={perma || placeholder || ''}
            ref={input}
            onWheel={
              disableWheelEvent
                ? (e: WheelEvent<HTMLInputElement>) => e.currentTarget.blur()
                : undefined
            }
          />
          {ensIsValid && (
            <Flex
              align={'center'}
              justify={'center'}
              position={'absolute'}
              className={inputCheckIcon['default']}
            >
              <Icon fill="background1" id="check" />
            </Flex>
          )}
          {(typeof value === 'number' || value) && perma ? (
            <Box position={'absolute'} className={permaInputPlaceHolderStyle}>
              {perma}
            </Box>
          ) : null}
          <motion.div
            variants={helperVariants}
            initial={'init'}
            animate={isFocus ? 'open' : 'init'}
          >
            {!!helperText && helperText?.length > 0 ? (
              <Box className={defaultHelperTextStyle}>{helperText}</Box>
            ) : null}
          </motion.div>
        </Box>
      </motion.div>
    </AnimatePresence>
  )
}

export default AdminVetoInput
