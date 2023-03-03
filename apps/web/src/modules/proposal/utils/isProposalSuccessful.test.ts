import { NounsProposalStatus } from 'src/data/graphql/sdk.generated'

import { isProposalSuccessful } from './isProposalSuccessful'

describe('isSucceededStatus', () => {
  it('should return ProposalSucceededStatus if proposal is successful', () => {
    expect(isProposalSuccessful(NounsProposalStatus.Succeeded)).toBe(true)
    expect(isProposalSuccessful(NounsProposalStatus.Queued)).toBe(true)
    expect(isProposalSuccessful(NounsProposalStatus.Executable)).toBe(true)
  })

  it('should return false if proposal is not successful', () => {
    expect(isProposalSuccessful(NounsProposalStatus.Executed)).toBe(false)
    expect(isProposalSuccessful(NounsProposalStatus.Defeated)).toBe(false)
    expect(isProposalSuccessful(NounsProposalStatus.Canceled)).toBe(false)
    expect(isProposalSuccessful(NounsProposalStatus.Expired)).toBe(false)
    expect(isProposalSuccessful(NounsProposalStatus.Pending)).toBe(false)
    expect(isProposalSuccessful(NounsProposalStatus.Created)).toBe(false)
    expect(isProposalSuccessful(NounsProposalStatus.Active)).toBe(false)
  })
})
