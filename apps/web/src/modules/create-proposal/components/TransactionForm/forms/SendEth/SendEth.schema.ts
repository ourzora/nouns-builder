import type { AddressType } from 'src/typings'
import * as yup from 'yup'

import { isValidAddress } from 'src/utils/ens'

export interface SendEthValues {
  recipientAddress?: string | AddressType
  amount?: number
}

const sendEthSchema = (treasuryBalance: number) =>
  yup.object({
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
    amount: yup
      .number()
      .required()
      .max(treasuryBalance, 'Treasury balance is insufficient to send ETH.')
      .test(
        'is-greater-than-0',
        'Must send more than 0 ETH',
        (value) => !!value && value > 0
      ),
  })

export default sendEthSchema
