import { ProposalStatus } from 'src/typings'
import { isProposalSuccessful } from './isProposalSuccessful'

describe('isSucceededStatus', () => {
  it('should return ProposalSucceededStatus if proposal is successful', () => {
    expect(isProposalSuccessful(ProposalStatus.Succeeded)).toBe(true)
    expect(isProposalSuccessful(ProposalStatus.Queued)).toBe(true)
    expect(isProposalSuccessful(ProposalStatus.Executable)).toBe(true)
  })

  it('should return false if proposal is not successful', () => {
    expect(isProposalSuccessful(ProposalStatus.Executed)).toBe(false)
    expect(isProposalSuccessful(ProposalStatus.Defeated)).toBe(false)
    expect(isProposalSuccessful(ProposalStatus.Canceled)).toBe(false)
    expect(isProposalSuccessful(ProposalStatus.Expired)).toBe(false)
    expect(isProposalSuccessful(ProposalStatus.Pending)).toBe(false)
    expect(isProposalSuccessful(ProposalStatus.Created)).toBe(false)
    expect(isProposalSuccessful(ProposalStatus.Active)).toBe(false)
  })
})
