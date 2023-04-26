import { style } from '@vanilla-extract/css'
import { atoms } from '@zoralabs/zord'

export const VoterParticipationVariants = {
  positive: atoms({ color: 'positive' }),
  negative: atoms({ color: 'negative' }),
  neutral: style({ color: '#FF8E38' }),
}
