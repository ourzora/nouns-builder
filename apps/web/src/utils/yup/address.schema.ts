import { debounce } from 'lodash'
import { Address } from 'wagmi'
import * as Yup from 'yup'

import { CHAIN_ID } from 'src/typings'
import { isValidAddress } from 'src/utils/ens'
import { getProvider } from 'src/utils/provider'

const validateAddress = async (
  value: string | undefined,
  ctx: Yup.TestContext<any>,
  res: (value: boolean | Yup.ValidationError) => void,
  errorMessage?: string
) => {
  try {
    if (!value) return res(false)
    const { data: isValid, error } = await isValidAddress(
      value as Address,
      getProvider(CHAIN_ID.ETHEREUM),
      errorMessage
    )
    if (error) return res(ctx.createError({ message: error, path: ctx.path }))
    res(isValid)
  } catch (err) {
    res(false)
  }
}

const deboucedValidateAddress = async (
  value: string | undefined,
  ctx: Yup.TestContext<any>,
  errorMessage?: string
) => {
  const debouncedFn = debounce(validateAddress, 500)
  return await new Promise<boolean | Yup.ValidationError>((res) =>
    debouncedFn(value, ctx, res, errorMessage)
  )
}

export const addressValidationSchema = Yup.string()
  .required('*')
  .test(deboucedValidateAddress)

export const addressValidationSchemaWithError = (
  invalidErrorMessage: string,
  requiredErrorMessage: string
) =>
  Yup.string()
    .required(requiredErrorMessage)
    .test((value: string | undefined, ctx: Yup.TestContext<any>) =>
      deboucedValidateAddress(value, ctx, invalidErrorMessage)
    )

export const addressValidationOptionalSchema = Yup.string().test(
  (value: string | undefined, ctx: Yup.TestContext<any>) =>
    value ? deboucedValidateAddress(value, ctx) : true
)
