import * as yup from 'yup'

import { addressValidationSchema } from 'src/utils/yup'

export interface MigrationFormC2Values {
  L2: string
  starter: string
}

const migrationFormC2Schema = yup.object({
  L2: yup.string().required('*'),
  starter: addressValidationSchema,
})

export default migrationFormC2Schema
