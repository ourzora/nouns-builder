import { ADMIN_VETO_INPUT, ADMIN_VETO_RADIO, RADIO } from '../types'

export const vetoFields = [
  {
    name: 'vetoPower',
    inputLabel: 'Veto Power',
    type: RADIO,
  },
]

export const vetoBurnDelegate = [
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
