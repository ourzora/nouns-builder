import { addAddressButton, defaultHelperTextStyle } from '../styles.css'
import FounderAllocationFields from './FounderAllocationFields'
import { Box, Flex, Stack } from '@zoralabs/zord'
import { Icon } from 'src/components/Icon'
import { FormikProps } from 'formik'
import React, { ChangeEventHandler, ReactElement } from 'react'
import { useFormStore, useLayoutStore } from 'src/stores'
import { shallow } from 'zustand/shallow'

interface FounderAllocationProps {
  id: string
  value: any
  inputLabel: string | ReactElement
  formik?: FormikProps<any>
  errorMessage?: any
  autoSubmit?: boolean
  helperText?: string
  onBlur: ChangeEventHandler
  submitCallback?: (values: any) => void
  onChange: ChangeEventHandler
}

const FounderAllocationForm: React.FC<FounderAllocationProps> = ({
  id,
  value,
  formik,
  autoSubmit,
  helperText,
}) => {
  const { setFounderAllocation } = useFormStore(
    (state) => ({
      setFounderAllocation: state.setFounderAllocation,
    }),
    shallow
  )
  const signerAddress = useLayoutStore((state) => state.signerAddress)
  const [formCount, setFormCount] = React.useState<number>(value.length || 1)

  /*
    handle add and remove founder allocation
 */
  const submitCallback = React.useCallback(
    (values: any) => {
      // addresses of all of the founder allocation objects
      const addresses = formik?.values[id].reduce(
        (acc: string[] = [], cv: { founderAddress: string }) => {
          acc.push(cv.founderAddress)
          return acc
        },
        []
      )

      // checking to see if the incoming values matches an existing value
      const founderExists = addresses.includes(values.founderAddress)
      const isRemoveAttempt = Array.isArray(values)

      if (isRemoveAttempt) {
        formik?.setFieldValue(id, values)
        setFounderAllocation(values) // update the store
      } else {
        if (founderExists) {
          const updatedValues = formik?.values[id].map(
            (cv: { founderAddress: string }) => {
              if (cv.founderAddress === values.founderAddress) {
                return values
              }
              return cv
            }
          )
          formik?.setFieldValue(id, updatedValues)
          setFounderAllocation(updatedValues) // update the store
        } else {
          formik?.setFieldValue(id, [...formik?.values[id], values])
          setFounderAllocation([...formik?.values[id], values]) // update the store
        }
      }

      if (autoSubmit) {
        formik?.submitForm()
      }

      return
    },
    [autoSubmit, formik, id, setFounderAllocation]
  )

  const Forms = React.useMemo(() => {
    let forms = []

    const founderForm = (i: number) => (
      <FounderAllocationFields
        value={value}
        index={i}
        formCount={formCount}
        setFormCount={setFormCount}
        submitCallback={submitCallback}
        disableAddress={i === 0}
        defaultAddress={i === 0 ? signerAddress : ''}
        addressFieldName={
          i === 0 ? 'Admin founder address' : 'Additional founder allocations'
        }
        founderField={true}
      />
    )
    for (let i = 0; i < formCount; i++) {
      forms.push(founderForm(i))
    }

    return forms
  }, [formCount, value, signerAddress, submitCallback])

  return (
    <Flex position={'relative'} direction={'column'} w={'100%'}>
      <Flex fontSize={20} fontWeight={'heading'}>
        Token Allocation
      </Flex>
      {!!helperText && helperText?.length > 0 ? (
        <Box className={[defaultHelperTextStyle]} mb={'x8'}>
          {helperText}
        </Box>
      ) : null}

      <Stack>{Forms.map((form, i) => React.cloneElement(form, { key: i }))}</Stack>

      <Flex align={'center'} justify={'center'} mb={'x8'}>
        <Icon id="plus" />
        <Flex
          ml={'x2'}
          className={[addAddressButton]}
          onClick={() => setFormCount(formCount + 1)}
        >
          Add Address
        </Flex>
      </Flex>
    </Flex>
  )
}

export default FounderAllocationForm
