import { Provider } from '@ethersproject/abstract-provider'
import * as Yup from 'yup'

import { auctionSettingsValidationSchema } from 'src/modules/create-dao'
import { Duration } from 'src/typings'
import { isValidAddress } from 'src/utils/ens'
import { durationValidationSchema, urlValidationSchema } from 'src/utils/yup'

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
  vetoPower: boolean
  vetoer: string
}

const twentyFourWeeks = 60 * 60 * 24 * 7 * 24
const tenMinutes = 60 * 10

export const adminValidationSchema = (provider: Provider | undefined) =>
  Yup.object()
    .concat(auctionSettingsValidationSchema)
    .concat(
      Yup.object().shape({
        daoAvatar: Yup.string(),
        projectDescription: Yup.string().required('*').max(5000, '< 5000 characters'),
        daoWebsite: urlValidationSchema,
        rendererBaseUrl: urlValidationSchema,
        vetoer: Yup.string()
          .test(
            'isValidAddress',
            'invalid address',
            (value: string | undefined) => !!value && isValidAddress(value, provider)
          )
          .required('*'),
        votingDelay: durationValidationSchema(
          { value: 1, description: '1 second' },
          { value: twentyFourWeeks, description: '24 weeks' }
        ),
        votingPeriod: durationValidationSchema(
          { value: tenMinutes, description: '10 minutes' },
          { value: twentyFourWeeks, description: '24 weeks' }
        ),
        vetoPower: Yup.bool().required('*'),
      })
    )
