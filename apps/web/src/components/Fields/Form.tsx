import FieldSwitch from './FieldSwitch'
import {
  defaultBackButtonVariants,
  defaultFormAdvancedToggle,
  defaultFormAdvancedWrapper,
  defaultFormButton,
  defaultFormButtonWithPrev,
  defaultFormStyleVariants,
  transactionFormButtonWithPrev,
} from './styles.css'
import { Icon } from 'src/components/Icon'
import { Box, Button, Flex, Stack } from '@zoralabs/zord'
import { Formik, FormikValues } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactElement } from 'react'
import { useFormStore } from 'src/stores/useFormStore'
import {
  adminStickySaveButton,
  adminStickySaveWrapper,
  confirmFormWrapper,
} from 'src/styles/Admin.css'
import {
  deployCheckboxHelperText,
  deployCheckboxStyleVariants,
} from 'src/styles/deploy.css'
import { compareAndReturn, isEmpty } from 'src/utils/helpers'
import { useCustomTransactionStore } from 'src/modules/transaction-builder/stores/useCustomTransactionStore'

interface FieldProps {
  name: string
  type: string
  inputLabel: string | ReactElement
  helperText?: string
}

interface FormProps {
  fields: FieldProps[]
  initialValues: {}
  advancedFields?: FieldProps[]
  advancedValues?: {}
  validationSchema?: {}
  buttonText?: string
  enableReinitialize?: boolean
  createSectionTitle?: string
  transactionSectionTitle?: string
  submitCallback: (updates: any, setHasConfirmed?: any, formik?: FormikValues) => void
  hasNext?: boolean
  stickySave?: boolean
  compareReturn?: boolean
  isSubForm?: boolean
  options?: any[] | object
  validateOnBlur?: boolean
  autoSubmit?: boolean
  innerStyle?: any
  parentValues?: any
  auctioningHasStarted?: boolean
}

