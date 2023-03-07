import { NounsProposalStatus } from 'src/data/graphql/sdk.generated'

export const isProposalOpen = (state: NounsProposalStatus): boolean => {
  if (
    state === NounsProposalStatus.Created ||
    state === NounsProposalStatus.Queued ||
    state === NounsProposalStatus.Succeeded ||
    state === NounsProposalStatus.Active ||
    state === NounsProposalStatus.Pending ||
    state === NounsProposalStatus.Executable
  ) {
    return true
  }
  return false
}
