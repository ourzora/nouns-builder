import * as yup from 'yup'

import { CHAIN_ID } from 'src/typings'
import { addressValidationSchema } from 'src/utils/yup'

export interface MigrationFormC2Values {
  L2: CHAIN_ID.BASE_GOERLI | CHAIN_ID.ZORA | CHAIN_ID.BASE | CHAIN_ID.OPTIMISM
  starter: string
}

const migrationFormC2Schema = yup.object({
  L2: yup.string().required('*'),
  starter: addressValidationSchema,
})

export default migrationFormC2Schema
