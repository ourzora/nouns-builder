import * as yup from 'yup'

import { addressValidationSchema } from 'src/utils/yup'

export interface MigrationFormC2Values {
  L2: string
  settler: string
}

const migrationFormC2Schema = yup.object({
  L2: yup.string().required('*'),
  settler: addressValidationSchema,
})

export default migrationFormC2Schema
