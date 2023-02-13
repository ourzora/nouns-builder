import { ProposalStatus } from 'src/typings'
import { isProposalOpen, isProposalSuccessful } from '.'

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
