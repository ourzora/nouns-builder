import { Provider } from '@ethersproject/abstract-provider'
import { DATE, TEXT, NUMBER } from 'src/components/Fields/types'
import { isValidAddress } from 'src/utils/ens'
import * as Yup from 'yup'

export const founderAllocationFields = (
  disableAddress: boolean,
  disableAll: boolean = false,
  addressFieldName?: string,
  step: number = 1
) => [
  {
    name: 'founderAddress',
    placeholder: '0x... or .eth',
    inputLabel: addressFieldName || 'Address',
    type: TEXT,
    disabled: disableAddress,
    isAddress: true,
    helperText: addressFieldName === 'Address' ? 'Nouns DAO' : undefined,
  },
  {
    name: 'allocation',
    type: NUMBER,
    inputLabel: 'Percentage',
    placeholder: 'Percentage',
    perma: '%',
    disabled: disableAll,
    step: step,
  },
  {
    name: 'endDate',
    inputLabel: 'End Date',
    type: DATE,
    placeholder: 'End Date',
    disabled: disableAll,
  },
]

export const validateFounderAllocation = (provider: Provider | undefined) =>
  Yup.object().shape({
    founderAddress: Yup.string()
      .test(
        'isValidAddress',
        'invalid address',
        (value: string | undefined) => !!value && isValidAddress(value, provider)
      )
      .required('*'),
    allocation: Yup.number()
      .required('*')
      .min(0, '> 0')
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

export const contributionAllocationFields = (
  disableAll: boolean = false,
  step: number = 1
) => [
  {
    name: 'allocation',
    type: NUMBER,
    inputLabel: 'Percentage',
    placeholder: 'Percentage',
    perma: '%',
    disabled: disableAll,
    step: step,
  },
  {
    name: 'endDate',
    inputLabel: 'End Date',
    type: DATE,
    placeholder: 'End Date',
    disabled: disableAll,
  },
]

export const validateContributionAllocation = (provider: Provider | undefined) =>
  Yup.object().shape({
    allocation: Yup.number()
      .required('*')
      .min(0, '> 0')
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
