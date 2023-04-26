import { Box, Text } from '@zoralabs/zord'
import { useMemo } from 'react'

import { useLayoutStore } from 'src/stores'

import { VoterParticipationVariants } from './VoterParticipation.css'

export interface VoterParticipationProps {
  totalVotes: number
  maxVotes: number
}

export const VoterParticipation: React.FC<VoterParticipationProps> = ({
  totalVotes,
  maxVotes,
}) => {
  const { isMobile } = useLayoutStore()
  const participation = (totalVotes / maxVotes) * 100

  const variant = useMemo(() => {
    if (participation >= 65) return 'positive'
    if (participation <= 25) return 'negative'
    return 'neutral'
  }, [participation])

  return (
    <Box
      borderStyle="solid"
      borderColor="border"
      borderRadius="curved"
      w="100%"
      px={isMobile ? 'x4' : 'x6'}
      py="x4"
    >
      <Text variant="heading-xs" style={{ fontWeight: 600 }}>
        Voter participation
      </Text>
      {maxVotes ? (
        <Text
          variant="heading-md"
          style={{ fontWeight: 600 }}
          className={VoterParticipationVariants[variant]}
          mt="x4"
        >
          {maxVotes ? participation.toPrecision(3) : '--'}%
        </Text>
      ) : (
        <Text variant="heading-md" style={{ fontWeight: 600 }} mt="x4">
          --%
        </Text>
      )}
      <Text color="text2">{`${totalVotes} out of ${maxVotes} possible votes`}</Text>
    </Box>
  )
}
