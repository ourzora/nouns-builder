import { ProposalState } from 'src/data/contract/requests/getProposalState'

import { isProposalOpen } from './isProposalOpen'

describe('isProposalOpen', () => {
  it('should return true if proposal is open', () => {
    expect(isProposalOpen(ProposalState.Active)).toBe(true)
    expect(isProposalOpen(ProposalState.Queued)).toBe(true)
    expect(isProposalOpen(ProposalState.Succeeded)).toBe(true)
    expect(isProposalOpen(ProposalState.Pending)).toBe(true)
  })

  it('should return false if proposal is not open', () => {
    expect(isProposalOpen(ProposalState.Executed)).toBe(false)
    expect(isProposalOpen(ProposalState.Defeated)).toBe(false)
    expect(isProposalOpen(ProposalState.Canceled)).toBe(false)
    expect(isProposalOpen(ProposalState.Expired)).toBe(false)
  })
})
