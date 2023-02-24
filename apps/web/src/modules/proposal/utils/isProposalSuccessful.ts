import { ProposalStatus, ProposalSucceededStatus } from 'src/typings'

export function isProposalSuccessful(
  value: ProposalStatus
): value is ProposalSucceededStatus {
  return [
    ProposalStatus.Succeeded,
    ProposalStatus.Queued,
    ProposalStatus.Executable,
  ].includes(value)
}
