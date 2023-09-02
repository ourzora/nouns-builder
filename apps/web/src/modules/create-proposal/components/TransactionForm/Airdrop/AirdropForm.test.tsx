import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect } from 'vitest'

import AirdropForm from './AirdropForm'

describe('Airdrop form', () => {
  it('should render airdrop form with default values', () => {
    render(<AirdropForm />)

    expect(screen.getByText('Amount')).toBeInTheDocument()
    expect(screen.getByText('Recipient Wallet Address/ENS')).toBeInTheDocument()
    expect(screen.getByText('Add Transaction to Queue')).toBeInTheDocument()
  })
})

describe('Airdrop form with errors', () => {
  it('should render airdrop form with invalid values and errors', async () => {
    render(<AirdropForm />)

    const amountInput = screen.getByDisplayValue(0)
    const recipientInput = screen.getByPlaceholderText('0x...')

    fireEvent.focus(recipientInput)
    fireEvent.change(recipientInput, { target: { value: '0x69420' } })
    fireEvent.focusOut(recipientInput)
    fireEvent.focus(amountInput)
    fireEvent.change(amountInput, { target: { value: 0 } })
    fireEvent.focusOut(amountInput)

    await waitFor(() => expect(screen.getByText('Invalid address')).toBeInTheDocument())
    await waitFor(() =>
      expect(screen.getByText('Must be at least 1 token')).toBeInTheDocument()
    )
  })
})
