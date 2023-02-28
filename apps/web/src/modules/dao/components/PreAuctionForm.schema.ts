import * as Yup from 'yup'
import {
  auctionDurationValidationSchema,
  auctionReservePriceValidationSchema,
} from 'src/modules/create-dao'
import { Duration } from 'src/typings'

export interface PreAuctionFormValues {
  auctionDuration: Duration
  auctionReservePrice: number
}

export const preAuctionValidationSchema = Yup.object().shape({
  auctionDuration: auctionDurationValidationSchema,
  auctionReservePrice: auctionReservePriceValidationSchema,
})
