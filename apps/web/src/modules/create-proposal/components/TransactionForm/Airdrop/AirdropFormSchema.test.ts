import { describe, expect } from 'vitest'

import airdropFormSchema from './AirdropForm.schema'

describe('AirdropForm schema validation', () => {
  it('should validate this AirdropFormValues object with plain address', async () => {
    const result = await airdropFormSchema.isValid({
      amount: 1,
      recipientAddress: '0xf0A1982603d0b0Ed388994ad0D5BC76f98FFBD92',
    })
    expect(result).toEqual(true)
  })

  it('should invalidate this AirdropFormValues object with plain address due to below minimum amount', async () => {
    const result = await airdropFormSchema.isValid({
      amount: 0,
      recipientAddress: '0xf0A1982603d0b0Ed388994ad0D5BC76f98FFBD92',
    })
    expect(result).toEqual(false)
  })

  it('should invalidate this AirdropFormValues object with plain address due to invalid address', async () => {
    const result = await airdropFormSchema.isValid({
      amount: 0,
      recipientAddress: '0x69420e101',
    })
    expect(result).toEqual(false)
  })
  // TODO Figure out why this breaks the test runner
  /* it('should validate this AirdropFormValues object with ENS domain', async () => {
    const result = await airdropFormSchema.isValid({
      amount: 1,
      recipientAddress: 'ens.eth',
    })
    expect(result).toEqual(true)
  }) */
})
