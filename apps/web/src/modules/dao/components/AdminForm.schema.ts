import { isValidAddress } from 'src/utils/ens'
import { Provider } from '@ethersproject/abstract-provider'
import { auctionSettingsValidationSchema } from 'src/modules/create-dao'
import {
  ADMIN_VETO_INPUT,
  ADMIN_VETO_RADIO,
  DAYS_HOURS_MINS_SECS,
  NUMBER,
  SINGLE_IMAGE_UPLOAD,
  TEXT,
  TEXTAREA,
  ADMIN_VETO_RADIO,
  ADMIN_VETO_INPUT,
} from 'src/components/Fields/types'
import * as Yup from 'yup'
import { Duration } from 'src/typings'

export interface AdminFormValues {
  daoAvatar: string
  daoWebsite: string
  projectDescription: string
  rendererBase: string
  auctionDuration: Duration
  auctionReservePrice: number
  proposalThreshold: number
  quorumThreshold: number
  votingPeriod: Duration
  votingDelay: Duration
  vetoPower: 1 | 0
  vetoer: string
}

export const adminValidationSchema = (provider: Provider | undefined) =>
  Yup.object()
    .concat(auctionSettingsValidationSchema)
    .concat(
      Yup.object()
        .shape({
          vetoer: Yup.string()
            .test(
              'isValidAddress',
              'invalid address',
              (value: string | undefined) => !!value && isValidAddress(value, provider)
            )
            .required('*'),
        })
        .concat(
          Yup.object().shape({
            votingDelay: Yup.object()
              .shape({
                days: Yup.number()
                  .transform((value) => (isNaN(value) ? undefined : value))
                  .min(0, '>= 0'),
                hours: Yup.number()
                  .transform((value) => (isNaN(value) ? undefined : value))
                  .min(0, '>= 0')
                  .max(23, '<= 23 hours'),
                minutes: Yup.number()
                  .transform((value) => (isNaN(value) ? undefined : value))
                  .min(0, '>= 0')
                  .max(59, '<= 59 minutes'),
                seconds: Yup.number()
                  .transform((value) => (isNaN(value) ? undefined : value))
                  .min(0, '>= 0')
                  .max(59, '<= 59 seconds'),
              })
              .test('valueCheck', 'Value below minimum of one second', (value) => {
                const values = Object.values(value).map((num) => {
                  return Number.isNaN(num) || typeof num === 'undefined' ? 0 : num
                })
                return values.filter((val) => val > 0).length > 0
              }),
          })
        )
    )

export const adminProposalFields = [
  {
    name: 'daoAvatar',
    inputLabel: 'Dao avatar',
    type: SINGLE_IMAGE_UPLOAD,
    helperText: 'Upload',
  },
  {
    name: 'projectDescription',
    inputLabel: 'Collection Description',
    type: TEXTAREA,
    placeholder: 'Nouns is an experiment which combines...',
  },
  {
    name: 'daoWebsite',
    inputLabel: 'Dao Website',
    type: TEXT,
    placeholder: 'https://www.nouns.wtf',
  },
  {
    name: 'rendererBase',
    inputLabel: 'Renderer Base Url',
    type: TEXT,
    helperText:
      'This is the base url of the image stacker used to stack the layers and compose an nft.',
  },
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
  {
    name: 'votingPeriod',
    inputLabel: 'Voting Period',
    type: DAYS_HOURS_MINS_SECS,
    helperText: 'The number of blocks that voting for a proposal will take place',
  },
  {
    name: 'votingDelay',
    inputLabel: 'Voting Delay',
    type: DAYS_HOURS_MINS_SECS,
    helperText: 'The number of blocks after a proposal that voting is delayed',
  },
  {
    name: 'vetoPower',
    inputLabel: 'Veto Power',
    type: ADMIN_VETO_RADIO,
    helperText: 'Burn veto power',
  },
  {
    name: 'vetoer',
    inputLabel: 'Vetoer',
    type: ADMIN_VETO_INPUT,
    helperText: 'This is the address that has veto power over any proposal.',
  },
]
