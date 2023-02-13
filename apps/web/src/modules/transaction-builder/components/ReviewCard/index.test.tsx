import { fireEvent, screen } from '@testing-library/react'
import { render } from 'src/test/utils'
import { vi } from 'vitest'
import { ReviewCard } from '.'
import { TransactionType } from '../../constants/transactionTypes'

describe('Review Card', () => {
  it('should render a disabled transaction card', () => {
    render(
      <ReviewCard
        disabled={true}
        transaction={{
          summary: 'This is a transaction summary',
          type: TransactionType.UPGRADE,
          transactions: [],
        }}
        handleEdit={vi.fn()}
        handleRemove={vi.fn()}
      />
    )

    expect(screen.getByText(/This is a transaction summary/)).toBeInTheDocument()
    expect(screen.queryByTestId('actions')).not.toBeInTheDocument()
  })

  it('should render an active transaction card with multiple actions', () => {
    const mockEditFn = vi.fn()
    const mockRemoveFn = vi.fn()
    render(
      <ReviewCard
        transaction={{
          summary: 'This is a transaction summary',
          type: TransactionType.UPGRADE,
          transactions: [],
        }}
        handleEdit={mockEditFn}
        handleRemove={mockRemoveFn}
      />
    )

    expect(screen.getByText(/This is a transaction summary/)).toBeInTheDocument()
    expect(screen.queryByTestId('actions')).toBeInTheDocument()

    const editBtn = screen.getByTestId('edit')
    fireEvent.click(editBtn)
    expect(mockEditFn).toHaveBeenCalled()

    const removeBtn = screen.getByTestId('remove')
    fireEvent.click(removeBtn)
    expect(mockRemoveFn).toHaveBeenCalled()
  })

  it('should render a review card with an edit action', () => {
    const mockEditFn = vi.fn()

    render(
      <ReviewCard
        disabled={false}
        transaction={{
          summary: 'This is a transaction summary',
          type: TransactionType.UPGRADE,
          transactions: [],
        }}
        handleEdit={mockEditFn}
      />
    )

    expect(screen.getByText(/This is a transaction summary/)).toBeInTheDocument()
    expect(screen.queryByTestId('actions')).toBeInTheDocument()
    expect(screen.queryByTestId('remove')).not.toBeInTheDocument()

    const editBtn = screen.getByTestId('edit')
    fireEvent.click(editBtn)
    expect(mockEditFn).toHaveBeenCalled()
  })

  it('should render a review transaction card with a remove action', () => {
    const mockRemoveFn = vi.fn()

    render(
      <ReviewCard
        disabled={false}
        handleRemove={mockRemoveFn}
        transaction={{
          summary: 'This is a transaction summary',
          type: TransactionType.UPGRADE,
          transactions: [],
        }}
      />
    )

    expect(screen.getByText(/This is a transaction summary/)).toBeInTheDocument()
    expect(screen.queryByTestId('actions')).toBeInTheDocument()
    expect(screen.queryByTestId('edit')).not.toBeInTheDocument()

    const removeBtn = screen.getByTestId('remove')
    fireEvent.click(removeBtn)
    expect(mockRemoveFn).toHaveBeenCalled()
  })

  it('should render a review transaction card with a function names given no summary', () => {
    render(
      <ReviewCard
        disabled={false}
        transaction={{
          type: TransactionType.CUSTOM,
          transactions: [
            {
              functionSignature: 'test()',
              target: '0x123',
              calldata: '0000x00',
              value: '',
            },
            {
              functionSignature: 'test()',
              target: '0x123',
              calldata: '0000x00',
              value: '',
            },
          ],
        }}
      />
    )

    expect(screen.getByText('test(), test()')).toBeInTheDocument()
  })
})
