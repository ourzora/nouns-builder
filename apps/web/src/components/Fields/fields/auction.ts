import { DAYS_HOURS_MINS_SECS, NUMBER } from 'src/components/Fields/types'
import * as Yup from 'yup'

export const auctionSettingsFields = [
  {
    name: 'auctionDuration',
    inputLabel: 'Auction Duration',
    type: DAYS_HOURS_MINS_SECS,
    helperText: 'How long each auction lasts.',
    placeholder: ['1', '0', '0', '0'],
  },
  {
    name: 'auctionReservePrice',
    inputLabel: 'Auction Reserve Price',
    type: NUMBER,
    perma: 'ETH',
    helperText: 'The starting price of an auction. Must be greater than 0.0001 ETH.', // temp until protocol supports 0 ETH reserve price
  },
]

export const validateAuctionSettings = Yup.object().shape({
  auctionDuration: Yup.object()
    .shape({
      seconds: Yup.number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .min(0, '>= 0')
        .max(60, '<= 60 seconds'),
      minutes: Yup.number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .min(0, '>= 0')
        .max(60, '<= 60 minutes'),
      days: Yup.number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .min(0, '>= 0'),
      hours: Yup.number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .min(0, '>= 0')
        .max(24, '<= 24 hours'),
    })
    .test('valueCheck', 'Value below minimum', (value) => {
      const values = Object.values(value).map((num) => {
        return Number.isNaN(num) || typeof num === 'undefined' ? 0 : num
      })
      return values.filter((val) => val > 0).length > 0
    }),
  auctionReservePrice: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('*')
    .min(0.0001, '> 0.0001 ETH'), // temp until protocol supports 0 ETH reserve price
})
