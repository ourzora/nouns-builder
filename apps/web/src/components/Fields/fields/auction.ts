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

export const votingSettingsFields = [
  {
    name: 'proposalThreshold',
    inputLabel: 'Proposal Threshold',
    type: NUMBER,
    perma: '%',
    step: 0.1,
    helperText:
      'This is the percentage of all existing tokens that must be owned by someone attempting to create a proposal. We recommend a starting value of 0.5% to encourage participation.',
  },
  {
    name: 'quorumThreshold',
    inputLabel: 'Quorum Threshold',
    type: NUMBER,
    perma: '%',
    step: 1,
    helperText:
      'This is the percentage of all existing tokens that must vote in a proposal in order for it to pass (as long as a majority of votes approve). We recommend a starting value of 10%.',
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
