import { ProposalState } from 'src/data/contract/requests/getProposalState'

import { isProposalSuccessful } from './isProposalSuccessful'

describe('isSucceededStatus', () => {
  it('should return ProposalSucceededStatus if proposal is successful', () => {
    expect(isProposalSuccessful(ProposalState.Succeeded)).toBe(true)
    expect(isProposalSuccessful(ProposalState.Queued)).toBe(true)
  })

  it('should return false if proposal is not successful', () => {
    expect(isProposalSuccessful(ProposalState.Executed)).toBe(false)
    expect(isProposalSuccessful(ProposalState.Defeated)).toBe(false)
    expect(isProposalSuccessful(ProposalState.Canceled)).toBe(false)
    expect(isProposalSuccessful(ProposalState.Expired)).toBe(false)
    expect(isProposalSuccessful(ProposalState.Pending)).toBe(false)
    expect(isProposalSuccessful(ProposalState.Active)).toBe(false)
  })
})
