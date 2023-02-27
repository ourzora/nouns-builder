import { ProposalStatus } from 'src/typings'

import { isProposalOpen } from './isProposalOpen'

describe('isProposalOpen', () => {
  it('should return true if proposal is open', () => {
    expect(isProposalOpen(ProposalStatus.Created)).toBe(true)
    expect(isProposalOpen(ProposalStatus.Active)).toBe(true)
    expect(isProposalOpen(ProposalStatus.Queued)).toBe(true)
    expect(isProposalOpen(ProposalStatus.Succeeded)).toBe(true)
    expect(isProposalOpen(ProposalStatus.Pending)).toBe(true)
    expect(isProposalOpen(ProposalStatus.Executable)).toBe(true)
  })

  it('should return false if proposal is not open', () => {
    expect(isProposalOpen(ProposalStatus.Executed)).toBe(false)
    expect(isProposalOpen(ProposalStatus.Defeated)).toBe(false)
    expect(isProposalOpen(ProposalStatus.Canceled)).toBe(false)
    expect(isProposalOpen(ProposalStatus.Expired)).toBe(false)
  })
})
