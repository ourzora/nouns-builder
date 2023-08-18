import * as yup from 'yup'

export interface BridgeFormValues {
  amount?: number
}

const bridgeFormSchema = (userL1Balance: number) =>
  yup.object({
    amount: yup
      .number()
      .required()
      .max(userL1Balance, 'Must bridge less than L1 balance.')
      .test(
        'is-greater-than-0',
        'Must bridge more than 0 ETH',
        (value) => !!value && value > 0
      ),
  })

export default bridgeFormSchema
