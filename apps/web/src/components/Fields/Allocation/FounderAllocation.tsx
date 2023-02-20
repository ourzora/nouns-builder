import { addAddressButton } from '../styles.css'
import { Heading, Button, Flex, Paragraph, Stack } from '@zoralabs/zord'
import { Icon } from 'src/components/Icon'
import { FormikErrors, FormikProps, FormikTouched } from 'formik'
import React from 'react'
import SmartInput from '../SmartInput'
import Date from '../Date'
import { FounderAllocationFormValues } from 'src/pages/create/forms/Allocation/Allocation'
import { allocationProps } from 'src/typings'

interface FounderAllocationProps {
  values: FounderAllocationFormValues
  errors?: FormikErrors<FounderAllocationFormValues>
  touched: FormikTouched<FounderAllocationFormValues>
  formik: FormikProps<FounderAllocationFormValues>
  removeFounderAddress: (index: number) => void
  addFounderAddress: () => void
}

const FounderAllocationNew = ({
  values,
  errors,
  touched,
  formik,
  removeFounderAddress,
  addFounderAddress,
}: FounderAllocationProps) => {
  return (
    <Flex position={'relative'} direction={'column'} w={'100%'}>
      <Heading size="xs">Token Allocation</Heading>

      <Paragraph color="text3" mb={'x6'}>
        A Founder Address will receive x% of tokens until the specified end date.
      </Paragraph>

      <Stack>
        {values.founderAllocation.map((founder, index) => {
          const isFounder = index === 0

          const error = errors?.founderAllocation?.[
            index
          ] as FormikErrors<allocationProps>

          const touchedField = touched?.founderAllocation?.[index]
          return (
            <Flex key={`founder-${index}`}>
              <SmartInput
                inputLabel={
                  isFounder ? 'Admin founder address' : 'Additional founder allocations'
                }
                id={`founderAllocation.${index}.founderAddress`}
                value={founder.founderAddress}
                type={'text'}
                formik={formik}
                placeholder={'0x... or .eth'}
                disabled={isFounder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoSubmit={false}
                isAddress={true}
                errorMessage={
                  error?.founderAddress && touchedField?.founderAddress
                    ? error?.founderAddress
                    : undefined
                }
              />

              <SmartInput
                inputLabel={'Percentage'}
                id={`founderAllocation.${index}.allocation`}
                value={founder.allocation}
                type={'number'}
                formik={formik}
                disabled={false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                perma={'%'}
                autoSubmit={false}
                isAddress={false}
                errorMessage={
                  error?.allocation && touchedField?.allocation
                    ? error?.allocation
                    : undefined
                }
              />

              <Date
                id={`founderAllocation.${index}.endDate`}
                value={founder.endDate}
                placeholder={'1/1/2222'}
                inputLabel={'End date'}
                formik={formik}
                autoSubmit={false}
                disabled={false}
                errorMessage={
                  error?.endDate && touchedField?.endDate ? error?.endDate : undefined
                }
              />

              {!isFounder && (
                <Button
                  type="button"
                  variant="unset"
                  onClick={() => removeFounderAddress(index)}
                >
                  <Icon id="trash" />
                </Button>
              )}
            </Flex>
          )
        })}
      </Stack>

      <Flex align={'center'} justify={'center'}>
        <Icon id="plus" />
        <Flex ml={'x2'} className={[addAddressButton]} onClick={addFounderAddress}>
          Add Address
        </Flex>
      </Flex>
    </Flex>
  )
}

export default FounderAllocationNew
