import { Box, Grid } from '@zoralabs/zord'
import dayjs from 'dayjs'
import React, { useCallback } from 'react'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { propDataGrid } from 'src/styles/Proposals.css'
import { Proposal } from 'src/typings'

import { Tile } from './Tile'
import { voteProgress, voteProgressVariants } from './Tile.css'

export type ProposalDetailsGridProps = {
  proposal: Proposal
}

export const ProposalDetailsGrid: React.FC<ProposalDetailsGridProps> = ({ proposal }) => {
  const { forVotes, againstVotes, abstainVotes, quorumVotes, transactionInfo, voteEnd } =
    proposal

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
    <>
      <Grid columns={'1fr 1fr 1fr'} gap={{ '@initial': 'x2', '@768': 'x4' }}>
        {voteType?.map((vote, i) => {
          return (
            <Tile
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
            </Tile>
          )
        })}
      </Grid>
      <Grid className={propDataGrid}>
        <Tile
          title={'Threshold'}
          subtitle={`${quorumVotes} ${Number(quorumVotes) === 1 ? 'vote' : 'votes'}`}
          subtext={'Current threshold'}
        />
        <Tile
          title={((Date.now() / 1000) | 0) >= voteEnd ? 'Ended' : 'Ending'}
          subtitle={dayjs(dayjs.unix(voteEnd)).format('MMM, D, YYYY')}
          subtext={`${dayjs.unix(voteEnd).format('h:mm:ss A')} GMT+2`}
        />
        <a
          href={`${ETHERSCAN_BASE_URL}/tx/${transactionInfo.transactionHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <Tile
            title={'Snapshot'}
            subtitle={`#${transactionInfo.blockNumber}`}
            subtext={'Taken at block'}
          />
        </a>
      </Grid>
    </>
  )
}
