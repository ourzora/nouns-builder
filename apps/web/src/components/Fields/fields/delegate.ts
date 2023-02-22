import { isValidAddress } from '../../../utils/ens'
import { Provider } from '@ethersproject/abstract-provider'
import * as Yup from 'yup'

export const validateAddress = (provider: Provider | undefined) =>
  Yup.object().shape({
    address: Yup.string()
      .test(
        'isValidAddress',
        'invalid address',
        (value: string | undefined) => !!value && isValidAddress(value, provider)
      )
      .required('*'),
  })
