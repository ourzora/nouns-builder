import * as Yup from 'yup'

import { Duration } from 'src/typings'
import { durationValidationSchema } from 'src/utils/yup'

export interface AuctionSettingsFormValues {
  auctionDuration: Duration
  auctionReservePrice?: number
  proposalThreshold?: number
  quorumThreshold?: number
}

export const auctionReservePriceValidationSchema = Yup.number()
  .transform((value) => (isNaN(value) ? undefined : value))
  .required('*')
  .min(0.0001, '> 0.0001 ETH') // temp until protocol supports 0 ETH reserve price

export const auctionSettingsValidationSchema = Yup.object().shape({
  auctionDuration: durationValidationSchema(),
  auctionReservePrice: auctionReservePriceValidationSchema,
  proposalThreshold: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('*')
    .min(0.01, '>= 0.01%')
    .max(10, '<= 10%'),
  quorumThreshold: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('*')
    .min(2, '>= 2%')
    .moreThan(
      Yup.ref('proposalThreshold'),
      'Quorum threshold must be greater than proposal threshold'
    )
    .max(20, '<= 20%'),
})
