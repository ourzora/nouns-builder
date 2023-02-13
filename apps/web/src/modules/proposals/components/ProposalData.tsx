import { Grid } from '@zoralabs/zord'
import dayjs from 'dayjs'
import React from 'react'
import ProposalTile from './ProposalTile'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { propDataGrid } from 'src/styles/Proposals.css'
import { Proposal } from 'src/typings'

type ProposalDataProperties = {
  proposal: Proposal
}

const ProposalData: React.FC<ProposalDataProperties> = ({ proposal }) => {
  const { quorumVotes, transactionInfo } = proposal
  const voteEnd = Number(proposal.voteEnd)

  return (
    <Grid className={propDataGrid}>
      <ProposalTile
        title={'Threshold'}
        subtitle={`${quorumVotes} ${Number(quorumVotes) === 1 ? 'vote' : 'votes'}`}
        subtext={'Current threshold'}
      />
      <ProposalTile
        title={((Date.now() / 1000) | 0) >= voteEnd ? 'Ended' : 'Ending'}
        subtitle={dayjs(dayjs.unix(voteEnd)).format('MMM, D, YYYY')}
        subtext={`${dayjs.unix(voteEnd).format('h:mm:ss A')} GMT+2`}
      />
      <a
        href={`${ETHERSCAN_BASE_URL}/tx/${transactionInfo.transactionHash}`}
        target="_blank"
        rel="noreferrer"
      >
        <ProposalTile
          title={'Snapshot'}
          subtitle={`#${transactionInfo.blockNumber}`}
          subtext={'Taken at block'}
        />
      </a>
    </Grid>
  )
}

export default ProposalData
