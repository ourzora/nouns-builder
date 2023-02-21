import * as yup from 'yup'
import { isValidAddress } from 'src/utils/ens'
import type { AddressType } from 'src/typings'

export interface SendEthValues {
  recipientAddress?: string | AddressType
  amount?: number
}

const sendEthSchema = yup.object({
  recipientAddress: yup
    .string()
    .strip()
    .test(
      'is-valid-address-or-ens',
      'This address or ENS domain is not valid',
      async (
        _,
        ctx: yup.TestContext<SendEthValues> & {
          originalValue?: string
        }
      ) => await isValidAddress(ctx?.originalValue as string)
    ),
  amount: yup.number().required(),
})

export default sendEthSchema
