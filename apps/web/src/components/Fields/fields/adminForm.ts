import { isValidAddress } from 'src/utils/ens'
import { vetoBurnDelegate } from './veto'
import { votingSettingsFields } from './delegate'
import { Provider } from '@ethersproject/abstract-provider'
import {
  auctionSettingsFields,
  validateAuctionSettings,
} from 'src/components/Fields/fields/auction'
import {
  DAYS_HOURS_MINS_SECS,
  NUMBER,
  SINGLE_IMAGE_UPLOAD,
  TEXT,
  TEXTAREA,
} from 'src/components/Fields/types'
import * as Yup from 'yup'

export const adminFields = [...auctionSettingsFields]

export const validateAdmin = (provider: Provider | undefined) =>
  Yup.object()
    .concat(validateAuctionSettings)
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
  ...[
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
  ],
  ...auctionSettingsFields,
  ...[
    ...votingSettingsFields,
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
    ...vetoBurnDelegate,
  ],
]
