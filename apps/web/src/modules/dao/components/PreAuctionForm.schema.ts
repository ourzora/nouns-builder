import * as Yup from 'yup'

import { auctionReservePriceValidationSchema } from 'src/modules/create-dao'
import { Duration } from 'src/typings'
import { durationValidationSchema } from 'src/utils/yup'

export interface PreAuctionFormValues {
  auctionDuration: Duration
  auctionReservePrice: number
}

export const preAuctionValidationSchema = Yup.object().shape({
  auctionDuration: durationValidationSchema(),
  auctionReservePrice: auctionReservePriceValidationSchema,
})
