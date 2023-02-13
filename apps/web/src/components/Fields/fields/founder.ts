import { Provider } from '@ethersproject/abstract-provider'
import { FOUNDER_ALLOCATION, CONTRIBUTION_ALLOCATION } from 'src/components/Fields/types'
import { isValidAddress } from 'src/utils/ens'
import * as Yup from 'yup'

export const founderFields = [
  {
    name: 'founderAllocation',
    inputLabel: 'Allocation Address',
    type: FOUNDER_ALLOCATION,
    helperText:
      'A Founder Address will receive x % of Tokens until the specified End Date.',
    placeholder: '0x... or .eth',
  },
  {
    name: 'contributionAllocation',
    inputLabel: 'Allocation Address',
    type: CONTRIBUTION_ALLOCATION,
  },
]

// make sure contributionAllocation fields are valid
// test entire Yup object for allocation percentage (cannot exceed 100%)
export const validateFounder = (
  signerAddress: string | null,
  provider: Provider | undefined
) =>
  Yup.object().shape({
    founderAllocation: Yup.array()
      .of(
        Yup.object().shape({
          founderAddress: Yup.string()
            .test(
              'isValidAddress',
              'invalid address',
              (value: string | undefined) => !!value && isValidAddress(value, provider)
            )
            .required('*'),
          allocation: Yup.number()
            .transform((value) => (isNaN(value) ? undefined : value))
            .required('*')
            .min(0, '>= 0'), // (condition, errorMessage) - allocation represented as % must be greater than or equal to 0
          endDate: Yup.string(),
        })
      )
      .min(1, 'founder required')
      .test(
        'founderAddress',
        'the founder must be the connected wallet.',
        function (value) {
          return (
            value?.reduce((acc: string[], cv) => {
              if (cv?.founderAddress === signerAddress) {
                acc.push(cv.founderAddress)
              }

              return acc
            }, []).length === 1
          )
        }
      ),

    contributionAllocation: Yup.array()
      .of(
        Yup.object().shape({
          founderAddress: Yup.string()
            .test(
              'isValidAddress',
              'invalid address',
              (value: string | undefined) => !!value && isValidAddress(value, provider)
            )
            .required('*'),
          allocation: Yup.number()
            .transform((value) => (isNaN(value) ? undefined : value))
            .required('*')
            .min(0, '>= 0'), // (condition, errorMessage) - allocation represented as % must be greater than or equal to 0
          endDate: Yup.string(),
        })
      )
      .test(
        'totalAllocation',
        'sum of all allocations must be < 100%',
        function (value, context) {
          const allocations = [
            // @ts-ignore
            ...context.options.parent.founderAllocation,
            // @ts-ignore
            ...context.options.parent.contributionAllocation,
          ]

          const allocationPercentage = allocations.reduce(
            (acc, cv) => acc + (cv?.allocation || 0),
            0
          )

          return (
            (!!allocationPercentage || allocationPercentage === 0) &&
            allocationPercentage <= 100
          )
        }
      ),
  })
