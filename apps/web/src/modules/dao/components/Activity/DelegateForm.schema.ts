import { Provider } from '@ethersproject/abstract-provider'
import * as Yup from 'yup'

import { isValidAddress } from 'src/utils/ens'

export const delegateValidationSchema = (provider: Provider | undefined) =>
  Yup.object().shape({
    address: Yup.string()
      .test(
        'isValidAddress',
        'invalid address',
        (value: string | undefined) => !!value && isValidAddress(value, provider)
      )
      .required('*'),
  })