const Form: React.FC<FormProps> = ({
  fields,
  initialValues,
  advancedFields,
  advancedValues,
  validationSchema,
  buttonText,
  enableReinitialize = true,
  createSectionTitle,
  transactionSectionTitle,
  submitCallback,
  hasNext,
  stickySave,
  compareReturn,
  isSubForm = false,
  options,
  validateOnBlur = false,
  autoSubmit = false,
  innerStyle,
  parentValues,
  auctioningHasStarted = true,
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
  const handleSubmit = (_values: {}, initialValues: any, formik?: FormikValues) => {
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
    } else if (compareReturn) {
      /*

      if compareReturn  - if form only should submit changed values to callback

     */
      let updates = compareAndReturn(initialValues, _values)

      if (hasConfirmed.state !== true) {
        setHasConfirmed({ state: null, values: updates })
      } else {
        submitCallback(updates, setHasConfirmed, formik)
      }
    } else {
      submitCallback(_values)
    }
  }

  /*

    if compareReturn is true, ask for confirmation of changed values

   */
  const [hasConfirmed, setHasConfirmed] = React.useState<{
    state: boolean | null
    values: {}[] | null
  }>({ state: false, values: null })
  const confirmVariants = {
    initial: {
      height: 0,
    },
    animate: {
      height: 'auto',
    },
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

  /*

    handle advanced values and toggle

   */
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState<boolean>(false)
  const advancedVariants = {
    init: {
      height: 0,
    },
    open: {
      height: 'auto',
    },
  }

  return (
    <Formik
      initialValues={
        advancedValues ? { ...initialValues, ...advancedValues } : initialValues
      }
      validationSchema={validationSchema}
      onSubmit={(values: any, formik: FormikValues) =>
        handleSubmit(values, initialValues, formik)
      }
      enableReinitialize={enableReinitialize}
      validateOnMount={true}
      validateOnBlur={validateOnBlur}
    >
      {(formik) => {
        const changes = hasConfirmed?.values?.length
        return (
          <Box
            as={!isSubForm ? 'form' : 'div'}
            onSubmit={formik.handleSubmit}
            className={defaultFormStyleVariants[stickySave ? 'sticky' : 'default']}
            w={'100%'}
          >
            <Stack className={!!innerStyle ? innerStyle : ''}>
              {fields.map((f, i) => (
                <FieldSwitch
                  key={i}
                  formik={formik}
                  field={f}
                  autoSubmit={hasNext || autoSubmit}
                  setHasConfirmed={setHasConfirmed}
                  hasConfirmed={hasConfirmed}
                  options={options}
                  submitCallback={submitCallback}
                  parentValues={parentValues}
                />
              ))}
            </Stack>

            {advancedFields && (
              <Button
                align={'center'}
                justify={'center'}
                alignSelf={'center'}
                onClick={() => setIsAdvancedOpen((bool) => !bool)}
                className={defaultFormAdvancedToggle}
                gap={'x3'}
                py={'x3'}
                mb={'x8'}
              >
                Advanced
                {isAdvancedOpen ? <Icon id="chevronUp" /> : <Icon id="chevronDown" />}
              </Button>
            )}
            <motion.div
              className={defaultFormAdvancedWrapper}
              variants={advancedVariants}
              initial={'init'}
              animate={isAdvancedOpen ? 'open' : 'init'}
            >
              {advancedFields &&
                advancedFields?.map((f, i) => (
                  <FieldSwitch
                    key={i}
                    formik={formik}
                    field={f}
                    autoSubmit={hasNext}
                    setHasConfirmed={setHasConfirmed}
                    hasConfirmed={hasConfirmed}
                    options={options}
                    submitCallback={submitCallback}
                  />
                ))}
            </motion.div>

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
                {(stickySave && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                    >
                      <Flex
                        direction={'column'}
                        position={'fixed'}
                        align={'center'}
                        justify={'center'}
                        bottom={'x0'}
                        left={'x0'}
                        width={'100%'}
                        className={adminStickySaveWrapper}
                      >
                        {(hasConfirmed.state || hasConfirmed.state === null) && (
                          <motion.div
                            variants={confirmVariants}
                            initial={'initial'}
                            animate={
                              hasConfirmed.state || hasConfirmed.state === null
                                ? 'animate'
                                : 'initial'
                            }
                          >
                            <Flex
                              direction={'column'}
                              py={'x8'}
                              px={'x4'}
                              className={confirmFormWrapper}
                            >
                              <Flex align={'center'} justify={'center'} gap={'x4'}>
                                <Flex
                                  align={'center'}
                                  justify={'center'}
                                  className={
                                    deployCheckboxStyleVariants[
                                      hasConfirmed.state ? 'confirmed' : 'default'
                                    ]
                                  }
                                  onClick={() =>
                                    setHasConfirmed({
                                      ...hasConfirmed,
                                      state: !hasConfirmed.state,
                                    })
                                  }
                                >
                                  {hasConfirmed && <Icon id="check" fill="background1" />}
                                </Flex>
                                <Flex className={deployCheckboxHelperText}>
                                  {(auctioningHasStarted && (
                                    <>
                                      Create proposal for {changes}{' '}
                                      {!!changes && changes > 1 ? 'changes' : 'change'} to
                                      the contract parameters.
                                    </>
                                  )) || (
                                    <>
                                      [I confirm that I want to change {changes}{' '}
                                      {!!changes && changes > 1
                                        ? 'parameters'
                                        : 'parameter'}
                                      , and understand that there will be {changes}{' '}
                                      {!!changes && changes > 1
                                        ? 'transactions'
                                        : 'transaction'}{' '}
                                      I need to sign and pay gas for.]
                                    </>
                                  )}
                                </Flex>
                              </Flex>
                            </Flex>
                          </motion.div>
                        )}
                        <Button
                          className={adminStickySaveButton}
                          type={'submit'}
                          my={'x3'}
                          disabled={!formik.dirty || hasConfirmed.values?.length === 0}
                        >
                          {(auctioningHasStarted && (
                            <>
                              {hasConfirmed.state === true
                                ? 'Confirm'
                                : 'Create Proposal'}
                            </>
                          )) || (
                            <>
                              {hasConfirmed.state === true ? 'Confirm' : 'Save Changes'}
                            </>
                          )}
                        </Button>
                      </Flex>
                    </motion.div>
                  </AnimatePresence>
                )) || (
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
                    onClick={
                      isSubForm
                        ? () => handleSubmit(formik.values, formik.initialValues)
                        : undefined
                    }
                    disabled={!isEmpty(formik.errors) || formik.isSubmitting}
                    onMouseDown={mouseDownEvent}
                  >
                    {buttonText || 'Submit'}
                  </Button>
                )}
              </Flex>
            )}
          </Box>
        )
      }}
    </Formik>
  )
}

export default Form
