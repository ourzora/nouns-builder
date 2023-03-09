import { NounsProposalStatus } from 'src/data/graphql/sdk.generated'

export type ProposalSucceededStatus = Extract<
  NounsProposalStatus,
  | NounsProposalStatus.Succeeded
  | NounsProposalStatus.Queued
  | NounsProposalStatus.Executable
>

export function isProposalSuccessful(
  value: NounsProposalStatus
): value is ProposalSucceededStatus {
  return [
    NounsProposalStatus.Succeeded,
    NounsProposalStatus.Queued,
    NounsProposalStatus.Executable,
  ].includes(value)
}
