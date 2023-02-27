import FieldSwitch from './FieldSwitch'
import {
  defaultBackButtonVariants,
  defaultFormButton,
  defaultFormButtonWithPrev,
  transactionFormButtonWithPrev,
  flexStyle,
} from './styles.css'
import { Icon } from 'src/components/Icon'
import { Box, Button, Flex, Stack } from '@zoralabs/zord'
import { Formik } from 'formik'
import React, { ReactElement } from 'react'
import { useFormStore } from 'src/stores/useFormStore'
import { isEmpty } from 'src/utils/helpers'
import { useCustomTransactionStore } from 'src/modules/create-proposal'

interface FieldProps {
  name: string
  type: string
  inputLabel: string | ReactElement
  helperText?: string
}

interface FormProps {
  fields: FieldProps[]
  initialValues: {}
  validationSchema?: {}
  buttonText?: string
  enableReinitialize?: boolean
  createSectionTitle?: string
  transactionSectionTitle?: string
  submitCallback: (updates: any) => void
  hasNext?: boolean
  isSubForm?: boolean
  options?: any[] | object
  validateOnBlur?: boolean
  autoSubmit?: boolean
  innerStyle?: any
  parentValues?: any
}

const Form: React.FC<FormProps> = ({
  fields,
  initialValues,
  validationSchema,
  buttonText,
  enableReinitialize = true,
  createSectionTitle,
  transactionSectionTitle,
  submitCallback,
  hasNext,
  isSubForm = false,
  options,
  validateOnBlur = false,
  autoSubmit = false,
  innerStyle,
  parentValues,
}) => {
  const {
    setFulfilledSections,
    setActiveSection,
    activeSection,
    setActiveSectionCurrentIndex,
    activeSectionCurrentIndex,
  } = useFormStore()

  const {
    active: activeCustomTransactionSection,
    next: nextCustomTransactionForm,
    previous: previousCustomTransactionForm,
  } = useCustomTransactionStore()

  /*
    handle mouseDown
    occurs before blur
   */

  const mouseDownEvent = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
  }

  /*

    handle submit

   */
  const handleSubmit = (_values: {}) => {
    /*

      if createSectionTitle  - if form is apart of FormHandler and needs to progress sections

     */
    if (createSectionTitle) {
      if (!hasNext) {
        submitCallback(_values)
        setFulfilledSections(createSectionTitle)
        setActiveSection(activeSection + 1)
      } else {
        setActiveSectionCurrentIndex(activeSectionCurrentIndex + 1)
        submitCallback(_values)
      }
    } else if (transactionSectionTitle) {
      /*

     if transactionSectionTitle  - if form is apart of transaction FormHandler and needs to progress sections

    */
      submitCallback(_values)

      nextCustomTransactionForm()
    } else {
      submitCallback(_values)
    }
  }

  /*

    handle back button section navigation

   */
  const handlePrev = () => {
    if (transactionSectionTitle) {
      previousCustomTransactionForm()
    }

    if (createSectionTitle) {
      setActiveSection(activeSection - 1)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={enableReinitialize}
      validateOnMount={true}
      validateOnBlur={validateOnBlur}
    >
      {(formik) => {
        return (
          <Box
            as={!isSubForm ? 'form' : 'div'}
            onSubmit={formik.handleSubmit}
            className={flexStyle}
            w={'100%'}
          >
            <Stack className={!!innerStyle ? innerStyle : ''}>
              {fields.map((f, i) => (
                <FieldSwitch
                  key={i}
                  formik={formik}
                  field={f}
                  autoSubmit={hasNext || autoSubmit}
                  options={options}
                  submitCallback={submitCallback}
                  parentValues={parentValues}
                />
              ))}
            </Stack>

            {!autoSubmit && (
              <Flex>
                {createSectionTitle && activeSection > 0 ? (
                  <>
                    <Button
                      justify={'center'}
                      align={'center'}
                      h={'x15'}
                      minH={'x15'}
                      minW={'x15'}
                      onClick={() => handlePrev()}
                      className={defaultBackButtonVariants['default']}
                      aria-label="Back"
                    >
                      <Icon id="arrowLeft" />
                    </Button>
                  </>
                ) : null}

                {transactionSectionTitle && activeCustomTransactionSection > 0 ? (
                  <>
                    <Flex
                      justify={'center'}
                      align={'center'}
                      px={'x4'}
                      py={'x2'}
                      onClick={() => handlePrev()}
                      className={defaultBackButtonVariants['transaction']}
                    >
                      Back
                    </Flex>
                  </>
                ) : null}
                {
                  //TODO:: if its a formHandler form (i.e navigating between sections, we can abstract these "prev" and "next" buttons
                  <Button
                    h={'x15'}
                    className={
                      transactionSectionTitle
                        ? transactionFormButtonWithPrev
                        : createSectionTitle && activeSection > 0
                        ? defaultFormButtonWithPrev
                        : defaultFormButton
                    }
                    type={!isSubForm ? 'submit' : 'button'}
                    onClick={isSubForm ? () => handleSubmit(formik.values) : undefined}
                    disabled={!isEmpty(formik.errors) || formik.isSubmitting}
                    onMouseDown={mouseDownEvent}
                  >
                    {buttonText || 'Submit'}
                  </Button>
                }
              </Flex>
            )}
          </Box>
        )
      }}
    </Formik>
  )
}

export default Form
