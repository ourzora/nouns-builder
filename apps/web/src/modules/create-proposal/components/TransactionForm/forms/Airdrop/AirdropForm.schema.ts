import type { AddressType } from 'src/typings'
import { isValidAddress } from 'src/utils/ens'
import * as yup from 'yup'

export interface AirdropFormValues {
  recipientAddress?: string | AddressType
  amount?: number
}

const airdropFormSchema = yup.object({
  recipientAddress: yup
    .string()
    .strip()
    .test(
      'is-valid-address-or-ens',
      'This address or ENS domain is not valid',
      async (
        _,
        ctx: yup.TestContext<AirdropFormValues> & {
          originalValue?: string
        }
      ) => await isValidAddress(ctx?.originalValue as string)
    ),
  amount: yup.number().min(1, 'Must be at least 1 token').required(),
})

export default airdropFormSchema
