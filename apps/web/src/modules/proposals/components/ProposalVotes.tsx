import React, { useCallback } from 'react'
import ProposalTile from './ProposalTile'
import { voteProgress, voteProgressVariants } from './ProposalTile/index.css'
import { Box, Grid } from '@zoralabs/zord'
import { Proposal } from 'src/typings'

export type ProposalVoteProps = {
  proposal: Proposal
}

const ProposalVotes: React.FC<ProposalVoteProps> = ({ proposal }) => {
  const { forVotes, againstVotes, abstainVotes } = proposal

  const calculateProgress = useCallback(
    (votes: number) => {
      const denominator = forVotes + againstVotes + abstainVotes
      const numerator = (votes / denominator) * 100
      return denominator > 0 ? (numerator > 100 ? 100 : numerator) : 0
    },
    [forVotes, againstVotes, abstainVotes]
  )

  const voteType = React.useMemo(() => {
    return [
      {
        title: 'For',
        votes: forVotes,
        progress: calculateProgress(forVotes),
      },
      {
        title: 'Against',
        votes: againstVotes,
        progress: calculateProgress(againstVotes),
      },
      {
        title: 'Abstain',
        votes: abstainVotes,
        progress: calculateProgress(abstainVotes),
      },
    ]
  }, [forVotes, abstainVotes, againstVotes, calculateProgress])

  return (
    <Grid columns={'1fr 1fr 1fr'} gap={{ '@initial': 'x2', '@768': 'x4' }}>
      {voteType?.map((vote, i) => {
        return (
          <ProposalTile
            key={i}
            title={vote.title}
            subtitle={vote.votes}
            variant={
              vote.progress
                ? (vote.title.toLowerCase() as keyof typeof voteProgressVariants)
                : 'abstain'
            }
          >
            <Box className={voteProgress} w={'100%'} mt={'x4'}>
              <Box
                className={
                  voteProgressVariants[
                    vote.title.toLowerCase() as keyof typeof voteProgressVariants
                  ]
                }
                style={{ width: `${vote.progress}%` }}
              />
            </Box>
          </ProposalTile>
        )
      })}
    </Grid>
  )
}

export default ProposalVotes
