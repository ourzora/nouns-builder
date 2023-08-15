import * as Yup from 'yup'

import { addressValidationSchema } from 'src/utils/yup'

export const delegateValidationSchema = Yup.object().shape({
  address: addressValidationSchema,
})
