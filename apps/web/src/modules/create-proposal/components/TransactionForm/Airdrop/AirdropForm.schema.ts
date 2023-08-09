import * as yup from 'yup'

import type { AddressType } from 'src/typings'
import { addressValidationSchema } from 'src/utils/yup'

export interface AirdropFormValues {
  recipientAddress?: string | AddressType
  amount?: number
}

const airdropFormSchema = yup.object({
  recipientAddress: addressValidationSchema,
  amount: yup.number().min(1, 'Must be at least 1 token').required(),
})

export default airdropFormSchema
