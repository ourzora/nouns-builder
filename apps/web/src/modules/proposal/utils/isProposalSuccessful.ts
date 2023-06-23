import { ProposalState } from 'src/data/contract/requests/getProposalState'

export type ProposalSucceededStatus = Extract<
  ProposalState,
  ProposalState.Succeeded | ProposalState.Queued
>

export function isProposalSuccessful(
  value: ProposalState
): value is ProposalSucceededStatus {
  return [ProposalState.Succeeded, ProposalState.Queued].includes(value)
}
