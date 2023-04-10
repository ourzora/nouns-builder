import { debounce } from 'lodash'
import * as yup from 'yup'

import { isValidAddress } from 'src/utils/ens'
import { getProvider } from 'src/utils/provider'

export interface DroposalFormValues {
  name: string
  symbol: string
  description: string
  mediaUrl: string
  mediaType?: string
  coverUrl: string
  pricePerMint?: number
  maxPerAddress?: number
  maxSupply?: number
  royaltyPercentage: number
  fundsRecipient: string
  defaultAdmin: string
  publicSaleStart: string
  publicSaleEnd: string
}

const validateAddress = async (
  value: string | undefined,
  res: (value: boolean | PromiseLike<boolean>) => void
) => {
  try {
    res(!!value && (await isValidAddress(value, getProvider())))
  } catch (err) {
    res(false)
  }
}

export const deboucedValidateAddress = debounce(validateAddress, 500)

const droposalFormSchema = yup.object({
  name: yup.string().required('*'),
  symbol: yup.string(),
  description: yup.string().required('*'),
  mediaUrl: yup.string().required('*'),
  mediaType: yup.string(),
  coverUrl: yup.string(),
  pricePerMint: yup.number().required('*'),
  maxPerAddress: yup.number().integer('Must be whole number'),
  maxSupply: yup.number().integer('Must be whole number'),
  royaltyPercentage: yup.number().required('*'),
  defaultAdmin: yup
    .string()
    .required('*')
    .test(
      'isValidAddress',
      'invalid address',
      (value) => new Promise((res) => deboucedValidateAddress(value, res))
    ),
  fundsRecipient: yup
    .string()
    .required('*')
    .test(
      'isValidAddress',
      'invalid address',
      (value) => new Promise((res) => deboucedValidateAddress(value, res))
    ),
  publicSaleStart: yup.string().required('*'),
  publicSaleEnd: yup
    .string()
    .required('*')
    .test('isDateInFuture', 'Must be in future', (value: string | undefined) => {
      if (!value) return false
      const date = new Date(value)
      const now = new Date()
      return date > now
    }),
})

export default droposalFormSchema
