import { isValidAddress } from '../../../utils/ens'
import { Provider } from '@ethersproject/abstract-provider'
import { ethers } from 'ethers'
import { NUMBER, RADIO, TEXT, TEXTAREA } from 'src/components/Fields/types'
import * as Yup from 'yup'

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

export const voteFields = [
  {
    name: 'choice',
    inputLabel: 'Choice',
    type: RADIO,
  },
  {
    name: 'reason',
    inputLabel: 'Reason',
    type: TEXTAREA,
    helperText: 'Optional',
    minHeight: 96,
  },
]

export const delegateFields = [
  {
    name: 'address',
    inputLabel: 'New Delegate',
    placeholder: '0x... or .eth',
    type: TEXT,
  },
]

export const validateAddress = (provider: Provider | undefined) =>
  Yup.object().shape({
    address: Yup.string()
      .test(
        'isValidAddress',
        'invalid address',
        (value: string | undefined) => !!value && isValidAddress(value, provider)
      )
      .required('*'),
  })

export const validateVote = Yup.object().shape({
  choice: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('*')
    .min(0, '> 0')
    .max(2, 'invalid respose'),
  reason: Yup.string().max(5000),
})

export const validateVotingSettings = Yup.object().shape({
  proposalThreshold: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('*')
    .min(0, '> 0')
    .max(100, '<= 100%'),
  quorumThreshold: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('*')
    .min(0, '> 0')
    .max(100, '<= 100%'),
})
