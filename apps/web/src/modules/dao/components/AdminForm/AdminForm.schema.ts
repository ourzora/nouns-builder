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
        votingDelay: durationValidationSchema,
        votingPeriod: durationValidationSchema,
        vetoPower: Yup.bool().required('*'),
      })
    )
