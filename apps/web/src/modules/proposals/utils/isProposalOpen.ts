import { ProposalStatus } from 'src/typings'

export const isProposalOpen = (state: ProposalStatus): boolean => {
  if (
    state === ProposalStatus.Created ||
    state === ProposalStatus.Queued ||
    state === ProposalStatus.Succeeded ||
    state === ProposalStatus.Active ||
    state === ProposalStatus.Pending ||
    state === ProposalStatus.Executable
  ) {
    return true
  }
  return false
}
