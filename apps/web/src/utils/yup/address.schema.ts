import { debounce } from 'lodash'
import { Address } from 'wagmi'
import * as Yup from 'yup'

import { CHAIN_ID } from 'src/typings'
import { isValidAddress } from 'src/utils/ens'
import { getProvider } from 'src/utils/provider'

const validateAddress = async (
  value: string | undefined,
  ctx: Yup.TestContext<any>,
  res: (value: boolean | Yup.ValidationError) => void
) => {
  try {
    if (!value) return res(false)
    const { data: isValid, error } = await isValidAddress(
      value as Address,
      getProvider(CHAIN_ID.ETHEREUM)
    )
    if (error) return res(ctx.createError({ message: error, path: ctx.path }))
    res(isValid)
  } catch (err) {
    res(false)
  }
}

const deboucedValidateAddress = async (
  value: string | undefined,
  ctx: Yup.TestContext<any>
) => {
  const debouncedFn = debounce(validateAddress, 500)
  return await new Promise<boolean | Yup.ValidationError>((res) =>
    debouncedFn(value, ctx, res)
  )
}

export const addressValidationSchema = Yup.string()
  .required('*')
  .test(deboucedValidateAddress)
