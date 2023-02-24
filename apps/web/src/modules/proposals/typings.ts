import {
  NounsProposalStatus as ProposalStatus,
  ProposalFragment,
  ProposalVoteFragment as ProposalVote,
} from 'src/data/graphql/sdk.generated'

export { ProposalStatus }
export type { ProposalVote }

export type ProposalSucceededStatus = Extract<
  ProposalStatus,
  ProposalStatus.Succeeded | ProposalStatus.Queued | ProposalStatus.Executable
>
export interface Proposal extends Omit<ProposalFragment, 'executableFrom' | 'expiresAt'> {
  executableFrom?: number
  expiresAt?: number
  transactionInfo: {
    blockNumber: number
    transactionHash?: string | null
  }
  votes?: ProposalVote[]
}
