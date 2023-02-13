import { Provider } from '@ethersproject/abstract-provider'
import { FOUNDER_ALLOCATION } from 'src/components/Fields/types'
import { isValidAddress } from 'src/utils/ens'
import * as Yup from 'yup'

export const contributionFields = [
  {
    name: 'contributionAllocation',
    inputLabel: 'Allocation Address',
    type: FOUNDER_ALLOCATION,
    helperText:
      'A Founder Address will receive x % of Tokens until the specified End Date.',
    placeholder: '0x... or .eth',
  },
]

export const validateContribution = (
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
      .test('totalAllocation', 'sum of all allocations must be < 100%', function (value) {
        const allocationPercentage = value?.reduce(
          (acc, cv) => acc + (cv.allocation || 0),
          0
        )

        // if sum of allocations is between 0 and 100 test will pass
        return (
          (!!allocationPercentage || allocationPercentage === 0) &&
          allocationPercentage <= 100
        )
      })
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
  })
