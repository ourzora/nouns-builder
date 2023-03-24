import * as Yup from 'yup'

import { isValidAddress } from 'src/utils/ens'
import { getProvider } from 'src/utils/provider'

export const allocationSchema = Yup.object().shape({
  founderAddress: Yup.string()
    .test(
      'isValidAddress',
      'invalid address',
      (value: string | undefined) => !!value && isValidAddress(value, getProvider())
    )
    .required('*'),
  allocationPercentage: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('*')
    .min(1, '> 0') // (condition, errorMessage) - allocation represented as % must be greater than or equal to 0
    .max(100, '< 100')
    .integer('Must be whole number'),
  endDate: Yup.string()
    .required('*')
    .test('isDateInFuture', 'Must be in future', (value: string | undefined) => {
      if (!value) return false
      const date = new Date(value)
      const now = new Date()
      return date > now
    }),
})

export const validationSchemaContributions = Yup.object().shape({
  builderAllocation: Yup.object().when({
    is: (exists: object | undefined) => !!exists,
    then: allocationSchema,
  }),
  nounsAllocation: Yup.object().when({
    is: (exists: object | undefined) => !!exists,
    then: allocationSchema,
  }),
})

export const validationSchemaFounderAllocation = (signerAddress: string | null) =>
  Yup.object().shape({
    founderAllocation: Yup.array()
      .of(allocationSchema)
      .min(1, 'Founder is required')
      .test(
        'founderAddress',
        'The founder must be the connected wallet.',
        function (value) {
          if (value?.[0]) {
            return value?.[0]['founderAddress'] === signerAddress
          }
          return false
        }
      )
      .test(
        'unique',
        'Founder allocation addresses should be unique.',
        function (values) {
          const addresses = values?.map((v) => v.founderAddress)
          return values?.length === new Set(addresses)?.size
        }
      ),
  })
