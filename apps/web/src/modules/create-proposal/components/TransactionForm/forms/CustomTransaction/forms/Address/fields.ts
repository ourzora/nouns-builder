import { Provider } from '@ethersproject/abstract-provider'
import * as Yup from 'yup'

import { TEXT } from 'src/components/Fields/types'
import { isValidAddress } from 'src/utils/ens'

export const contractAddressFields = [
  {
    name: 'transactionContractAddress',
    inputLabel: 'Address',
    type: TEXT,
    helperText: 'Callee or Recipient',
    placeholder: '0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7',
    isAddress: true,
  },
]

export const validateContractAddress = (provider: Provider | undefined) =>
  Yup.object().shape({
    transactionContractAddress: Yup.string()
      .test(
        'isValidAddress',
        'invalid address',
        (value: string | undefined) => !!value && isValidAddress(value, provider)
      )
      .required('*'),
  })
