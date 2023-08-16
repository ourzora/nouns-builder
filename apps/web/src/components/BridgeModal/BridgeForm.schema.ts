import * as yup from 'yup'

export interface BridgeFormValues {
  amount?: number
}

const bridgeFormSchema = (userL1Balance: number) =>
  yup.object({
    amount: yup
      .number()
      .required()
      .max(userL1Balance, 'Your balance is insufficient to bridge ETH.')
      .test(
        'is-greater-than-0',
        'Must send more than 0 ETH',
        (value) => !!value && value > 0
      ),
  })

export default bridgeFormSchema
