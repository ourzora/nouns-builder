import { ProposalCard } from './ProposalCard'
import { screen } from '@testing-library/react'
import { render } from 'src/test/utils'
import dayjs from 'dayjs'
import React from 'react'
import { ProposalStatus } from 'src/typings'
import { describe, expect, it, vi } from 'vitest'

describe('proposaal card', () => {
  const date = new Date(2022, 1, 1)

  beforeEach(() => {
    vi.setSystemTime(date)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render a proposal card given a succeeded propoasl', async () => {
    render(
      <ProposalCard
        proposalId="0x6ef37a96a14d1a27f9a1a598a418fbfbbc24d63493a129e2223dd4448791b5b8"
        timeCreated={1668002568}
        title="A proposal title"
        proposalNumber={1}
        status={ProposalStatus.Succeeded}
        collection="sdflkdsjf"
        voteEnd={dayjs('2/1/21').unix()}
        voteStart={dayjs('1/1/21').unix()}
      />
    )

    expect(screen.getByText(/A proposal title/)).toBeInTheDocument()
    expect(screen.getByText(/Succeeded/)).toBeInTheDocument()
    expect(screen.queryByTestId('time-prefix')).not.toBeInTheDocument()
  })

  it('should render a proposal card given an active proposal', async () => {
    render(
      <ProposalCard
        proposalId="0x6ef37a96a14d1a27f9a1a598a418fbfbbc24d63493a129e2223dd4448791b5b8"
        timeCreated={dayjs(date).unix()}
        title="A proposal title"
        proposalNumber={1}
        status={ProposalStatus.Active}
        collection="sdflkdsjf"
        voteEnd={dayjs(date).add(2, 'day').unix()}
        voteStart={dayjs(date).subtract(1, 'day').unix()}
      />
    )

    expect(screen.getByText(/A proposal title/)).toBeInTheDocument()
    expect(screen.getByText(/Feb 01, 2022/)).toBeInTheDocument()
    expect(screen.getByText(/Active/)).toBeInTheDocument()
    expect(screen.getByText(/Ends in 2 days/)).toBeInTheDocument()
  })
})
