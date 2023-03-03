import { NounsProposalStatus } from 'src/data/graphql/sdk.generated'

import { isProposalOpen } from './isProposalOpen'

describe('isProposalOpen', () => {
  it('should return true if proposal is open', () => {
    expect(isProposalOpen(NounsProposalStatus.Created)).toBe(true)
    expect(isProposalOpen(NounsProposalStatus.Active)).toBe(true)
    expect(isProposalOpen(NounsProposalStatus.Queued)).toBe(true)
    expect(isProposalOpen(NounsProposalStatus.Succeeded)).toBe(true)
    expect(isProposalOpen(NounsProposalStatus.Pending)).toBe(true)
    expect(isProposalOpen(NounsProposalStatus.Executable)).toBe(true)
  })

  it('should return false if proposal is not open', () => {
    expect(isProposalOpen(NounsProposalStatus.Executed)).toBe(false)
    expect(isProposalOpen(NounsProposalStatus.Defeated)).toBe(false)
    expect(isProposalOpen(NounsProposalStatus.Canceled)).toBe(false)
    expect(isProposalOpen(NounsProposalStatus.Expired)).toBe(false)
  })
})
