import { render } from 'src/test/utils'
import { screen, waitFor } from '@testing-library/react'
import { ProposalNavigation } from './ProposalNavigation'
import { useDaoStore } from 'src/modules/dao'
import { vi } from 'vitest'
import { BUILDER_DAO } from 'src/test/fixtures/dao'

vi.mock('next/router', () => ({ useRouter: vi.fn() }))

vi.mock('src/stores', () => ({
  useDaoStore: vi.fn(),
}))

describe('Proposal Navigation', () => {
  it('should render the nav', async () => {
    vi.mocked(useDaoStore).mockReturnValue({
      token: BUILDER_DAO.token,
      metadata: BUILDER_DAO.metadata,
    })

    render(<ProposalNavigation />)

    // loading state, no image exists
    expect(screen.queryByTestId('dao-image')).not.toBeInTheDocument()

    await waitFor(() => expect(screen.getByText(/Builder/)).toBeInTheDocument())
    expect(screen.getByAltText(/Builder avatar/)).toBeInTheDocument()
  })
})
