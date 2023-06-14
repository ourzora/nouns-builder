import { ProposalState } from 'src/data/contract/requests/getProposalState'
import { Proposal } from 'src/data/subgraph/requests/proposalQuery'
import { parseBlockchainDate } from 'src/utils/parseBlockchainDate'

export const isProposalExecutable = (proposal: Proposal) => {
  return (
    proposal.state === ProposalState.Queued &&
    proposal.executableFrom &&
    parseBlockchainDate(proposal.executableFrom) > new Date()
  )
}
